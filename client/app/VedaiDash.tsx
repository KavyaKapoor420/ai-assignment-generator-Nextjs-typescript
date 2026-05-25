"use client";

import React from "react";
import { useRouter } from "next/navigation";
import VedaLogo from "./VedaiLogo";
import { useIsMobile } from "@/hooks/useIsMobile";

const USER_AVATAR_SRC = "/john-doe-image.jpg";      // profile avatar

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconGrid = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="6.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1 14c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="13" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15.5 13.5c0-2-1.5-3.5-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconFile = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="3" y="1.5" width="10" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconWand = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M10.5 3l1 1-8.5 8.5-1-1L10.5 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 1v2M17 5h-2M15.4 2.6l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 0 1 6 6v3l1.5 2.5H2.5L4 11V8a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8 16a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconSparkle = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 0l1.2 4.8L12 6l-4.8 1.2L6 12l-1.2-4.8L0 6l4.8-1.2L6 0z" fill="currentColor"/>
  </svg>
);

// ── Empty State Illustration ───────────────────────────────────────────────────
const EmptyIllustration = () => (
  <svg width="290" height="240" viewBox="0 0 290 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background circle */}
    <circle cx="145" cy="130" r="95" fill="#E8E6F0" opacity="0.6"/>

    {/* Floating card top-right */}
    <rect x="188" y="42" width="72" height="30" rx="6" fill="white" stroke="#E5E5E5" strokeWidth="1"/>
    <circle cx="200" cy="57" r="5" fill="#D5CFE4"/>
    <rect x="210" y="52" width="28" height="5" rx="2.5" fill="#D5CFE4"/>
    <rect x="210" y="60" width="20" height="4" rx="2" fill="#E8E6F0"/>

    {/* Main document / paper */}
    <rect x="98" y="65" width="100" height="120" rx="8" fill="white" stroke="#E5E5E5" strokeWidth="1"/>
    <rect x="113" y="82" width="50" height="7" rx="3.5" fill="#2B2B2B"/>
    <rect x="113" y="97" width="70" height="5" rx="2.5" fill="#E0DFF0"/>
    <rect x="113" y="108" width="60" height="5" rx="2.5" fill="#E0DFF0"/>
    <rect x="113" y="119" width="65" height="5" rx="2.5" fill="#E0DFF0"/>
    <rect x="113" y="130" width="55" height="5" rx="2.5" fill="#E0DFF0"/>

    {/* Magnifying glass handle */}
    <line x1="163" y1="163" x2="188" y2="188" stroke="#9E9AC2" strokeWidth="10" strokeLinecap="round"/>

    {/* Magnifying glass circle */}
    <circle cx="145" cy="145" r="42" fill="#D5CFE4" opacity="0.9"/>
    <circle cx="145" cy="145" r="42" stroke="#9E9AC2" strokeWidth="4" fill="none"/>

    {/* Red X inside magnifying glass */}
    <circle cx="145" cy="145" r="26" fill="white"/>
    <path d="M133 133l24 24M157 133l-24 24" stroke="#F45B52" strokeWidth="6" strokeLinecap="round"/>

    {/* Doodle (cursive line top-left) */}
    <path d="M68 88 Q80 70 88 80 Q96 90 105 78" stroke="#2B2B2B" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M88 80 L92 68" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round"/>

    {/* Blue dot */}
    <circle cx="200" cy="155" r="6" fill="#527BA5"/>

    {/* 4-point sparkle */}
    <path d="M80 148 L82 140 L84 148 L92 150 L84 152 L82 160 L80 152 L72 150 Z" fill="#527BA5"/>
  </svg>
);

// ── Nav Item ──────────────────────────────────────────────────────────────────
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      width: "100%",
      height: "38px",
      padding: "0 14px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      background: active ? "#F1F1F1" : "transparent",
      color: active ? "#2B2B2B" : "#888888",
      fontSize: "15px",
      fontWeight: active ? 600 : 400,
      fontFamily: "Inter, sans-serif",
      transition: "background 0.15s, color 0.15s",
    }}
  >
    {icon}
    {label}
  </button>
);

