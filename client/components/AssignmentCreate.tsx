// // import { createFileRoute, useNavigate } from "@tanstack/react-router";
// "use client";

// import { useRouter } from "next/navigation";

// import React, { useState } from "react";
// import {AppShell} from './veda/AppShell'
// import {T} from './veda/tokens'
// import {
//   IcUpload, IcCalendar, IcPlus, IcMinus, IcChevronDown, IcMic, IcX,
// } from "@/components/veda/icons";

// // export const Route = createFileRoute("/assignments/create")({
// //   component: CreateAssignment,
// // });

// const QUESTION_OPTIONS = [
//   "Multiple Choice Questions",
//   "Short Questions",
//   "Long Questions",
//   "Diagram/Graph-Based Questions",
//   "Numerical Problems",
//   "True/False",
// ];

// interface QRow { id: number; type: string; count: number; marks: number; }

// export const  CreateAssignment() {
//   // const navigate = useNavigate();
//   const router = useRouter();
//   const [dueDate, setDueDate] = useState("");
//   const [info, setInfo] = useState("");
//   const [rows, setRows] = useState<QRow[]>([
//     { id: 1, type: "Multiple Choice Questions", count: 4, marks: 1 },
//     { id: 2, type: "Short Questions", count: 3, marks: 2 },
//     { id: 3, type: "Diagram/Graph-Based Questions", count: 5, marks: 5 },
//     { id: 4, type: "Numerical Problems", count: 5, marks: 5 },
//   ]);

//   const totalQ = rows.reduce((s, r) => s + r.count, 0);
//   const totalM = rows.reduce((s, r) => s + r.count * r.marks, 0);

//   const updateRow = (id: number, patch: Partial<QRow>) =>
//     setRows(rs => rs.map(r => (r.id === id ? { ...r, ...patch } : r)));
//   const removeRow = (id: number) => setRows(rs => rs.filter(r => r.id !== id));
//   const addRow = () => setRows(rs => [...rs, { id: Date.now(), type: QUESTION_OPTIONS[0], count: 1, marks: 1 }]);

//   return (
//       <AppShell
//       breadcrumb="Assignment"
//       onBack={() => router.push("/")}
//     >
//       <div style={{
//         flex: 1, background: "#EBEBEB", borderRadius: "18px",
//         padding: "22px 24px", display: "flex", flexDirection: "column",
//         gap: "18px", overflow: "auto",
//       }}>
//         {/* Header */}
//         <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
//           <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: T.successGreen, marginTop: "8px" }} />
//           <div style={{ flex: 1 }}>
//             <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: T.textPrimary, letterSpacing: "-0.2px" }}>Create Assignment</h1>
//             <p style={{ margin: "2px 0 0", fontSize: "13px", color: T.textSecondary }}>Set up a new assignment for your students</p>
//             {/* Progress bar */}
//             <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
//               <div style={{ flex: 1, height: "4px", borderRadius: "999px", background: "#2B2B2B" }} />
//               <div style={{ flex: 1, height: "4px", borderRadius: "999px", background: "#D6D6D6" }} />
//             </div>
//           </div>
//         </div>

//         {/* Form Card */}
//         <div style={{
//           background: "#fff", borderRadius: "24px", padding: "28px",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
//           display: "flex", flexDirection: "column", gap: "22px",
//         }}>
//           <div>
//             <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: T.textPrimary }}>Assignment Details</h2>
//             <p style={{ margin: "4px 0 0", fontSize: "13px", color: T.textSecondary }}>Basic information about your assignment</p>
//           </div>

//           {/* Upload */}
//           <div>
//             <div style={{
//               border: "1.5px dashed #D5D5D5", borderRadius: "18px",
//               padding: "32px 16px", display: "flex", flexDirection: "column",
//               alignItems: "center", gap: "10px", background: "#FAFAFA",
//             }}>
//               <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#fff", border: "1px solid #EEE", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <IcUpload size={22} color={T.textSecondary} />
//               </div>
//               <div style={{ fontSize: "15px", fontWeight: 600, color: T.textPrimary }}>Choose a file or drag &amp; drop it here</div>
//               <div style={{ fontSize: "12px", color: T.textMuted }}>JPEG, PNG, upto 10MB</div>
//               <button style={{
//                 marginTop: "6px", padding: "8px 20px", borderRadius: "999px",
//                 border: "1px solid #E2E2E2", background: "#fff",
//                 fontSize: "13px", fontWeight: 600, color: T.textPrimary, cursor: "pointer",
//               }}>Browse Files</button>
//             </div>
//             <p style={{ margin: "8px 0 0", fontSize: "12px", color: T.textMuted, textAlign: "center" }}>
//               Upload images of your preferred document/image
//             </p>
//           </div>

//           {/* Due Date */}
//           <div>
//             <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: T.textPrimary, marginBottom: "8px" }}>Due Date</label>
//             <div style={{
//               display: "flex", alignItems: "center",
//               border: "1px solid #E6E6E6", borderRadius: "14px",
//               padding: "12px 16px", background: "#FBFBFB",
//             }}>
//               <input value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="DD-MM-YYYY"
//                 style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "14px", color: T.textPrimary }} />
//               <IcCalendar size={18} color={T.textSecondary} />
//             </div>
//           </div>

