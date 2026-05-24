import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} />
        <main className="flex-1 px-4 md:px-8 py-6">{children}</main>
      </div>
    </div>
  );
}