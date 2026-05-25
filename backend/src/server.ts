/**
 * VedaAI Backend — single-file production server
 * Express + MongoDB + Redis + BullMQ + Socket.IO + OpenAI + PDF
 */
import "dotenv/config";
import http from "http";
import path from "path";
import fs from "fs/promises";
import { createReadStream, existsSync, mkdirSync } from "fs";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import multer from "multer";
import mongoose, { Schema, Document, Types } from "mongoose";
import Redis from "ioredis";
import { Queue, Worker, Job } from "bullmq";
import { Server as SocketServer } from "socket.io";
import OpenAI from "openai";
import { z } from "zod";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// ─────────────────────────────────────────────────────────────────────────────
// ENV
// ─────────────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? 5000);
const NODE_ENV = process.env.NODE_ENV ?? "development";
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/vedaai";
const REDIS_URL = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const CORS_ORIGIN =
  process.env.CORS_ORIGIN ?? "http://localhost:3000,http://localhost:3001";
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR ?? "./uploads");
const PDF_DIR = path.resolve(process.env.PDF_DIR ?? "./generated-pdfs");
const CACHE_TTL_SEC = Number(process.env.CACHE_TTL_SEC ?? 300);

mkdirSync(UPLOAD_DIR, { recursive: true });
mkdirSync(PDF_DIR, { recursive: true });

// ─────────────────────────────────────────────────────────────────────────────
// LOGGER
// ─────────────────────────────────────────────────────────────────────────────
const log = {
  info: (...a: unknown[]) => console.log(`[${new Date().toISOString()}] INFO`, ...a),
  warn: (...a: unknown[]) => console.warn(`[${new Date().toISOString()}] WARN`, ...a),
  error: (...a: unknown[]) => console.error(`[${new Date().toISOString()}] ERROR`, ...a),
};

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & ZOD
// ─────────────────────────────────────────────────────────────────────────────
export const QuestionSchema = z.object({
  question: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard", "Easy", "Moderate", "Challenging"]).transform((d) => {
    const map: Record<string, string> = {
      easy: "Easy",
      medium: "Moderate",
      hard: "Challenging",
      Easy: "Easy",
      Moderate: "Moderate",
      Challenging: "Challenging",
    };
    return map[d] ?? "Moderate";
  }),
  marks: z.number().positive(),
});

export const SectionSchema = z.object({
  title: z.string().min(1),
  instruction: z.string().optional().default("Attempt all questions"),
  heading: z.string().optional(),
  questions: z.array(QuestionSchema).min(1),
});

export const AIPaperSchema = z.object({
  sections: z.array(SectionSchema).min(1),
  metadata: z
    .object({
      subject: z.string().optional(),
      className: z.string().optional(),
      timeAllowed: z.string().optional(),
      maxMarks: z.number().optional(),
      notes: z.string().optional(),
    })
    .optional(),
});

export type AIPaper = z.infer<typeof AIPaperSchema>;

const CreateAssignmentBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.string().min(1, "Due date is required"),
  questionTypes: z
    .array(
      z.object({
        type: z.string().min(1),
        count: z.number().int().positive(),
        marks: z.number().positive(),
      }),
    )
    .min(1),
  additionalInfo: z.string().optional().default(""),
  instructions: z.string().optional().default(""),
});

export type AssignmentStatus =
  | "draft"
  | "queued"
  | "generating"
  | "completed"
  | "failed";

// ─────────────────────────────────────────────────────────────────────────────
// MONGOOSE MODELS
// ─────────────────────────────────────────────────────────────────────────────
interface IQuestion {
  question: string;
  difficulty: string;
  marks: number;
}

interface ISection {
  title: string;
  instruction: string;
  heading?: string;
  questions: IQuestion[];
}