// ── Main Dashboard Component ──────────────────────────────────────────────────
const VedaAIDashboard: React.FC = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#E9E9E9",
          padding: "8px",
          boxSizing: "border-box",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <header
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <VedaLogo compact />
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px" }}>
              <IconBell />
              <span style={{ position: "absolute", top: "1px", right: "0px", width: "8px", height: "8px", borderRadius: "50%", background: "#F57B42", border: "1.5px solid white" }} />
            </div>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", background: "#D9D9D9" }}>
              <img
                src={USER_AVATAR_SRC}
                alt="User avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <button
              style={{
                background: "none",
                border: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#2D2D2D",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <div
          style={{
            flex: 1,
            marginTop: "10px",
            background: "#EBEBEB",
            borderRadius: "18px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "38px 20px 120px",
            textAlign: "center",
          }}
        >
          <div style={{ transform: "scale(0.9)", transformOrigin: "top center" }}>
            <EmptyIllustration />
          </div>
          <h2
            style={{
              margin: "0",
              fontSize: "19px",
              fontWeight: 700,
              color: "#2B2B2B",
              lineHeight: "28px",
            }}
          >
            No assignments yet
          </h2>
          <p
            style={{
              margin: "14px 0 0",
              maxWidth: "310px",
              fontSize: "15px",
              lineHeight: "1.5",
              color: "#8C8C8C",
            }}
          >
            Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
          </p>
          <button
            onClick={() => router.push("/assignments/create")}
            style={{
              marginTop: "30px",
              minHeight: "46px",
              padding: "0 22px",
              background: "#111111",
              borderRadius: "999px",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              color: "#FFFFFF",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <span style={{ color: "white" }}><IconPlus /></span>
            <span style={{ fontSize: "15px", fontWeight: 500 }}>Create Your First Assignment</span>
          </button>
        </div>

        <button
          onClick={() => router.push("/assignments/create")}
          style={{
            position: "fixed",
            right: "20px",
            bottom: "104px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#FFFFFF",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FF6A2A",
            boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
            cursor: "pointer",
            zIndex: 20,
          }}
        >
          <IconPlus />
        </button>

        <nav
          style={{
            position: "fixed",
            left: "18px",
            right: "18px",
            bottom: "20px",
            background: "#1A1A1A",
            borderRadius: "22px",
            padding: "14px 10px 16px",
            display: "flex",
            justifyContent: "space-around",
            zIndex: 30,
          }}
        >
          {[
            { label: "Home", icon: <IconGrid />, active: false, onClick: () => router.push("/") },
            { label: "Assignments", icon: <IconFile />, active: true, onClick: () => router.push("/assignments") },
            { label: "Library", icon: <IconClock />, active: false },
            { label: "AI Toolkit", icon: <IconWand />, active: false },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              style={{
                background: "none",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                minWidth: "64px",
                cursor: "pointer",
                color: item.active ? "#FFFFFF" : "#6F6F6F",
              }}
            >
              <span style={{ color: "currentColor" }}>{item.icon}</span>
              <span style={{ fontSize: "12px", fontWeight: item.active ? 600 : 400, color: "currentColor" }}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        background: "#F5F5F5",
        display: "flex",
        padding: "12px",
        gap: "12px",
        boxSizing: "border-box",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── SIDEBAR ────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: "270px",
          minWidth: "270px",
          background: "#FFFFFF",
          borderRadius: "18px",
          padding: "22px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0px 4px 14px rgba(0,0,0,0.03)",
        }}
      >
        {/* Top: Logo + Nav */}
        <div>
          {/* Logo */}
         <VedaLogo/>

          {/* Create Assignment Button */}
          <button
            onClick={() => router.push("/assignments/create")}
            style={{
              width: "100%",
              height: "50px",
              background: "#1A1A1A",
              borderRadius: "999px",
              border: "3.5px solid #E97A53",
              boxShadow: "0 0 14px rgba(233,122,83,0.38), 0 0 0 0px rgba(233,122,83,0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "9px",
              cursor: "pointer",
              marginBottom: "28px",
              padding: "0 20px",
            }}
          >
            <span style={{ color: "#E97A53" }}><IconSparkle /></span>
            <span style={{ fontSize: "15px", fontWeight: 500, color: "#FFFFFF", letterSpacing: "0.1px" }}>
              Create Assignment
            </span>
          </button>

          {/* Nav Menu */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <NavItem icon={<IconGrid />} label="Home" active />
            <NavItem icon={<IconUsers />} label="My Groups" />
            <NavItem icon={<IconFile />} label="Assignments" onClick={() => router.push("/assignments")} />
            <NavItem icon={<IconWand />} label="AI Teacher's Toolkit" />
            <NavItem icon={<IconClock />} label="My Library" />
          </nav>
        </div>

        {/* Bottom: Settings + School Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <NavItem icon={<IconSettings />} label="Settings" />

          {/* School Card */}
          <div
            style={{
              background: "#F3F3F3",
              borderRadius: "16px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Avatar — replace with <img src={SCHOOL_AVATAR_SRC} /> */}
            <img
                src={USER_AVATAR_SRC}
                alt="User avatar"
                style={{ width: 33, height: 33, borderRadius: "50%", objectFit: "cover" }}
              />
            {/* <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                background: "#D9D9D9",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              🏫
            </div> */}
            <div>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#2B2B2B" }}>
                Delhi Public School
              </p>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 400, color: "#777777", marginTop: "2px" }}>
                Bokaro Steel City
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: "56px",
            background: "#FFFFFF",
            borderRadius: "18px",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.02)",
            flexShrink: 0,
          }}
        >
          {/* Left: breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => router.back()}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9A9A9A",
                display: "flex",
                alignItems: "center",
                padding: 0,
              }}
            >
              <IconArrowLeft />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ color: "#B0B0B0" }}>
                <IconGrid />
              </span>
              <span style={{ fontSize: "15px", fontWeight: 500, color: "#9A9A9A" }}>Assignment</span>
            </div>
          </div>

          {/* Right: notification + profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            {/* Bell with orange dot */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <button
                style={{ background: "none", border: "none", cursor: "pointer", color: "#9A9A9A", display: "flex" }}
              >
                <IconBell />
              </button>
              <span
                style={{
                  position: "absolute",
                  top: "-1px",
                  right: "-1px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#F57B42",
                  border: "1.5px solid white",
                }}
              />
            </div>

            {/* User */}
            <div style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer" }}>
              {/* Avatar image */}
              <img
                src={USER_AVATAR_SRC}
                alt="User avatar"
                style={{ width: 33, height: 33, borderRadius: "50%", objectFit: "cover" }}
              />
              {/* <div
                style={{
                  width: "33px",
                  height: "33px",
                  borderRadius: "50%",
                  background: "#D9D9D9",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                👤
              </div> */}
              <span style={{ fontSize: "15px", fontWeight: 600, color: "#2B2B2B" }}>John Doe</span>
              <span style={{ color: "#9A9A9A" }}><IconChevronDown /></span>
            </div>
          </div>
        </header>

        {/* Empty State Area */}
        <div
          style={{
            flex: 1,
            background: "#EBEBEB",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "40px 20px",
          }}
        >
          {/* Illustration */}
          <EmptyIllustration />

          {/* Title */}
          <h2
            style={{
              margin: "8px 0 0 0",
              fontSize: "18px",
              fontWeight: 700,
              color: "#2B2B2B",
              lineHeight: "26px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            No assignments yet
          </h2>

          {/* Description */}
          <p
            style={{
              margin: "10px 0 0 0",
              maxWidth: "480px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "24px",
              color: "#8C8C8C",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Create your first assignment to start collecting and grading student submissions.
            You can set up rubrics, define marking criteria, and let AI assist with grading.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push("/assignments/create")}
            style={{
              marginTop: "28px",
              height: "46px",
              padding: "0 28px",
              background: "#111111",
              borderRadius: "999px",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "9px",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span style={{ color: "white" }}><IconPlus /></span>
            <span style={{ fontSize: "15px", fontWeight: 500, color: "#FFFFFF" }}>
              Create Your First Assignment
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default VedaAIDashboard;
