import { notFound } from "next/navigation";
import { AppShell } from "@/app/layout/AppShell";

const pageContent: Record<string, { title: string; description: string }> = {
  home: {
    title: "Home",
    description: "Your teacher dashboard will appear here once the remaining screens are connected.",
  },
  groups: {
    title: "My Groups",
    description: "Group management is not built yet, but the navigation route is now wired correctly.",
  },
  toolkit: {
    title: "AI Teacher's Toolkit",
    description: "Toolkit actions can be added here without breaking the dashboard navigation.",
  },
  library: {
    title: "My Library",
    description: "Saved teaching resources and generated papers can live in this section later.",
  },
  settings: {
    title: "Settings",
    description: "Account and school-level preferences can be configured here when that flow is ready.",
  },
};

export default async function PlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pageContent[slug];

  if (!page) {
    notFound();
  }

  return (
    <AppShell title={page.title}>
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm font-medium text-brand">Section connected</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{page.title}</h1>
          <p className="mt-3 text-base text-muted-foreground">{page.description}</p>
        </div>
      </div>
    </AppShell>
  );
}