interface IQuestionPaper extends Document {
  assignmentId: Types.ObjectId;
  sections: ISection[];
  metadata: {
    subject?: string;
    className?: string;
    timeAllowed?: string;
    maxMarks?: number;
    notes?: string;
  };
  rawPrompt?: string;
  pdfPath?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionPaperSchema = new Schema<IQuestionPaper>(
  {
    assignmentId: { type: Schema.Types.ObjectId, ref: "Assignment", required: true, index: true },
    sections: [
      {
        title: String,
        instruction: String,
        heading: String,
        questions: [{ question: String, difficulty: String, marks: Number }],
      },
    ],
    metadata: {
      subject: String,
      className: String,
      timeAllowed: String,
      maxMarks: Number,
      notes: String,
    },
    rawPrompt: String,
    pdfPath: String,
  },
  { timestamps: true },
);

interface IAssignment extends Document {
  title: string;
  dueDate: string;
  instructions: string;
  additionalInfo: string;
  questionTypes: { type: string; count: number; marks: number }[];
  totalQuestions: number;
  totalMarks: number;
  status: AssignmentStatus;
  progress: number;
  progressMessage: string;
  errorMessage?: string;
  uploadedFileName?: string;
  uploadedFilePath?: string;
  uploadedText?: string;
  questionPaperId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    dueDate: { type: String, required: true },
    instructions: { type: String, default: "" },
    additionalInfo: { type: String, default: "" },
    questionTypes: [
      { type: { type: String, required: true }, count: Number, marks: Number },
    ],
    totalQuestions: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "queued", "generating", "completed", "failed"],
      default: "draft",
    },
    progress: { type: Number, default: 0 },
    progressMessage: { type: String, default: "" },
    errorMessage: String,
    uploadedFileName: String,
    uploadedFilePath: String,
    uploadedText: String,
    questionPaperId: { type: Schema.Types.ObjectId, ref: "QuestionPaper" },
  },
  { timestamps: true },
);

const Assignment = mongoose.model<IAssignment>("Assignment", AssignmentSchema);
const QuestionPaper = mongoose.model<IQuestionPaper>("QuestionPaper", QuestionPaperSchema);

// ─────────────────────────────────────────────────────────────────────────────
// REDIS
// ─────────────────────────────────────────────────────────────────────────────
const redis = new Redis(REDIS_URL, { maxRetriesPerRequest: null });

redis.on("connect", () => log.info("Redis connected"));
redis.on("error", (err) => log.error("Redis error", err.message));

async function cacheGet<T>(key: string): Promise<T | null> {
  const raw = await redis.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function cacheSet(key: string, value: unknown, ttl = CACHE_TTL_SEC): Promise<void> {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
}

async function cacheDel(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern);
  if (keys.length) await redis.del(...keys);
}

// ─────────────────────────────────────────────────────────────────────────────
// SOCKET.IO (set after http server created)
// ─────────────────────────────────────────────────────────────────────────────
let io: SocketServer;

function assignmentRoom(id: string) {
  return `assignment:${id}`;
}

