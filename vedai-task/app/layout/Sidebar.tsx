// import { Link, useRouterState } from "@tanstack/react-router";
import Link from 'next/link'
import { usePathname } from "next/navigation";

import { Sparkles } from "lucide-react";

const navItems = [
  { to: "/home", label: "Home", icon: "/images/icon-home.svg" },
  { to: "/groups", label: "My Groups", icon: "/images/icon-groups.svg" },
  { to: "/assignments", label: "Assignments", icon: "/images/icon-assignments.svg", badge: 10 },
  { to: "/toolkit", label: "AI Teacher's Toolkit", icon: "/images/icon-toolkit.svg" },
  { to: "/library", label: "My Library", icon: "/images/icon-library.svg" },
];

export function Sidebar() {
//   const pathname = useRouterState({ select: (s) => s.location.pathname });
const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-[260px] shrink-0 bg-card border-r border-border h-screen sticky top-0 rounded-tr-3xl rounded-br-3xl px-5 py-6">
      <Link href="/assignments" className="flex items-center gap-2 px-1 mb-8">
        <img src="/images/logo.png" alt="VedaAI logo" className="h-9 w-9 rounded-md" />
        <span className="text-xl font-bold tracking-tight">VedaAI</span>
      </Link>

      <Link
        href="/assignments/create"
        className="flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 text-sm font-medium ring-2 ring-brand/60 ring-offset-2 ring-offset-card shadow-sm hover:opacity-95 transition"
      >
        <Sparkles className="h-4 w-4" />
        Create Assignment
      </Link>

      <nav className="mt-8 flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                active
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                <img src={item.icon} alt="" className="h-5 w-5 opacity-80" />
                {item.label}
              </span>
              {item.badge ? (
                <span className="text-xs font-semibold rounded-full bg-brand text-accent-foreground px-2 py-0.5">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 flex flex-col gap-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition"
        >
          <img src="/images/icon-settings.svg" alt="" className="h-5 w-5 opacity-80" />
          Settings
        </Link>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/70 border border-border">
          <img
            src="/images/avatar-school.png"
            alt="School avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold">Delhi Public School</p>
            <p className="text-xs text-muted-foreground">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </aside>
  );
}