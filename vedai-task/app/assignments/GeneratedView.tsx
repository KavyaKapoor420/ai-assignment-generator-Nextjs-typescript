"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import { useAssignmentSocket } from "@/hooks/useAssignmentSocket";
import { getGeneratedPaper } from "@/lib/api";

const steps = [
  "Analyzing uploaded material",
  "Drafting questions",
  "Balancing difficulty & marks",
  "Compiling final paper",
];

export function GeneratingView() {
  const router = useRouter();
  const { activeAssignmentId, setGeneratedPaper } = useAssignmentStore();
  const { progress, message, completed, failed, error } =
    useAssignmentSocket(activeAssignmentId);

  const displayProgress = progress > 0 ? progress : 8;
  const activeStep = Math.min(
    steps.length - 1,
    Math.floor((displayProgress / 100) * steps.length),
  );

  useEffect(() => {
    if (!completed || !activeAssignmentId) return;
    (async () => {
      try {
        const paper = await getGeneratedPaper(activeAssignmentId);
        setGeneratedPaper(paper);
        router.push("/assignments/output");
      } catch {
        router.push("/assignments/output");
      }
    })();
  }, [completed, activeAssignmentId, router, setGeneratedPaper]);

  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-brand/10 grid place-items-center">
        <Sparkles className="h-9 w-9 text-brand animate-pulse" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold">Generating your assessment…</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {message || "Our AI is preparing high-quality questions tailored to your inputs."}
      </p>

      {failed && (
        <p className="mt-4 text-sm text-destructive">{error ?? "Generation failed"}</p>
      )}

      <div className="mt-8 h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{Math.round(displayProgress)}%</p>

      <ul className="mt-10 space-y-3 text-left max-w-md mx-auto">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition ${
              i <= activeStep ? "opacity-100" : "opacity-50"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                i < activeStep
                  ? "bg-emerald-500"
                  : i === activeStep
                    ? "bg-brand animate-pulse"
                    : "bg-border"
              }`}
            />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
