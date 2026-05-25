"use client";

import { useRouter } from "next/navigation";
import { useAssignmentStore } from "@/store/assignmentStore";
import { pdfDownloadUrl, triggerGeneration } from "@/lib/api";

const T = {
  bgPage: "#EFEFEF",
  bgCard: "#FFFFFF",
  textPrimary: "#2B2B2B",
  textSecondary: "#8C8C8C",
  textMuted: "#A7A7A7",
  accentOrange: "#FF6A2A",
  borderLight: "#E6E6E6",
  buttonRadius: "999px",
};

function DifficultyBadge({ level }) {
  const styles = {
    Easy: { bg: "#d1fae5", color: "#047857" },
    Moderate: { bg: "#fef3c7", color: "#b45309" },
    Challenging: { bg: "#ffe4e6", color: "#be123c" },
  };
  const s = styles[level] ?? { bg: "#f3f4f6", color: T.textSecondary };
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "11px",
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: "999px",
        background: s.bg,
        color: s.color,
        marginRight: "6px",
      }}
    >
      {level}
    </span>
  );
}

export default function GeneratedOutput() {
  const router = useRouter();
  const { generatedPaper, activeAssignmentId, assignmentTitle } =
    useAssignmentStore();

  if (!generatedPaper) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: T.bgPage,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: T.textSecondary }}>No generated paper yet.</p>
          <button
            onClick={() => router.push("/assignments/create")}
            style={{
              marginTop: "16px",
              padding: "12px 24px",
              borderRadius: T.buttonRadius,
              border: "none",
              background: T.textPrimary,
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Create Assignment
          </button>
        </div>
      </div>
    );
  }

  const paper = generatedPaper;

  const handleDownload = () => {
    if (activeAssignmentId) window.open(pdfDownloadUrl(activeAssignmentId), "_blank");
  };

  const handleRegenerate = async () => {
    if (!activeAssignmentId) return;
    await triggerGeneration(activeAssignmentId);
    router.push("/assignments/generating");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bgPage,
        fontFamily: "'Inter', sans-serif",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            background: T.textPrimary,
            color: "#fff",
            borderRadius: "16px",
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", flex: 1 }}>
            Your question paper for &quot;{assignmentTitle || paper.subject}&quot; is ready.
          </p>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!activeAssignmentId}
            style={{
              padding: "10px 18px",
              borderRadius: T.buttonRadius,
              border: "none",
              background: "#fff",
              color: T.textPrimary,
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Download PDF
          </button>
        </div>

        <article
          style={{
            marginTop: "16px",
            background: T.bgCard,
            borderRadius: "20px",
            padding: "32px",
            border: `1px solid ${T.borderLight}`,
          }}
        >
          <header style={{ textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700 }}>{paper.school}</h1>
            <p style={{ margin: "8px 0 0", fontSize: "15px" }}>Subject: {paper.subject}</p>
            <p style={{ margin: "4px 0 0", fontSize: "15px" }}>Class: {paper.className}</p>
          </header>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span>Time Allowed: {paper.timeAllowed}</span>
            <span>Maximum Marks: {paper.maxMarks}</span>
          </div>
          <p style={{ marginTop: "12px", fontSize: "14px", color: T.textSecondary }}>
            {paper.notes}
          </p>

          <div style={{ marginTop: "20px", fontSize: "14px", lineHeight: 1.8 }}>
            <div>Name: ______________________________</div>
            <div>Roll Number: ________________________</div>
            <div>Section: ____________________________</div>
          </div>

          {paper.sections.map((section) => (
            <section key={section.id} style={{ marginTop: "32px" }}>
              <h2 style={{ textAlign: "center", fontSize: "18px", fontWeight: 700 }}>
                {section.title}
              </h2>
              <h3 style={{ marginTop: "16px", fontSize: "15px", fontWeight: 700 }}>
                {section.heading}
              </h3>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "13px",
                  fontStyle: "italic",
                  color: T.textSecondary,
                }}
              >
                {section.instructions}
              </p>
              <ol style={{ marginTop: "12px", paddingLeft: "20px", fontSize: "14px" }}>
                {section.questions.map((q, i) => (
                  <li key={i} style={{ marginBottom: "10px", lineHeight: 1.5 }}>
                    <DifficultyBadge level={q.difficulty} />
                    {q.text}{" "}
                    <span style={{ color: T.textMuted }}>[{q.marks} Marks]</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}

          <p style={{ marginTop: "24px", fontWeight: 700, fontSize: "14px" }}>
            End of Question Paper
          </p>
        </article>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={!activeAssignmentId}
            style={{
              padding: "12px 22px",
              borderRadius: T.buttonRadius,
              border: `1.5px solid ${T.borderLight}`,
              background: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Regenerate
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!activeAssignmentId}
            style={{
              padding: "12px 26px",
              borderRadius: T.buttonRadius,
              border: "none",
              background: T.textPrimary,
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