//           {/* Question Type Header */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px", gap: "16px", alignItems: "center" }}>
//             <span style={{ fontSize: "14px", fontWeight: 600, color: T.textPrimary, textDecoration: "underline", textUnderlineOffset: "3px" }}>Question Type</span>
//             <span style={{ fontSize: "13px", color: T.textSecondary, textAlign: "center" }}>No. of Questions</span>
//             <span style={{ fontSize: "13px", color: T.textSecondary, textAlign: "center" }}>Marks</span>
//           </div>

//           {/* Question Rows */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//             {rows.map(row => (
//               <div key={row.id} style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px", gap: "16px", alignItems: "center" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                   <div style={{ flex: 1, position: "relative" }}>
//                     <select
//                       value={row.type}
//                       onChange={e => updateRow(row.id, { type: e.target.value })}
//                       style={{
//                         width: "100%", appearance: "none",
//                         border: "1px solid #E6E6E6", borderRadius: "999px",
//                         padding: "12px 40px 12px 20px", fontSize: "14px",
//                         color: T.textPrimary, background: "#fff",
//                         fontFamily: "Inter, sans-serif", cursor: "pointer",
//                       }}
//                     >
//                       {QUESTION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
//                     </select>
//                     <span style={{ position: "absolute", right: "18px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
//                       <IcChevronDown size={14} color={T.textSecondary} />
//                     </span>
//                   </div>
//                   <button onClick={() => removeRow(row.id)} aria-label="remove"
//                     style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex" }}>
//                     <IcX size={14} color={T.textSecondary} />
//                   </button>
//                 </div>
//                 <Stepper value={row.count} onChange={v => updateRow(row.id, { count: Math.max(0, v) })} />
//                 <Stepper value={row.marks} onChange={v => updateRow(row.id, { marks: Math.max(0, v) })} />
//               </div>
//             ))}
//           </div>

//           {/* Add Question Type */}
//           <button onClick={addRow}
//             style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0, alignSelf: "flex-start" }}>
//             <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <IcPlus size={12} color="#fff" />
//             </span>
//             <span style={{ fontSize: "14px", fontWeight: 600, color: T.textPrimary, textDecoration: "underline", textUnderlineOffset: "3px" }}>Add Question Type</span>
//           </button>

//           {/* Totals */}
//           <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "4px" }}>
//             <span style={{ fontSize: "14px", color: T.textPrimary }}>
//               <strong>Total Questions :</strong> <span style={{ color: T.textSecondary }}>{totalQ}</span>
//             </span>
//             <span style={{ fontSize: "14px", color: T.textPrimary }}>
//               <strong>Total Marks :</strong> <span style={{ color: T.textSecondary }}>{totalM}</span>
//             </span>
//           </div>

//           {/* Additional Info */}
//           <div>
//             <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: T.textPrimary, marginBottom: "8px" }}>
//               Additional Information (For better output)
//             </label>
//             <div style={{ position: "relative", border: "1px solid #E6E6E6", borderRadius: "16px", background: "#FBFBFB", padding: "14px 50px 14px 18px" }}>
//               <textarea value={info} onChange={e => setInfo(e.target.value)}
//                 placeholder="e.g Generate a question paper for 3 hour exam duration..."
//                 rows={3}
//                 style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "14px", color: T.textPrimary, resize: "none", fontFamily: "Inter, sans-serif" }} />
//               <button style={{ position: "absolute", right: "14px", bottom: "14px", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
//                 <IcMic size={18} color={T.textSecondary} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 4px 24px" }}>
//           {/* <button onClick={() => navigate({ to: "/" })} */}
//           <button onClick={() => router.push("/")}
//             style={{ height: "44px", padding: "0 22px", background: "#fff", borderRadius: "999px", border: "1px solid #E2E2E2", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 600, color: T.textPrimary }}>
//             ← Previous
//           </button>
//           <button
//             style={{ height: "44px", padding: "0 26px", background: "#111", borderRadius: "999px", border: "none", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 600, color: "#fff" }}>
//             Next →
//           </button>
//         </div>
//       </div>
//     </AppShell>
//   );
// }

// const Stepper: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => (
//   <div style={{
//     display: "flex", alignItems: "center", justifyContent: "space-between",
//     border: "1px solid #E6E6E6", borderRadius: "999px",
//     padding: "6px 14px", background: "#fff",
//   }}>
//     <button onClick={() => onChange(value - 1)} style={stepBtn}>
//       <IcMinus size={12} color={T.textPrimary} />
//     </button>
//     <span style={{ fontSize: "14px", fontWeight: 600, color: T.textPrimary, minWidth: "20px", textAlign: "center" }}>{value}</span>
//     <button onClick={() => onChange(value + 1)} style={stepBtn}>
//       <IcPlus size={12} color={T.textPrimary} />
//     </button>
//   </div>
// );
// const stepBtn: React.CSSProperties = {
//   background: "none", border: "none", cursor: "pointer",
//   padding: "4px", display: "flex", alignItems: "center", justifyContent: "center",
// };


