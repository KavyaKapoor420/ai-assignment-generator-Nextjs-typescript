"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAssignmentStore } from "@/store/assignmentStore";
import { useAssignmentSocket } from "@/hooks/useAssignmentSocket";
import { getGeneratedPaper } from "@/lib/api";

const T = {
  bgPage: "#EFEFEF",
  bgCard: "#FFFFFF",
  textPrimary: "#2B2B2B",
  textSecondary: "#8C8C8C",
  accentOrange: "#FF6A2A",
  borderLight: "#E6E6E6",
};

const steps = [
  "Analyzing uploaded material",
  "Drafting questions",
  "Balancing difficulty & marks",
  "Compiling final paper",
];

export default function GeneratingAssignment() {
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
    if (!activeAssignmentId) {
      router.replace("/assignments/create");
      return;
    }
  }, [activeAssignmentId, router]);

  useEffect(() => {
    if (!completed || !activeAssignmentId) return;
    (async () => {
      try {
        const paper = await getGeneratedPaper(activeAssignmentId);
        setGeneratedPaper(paper);
      } catch {
        /* output page can show retry */
      }
      router.push("/assignments/output");
    })();
  }, [completed, activeAssignmentId, router, setGeneratedPaper]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bgPage,
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,106,42,0.12)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          ✨
        </div>
        <h1
          style={{
            margin: "24px 0 8px",
            fontSize: "22px",
            fontWeight: 700,
            color: T.textPrimary,
          }}
        >
          Generating your assessment…
        </h1>
        <p style={{ margin: 0, fontSize: "14px", color: T.textSecondary }}>
          {message || "AI is preparing questions tailored to your inputs."}
        </p>
        {failed && (
          <p style={{ marginTop: "12px", fontSize: "14px", color: "#c0392b" }}>
            {error ?? "Generation failed. Check backend & Redis."}
          </p>
        )}

        <div
          style={{
            marginTop: "28px",
            height: "8px",
            borderRadius: "999px",
            background: "#ddd",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${displayProgress}%`,
              background: T.textPrimary,
              transition: "width 0.15s",
            }}
          />
        </div>
        <p style={{ marginTop: "8px", fontSize: "12px", color: T.textSecondary }}>
          {Math.round(displayProgress)}%
        </p>

        <ul
          style={{
            marginTop: "32px",
            listStyle: "none",
            padding: 0,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {steps.map((s, i) => (
            <li
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                background: T.bgCard,
                borderRadius: "12px",
                border: `1px solid ${T.borderLight}`,
                opacity: i <= activeStep ? 1 : 0.5,
                fontSize: "14px",
                color: T.textPrimary,
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background:
                    i < activeStep
                      ? "#39C86A"
                      : i === activeStep
                        ? T.accentOrange
                        : "#ddd",
                  flexShrink: 0,
                }}
              />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
