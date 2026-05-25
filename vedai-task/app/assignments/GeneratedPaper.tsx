"use client";

import { Download, RefreshCw } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import { mockPaper } from "../data/mockAssignments";
import { pdfDownloadUrl, triggerGeneration } from "@/lib/api";

function DifficultyBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-700",
    Moderate: "bg-amber-100 text-amber-700",
    Challenging: "bg-rose-100 text-rose-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
        styles[level] ?? "bg-secondary text-muted-foreground"
      }`}
    >
      {level}
    </span>
  );
}

export function GeneratedPaper() {
  const { generatedPaper, activeAssignmentId, draft } = useAssignmentStore();
  const paper = generatedPaper ?? {
    school: mockPaper.school,
    subject: mockPaper.subject,
    className: mockPaper.className,
    timeAllowed: mockPaper.timeAllowed,
    maxMarks: mockPaper.maxMarks,
    notes: mockPaper.notes,
    sections: mockPaper.sections.map((s) => ({
      id: s.id,
      title: s.title,
      heading: s.heading,
      instructions: s.instructions,
      questions: s.questions.map((q) => ({
        text: q.text,
        difficulty: q.difficulty,
        marks: q.marks,
      })),
    })),
    pdfAvailable: false,
  };

  const handleDownload = () => {
    if (activeAssignmentId) {
      window.open(pdfDownloadUrl(activeAssignmentId), "_blank");
    }
  };

  const handleRegenerate = async () => {
    if (!activeAssignmentId) return;
    await triggerGeneration(activeAssignmentId);
    window.location.href = "/assignments/generating";
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="rounded-2xl bg-primary text-primary-foreground p-5 flex items-start justify-between gap-4">
        <p className="text-sm md:text-base font-medium">
          Your question paper for &quot;{draft.title || paper.subject}&quot; is ready.
        </p>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!activeAssignmentId}
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-card text-foreground px-4 py-2 text-sm font-medium hover:opacity-95 transition disabled:opacity-50"
        >
          <Download className="h-4 w-4" /> Download as PDF
        </button>
      </div>

      <article className="mt-4 rounded-2xl bg-card border border-border p-6 md:p-10">
        <header className="text-center">
          <h1 className="text-xl md:text-2xl font-bold">{paper.school}</h1>
          <p className="mt-1 text-base">Subject: {paper.subject}</p>
          <p className="text-base">Class: {paper.className}</p>
        </header>

        <div className="mt-6 flex flex-wrap items-center justify-between text-sm">
          <span>Time Allowed: {paper.timeAllowed}</span>
          <span>Maximum Marks: {paper.maxMarks}</span>
        </div>
        <p className="mt-3 text-sm">{paper.notes}</p>

        <div className="mt-6 grid gap-2 text-sm">
          <div>Name: ______________________________</div>
          <div>Roll Number: ________________________</div>
          <div>Class: 5th Section: _______________</div>
        </div>

        {paper.sections.map((section) => (
          <section key={section.id} className="mt-10">
            <h2 className="text-center text-lg font-semibold">{section.title}</h2>
            <h3 className="mt-4 font-semibold">{section.heading}</h3>
            <p className="text-sm italic text-muted-foreground">{section.instructions}</p>

            <ol className="mt-3 space-y-2 list-decimal pl-5 text-sm">
              {section.questions.map((q, i) => (
                <li key={i} className="leading-relaxed">
                  <DifficultyBadge level={q.difficulty} />{" "}
                  <span className="ml-1">{q.text}</span>{" "}
                  <span className="text-muted-foreground">[{q.marks} Marks]</span>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <p className="mt-4 font-semibold text-sm">End of Question Paper</p>
      </article>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
        <button
          type="button"
          onClick={handleRegenerate}
          disabled={!activeAssignmentId}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm hover:bg-secondary transition disabled:opacity-50"
        >
          <RefreshCw className="h-4 w-4" /> Regenerate
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!activeAssignmentId}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-95 transition disabled:opacity-50"
        >
          <Download className="h-4 w-4" /> Export PDF
        </button>
      </div>
    </div>
  );
}
