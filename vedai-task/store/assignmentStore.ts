import { create } from "zustand";

export type QuestionTypeRow = {
  id: string;
  type: string;
  count: number;
  marks: number;
};

export type AssignmentDraft = {
  title: string;
  dueDate: string;
  file: string | null;
  questionTypes: QuestionTypeRow[];
  additionalInfo: string;
};

type State = {
  draft: AssignmentDraft;
  activeAssignmentId: string | null;
  generatedPaper: import("@/lib/api").PaperResponse | null;
  setField: <K extends keyof AssignmentDraft>(k: K, v: AssignmentDraft[K]) => void;
  setActiveAssignmentId: (id: string | null) => void;
  setGeneratedPaper: (paper: import("@/lib/api").PaperResponse | null) => void;
  addQuestionType: () => void;
  updateQuestionType: (id: string, patch: Partial<QuestionTypeRow>) => void;
  removeQuestionType: (id: string) => void;
  reset: () => void;
};

const initialDraft: AssignmentDraft = {
  title: "",
  dueDate: "",
  file: null,
  questionTypes: [
    { id: "1", type: "Multiple Choice Questions", count: 4, marks: 1 },
    { id: "2", type: "Short Questions", count: 3, marks: 2 },
    { id: "3", type: "Diagram/Graph-Based Questions", count: 5, marks: 5 },
    { id: "4", type: "Numerical Problems", count: 5, marks: 5 },
  ],
  additionalInfo: "",
};

export const useAssignmentStore = create<State>((set) => ({
  draft: initialDraft,
  activeAssignmentId: null,
  generatedPaper: null,
  setField: (k, v) => set((s) => ({ draft: { ...s.draft, [k]: v } })),
  setActiveAssignmentId: (id) => set({ activeAssignmentId: id }),
  setGeneratedPaper: (paper) => set({ generatedPaper: paper }),
  addQuestionType: () =>
    set((s) => ({
      draft: {
        ...s.draft,
        questionTypes: [
          ...s.draft.questionTypes,
          { id: crypto.randomUUID(), type: "Multiple Choice Questions", count: 1, marks: 1 },
        ],
      },
    })),
  updateQuestionType: (id, patch) =>
    set((s) => ({
      draft: {
        ...s.draft,
        questionTypes: s.draft.questionTypes.map((q) =>
          q.id === id ? { ...q, ...patch } : q,
        ),
      },
    })),
  removeQuestionType: (id) =>
    set((s) => ({
      draft: {
        ...s.draft,
        questionTypes: s.draft.questionTypes.filter((q) => q.id !== id),
      },
    })),
  reset: () => set({ draft: initialDraft }),
}));

export const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "True / False",
];