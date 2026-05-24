// import { Link } from "@tanstack/react-router";
import Link from "next/link";
import { Filter, Plus, Search } from "lucide-react";
import { mockAssignments } from "../data/mockAssignments";
import { AssignmentCard } from "./AssignmentCard";

export function AssignmentsList() {
  return (
    <div className="relative">
      <div className="rounded-2xl bg-card border border-border px-5 py-4 flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <div>
          <h1 className="text-lg font-semibold">Assignments</h1>
          <p className="text-sm text-muted-foreground">
            Manage and create assignments for your classes.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary transition w-full md:w-auto">
          <Filter className="h-4 w-4" />
          Filter By
        </button>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Assignment"
            className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pb-24">
        {mockAssignments.map((a) => (
          <AssignmentCard key={a.id} a={a} />
        ))}
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <Link
          href="/assignments/create"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-lg hover:opacity-95 transition"
        >
          <Plus className="h-4 w-4" />
          Create Assignment
        </Link>
      </div>
    </div>
  );
}