function emitToAssignment(
  assignmentId: string,
  event: string,
  payload: Record<string, unknown>,
) {
  if (!io) return;
  io.to(assignmentRoom(assignmentId)).emit(event, {
    assignmentId,
    ...payload,
    timestamp: new Date().toISOString(),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// AI SERVICE
// ─────────────────────────────────────────────────────────────────────────────
const openai = OPENAI_API_KEY
  ? new OpenAI({ apiKey: OPENAI_API_KEY })
  : null;

function buildPrompt(assignment: IAssignment): string {
  const qt = assignment.questionTypes
    .map((q) => `- ${q.type}: ${q.count} questions × ${q.marks} marks each`)
    .join("\n");

  return `You are an expert exam paper creator for K-12 teachers.

Create a structured question paper as VALID JSON ONLY (no markdown, no prose outside JSON).

Assignment title: ${assignment.title}
Due date: ${assignment.dueDate}
Teacher instructions: ${assignment.instructions || "N/A"}
Additional context: ${assignment.additionalInfo || "N/A"}
Reference material (if any): ${(assignment.uploadedText || "").slice(0, 4000) || "None"}

Question requirements:
${qt}

Total questions required: ${assignment.totalQuestions}
Total marks: ${assignment.totalMarks}

Return JSON with this exact shape:
{
  "sections": [
    {
      "title": "Section A",
      "instruction": "Attempt all questions",
      "heading": "Short Answer Questions",
      "questions": [
        { "question": "...", "difficulty": "easy|medium|hard", "marks": 2 }
      ]
    }
  ],
  "metadata": {
    "subject": "...",
    "className": "...",
    "timeAllowed": "3 hours",
    "maxMarks": ${assignment.totalMarks},
    "notes": "All questions are compulsory unless stated otherwise."
  }
}

Rules:
- Group questions into logical sections (A, B, C...)
- Match requested question types and counts
- Distribute difficulty: ~40% easy, ~40% medium, ~20% hard
- Each question must have positive marks
- Do NOT include answer key in this response`;
}

function extractJsonFromText(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence?.[1]) return JSON.parse(fence[1].trim());
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error("Could not parse AI response as JSON");
  }
}

function mockAIPaper(assignment: IAssignment): AIPaper {
  const sections = assignment.questionTypes.map((qt, idx) => ({
    title: `Section ${String.fromCharCode(65 + idx)}`,
    instruction: `Attempt all ${qt.type.toLowerCase()}.`,
    heading: qt.type,
    questions: Array.from({ length: Math.min(qt.count, 5) }).map((_, i) => ({
      question: `[${qt.type}] Sample question ${i + 1} for "${assignment.title}"`,
      difficulty: (["easy", "medium", "hard"] as const)[i % 3],
      marks: qt.marks,
    })),
  }));
  return {
    sections,
    metadata: {
      subject: assignment.title,
      className: "Grade 8",
      timeAllowed: "45 minutes",
      maxMarks: assignment.totalMarks,
      notes: "All questions are compulsory unless stated otherwise.",
    },
  };
}

async function generateStructuredPaper(assignment: IAssignment): Promise<AIPaper> {
  if (!openai) {
    log.warn("OPENAI_API_KEY missing — using mock paper");
    return mockAIPaper(assignment);
  }

  const completion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    temperature: 0.4,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You output only valid JSON for exam question papers. Never include markdown fences.",
      },
      { role: "user", content: buildPrompt(assignment) },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Empty AI response");

  const parsed = extractJsonFromText(content);
  const result = AIPaperSchema.safeParse(parsed);
  if (!result.success) {
    log.error("AI validation failed", result.error.flatten());
    throw new Error(`Malformed AI response: ${result.error.message}`);
  }
  return result.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF SERVICE (pdf-lib — fast, no browser, good for exam layouts)
// ─────────────────────────────────────────────────────────────────────────────
async function generateExamPdf(
  assignment: IAssignment,
  paper: IQuestionPaper,
): Promise<string> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  let page = doc.addPage([595, 842]);
  const { width, height } = page.getSize();
  let y = height - 50;
  const margin = 50;
  const lineHeight = 16;

  const draw = (text: string, size = 11, useBold = false) => {
    if (y < 60) {
      page = doc.addPage([595, 842]);
      y = height - 50;
    }
    page.drawText(text, {
      x: margin,
      y,
      size,
      font: useBold ? bold : font,
      color: rgb(0.1, 0.1, 0.1),
      maxWidth: width - margin * 2,
    });
    y -= lineHeight + (size > 12 ? 6 : 2);
  };

  draw(assignment.title, 18, true);
  draw(`Due: ${assignment.dueDate}`, 10);
  if (paper.metadata?.subject) draw(`Subject: ${paper.metadata.subject}`, 10);
  if (paper.metadata?.timeAllowed) draw(`Time: ${paper.metadata.timeAllowed}`, 10);
  if (paper.metadata?.maxMarks) draw(`Maximum Marks: ${paper.metadata.maxMarks}`, 10);
  y -= 8;
  draw("Name: ____________________    Roll No: ____________________", 10);
  y -= 10;

  for (const section of paper.sections) {
    draw(section.title, 14, true);
    draw(section.instruction, 10);
    if (section.heading) draw(section.heading, 11, true);
    section.questions.forEach((q, i) => {
      draw(
        `${i + 1}. [${q.difficulty}] (${q.marks} marks) ${q.question}`,
        10,
      );
    });
    y -= 8;
  }

  const bytes = await doc.save();
  const filePath = path.join(PDF_DIR, `${assignment._id}.pdf`);
  await fs.writeFile(filePath, bytes);
  return filePath;
}

// ─────────────────────────────────────────────────────────────────────────────
// BULLMQ
// ─────────────────────────────────────────────────────────────────────────────
const connection = { connection: redis };

export const AI_GENERATION_QUEUE = "AI_GENERATION_QUEUE";
export const PDF_GENERATION_QUEUE = "PDF_GENERATION_QUEUE";

const aiQueue = new Queue(AI_GENERATION_QUEUE, connection);
const pdfQueue = new Queue(PDF_GENERATION_QUEUE, connection);

async function updateAssignmentProgress(
  assignmentId: string,
  progress: number,
  message: string,
  status?: AssignmentStatus,
) {
  const update: Partial<IAssignment> = { progress, progressMessage: message };
  if (status) (update as IAssignment).status = status;

  await Assignment.findByIdAndUpdate(assignmentId, update);
  await cacheDel(`assignment:${assignmentId}*`);
  emitToAssignment(assignmentId, "generation_progress", { progress, message, status });
}

