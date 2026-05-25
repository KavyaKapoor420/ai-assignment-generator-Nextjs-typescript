import { AppShell } from "@/app/layout/AppShell";
import { CreateAssignmentForm } from "../CreateAssignmentForm";

export default function CreateAssignmentPage() {
  return (
    <AppShell title="Create Assignment">
      <CreateAssignmentForm />
    </AppShell>
  );
}
