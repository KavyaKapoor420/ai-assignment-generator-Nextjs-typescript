
'use client'
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import VedaLogo from "./VedaiLogo";
import { useIsMobile } from "@/hooks/useIsMobile";
const USER_AVATAR_SRC = "/john-doe-image.jpg";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const T = {
  bgPage: "#EFEFEF",
  bgCard: "#FFFFFF",
  bgSidebar: "#FFFFFF",
  textPrimary: "#2B2B2B",
  textSecondary: "#8C8C8C",
  textMuted: "#A7A7A7",
  textInverse: "#FFFFFF",
  accentOrange: "#FF6A2A",
  successGreen: "#39C86A",
  borderLight: "#E6E6E6",
  cardRadius: "20px",
  inputRadius: "28px",
  buttonRadius: "999px",
};

// ── SVG Icons ─────────────────────────────────────────────────────────────────
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
const IcFilter = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M4 8h8M6 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcSearch = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.5" />
    <path d="M11 11l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcDots = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="4" r="1.5" fill={color} />
    <circle cx="9" cy="9" r="1.5" fill={color} />
    <circle cx="9" cy="14" r="1.5" fill={color} />
  </svg>
);
const IcSparkle = ({ size = 11, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M6 0l1.2 4.8L12 6l-4.8 1.2L6 12l-1.2-4.8L0 6l4.8-1.2L6 0z" fill={color} />
  </svg>
);
const IcHamburger = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M3 5h14M3 10h14M3 15h14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface Assignment {
  id: number;
  title: string;
  assignedOn: string;
  due: string;
}

// ── Dropdown Menu ─────────────────────────────────────────────────────────────
interface DropdownProps {
  open: boolean;
  onClose: () => void;
  onView: () => void;
  onDelete: () => void;
}
const CardDropdown: React.FC<DropdownProps> = ({ open, onView, onDelete }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "36px",
        right: "0",
        background: "#FFFFFF",
        borderRadius: "14px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
        border: `1px solid ${T.borderLight}`,
        minWidth: "180px",
        zIndex: 50,
        overflow: "hidden",
        padding: "6px",
      }}
    >
      <button
        onClick={onView}
        style={{
          display: "block",
          width: "100%",
          padding: "10px 16px",
          background: "none",
          border: "none",
          textAlign: "left",
          fontSize: "14px",
          fontWeight: 500,
          color: T.textPrimary,
          fontFamily: "Inter, sans-serif",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F5")}
        onMouseLeave={e => (e.currentTarget.style.background = "none")}
      >
        View Assignment
      </button>
      <button
        onClick={onDelete}
        style={{
          display: "block",
          width: "100%",
          padding: "10px 16px",
          background: "none",
          border: "none",
          textAlign: "left",
          fontSize: "14px",
          fontWeight: 500,
          color: "#E53535",
          fontFamily: "Inter, sans-serif",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#FFF0F0")}
        onMouseLeave={e => (e.currentTarget.style.background = "none")}
      >
        Delete
      </button>
    </div>
  );
};

// ── Assignment Card ───────────────────────────────────────────────────────────
interface CardProps {
  assignment: Assignment;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}
const AssignmentCard: React.FC<CardProps> = ({ assignment, isMenuOpen, onMenuToggle, onMenuClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onMenuClose();
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen, onMenuClose]);

  return (
    <div
      style={{
        background: T.bgCard,
        borderRadius: T.cardRadius,
        border: `1px solid ${T.borderLight}`,
        padding: "20px 20px 18px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "28px",
        position: "relative",
      }}
    >
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: 800,
            color: T.textPrimary,
            fontFamily: "Bricolage Grotesque, sans-serif",
            lineHeight: "22px",
            letterSpacing: "-0.2px",
          }}
        >
          {assignment.title}
        </h3>
        {/* 3-dot menu */}
        <div ref={menuRef} style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={onMenuToggle}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: T.textMuted,
              padding: "2px 4px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IcDots color={T.textMuted} />
          </button>
          <CardDropdown
            open={isMenuOpen}
            onClose={onMenuClose}
            onView={() => { alert(`View: ${assignment.title}`); onMenuClose(); }}
            onDelete={() => { alert(`Delete: ${assignment.title}`); onMenuClose(); }}
          />
        </div>
      </div>

      {/* Meta row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
        <span style={{ fontSize: "13px", fontFamily: "Inter, sans-serif" }}>
          <span style={{ fontWeight: 700, color: T.textPrimary }}>Assigned on</span>
          <span style={{ color: T.textSecondary }}> : {assignment.assignedOn}</span>
        </span>
        {assignment.due && (
          <span style={{ fontSize: "13px", fontFamily: "Inter, sans-serif" }}>
            <span style={{ fontWeight: 700, color: T.textPrimary }}>Due</span>
            <span style={{ color: T.textSecondary }}> : {assignment.due}</span>
          </span>
        )}
      </div>
    </div>
  );
};

// ── Sidebar Nav Item ──────────────────────────────────────────────────────────
const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}> = ({ icon, label, active, badge, onClick }) => (
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
      fontFamily: "Inter, sans-serif",
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ color: active ? T.textPrimary : "#888" }}>{icon}</span>
      <span
        style={{
          fontSize: "14px",
          fontWeight: active ? 600 : 400,
          color: active ? T.textPrimary : "#888",
        }}
      >
        {label}
      </span>
    </span>
    {badge !== undefined && (
      <span
        style={{
          background: T.accentOrange,
          color: "#fff",
          fontSize: "11px",
          fontWeight: 700,
          borderRadius: "999px",
          padding: "1px 8px",
          minWidth: "22px",
          textAlign: "center",
        }}
      >
        {badge}
      </span>
    )}
  </button>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const ASSIGNMENTS: Assignment[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: "Quiz on Electricity",
  assignedOn: "20-06-2025",
  due: "21-06-2025",
}));

const VedaAIAssignments: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const filtered = ASSIGNMENTS.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  // ── MOBILE LAYOUT ───────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: T.bgPage,
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Mobile Topbar */}
        <header
          style={{
            background: T.bgCard,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${T.borderLight}`,
          }}
        >
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
            {/* <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#D9D9D9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>👤</div> */}
            {/* <img src={USER_AVATAR_SRC} /> */}
            <div
  style={{
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    overflow: "hidden",
    background: "#D9D9D9",
  }}
>
  <img
    src={USER_AVATAR_SRC}
    alt="User"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />
</div>
            <IcHamburger size={20} color={T.textPrimary} />
          </div>
        </header>

        {/* Mobile Sub-header */}
        <div
          style={{
            background: T.bgCard,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderBottom: `1px solid ${T.borderLight}`,
          }}
        >
          <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
            <IcArrowLeft size={18} color={T.textPrimary} />
          </button>
          <span style={{ fontSize: "16px", fontWeight: 600, color: T.textPrimary, flex: 1, textAlign: "center", marginRight: "30px" }}>Assignments</span>
        </div>

        {/* Mobile Filter + Search */}
        <div style={{ padding: "12px 14px", display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            style={{
              display: "flex", alignItems: "center", gap: "7px",
              background: T.bgCard, border: `1px solid ${T.borderLight}`,
              borderRadius: T.inputRadius, padding: "9px 16px",
              fontSize: "13px", fontWeight: 500, color: T.textMuted,
              fontFamily: "Inter, sans-serif", cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            <IcFilter size={14} color={T.textMuted} />
            Filter
          </button>
          <div
            style={{
              flex: 1, display: "flex", alignItems: "center", gap: "8px",
              background: T.bgCard, border: `1px solid ${T.borderLight}`,
              borderRadius: T.inputRadius, padding: "9px 16px",
            }}
          >
            <IcSearch size={14} color={T.textMuted} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Name"
              style={{
                flex: 1, border: "none", outline: "none",
                fontSize: "13px", color: T.textPrimary,
                fontFamily: "Inter, sans-serif", background: "transparent",
              }}
            />
          </div>
        </div>

        {/* Mobile Cards */}
        <div style={{ padding: "0 14px 120px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map(a => (
            <AssignmentCard
              key={a.id}
              assignment={a}
              isMenuOpen={openMenuId === a.id}
              onMenuToggle={() => setOpenMenuId(openMenuId === a.id ? null : a.id)}
              onMenuClose={() => setOpenMenuId(null)}
            />
          ))}
        </div>

        {/* Mobile FAB */}
        <button
          onClick={() => router.push("/assignments/create")}
          style={{
            position: "fixed", bottom: "76px", right: "20px",
            width: "48px", height: "48px", borderRadius: "50%",
            background: T.accentOrange, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 4px 16px rgba(255,106,42,0.4)",
            zIndex: 40,
          }}
        >
          <IcPlus size={18} color="#fff" />
        </button>

        {/* Mobile Bottom Nav */}
        <nav
          style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "#1A1A1A", padding: "10px 0 14px",
            display: "flex", alignItems: "center", justifyContent: "space-around",
            zIndex: 50,
          }}
        >
          {[
            { label: "Home", icon: <IcGrid size={20} color="#888" /> },
            { label: "Assignments", icon: <IcFile size={20} color="#fff" />, active: true },
            { label: "Library", icon: <IcClock size={20} color="#888" /> },
            { label: "AI Toolkit", icon: <IcWand size={20} color="#888" /> },
          ].map(item => (
            <button
              key={item.label}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "4px", background: "none", border: "none",
                cursor: "pointer", minWidth: "60px",
              }}
            >
              {item.icon}
              <span style={{ fontSize: "11px", fontWeight: item.active ? 600 : 400, color: item.active ? "#fff" : "#888", fontFamily: "Inter, sans-serif" }}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  // ── DESKTOP LAYOUT ──────────────────────────────────────────────────────────
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        background: T.bgPage,
        display: "flex",
        padding: "12px",
        gap: "12px",
        boxSizing: "border-box",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: "270px",
          minWidth: "270px",
          background: T.bgSidebar,
          borderRadius: "18px",
          padding: "22px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0px 4px 14px rgba(0,0,0,0.03)",
        }}
      >
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
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#fff" }}>Create Assignment</span>
          </button>

          {/* Nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <NavItem icon={<IcGrid />} label="Home" onClick={() => router.push("/")} />
            <NavItem icon={<IcUsers />} label="My Groups" />
            <NavItem icon={<IcFile />} label="Assignments" active badge={10} />
            <NavItem icon={<IcWand />} label="AI Teacher's Toolkit" />
            <NavItem icon={<IcClock />} label="My Library" />
          </nav>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <NavItem icon={<IcSettings />} label="Settings" />
          <div
            style={{
              background: "#F3F3F3", borderRadius: "16px",
              padding: "12px", display: "flex", alignItems: "center", gap: "11px",
            }}
          >
            <div style={{ width: "46px", height: "46px", borderRadius: "11px", overflow: "hidden", background: "#D9D9D9", flexShrink: 0 }}>
              <img
                src={USER_AVATAR_SRC}
                alt="Delhi Public School"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: T.textPrimary }}>Delhi Public School</p>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#777" }}>Bokaro Steel City</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: "12px", minWidth: 0,
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: "56px", background: T.bgCard, borderRadius: "18px",
            padding: "0 24px", display: "flex", alignItems: "center",
            justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <IcArrowLeft size={18} color={T.textMuted} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <IcGrid size={15} color="#B0B0B0" />
              <span style={{ fontSize: "14px", fontWeight: 500, color: T.textMuted }}>Assignment</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ position: "relative", display: "flex" }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <IcBell size={19} color={T.textMuted} />
              </button>
              <span style={{ position: "absolute", top: "-1px", right: "-1px", width: "7px", height: "7px", borderRadius: "50%", background: T.accentOrange, border: "1.5px solid white" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              {/* <div style={{ width: "31px", height: "31px", borderRadius: "50%", background: "#D9D9D9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>👤</div> */}
              <div
  style={{
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    overflow: "hidden",
    background: "#D9D9D9",
  }}
>
  <img
    src={USER_AVATAR_SRC}
    alt="User"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />
</div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: T.textPrimary }}>John Doe</span>
              <IcChevronDown size={13} color={T.textMuted} />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div
          style={{
            flex: 1, background: "#EBEBEB", borderRadius: "18px",
            padding: "22px 24px", overflowY: "auto",
            display: "flex", flexDirection: "column", gap: "18px",
          }}
        >
          {/* Page Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: T.successGreen, display: "inline-block", flexShrink: 0 }} />
            <div>
              <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: T.textPrimary, letterSpacing: "-0.2px", fontFamily: "Inter, sans-serif" }}>
                Assignments
              </h1>
              <p style={{ margin: 0, fontSize: "13px", color: T.textSecondary, fontFamily: "Inter, sans-serif" }}>
                Manage and create assignments for your classes.
              </p>
            </div>
          </div>

          {/* Filter + Search Row */}
          {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px" }}>
            <button
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "none", border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: 500, color: T.textMuted,
                fontFamily: "Inter, sans-serif", padding: "6px 0",
              }}
            > */}
                        <div style={{
            background: "#FFFFFF",
            borderRadius: "999px",
            border: "1px solid #E6E6E6",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            }}>
                <button
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "none", border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: 500, color: T.textMuted,
                fontFamily: "Inter, sans-serif", padding: "6px 0",
              }}>
              <IcFilter size={16} color={T.textMuted} />
              Filter By
            </button>

            <div
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: T.bgCard, border: `1px solid ${T.borderLight}`,
                borderRadius: T.inputRadius, padding: "10px 18px",
                width: "280px",
              }}
            >
              <IcSearch size={15} color={T.textMuted} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Assignment"
                style={{
                  flex: 1, border: "none", outline: "none",
                  fontSize: "14px", color: T.textPrimary,
                  fontFamily: "Inter, sans-serif", background: "transparent",
                }}
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "14px",
            }}
          >
            {filtered.map(a => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                isMenuOpen={openMenuId === a.id}
                onMenuToggle={() => setOpenMenuId(openMenuId === a.id ? null : a.id)}
                onMenuClose={() => setOpenMenuId(null)}
              />
            ))}
          </div>
        </div>

        {/* Floating Create Button */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
          }}
        >
          <button
            onClick={() => router.push("/assignments/create")}
            style={{
              height: "48px", padding: "0 28px",
              background: "#111", borderRadius: T.buttonRadius,
              border: "none", display: "flex", alignItems: "center",
              gap: "9px", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
            }}
          >
            <IcPlus size={13} color="#fff" />
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#fff", fontFamily: "Inter, sans-serif" }}>
              Create Assignment
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default VedaAIAssignments;
