import { AppShell } from "@/app/layout/AppShell";
import { AssignmentsList } from "./AssignmentsList";

export default function AssignmentsPage() {
  return (
    <AppShell title="Assignments">
      <AssignmentsList />
    </AppShell>
  );
}
