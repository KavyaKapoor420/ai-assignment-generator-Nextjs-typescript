export type Assignment = {
  id: string;
  title: string;
  assignedOn: string;
  dueDate: string;
};

export const mockAssignments: Assignment[] = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  title: "Quiz on Electricity",
  assignedOn: "20-06-2025",
  dueDate: "21-06-2025",
}));

export const mockPaper = {
  school: "Delhi Public School, Sector-4, Bokaro",
  subject: "English",
  className: "5th",
  timeAllowed: "45 minutes",
  maxMarks: 20,
  notes: "All questions are compulsory unless stated otherwise.",
  sections: [
    {
      id: "A",
      title: "Section A",
      heading: "Short Answer Questions",
      instructions: "Attempt all questions. Each question carries 2 marks",
      questions: [
        { difficulty: "Easy", text: "Define electroplating. Explain its purpose.", marks: 2 },
        { difficulty: "Moderate", text: "What is the role of a conductor in the process of electrolysis?", marks: 2 },
        { difficulty: "Easy", text: "Why does a solution of copper sulfate conduct electricity?", marks: 2 },
        { difficulty: "Moderate", text: "Describe one example of the chemical effect of electric current in daily life.", marks: 2 },
        { difficulty: "Moderate", text: "Explain why electric current is said to have chemical effects.", marks: 2 },
        { difficulty: "Challenging", text: "How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved.", marks: 2 },
        { difficulty: "Challenging", text: "What happens at the cathode and anode during the electrolysis of water? Name the gases evolved.", marks: 2 },
        { difficulty: "Easy", text: "Mention the type of current used in electroplating and justify why it is used.", marks: 2 },
        { difficulty: "Moderate", text: "What is the importance of electric current in the field of metallurgy?", marks: 2 },
        { difficulty: "Challenging", text: "Explain with a chemical equation how copper is deposited during the electroplating of an object.", marks: 2 },
      ],
    },
  ],
  answerKey: [
    "Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. Its purpose is to prevent corrosion, improve appearance, or increase thickness.",
    "A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.",
    "Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.",
    "An example is the electroplating of silver on jewelry to prevent tarnishing.",
    "Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.",
    "Sodium hydroxide is formed at the cathode during brine electrolysis as water gains electrons.",
    "At the cathode: water is reduced to hydrogen gas and hydroxide ions. At the anode: water is oxidized to oxygen gas and hydrogen ions.",
  ],
};