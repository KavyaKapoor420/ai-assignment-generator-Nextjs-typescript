import { Minus, Plus, X } from "lucide-react";
import { QUESTION_TYPES, useAssignmentStore } from "@/store/assignmentStore";
import type { QuestionTypeRow as Row } from "@/store/assignmentStore";

function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="h-9 w-9 grid place-items-center hover:bg-secondary rounded-l-full transition"
        aria-label="Decrease"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="h-9 w-9 grid place-items-center hover:bg-secondary rounded-r-full transition"
        aria-label="Increase"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function QuestionTypeRowItem({ row }: { row: Row }) {
  const { updateQuestionType, removeQuestionType } = useAssignmentStore();
  return (
    <div className="grid grid-cols-12 gap-3 items-center">
      <div className="col-span-12 md:col-span-6">
        <div className="relative">
          <select
            value={row.type}
            onChange={(e) => updateQuestionType(row.id, { type: e.target.value })}
            className="w-full appearance-none rounded-full border border-border bg-card px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeQuestionType(row.id)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Remove row"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="col-span-6 md:col-span-3 flex justify-start md:justify-center">
        <Stepper value={row.count} onChange={(n) => updateQuestionType(row.id, { count: n })} />
      </div>
      <div className="col-span-6 md:col-span-3 flex justify-end md:justify-center">
        <Stepper value={row.marks} onChange={(n) => updateQuestionType(row.id, { marks: n })} />
      </div>
    </div>
  );
}