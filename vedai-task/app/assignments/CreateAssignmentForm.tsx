// import { useNavigate } from "@tanstack/react-router";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Mic, Plus, UploadCloud } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import { QuestionTypeRowItem } from "./QuestionTypeRow";
// import { QuestionTypeRowItem } from "./QuestionTypeRow";

export function CreateAssignmentForm() {
//   const navigate = useNavigate();
const router = useRouter();
  const { draft, setField, addQuestionType } = useAssignmentStore();
  const totalQuestions = draft.questionTypes.reduce((s, q) => s + q.count, 0);
  const totalMarks = draft.questionTypes.reduce((s, q) => s + q.count * q.marks, 0);

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="rounded-2xl bg-card border border-border px-5 py-4 flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <div>
          <h1 className="text-lg font-semibold">Create Assignment</h1>
          <p className="text-sm text-muted-foreground">
            Set up a new assignment for your students
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="h-1 flex-1 rounded-full bg-foreground" />
        <div className="h-1 flex-1 rounded-full bg-border" />
        <div className="h-1 flex-1 rounded-full bg-border" />
      </div>

      <section className="mt-6 rounded-2xl bg-card border border-border p-6 md:p-8">
        <h2 className="text-lg font-semibold">Assignment Details</h2>
        <p className="text-sm text-muted-foreground">
          Basic information about your assignment
        </p>

        <label className="block mt-6">
          <span className="sr-only">Assignment title</span>
          <input
            type="text"
            placeholder="Assignment title"
            value={draft.title}
            onChange={(e) => setField("title", e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </label>

        <div className="mt-4 rounded-2xl border-2 border-dashed border-border bg-secondary/40 p-8 text-center">
          <UploadCloud className="mx-auto h-7 w-7 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">Choose a file or drag &amp; drop it here</p>
          <p className="mt-1 text-xs text-muted-foreground">JPEG, PNG, upto 10MB</p>
          <button className="mt-4 inline-flex rounded-full border border-border bg-card px-5 py-2 text-sm hover:bg-secondary transition">
            Browse Files
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Upload images of your preferred document/image
        </p>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Due Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="DD-MM-YYYY"
              value={draft.dueDate}
              onChange={(e) => setField("dueDate", e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 pr-12"
            />
            <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground mb-2">
            <div className="col-span-12 md:col-span-6">Question Type</div>
            <div className="hidden md:block md:col-span-3 text-center">No. of Questions</div>
            <div className="hidden md:block md:col-span-3 text-center">Marks</div>
          </div>
          <div className="space-y-3">
            {draft.questionTypes.map((row) => (
              <QuestionTypeRowItem key={row.id} row={row} />
            ))}
          </div>

          <button
            onClick={addQuestionType}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80"
          >
            <span className="h-6 w-6 grid place-items-center rounded-full bg-primary text-primary-foreground">
              <Plus className="h-3.5 w-3.5" />
            </span>
            Add Question Type
          </button>

          <div className="mt-4 flex justify-end gap-6 text-sm">
            <span>
              Total Questions : <strong>{totalQuestions}</strong>
            </span>
            <span>
              Total Marks : <strong>{totalMarks}</strong>
            </span>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Additional Information{" "}
            <span className="text-muted-foreground font-normal">(For better output)</span>
          </label>
          <div className="relative">
            <textarea
              rows={3}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              value={draft.additionalInfo}
              onChange={(e) => setField("additionalInfo", e.target.value)}
              className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 pr-12"
            />
            <button
              className="absolute right-3 bottom-3 h-8 w-8 grid place-items-center rounded-full hover:bg-secondary"
              aria-label="Voice input"
            >
              <Mic className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </section>

      <div className="mt-6 flex items-center justify-between">
        <button
        //   onClick={() => navigate({ to: "/assignments" })}
           onClick={() => router.push("/assignments")}
          className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-5 py-2.5 text-sm hover:bg-secondary transition"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>
        <button
        //   onClick={() => navigate({ to: "/assignments/generating" })}
          onClick={() => router.push("/assignments/generating")}
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-95 transition"
        >
          Next <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}