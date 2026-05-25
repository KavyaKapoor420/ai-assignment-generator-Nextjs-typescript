import Link from "next/link";

import { ClipboardList, Plus } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="grid h-56 w-56 place-items-center rounded-full bg-secondary/70">
        <ClipboardList className="h-20 w-20 text-muted-foreground" />
      </div>
      <h2 className="mt-6 text-lg font-semibold">No assignments yet</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Create your first assignment to start collecting and grading student
        submissions. You can set up rubrics, define marking criteria, and let AI
        assist with grading.
      </p>
      <Link
        href="/assignments/create"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-95 transition"
      >
        <Plus className="h-4 w-4" />
        Create Your First Assignment
      </Link>
    </div>
  );
}