async function processAIGeneration(job: Job<{ assignmentId: string }>) {
  const { assignmentId } = job.data;
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) throw new Error("Assignment not found");

  await updateAssignmentProgress(assignmentId, 5, "Starting AI generation", "generating");
  emitToAssignment(assignmentId, "generation_started", { message: "Generation started" });

  await job.updateProgress(15);
  await updateAssignmentProgress(assignmentId, 15, "Analyzing uploaded material");

  await job.updateProgress(35);
  await updateAssignmentProgress(assignmentId, 35, "Drafting questions");

  const structured = await generateStructuredPaper(assignment);

  await job.updateProgress(70);
  await updateAssignmentProgress(assignmentId, 70, "Balancing difficulty & marks");

  const paper = await QuestionPaper.create({
    assignmentId: assignment._id,
    sections: structured.sections.map((s) => ({
      title: s.title,
      instruction: s.instruction,
      heading: s.heading,
      questions: s.questions.map((q) => ({
        question: q.question,
        difficulty: q.difficulty,
        marks: q.marks,
      })),
    })),
    metadata: structured.metadata ?? {},
    rawPrompt: buildPrompt(assignment),
  });

  assignment.status = "completed";
  assignment.progress = 100;
  assignment.progressMessage = "Generation complete";
  assignment.questionPaperId = paper._id as Types.ObjectId;
  await assignment.save();

  await cacheSet(`assignment:${assignmentId}`, serializeAssignment(assignment));
  await cacheSet(`paper:${assignmentId}`, serializePaper(paper));

  await job.updateProgress(100);
  emitToAssignment(assignmentId, "generation_completed", {
    progress: 100,
    message: "Generation complete",
    paperId: String(paper._id),
  });

  await pdfQueue.add(
    "generate-pdf",
    { assignmentId },
    { removeOnComplete: 100, removeOnFail: 50 },
  );

  return { paperId: String(paper._id) };
}

async function processPdfGeneration(job: Job<{ assignmentId: string }>) {
  const { assignmentId } = job.data;
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment?.questionPaperId) throw new Error("Question paper not found");

  const paper = await QuestionPaper.findById(assignment.questionPaperId);
  if (!paper) throw new Error("Question paper not found");

  const pdfPath = await generateExamPdf(assignment, paper);
  paper.pdfPath = pdfPath;
  await paper.save();
  return { pdfPath };
}

const aiWorker = new Worker(AI_GENERATION_QUEUE, processAIGeneration, {
  ...connection,
  concurrency: 2,
});

const pdfWorker = new Worker(PDF_GENERATION_QUEUE, processPdfGeneration, {
  ...connection,
  concurrency: 2,
});

aiWorker.on("failed", async (job, err) => {
  const assignmentId = job?.data?.assignmentId;
  if (!assignmentId) return;
  await Assignment.findByIdAndUpdate(assignmentId, {
    status: "failed",
    errorMessage: err.message,
    progressMessage: "Generation failed",
  });
  emitToAssignment(assignmentId, "generation_failed", { error: err.message });
  log.error("AI job failed", assignmentId, err.message);
});

pdfWorker.on("failed", (job, err) => {
  log.error("PDF job failed", job?.data?.assignmentId, err.message);
});

