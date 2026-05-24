// import { useRouter } from "@tanstack/react-router";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, ChevronDown, LayoutGrid } from "lucide-react";

export function Topbar({ title = "Assignment" }: { title?: string }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 bg-card/80 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <div className="flex items-center gap-3">
          <button
            // onClick={() => router.history.back()}
            onClick={() => router.back()}
            className="h-9 w-9 grid place-items-center rounded-full border border-border bg-card hover:bg-secondary transition"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-sm">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="relative h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand" />
          </button>
          <button className="flex items-center gap-2 pr-2 pl-1 py-1 rounded-full hover:bg-secondary transition">
            <img
              src="/images/avatar.png"
              alt="John Doe avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium hidden sm:inline">John Doe</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}