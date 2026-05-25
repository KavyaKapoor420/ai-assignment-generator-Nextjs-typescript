
'use client'
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import VedaLogo from "./VedaiLogo";
import { useIsMobile } from "@/hooks/useIsMobile";

const USER_AVATAR_SRC = "/john-doe-image.jpg";

const T = {
  bgPage: "#EFEFEF",
  bgCard: "#FFFFFF",
  bgSidebar: "#FFFFFF",
  textPrimary: "#2B2B2B",
  textSecondary: "#8C8C8C",
  textMuted: "#A7A7A7",
  accentOrange: "#FF6A2A",
  successGreen: "#39C86A",
  borderLight: "#E6E6E6",
  cardRadius: "20px",
  inputRadius: "12px",
  buttonRadius: "999px",
};

const IcGrid = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" stroke={color} strokeWidth="1.5" />
  </svg>
);
const IcUsers = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="6.5" cy="5.5" r="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M1 14c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="13" cy="5" r="2" stroke={color} strokeWidth="1.5" />
    <path d="M15.5 13.5c0-2-1.5-3.5-3.5-3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcFile = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="3" y="1.5" width="10" height="15" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M6 6h6M6 9h6M6 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcWand = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M10.5 3l1 1-8.5 8.5-1-1L10.5 3z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 1v2M17 5h-2M15.4 2.6l-1.4 1.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcClock = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke={color} strokeWidth="1.5" />
    <path d="M9 5v4l2.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcSettings = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcArrowLeft = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M11 4l-5 5 5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  

);
const IcArrowRight = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M5 3l5 5-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcBell = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 0 1 6 6v3l1.5 2.5H2.5L4 11V8a6 6 0 0 1 6-6z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 16a2 2 0 0 0 4 0" stroke={color} strokeWidth="1.5" />
  </svg>
);
const IcChevronDown = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcPlus = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IcX = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcSparkle = ({ size = 11, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M6 0l1.2 4.8L12 6l-4.8 1.2L6 12l-1.2-4.8L0 6l4.8-1.2L6 0z" fill={color} />
  </svg>
);
const IcUpload = ({ size = 36, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <path d="M18 24V12M18 12l-5 5M18 12l5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 28a6 6 0 0 1-2-11.5A10 10 0 0 1 28 14a6 6 0 0 1 0 14H8z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const IcCalendar = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="2" y="3" width="14" height="13" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M2 7h14M6 1v4M12 1v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcMic = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="6" y="1" width="6" height="10" rx="3" stroke={color} strokeWidth="1.5" />
    <path d="M3 9a6 6 0 0 0 12 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 15v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcMinus = ({ size = 12, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 6h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ── Nav Item ───────────────────────────────────────────────────────────────────
const NavItem = ({ icon, label, active, badge, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: "40px",
      padding: "0 14px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      background: active ? "#F1F1F1" : "transparent",
      fontFamily: "'Inter', sans-serif",
      transition: "background 0.15s",
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ color: active ? T.textPrimary : "#888" }}>{icon}</span>
      <span style={{ fontSize: "14px", fontWeight: active ? 600 : 400, color: active ? T.textPrimary : "#888" }}>
        {label}
      </span>
    </span>
    {badge !== undefined && (
      <span style={{ background: T.accentOrange, color: "#fff", fontSize: "11px", fontWeight: 700, borderRadius: "999px", padding: "1px 8px", minWidth: "22px", textAlign: "center" }}>
        {badge}
      </span>
    )}
  </button>
);

// ── Stepper ────────────────────────────────────────────────────────────────────
const Stepper = ({ value, onChange, min = 0 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#F7F7F7", borderRadius: "999px", padding: "4px 10px", border: `1px solid ${T.borderLight}` }}>
    <button
      onClick={() => onChange(Math.max(min, value - 1))}
      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "2px", color: T.textSecondary }}
    >
      <IcMinus size={12} color={T.textSecondary} />
    </button>
    <span style={{ fontSize: "14px", fontWeight: 600, color: T.textPrimary, minWidth: "18px", textAlign: "center" }}>{value}</span>
    <button
      onClick={() => onChange(value + 1)}
      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "2px", color: T.textSecondary }}
    >
      <IcPlus size={12} color={T.textSecondary} />
    </button>
  </div>
);

