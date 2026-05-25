const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export type QuestionTypeInput = {
  type: string;
  count: number;
  marks: number;
};

export type CreateAssignmentPayload = {
  title: string;
  dueDate: string;
  questionTypes: QuestionTypeInput[];
  additionalInfo?: string;
  instructions?: string;
  file?: File | null;
};

export type AssignmentResponse = {
  id: string;
  title: string;
  dueDate: string;
  assignedOn: string;
  status: string;
  progress: number;
  progressMessage: string;
  totalQuestions: number;
  totalMarks: number;
  questionPaperId: string | null;
  errorMessage: string | null;
};

export type PaperSection = {
  id: string;
  title: string;
  heading: string;
  instructions: string;
  questions: { text: string; difficulty: string; marks: number }[];
};

export type PaperResponse = {
  id: string;
  assignmentId: string;
  school: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maxMarks: number;
  notes: string;
  sections: PaperSection[];
  pdfAvailable: boolean;
};

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<{ success: boolean; data?: T; message?: string }> {
  const res = await fetch(`${API_BASE}${path}`, init);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message ?? `Request failed (${res.status})`);
  }
  return json;
}

export async function createAssignment(
  payload: CreateAssignmentPayload,
): Promise<AssignmentResponse> {
  const form = new FormData();
  form.append("title", payload.title);
  form.append("dueDate", payload.dueDate);
  form.append("additionalInfo", payload.additionalInfo ?? "");
  form.append("instructions", payload.instructions ?? "");
  form.append("questionTypes", JSON.stringify(payload.questionTypes));
  if (payload.file) form.append("file", payload.file);

  const json = await request<AssignmentResponse>("/assignments", {
    method: "POST",
    body: form,
  });
  return json.data!;
}

export async function listAssignments(): Promise<AssignmentResponse[]> {
  const json = await request<AssignmentResponse[]>("/assignments");
  return json.data ?? [];
}

export async function getAssignment(id: string): Promise<AssignmentResponse> {
  const json = await request<AssignmentResponse>(`/assignments/${id}`);
  return json.data!;
}

export async function getAssignmentStatus(id: string) {
  const json = await request<{
    status: string;
    progress: number;
    message: string;
    questionPaperId: string | null;
  }>(`/assignments/${id}/status`);
  return json.data!;
}

export async function triggerGeneration(id: string) {
  return request<{ assignment: AssignmentResponse; jobId: string }>(
    `/assignments/${id}/generate`,
    { method: "POST" },
  );
}

export async function getGeneratedPaper(id: string): Promise<PaperResponse> {
  const json = await request<PaperResponse>(`/assignments/${id}/paper`);
  return json.data!;
}

export function pdfDownloadUrl(assignmentId: string) {
  return `${API_BASE}/assignments/${assignmentId}/pdf`;
}
