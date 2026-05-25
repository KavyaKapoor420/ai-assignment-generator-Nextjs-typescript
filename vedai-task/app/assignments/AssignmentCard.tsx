"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import type { Assignment } from "../data/mockAssignments";

export function AssignmentCard({ a }: { a: Assignment }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold underline underline-offset-4 decoration-foreground/40">
          {a.title}
        </h3>
        <button
          onClick={() => setOpen((o) => !o)}
          className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary transition"
          aria-label="Actions"
        >
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        {open && (
          <div className="absolute right-4 top-12 z-10 w-44 rounded-xl border border-border bg-card shadow-lg py-1 text-sm">
            <button className="w-full text-left px-4 py-2 hover:bg-secondary">
              View Assignment
            </button>
            <button className="w-full text-left px-4 py-2 text-destructive hover:bg-secondary">
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="font-medium">
          Assigned on : <span className="text-muted-foreground">{a.assignedOn}</span>
        </span>
        <span className="font-medium">
          Due : <span className="text-muted-foreground">{a.dueDate}</span>
        </span>
      </div>
    </div>
  );
}