// ── Question Type Options ──────────────────────────────────────────────────────
const QUESTION_TYPE_OPTIONS = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "True/False Questions",
  "Fill in the Blanks",
];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CreateAssignment() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const isMobile = useIsMobile();

  const [questionTypes, setQuestionTypes] = useState([
    { id: 1, type: "Multiple Choice Questions", questions: 4, marks: 1 },
    { id: 2, type: "Short Questions", questions: 3, marks: 2 },
    { id: 3, type: "Diagram/Graph-Based Questions", questions: 5, marks: 5 },
    { id: 4, type: "Numerical Problems", questions: 5, marks: 5 },
  ]);

  const fileInputRef = useRef(null);

  const totalQuestions = questionTypes.reduce((s, r) => s + r.questions, 0);
  const totalMarks = questionTypes.reduce((s, r) => s + r.questions * r.marks, 0);

  const updateQT = (id, field, val) =>
    setQuestionTypes(prev => prev.map(q => q.id === id ? { ...q, [field]: val } : q));
  const removeQT = (id) => setQuestionTypes(prev => prev.filter(q => q.id !== id));
  const addQT = () => {
    const used = questionTypes.map(q => q.type);
    const next = QUESTION_TYPE_OPTIONS.find(o => !used.includes(o)) || "Short Questions";
    setQuestionTypes(prev => [...prev, { id: Date.now(), type: next, questions: 3, marks: 1 }]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  // ── SIDEBAR ────────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <aside style={{
      width: isMobile ? "100%" : "270px",
      minWidth: isMobile ? "unset" : "270px",
      background: T.bgSidebar,
      borderRadius: "18px",
      padding: "22px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0px 4px 14px rgba(0,0,0,0.03)",
    }}>
      <div>
        {/* Logo */}
        <VedaLogo />

        {/* Create Button */}
        <button
          onClick={() => router.push("/assignments/create")}
          style={{
            width: "100%", height: "48px",
            background: "linear-gradient(180deg,#2A2A2A 0%,#1D1D1D 100%)",
            borderRadius: T.buttonRadius,
            border: "2.5px solid #FF7A45",
            boxShadow: "0 0 16px rgba(255,106,42,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "8px", cursor: "pointer", marginBottom: "24px",
          }}
        >
          <IcSparkle size={11} color="#FF7A45" />
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff", fontFamily: "'Inter', sans-serif" }}>Create Assignment</span>
        </button>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <NavItem icon={<IcGrid />} label="Home" active={false} onClick={() => router.push("/")} />
          <NavItem icon={<IcUsers />} label="My Groups" active={false} />
          <NavItem
            icon={<IcFile />}
            label="Assignments"
            active={false}
            onClick={() => router.push("/assignments")}
          />
          <NavItem icon={<IcWand />} label="AI Teacher's Toolkit" active={false} />
          <NavItem icon={<IcClock />} label="My Library" badge={32} active={false} />
        </nav>
      </div>

      {/* Bottom */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <NavItem icon={<IcSettings />} label="Settings" active={false} />
        <div style={{ background: "#F3F3F3", borderRadius: "16px", padding: "12px", display: "flex", alignItems: "center", gap: "11px" }}>
          <div style={{ width: "46px", height: "46px", borderRadius: "11px", overflow: "hidden", background: "#D9D9D9", flexShrink: 0 }}>
            <img
              src={USER_AVATAR_SRC}
              alt="Delhi Public School"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: T.textPrimary, fontFamily: "'Inter', sans-serif" }}>Delhi Public School</p>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#777", fontFamily: "'Inter', sans-serif" }}>Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </aside>
  );

  // ── TOP BAR ────────────────────────────────────────────────────────────────
  const TopBar = () => (
    <header style={{
      height: "56px", background: T.bgCard, borderRadius: "18px",
      padding: "0 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.02)", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => router.push("/assignments")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <IcArrowLeft size={18} color={T.textMuted} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <IcGrid size={15} color="#B0B0B0" />
          <span style={{ fontSize: "14px", fontWeight: 500, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>Assignment</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div style={{ position: "relative", display: "flex" }}>
          <IcBell size={19} color={T.textMuted} />
          <span style={{ position: "absolute", top: "-1px", right: "-1px", width: "7px", height: "7px", borderRadius: "50%", background: T.accentOrange, border: "1.5px solid white" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <div style={{ width: "31px", height: "31px", borderRadius: "50%", overflow: "hidden", background: "#D9D9D9" }}>
            <img
              src={USER_AVATAR_SRC}
              alt="User"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600, color: T.textPrimary, fontFamily: "'Inter', sans-serif" }}>John Doe</span>
          <IcChevronDown size={13} color={T.textMuted} />
        </div>
      </div>
    </header>
  );

  // ── CREATE ASSIGNMENT CONTENT ──────────────────────────────────────────────
  const CreateContent = () => (
    <div style={{ flex: 1, background: "#EBEBEB", borderRadius: "18px", padding: "22px 24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: T.successGreen, display: "inline-block", flexShrink: 0 }} />
        <div>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: T.textPrimary, letterSpacing: "-0.2px", fontFamily: "'Inter', sans-serif" }}>
            Create Assignment
          </h1>
          <p style={{ margin: 0, fontSize: "13px", color: T.textSecondary, fontFamily: "'Inter', sans-serif" }}>
            Set up a new assignment for your students
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div style={{ flex: 1, height: "5px", borderRadius: "999px", background: T.textPrimary }} />
        <div style={{ flex: 1, height: "5px", borderRadius: "999px", background: "#D5D5D5" }} />
      </div>

      {/* Main Card */}
      <div style={{ background: T.bgCard, borderRadius: "20px", padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Card Header */}
        <div>
          <h2 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: T.textPrimary, fontFamily: "'Inter', sans-serif" }}>Assignment Details</h2>
          <p style={{ margin: "3px 0 0", fontSize: "13px", color: T.textSecondary, fontFamily: "'Inter', sans-serif" }}>Basic information about your assignment</p>
        </div>

        {/* File Upload */}
        <div>
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${isDragging ? T.accentOrange : "#C8C8C8"}`,
              borderRadius: "16px",
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              background: isDragging ? "rgba(255,106,42,0.03)" : "#FAFAFA",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <IcUpload size={36} color={T.textSecondary} />
            <p style={{ margin: 0, fontSize: "14px", fontWeight: 500, color: T.textPrimary, fontFamily: "'Inter', sans-serif" }}>
              {uploadedFile ? uploadedFile.name : "Choose a file or drag & drop it here"}
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>JPEG, PNG, upto 10MB</p>
            <button
              style={{
                marginTop: "6px",
                padding: "8px 22px",
                borderRadius: "999px",
                border: `1.5px solid ${T.borderLight}`,
                background: "#fff",
                fontSize: "13px",
                fontWeight: 500,
                color: T.textPrimary,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
              }}
              onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
            >
              Browse Files
            </button>
            <input ref={fileInputRef} type="file" accept="image/*,.pdf" style={{ display: "none" }} onChange={e => e.target.files?.[0] && setUploadedFile(e.target.files[0])} />
          </div>
          <p style={{ margin: "8px 0 0", fontSize: "12px", color: T.textMuted, textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
            Upload images of your preferred document/image
          </p>
        </div>

        {/* Due Date */}
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: T.textPrimary, marginBottom: "8px", fontFamily: "'Inter', sans-serif" }}>Due Date</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="DD-MM-YYYY"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              style={{
                width: "100%",
                height: "46px",
                border: `1.5px solid ${T.borderLight}`,
                borderRadius: "12px",
                padding: "0 44px 0 16px",
                fontSize: "14px",
                color: T.textPrimary,
                fontFamily: "'Inter', sans-serif",
                outline: "none",
                background: "#fff",
                boxSizing: "border-box",
              }}
            />
            <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: T.textSecondary }}>
              <IcCalendar size={18} color={T.textSecondary} />
            </span>
          </div>
        </div>

        {/* Question Types */}
        <div>
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: T.textPrimary, fontFamily: "'Inter', sans-serif" }}>Question Type</span>
            </div>
            <div style={{ width: "140px", textAlign: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: T.textSecondary, fontFamily: "'Inter', sans-serif" }}>No. of Questions</span>
            </div>
            <div style={{ width: "100px", textAlign: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: T.textSecondary, fontFamily: "'Inter', sans-serif" }}>Marks</span>
            </div>
          </div>

          {/* Rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {questionTypes.map((qt) => (
              <div key={qt.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Dropdown */}
                <div style={{ flex: 1, position: "relative" }}>
                  <select
                    value={qt.type}
                    onChange={e => updateQT(qt.id, "type", e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      border: `1.5px solid ${T.borderLight}`,
                      borderRadius: "12px",
                      padding: "0 36px 0 14px",
                      fontSize: "14px",
                      color: T.textPrimary,
                      fontFamily: "'Inter', sans-serif",
                      appearance: "none",
                      background: "#fff",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {QUESTION_TYPE_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <IcChevronDown size={14} color={T.textMuted} />
                  </span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeQT(qt.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px", color: T.textMuted, flexShrink: 0 }}
                >
                  <IcX size={14} color={T.textMuted} />
                </button>

                {/* Questions Stepper */}
                <div style={{ width: "130px", display: "flex", justifyContent: "center" }}>
                  <Stepper value={qt.questions} onChange={v => updateQT(qt.id, "questions", v)} min={1} />
                </div>

                {/* Marks Stepper */}
                <div style={{ width: "100px", display: "flex", justifyContent: "center" }}>
                  <Stepper value={qt.marks} onChange={v => updateQT(qt.id, "marks", v)} min={1} />
                </div>
              </div>
            ))}
          </div>

          {/* Add Question Type */}
          <button
            onClick={addQT}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              marginTop: "14px", background: "none", border: "none",
              cursor: "pointer", padding: "4px 0",
            }}
          >
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: T.textPrimary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IcPlus size={12} color="#fff" />
            </div>
            <span style={{ fontSize: "14px", fontWeight: 600, color: T.textPrimary, fontFamily: "'Inter', sans-serif" }}>Add Question Type</span>
          </button>

          {/* Totals */}
          <div style={{ textAlign: "right", marginTop: "12px" }}>
            <p style={{ margin: "0 0 2px", fontSize: "13px", color: T.textSecondary, fontFamily: "'Inter', sans-serif" }}>
              <span style={{ fontWeight: 600, color: T.textPrimary }}>Total Questions : </span>{totalQuestions}
            </p>
            <p style={{ margin: 0, fontSize: "13px", color: T.textSecondary, fontFamily: "'Inter', sans-serif" }}>
              <span style={{ fontWeight: 600, color: T.textPrimary }}>Total Marks : </span>{totalMarks}
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: T.textPrimary, marginBottom: "8px", fontFamily: "'Inter', sans-serif" }}>
            Additional Information (For better output)
          </label>
          <div style={{ position: "relative" }}>
            <textarea
              value={additionalInfo}
              onChange={e => setAdditionalInfo(e.target.value)}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              rows={4}
              style={{
                width: "100%",
                border: `1.5px solid ${T.borderLight}`,
                borderRadius: "14px",
                padding: "14px 44px 14px 16px",
                fontSize: "14px",
                color: T.textPrimary,
                fontFamily: "'Inter', sans-serif",
                outline: "none",
                background: "#fff",
                resize: "none",
                boxSizing: "border-box",
                lineHeight: 1.6,
              }}
            />
            <span style={{ position: "absolute", right: "14px", bottom: "14px", color: T.textSecondary, cursor: "pointer" }}>
              <IcMic size={18} color={T.textSecondary} />
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "8px" }}>
        <button
          onClick={() => router.push("/assignments")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            height: "46px", padding: "0 24px",
            background: "#fff", border: `1.5px solid ${T.borderLight}`,
            borderRadius: T.buttonRadius, cursor: "pointer",
            fontSize: "14px", fontWeight: 600, color: T.textPrimary,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <IcArrowLeft size={14} color={T.textPrimary} />
          Previous
        </button>
        <button
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            height: "46px", padding: "0 28px",
            background: T.textPrimary, border: "none",
            borderRadius: T.buttonRadius, cursor: "pointer",
            fontSize: "14px", fontWeight: 600, color: "#fff",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Next
          <IcArrowRight size={14} color="#fff" />
        </button>
      </div>
    </div>
  );

  // ── DESKTOP LAYOUT ─────────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <div style={{
        width: "100%", height: "100vh", minHeight: "600px",
        background: T.bgPage, display: "flex", padding: "12px",
        gap: "12px", boxSizing: "border-box", fontFamily: "'Inter', sans-serif",
      }}>
        <Sidebar />
        <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", minWidth: 0 }}>
          <TopBar />
          <CreateContent />
        </main>
      </div>
    );
  }

  // ── MOBILE LAYOUT ──────────────────────────────────────────────────────────
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: T.bgPage, fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Mobile Topbar */}
      <header style={{ background: T.bgCard, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${T.borderLight}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg,#E97A53,#c0392b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: 800, fontSize: "14px" }}>V</span>
          </div>
          <VedaLogo compact />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ position: "relative" }}>
            <IcBell size={20} color={T.textMuted} />
            <span style={{ position: "absolute", top: "-2px", right: "-2px", width: "7px", height: "7px", borderRadius: "50%", background: T.accentOrange, border: "1.5px solid white" }} />
          </div>
          <div style={{ width: "30px", height: "30px", borderRadius: "50%", overflow: "hidden", background: "#D9D9D9" }}>
            <img
              src={USER_AVATAR_SRC}
              alt="User"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Sub-header */}
      <div style={{ background: T.bgCard, padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px", borderBottom: `1px solid ${T.borderLight}` }}>
        <button onClick={() => router.push("/assignments")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
          <IcArrowLeft size={18} color={T.textPrimary} />
        </button>
        <span style={{ fontSize: "16px", fontWeight: 600, color: T.textPrimary, flex: 1, textAlign: "center", marginRight: "30px" }}>Create Assignment</span>
      </div>

      {/* Mobile Content */}
      <div style={{ flex: 1, padding: "16px 14px 100px", overflowY: "auto" }}>
        {/* Progress Bar */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <div style={{ flex: 1, height: "5px", borderRadius: "999px", background: T.textPrimary }} />
          <div style={{ flex: 1, height: "5px", borderRadius: "999px", background: "#D5D5D5" }} />
        </div>

        {/* Card */}
        <div style={{ background: T.bgCard, borderRadius: "16px", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: T.textPrimary }}>Assignment Details</h2>
            <p style={{ margin: "3px 0 0", fontSize: "12px", color: T.textSecondary }}>Basic information about your assignment</p>
          </div>

          {/* Upload */}
          <div
            style={{ border: "2px dashed #C8C8C8", borderRadius: "14px", padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "#FAFAFA" }}
            onClick={() => fileInputRef.current?.click()}
          >
            <IcUpload size={30} color={T.textSecondary} />
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, color: T.textPrimary, textAlign: "center" }}>Choose a file or drag & drop it here</p>
            <p style={{ margin: 0, fontSize: "11px", color: T.textMuted }}>JPEG, PNG, upto 10MB</p>
            <button style={{ marginTop: "4px", padding: "7px 18px", borderRadius: "999px", border: `1px solid ${T.borderLight}`, background: "#fff", fontSize: "13px", fontWeight: 500, color: T.textPrimary, cursor: "pointer" }}>Browse Files</button>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => e.target.files?.[0] && setUploadedFile(e.target.files[0])} />
          </div>
          <p style={{ margin: "-10px 0 0", fontSize: "11px", color: T.textMuted, textAlign: "center" }}>Upload images of your preferred document/image</p>

          {/* Due Date */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: T.textPrimary, marginBottom: "7px" }}>Due Date</label>
            <div style={{ position: "relative" }}>
              <input type="text" placeholder="DD-MM-YYYY" value={dueDate} onChange={e => setDueDate(e.target.value)}
                style={{ width: "100%", height: "42px", border: `1.5px solid ${T.borderLight}`, borderRadius: "12px", padding: "0 40px 0 14px", fontSize: "14px", color: T.textPrimary, fontFamily: "'Inter', sans-serif", outline: "none", background: "#fff", boxSizing: "border-box" }} />
              <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}>
                <IcCalendar size={16} color={T.textSecondary} />
              </span>
            </div>
          </div>

          {/* Question Types Mobile */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: T.textPrimary }}>Question Type</span>
              <div style={{ display: "flex", gap: "20px" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: T.textSecondary }}>Qs</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: T.textSecondary }}>Marks</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {questionTypes.map(qt => (
                <div key={qt.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <select value={qt.type} onChange={e => updateQT(qt.id, "type", e.target.value)}
                      style={{ width: "100%", height: "40px", border: `1.5px solid ${T.borderLight}`, borderRadius: "10px", padding: "0 28px 0 12px", fontSize: "12px", color: T.textPrimary, appearance: "none", background: "#fff", cursor: "pointer", outline: "none" }}>
                      {QUESTION_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                      <IcChevronDown size={12} color={T.textMuted} />
                    </span>
                  </div>
                  <button onClick={() => removeQT(qt.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}>
                    <IcX size={12} color={T.textMuted} />
                  </button>
                  <Stepper value={qt.questions} onChange={v => updateQT(qt.id, "questions", v)} min={1} />
                  <Stepper value={qt.marks} onChange={v => updateQT(qt.id, "marks", v)} min={1} />
                </div>
              ))}
            </div>
            <button onClick={addQT} style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", background: "none", border: "none", cursor: "pointer", padding: "2px 0" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: T.textPrimary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IcPlus size={10} color="#fff" />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: T.textPrimary }}>Add Question Type</span>
            </button>
            <div style={{ textAlign: "right", marginTop: "10px" }}>
              <p style={{ margin: "0 0 2px", fontSize: "12px", color: T.textSecondary }}><span style={{ fontWeight: 600, color: T.textPrimary }}>Total Questions : </span>{totalQuestions}</p>
              <p style={{ margin: 0, fontSize: "12px", color: T.textSecondary }}><span style={{ fontWeight: 600, color: T.textPrimary }}>Total Marks : </span>{totalMarks}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: T.textPrimary, marginBottom: "7px" }}>Additional Information (For better output)</label>
            <div style={{ position: "relative" }}>
              <textarea value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)}
                placeholder="e.g Generate a question paper for 3 hour exam duration..." rows={4}
                style={{ width: "100%", border: `1.5px solid ${T.borderLight}`, borderRadius: "12px", padding: "12px 38px 12px 14px", fontSize: "13px", color: T.textPrimary, fontFamily: "'Inter', sans-serif", outline: "none", background: "#fff", resize: "none", boxSizing: "border-box", lineHeight: 1.6 }} />
              <span style={{ position: "absolute", right: "12px", bottom: "12px" }}>
                <IcMic size={16} color={T.textSecondary} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: `1px solid ${T.borderLight}`, padding: "12px 20px", display: "flex", justifyContent: "space-between", gap: "10px", zIndex: 50 }}>
        <button onClick={() => router.push("/assignments")} style={{ flex: 1, height: "44px", background: "#fff", border: `1.5px solid ${T.borderLight}`, borderRadius: T.buttonRadius, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", fontSize: "14px", fontWeight: 600, color: T.textPrimary, fontFamily: "'Inter', sans-serif" }}>
          <IcArrowLeft size={14} color={T.textPrimary} />
          Previous
        </button>
        <button style={{ flex: 1, height: "44px", background: T.textPrimary, border: "none", borderRadius: T.buttonRadius, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", fontSize: "14px", fontWeight: 600, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
          Next
          <IcArrowRight size={14} color="#fff" />
        </button>
      </div>
    </div>
  );
}
