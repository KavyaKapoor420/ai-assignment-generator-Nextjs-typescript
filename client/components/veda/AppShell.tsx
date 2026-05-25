import React from "react";
// import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { T } from "./tokens";
import {
  IcGrid, IcUsers, IcFile, IcWand, IcClock, IcSettings,
  IcArrowLeft, IcBell, IcChevronDown, IcSparkle,
} from "./icons";

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
      display: "flex", alignItems: "center", justifyContent: "space-between",
      width: "100%", height: "40px", padding: "0 14px",
      borderRadius: "10px", border: "none", cursor: "pointer",
      background: active ? "#F1F1F1" : "transparent",
      fontFamily: "Inter, sans-serif",
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ color: active ? T.textPrimary : "#888" }}>{icon}</span>
      <span style={{ fontSize: "14px", fontWeight: active ? 600 : 400, color: active ? T.textPrimary : "#888" }}>
        {label}
      </span>
    </span>
    {badge !== undefined && (
      <span style={{
        background: T.accentOrange, color: "#fff", fontSize: "11px",
        fontWeight: 700, borderRadius: "999px", padding: "1px 8px",
        minWidth: "22px", textAlign: "center",
      }}>{badge}</span>
    )}
  </button>
);

interface AppShellProps {
  breadcrumb: string;
  children: React.ReactNode;
  onBack?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({ breadcrumb, children, onBack }) => {
//   const navigate = useNavigate();
//   const pathname = useRouterState({ select: (s) => s.location.pathname });
const router = useRouter();
const pathname = usePathname();

//   const go = (to: string) => () => navigate({ to });
const go = (to: string) => () => router.push(to);

  return (
    <div style={{
      width: "100%", minHeight: "100vh", background: T.bgPage,
      display: "flex", padding: "12px", gap: "12px",
      boxSizing: "border-box", fontFamily: "Inter, sans-serif",
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: "270px", minWidth: "270px", background: T.bgSidebar,
        borderRadius: "18px", padding: "22px 20px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        boxShadow: "0px 4px 14px rgba(0,0,0,0.03)",
        position: "sticky", top: "12px", height: "calc(100vh - 24px)",
      }}>
        <div>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "9px",
              background: "linear-gradient(135deg,#E97A53,#c0392b)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: "16px" }}>V</span>
            </div>
            <span style={{ fontSize: "22px", fontWeight: 700, color: T.textPrimary, letterSpacing: "-0.5px" }}>VedaAI</span>
          </Link>

          <button
            onClick={go("/assignments/create")}
            style={{
              width: "100%", height: "48px",
              background: "linear-gradient(180deg,#2A2A2A 0%,#1D1D1D 100%)",
              borderRadius: T.buttonRadius, border: "2.5px solid #FF7A45",
              boxShadow: "0 0 16px rgba(255,106,42,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", cursor: "pointer", marginBottom: "24px",
            }}
          >
            <IcSparkle size={11} color="#FF7A45" />
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#fff" }}>Create Assignment</span>
          </button>

          <nav style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <NavItem icon={<IcGrid />} label="Home" onClick={go("/")} />
            <NavItem icon={<IcUsers />} label="My Groups" />
            <NavItem icon={<IcFile />} label="Assignments" badge={10}
              active={pathname.startsWith("/assignments") || pathname === "/"}
              onClick={go("/")} />
            <NavItem icon={<IcWand />} label="AI Teacher's Toolkit" />
            <NavItem icon={<IcClock />} label="My Library" />
          </nav>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <NavItem icon={<IcSettings />} label="Settings" />
          <div style={{
            background: "#F3F3F3", borderRadius: "16px",
            padding: "12px", display: "flex", alignItems: "center", gap: "11px",
          }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "11px", background: "#e0ddd8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🏫</div>
            <div>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: T.textPrimary }}>Delhi Public School</p>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#777" }}>Bokaro Steel City</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", minWidth: 0 }}>
        <header style={{
          height: "56px", background: T.bgCard, borderRadius: "18px",
          padding: "0 24px", display: "flex", alignItems: "center",
          justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => (onBack ? onBack() : window.history.back())}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <IcArrowLeft size={18} color={T.textMuted} />
            </button>
            <span style={{ fontSize: "14px", fontWeight: 500, color: T.textMuted }}>{breadcrumb}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ position: "relative", display: "flex" }}>
              <IcBell size={19} color={T.textMuted} />
              <span style={{ position: "absolute", top: "-1px", right: "-1px", width: "7px", height: "7px", borderRadius: "50%", background: T.accentOrange, border: "1.5px solid white" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <div style={{ width: "31px", height: "31px", borderRadius: "50%", background: "#D9D9D9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>👤</div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: T.textPrimary }}>John Doe</span>
              <IcChevronDown size={13} color={T.textMuted} />
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};