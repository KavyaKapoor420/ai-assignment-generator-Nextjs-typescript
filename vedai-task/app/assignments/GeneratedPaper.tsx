import { Download, RefreshCw } from "lucide-react";
import { mockPaper } from "../data/mockAssignments";

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
  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="rounded-2xl bg-primary text-primary-foreground p-5 flex items-start justify-between gap-4">
        <p className="text-sm md:text-base font-medium">
          Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science
          classes on the NCERT chapters.
        </p>
        <button className="shrink-0 inline-flex items-center gap-2 rounded-full bg-card text-foreground px-4 py-2 text-sm font-medium hover:opacity-95 transition">
          <Download className="h-4 w-4" /> Download as PDF
        </button>
      </div>

      <article className="mt-4 rounded-2xl bg-card border border-border p-6 md:p-10">
        <header className="text-center">
          <h1 className="text-xl md:text-2xl font-bold">{mockPaper.school}</h1>
          <p className="mt-1 text-base">Subject: {mockPaper.subject}</p>
          <p className="text-base">Class: {mockPaper.className}</p>
        </header>

        <div className="mt-6 flex flex-wrap items-center justify-between text-sm">
          <span>Time Allowed: {mockPaper.timeAllowed}</span>
          <span>Maximum Marks: {mockPaper.maxMarks}</span>
        </div>
        <p className="mt-3 text-sm">{mockPaper.notes}</p>

        <div className="mt-6 grid gap-2 text-sm">
          <div>Name: ______________________________</div>
          <div>Roll Number: ________________________</div>
          <div>Class: 5th Section: _______________</div>
        </div>

        {mockPaper.sections.map((section) => (
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

            <p className="mt-4 font-semibold text-sm">End of Question Paper</p>
          </section>
        ))}

        <section className="mt-10">
          <h2 className="font-semibold">Answer Key:</h2>
          <ol className="mt-2 space-y-2 list-decimal pl-5 text-sm">
            {mockPaper.answerKey.map((a, i) => (
              <li key={i} className="leading-relaxed">
                {a}
              </li>
            ))}
          </ol>
        </section>
      </article>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
        <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm hover:bg-secondary transition">
          <RefreshCw className="h-4 w-4" /> Regenerate
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-95 transition">
          <Download className="h-4 w-4" /> Export PDF
        </button>
      </div>
    </div>
  );
}