// ─────────────────────────────────────────────────────────────────────────────
// SERIALIZERS (API shape — matches frontend mockPaper where possible)
// ─────────────────────────────────────────────────────────────────────────────
function serializeAssignment(doc: IAssignment) {
  return {
    id: String(doc._id),
    title: doc.title,
    dueDate: doc.dueDate,
    assignedOn: doc.createdAt
      ? new Date(doc.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")
      : "",
    status: doc.status,
    progress: doc.progress,
    progressMessage: doc.progressMessage,
    totalQuestions: doc.totalQuestions,
    totalMarks: doc.totalMarks,
    questionPaperId: doc.questionPaperId ? String(doc.questionPaperId) : null,
    errorMessage: doc.errorMessage ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function serializePaper(doc: IQuestionPaper) {
  return {
    id: String(doc._id),
    assignmentId: String(doc.assignmentId),
    school: doc.metadata?.subject ?? "VedaAI Generated Paper",
    subject: doc.metadata?.subject ?? "General",
    className: doc.metadata?.className ?? "",
    timeAllowed: doc.metadata?.timeAllowed ?? "",
    maxMarks: doc.metadata?.maxMarks ?? 0,
    notes: doc.metadata?.notes ?? "",
    sections: doc.sections.map((s, idx) => ({
      id: String.fromCharCode(65 + idx),
      title: s.title,
      heading: s.heading ?? s.title,
      instructions: s.instruction,
      questions: s.questions.map((q) => ({
        text: q.question,
        difficulty: q.difficulty,
        marks: q.marks,
      })),
    })),
    pdfAvailable: Boolean(doc.pdfPath && existsSync(doc.pdfPath)),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FILE UPLOAD (multer — local disk; swap to S3/Cloudinary in production)
// ─────────────────────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype) || file.originalname.endsWith(".txt")) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF or text files allowed"));
    }
  },
});

async function extractTextFromFile(filePath: string, mimetype: string): Promise<string> {
  if (mimetype === "text/plain" || filePath.endsWith(".txt")) {
    return fs.readFile(filePath, "utf-8");
  }
  if (mimetype === "application/pdf" || filePath.endsWith(".pdf")) {
    try {
      const pdfParse = (await import("pdf-parse")).default;
      const buffer = await fs.readFile(filePath);
      const data = await pdfParse(buffer);
      return data.text ?? "";
    } catch {
      log.warn("pdf-parse failed; continuing without extracted text");
      return "";
    }
  }
  return "";
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPRESS APP
// ─────────────────────────────────────────────────────────────────────────────
const app = express();
const httpServer = http.createServer(app);

io = new SocketServer(httpServer, {
  cors: {
    origin: CORS_ORIGIN.split(",").map((s) => s.trim()),
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  log.info("Socket connected", socket.id);

  socket.on("join_assignment", (assignmentId: string) => {
    if (!assignmentId) return;
    socket.join(assignmentRoom(assignmentId));
    log.info(`Socket ${socket.id} joined ${assignmentRoom(assignmentId)}`);
  });

  socket.on("leave_assignment", (assignmentId: string) => {
    socket.leave(assignmentRoom(assignmentId));
  });
});

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: CORS_ORIGIN.split(",").map((s) => s.trim()),
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// ─────────────────────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    env: NODE_ENV,
    mongo: mongoose.connection.readyState === 1,
    redis: redis.status === "ready",
    openai: Boolean(openai),
  });
});

/** POST /api/assignments — create assignment (multipart optional file) */
app.post(
  "/api/assignments",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let body: z.infer<typeof CreateAssignmentBodySchema>;
      if (req.body.questionTypes && typeof req.body.questionTypes === "string") {
        req.body.questionTypes = JSON.parse(req.body.questionTypes);
      }
      body = CreateAssignmentBodySchema.parse(req.body);

      let uploadedText = "";
      let uploadedFilePath: string | undefined;
      let uploadedFileName: string | undefined;

      if (req.file) {
        uploadedFilePath = req.file.path;
        uploadedFileName = req.file.originalname;
        uploadedText = await extractTextFromFile(req.file.path, req.file.mimetype);
      }

      const totalQuestions = body.questionTypes.reduce((s, q) => s + q.count, 0);
      const totalMarks = body.questionTypes.reduce((s, q) => s + q.count * q.marks, 0);

      const assignment = await Assignment.create({
        title: body.title,
        dueDate: body.dueDate,
        instructions: body.instructions,
        additionalInfo: body.additionalInfo,
        questionTypes: body.questionTypes,
        totalQuestions,
        totalMarks,
        status: "draft",
        uploadedFilePath,
        uploadedFileName,
        uploadedText,
      });

      res.status(201).json({
        success: true,
        data: serializeAssignment(assignment),
      });
    } catch (err) {
      next(err);
    }
  },
);

/** GET /api/assignments */
app.get("/api/assignments", async (_req, res, next) => {
  try {
    const cached = await cacheGet<{ items: ReturnType<typeof serializeAssignment>[] }>(
      "assignments:list",
    );
    if (cached) return res.json({ success: true, data: cached.items, cached: true });

    const items = await Assignment.find().sort({ createdAt: -1 }).limit(50);
    const serialized = items.map(serializeAssignment);
    await cacheSet("assignments:list", { items: serialized }, 60);
    res.json({ success: true, data: serialized });
  } catch (err) {
    next(err);
  }
});

