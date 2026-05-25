import { create } from "zustand";
import type { PaperResponse } from "@/lib/api";

type State = {
  activeAssignmentId: string | null;
  assignmentTitle: string;
  generatedPaper: PaperResponse | null;
  setActiveAssignmentId: (id: string | null) => void;
  setAssignmentTitle: (title: string) => void;
  setGeneratedPaper: (paper: PaperResponse | null) => void;
  resetSession: () => void;
};

export const useAssignmentStore = create<State>((set) => ({
  activeAssignmentId: null,
  assignmentTitle: "",
  generatedPaper: null,
  setActiveAssignmentId: (id) => set({ activeAssignmentId: id }),
  setAssignmentTitle: (title) => set({ assignmentTitle: title }),
  setGeneratedPaper: (paper) => set({ generatedPaper: paper }),
  resetSession: () =>
    set({ activeAssignmentId: null, assignmentTitle: "", generatedPaper: null }),
}));