/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { AppShell } from "./veda/AppShell";
import { T } from "./veda/tokens";

import {
  IcUpload,
  IcCalendar,
  IcPlus,
  IcMinus,
  IcChevronDown,
  IcMic,
  IcX,
} from "@/components/veda/icons";

const QUESTION_OPTIONS = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "True/False",
];

interface QRow {
  id: number;
  type: string;
  count: number;
  marks: number;
}

export default function CreateAssignment() {
  const router = useRouter();

  const [dueDate, setDueDate] = useState("");
  const [info, setInfo] = useState("");

  const [rows, setRows] = useState<QRow[]>([
    { id: 1, type: "Multiple Choice Questions", count: 4, marks: 1 },
    { id: 2, type: "Short Questions", count: 3, marks: 2 },
    { id: 3, type: "Diagram/Graph-Based Questions", count: 5, marks: 5 },
    { id: 4, type: "Numerical Problems", count: 5, marks: 5 },
  ]);

  const totalQ = rows.reduce((s, r) => s + r.count, 0);

  const totalM = rows.reduce(
    (s, r) => s + r.count * r.marks,
    0
  );

  const updateRow = (
    id: number,
    patch: Partial<QRow>
  ) => {
    setRows((rs) =>
      rs.map((r) =>
        r.id === id ? { ...r, ...patch } : r
      )
    );
  };

  const removeRow = (id: number) => {
    setRows((rs) => rs.filter((r) => r.id !== id));
  };

  const addRow = () => {
    setRows((rs) => [
      ...rs,
      {
        id: Date.now(),
        type: QUESTION_OPTIONS[0],
        count: 1,
        marks: 1,
      },
    ]);
  };

  return (
    <AppShell
      breadcrumb="Assignment"
      onBack={() => router.push("/")}
    >
      <div
        style={{
          flex: 1,
          background: "#EBEBEB",
          borderRadius: "18px",
          padding: "22px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          overflow: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: T.successGreen,
              marginTop: "8px",
            }}
          />

          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 700,
                fontFamily: "Bricolage Grotesque, sans-serif",
                color: T.textPrimary,
                letterSpacing: "-0.2px",
              }}
            >
              Create Assignment
            </h1>

            <p
              style={{
                margin: "2px 0 0",
                fontSize: "13px",
                color: T.textSecondary,
              }}
            >
              Set up a new assignment for your students
            </p>

            {/* Progress */}
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                gap: "8px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "4px",
                  borderRadius: "999px",
                  background: "#2B2B2B",
                }}
              />

              <div
                style={{
                  flex: 1,
                  height: "4px",
                  borderRadius: "999px",
                  background: "#D6D6D6",
                }}
              />
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "28px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 700,
                color: T.textPrimary,
              }}
            >
              Assignment Details
            </h2>

            <p
              style={{
                margin: "4px 0 0",
                fontSize: "13px",
                color: T.textSecondary,
              }}
            >
              Basic information about your assignment
            </p>
          </div>

          {/* Upload */}
          <div>
            <div
              style={{
                border: "1.5px dashed #D5D5D5",
                borderRadius: "18px",
                padding: "32px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                background: "#FAFAFA",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#fff",
                  border: "1px solid #EEE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IcUpload
                  size={22}
                  color={T.textSecondary}
                />
              </div>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: T.textPrimary,
                }}
              >
                Choose a file or drag & drop it here
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: T.textMuted,
                }}
              >
                JPEG, PNG, upto 10MB
              </div>

              <button
                style={{
                  marginTop: "6px",
                  padding: "8px 20px",
                  borderRadius: "999px",
                  border: "1px solid #E2E2E2",
                  background: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: T.textPrimary,
                  cursor: "pointer",
                }}
              >
                Browse Files
              </button>
            </div>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: "12px",
                color: T.textMuted,
                textAlign: "center",
              }}
            >
              Upload images of your preferred document/image
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const Stepper: React.FC<{
  value: number;
  onChange: (v: number) => void;
}> = ({ value, onChange }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1px solid #E6E6E6",
      borderRadius: "999px",
      padding: "6px 14px",
      background: "#fff",
    }}
  >
    <button
      onClick={() => onChange(value - 1)}
      style={stepBtn}
    >
      <IcMinus
        size={12}
        color={T.textPrimary}
      />
    </button>

    <span
      style={{
        fontSize: "14px",
        fontWeight: 600,
        color: T.textPrimary,
        minWidth: "20px",
        textAlign: "center",
      }}
    >
      {value}
    </span>

    <button
      onClick={() => onChange(value + 1)}
      style={stepBtn}
    >
      <IcPlus
        size={12}
        color={T.textPrimary}
      />
    </button>
  </div>
);

const stepBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