/** GET /api/assignments/:id */
app.get("/api/assignments/:id", async (req, res, next) => {
  try {
    const cacheKey = `assignment:${req.params.id}`;
    const cached = await cacheGet<ReturnType<typeof serializeAssignment>>(cacheKey);
    if (cached) return res.json({ success: true, data: cached, cached: true });

    const doc = await Assignment.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Assignment not found" });

    const data = serializeAssignment(doc);
    await cacheSet(cacheKey, data);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

/** GET /api/assignments/:id/status */
app.get("/api/assignments/:id/status", async (req, res, next) => {
  try {
    const doc = await Assignment.findById(req.params.id).select(
      "status progress progressMessage errorMessage questionPaperId",
    );
    if (!doc) return res.status(404).json({ success: false, message: "Assignment not found" });

    res.json({
      success: true,
      data: {
        id: String(doc._id),
        status: doc.status,
        progress: doc.progress,
        message: doc.progressMessage,
        errorMessage: doc.errorMessage ?? null,
        questionPaperId: doc.questionPaperId ? String(doc.questionPaperId) : null,
      },
    });
  } catch (err) {
    next(err);
  }
});

/** GET /api/assignments/:id/paper */
app.get("/api/assignments/:id/paper", async (req, res, next) => {
  try {
    const cached = await cacheGet(`paper:${req.params.id}`);
    if (cached) return res.json({ success: true, data: cached, cached: true });

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment?.questionPaperId) {
      return res.status(404).json({ success: false, message: "Paper not generated yet" });
    }
    const paper = await QuestionPaper.findById(assignment.questionPaperId);
    if (!paper) return res.status(404).json({ success: false, message: "Paper not found" });

    const data = serializePaper(paper);
    await cacheSet(`paper:${req.params.id}`, data);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

/** POST /api/assignments/:id/generate — enqueue AI job */
app.post("/api/assignments/:id/generate", async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }
    if (assignment.status === "generating" || assignment.status === "queued") {
      return res.status(409).json({
        success: false,
        message: "Generation already in progress",
        data: serializeAssignment(assignment),
      });
    }

    assignment.status = "queued";
    assignment.progress = 0;
    assignment.progressMessage = "Queued for generation";
    assignment.errorMessage = undefined;
    await assignment.save();
    await cacheDel("assignments:list");
    await cacheDel(`assignment:${req.params.id}*`);

    const job = await aiQueue.add(
      "generate-ai-paper",
      { assignmentId: String(assignment._id) },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 3000 },
        removeOnComplete: 100,
        removeOnFail: 50,
      },
    );

    res.status(202).json({
      success: true,
      message: "Generation queued",
      data: {
        assignment: serializeAssignment(assignment),
        jobId: job.id,
      },
    });
  } catch (err) {
    next(err);
  }
});

/** GET /api/assignments/:id/pdf — download generated PDF */
app.get("/api/assignments/:id/pdf", async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment?.questionPaperId) {
      return res.status(404).json({ success: false, message: "No paper for this assignment" });
    }
    const paper = await QuestionPaper.findById(assignment.questionPaperId);
    if (!paper?.pdfPath || !existsSync(paper.pdfPath)) {
      return res.status(404).json({
        success: false,
        message: "PDF not ready yet. Wait a few seconds after generation completes.",
      });
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="vedaai-${assignment._id}.pdf"`,
    );
    createReadStream(paper.pdfPath).pipe(res);
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// ERROR HANDLING
// ─────────────────────────────────────────────────────────────────────────────
class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.flatten(),
    });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }
  if (err.message?.includes("Only PDF")) {
    return res.status(400).json({ success: false, message: err.message });
  }
  log.error(err);
  res.status(500).json({
    success: false,
    message: NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// BOOTSTRAP
// ─────────────────────────────────────────────────────────────────────────────
async function bootstrap() {
  await mongoose.connect(MONGODB_URI);
  log.info("MongoDB connected");

  httpServer.listen(PORT, () => {
    log.info(`VedaAI API + WebSocket running on http://localhost:${PORT}`);
    log.info(`CORS origins: ${CORS_ORIGIN}`);
    if (!openai) log.warn("Set OPENAI_API_KEY for real AI generation");
  });
}

bootstrap().catch((err) => {
  log.error("Failed to start server", err);
  process.exit(1);
});

export default app;
