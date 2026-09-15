export const foundationRetrievalChallenges = [
  /* =========================================================
     TASK 1 — COMPLETE
     High scaffolding
  ========================================================= */

  {
    id: "retrieval-sum",
    moduleId: "foundations",
    order: 1,

    type: "complete",
    difficulty: "supported",

    formula: "SUM()",

    title: "Complete the Formula",
    subtitle: "Retrieve the SUM syntax.",

    objective:
      "Construct a SUM formula by identifying the correct cell range.",

    scenario:
      "A sales manager needs the total weekly sales from four representatives.",

    prompt:
      "Sales are stored in cells B2:B5. Enter the complete Excel formula that calculates total sales.",

    columns: [
      {
        letter: "A",
        heading: "Representative",
        cells: [
          { row: "2", value: "Maya" },
          { row: "3", value: "Jordan" },
          { row: "4", value: "Priya" },
          { row: "5", value: "Marcus" },
        ],
      },
      {
        letter: "B",
        heading: "Sales",
        cells: [
          { row: "2", value: "5400" },
          { row: "3", value: "4200" },
          { row: "4", value: "6100" },
          { row: "5", value: "5800" },
        ],
      },
    ],

    scaffold: "=SUM( _____ )",

    correctAnswer: "=SUM(B2:B5)",

    hint:
      "SUM needs the full range containing the four sales values. The first value is in B2 and the last is in B5.",

    correctFeedback:
      "Correct! You constructed the SUM formula using the complete sales range B2:B5.",
  },

  /* =========================================================
     TASK 2 — CONSTRUCT
     Reduced scaffolding
  ========================================================= */

  {
    id: "retrieval-average",
    moduleId: "foundations",
    order: 2,

    type: "construct",
    difficulty: "independent",

    formula: "AVERAGE()",

    title: "Construct the Formula",
    subtitle: "Build an AVERAGE formula from scratch.",

    objective:
      "Retrieve the syntax of AVERAGE and construct the complete formula independently.",

    scenario:
      "A training manager needs the average assessment score for five employees.",

    prompt:
      "Assessment scores are stored in C2:C6. Enter the complete Excel formula that calculates the average score.",

    columns: [
      {
        letter: "A",
        heading: "Employee",
        cells: [
          { row: "2", value: "Maya" },
          { row: "3", value: "Jordan" },
          { row: "4", value: "Priya" },
          { row: "5", value: "Marcus" },
          { row: "6", value: "Ana" },
        ],
      },
      {
        letter: "C",
        heading: "Score",
        cells: [
          { row: "2", value: "88" },
          { row: "3", value: "92" },
          { row: "4", value: "84" },
          { row: "5", value: "96" },
          { row: "6", value: "90" },
        ],
      },
    ],

    scaffold: null,

    correctAnswer: "=AVERAGE(C2:C6)",

    hint:
      "Think about the function that calculates the arithmetic mean. The score range begins at C2 and ends at C6.",

    correctFeedback:
      "Correct! You retrieved the AVERAGE function and constructed the range C2:C6 without being given the formula structure.",
  },

  /* =========================================================
     TASK 3 — APPLY
     Function is NOT named in the prompt
  ========================================================= */

  {
    id: "retrieval-min",
    moduleId: "foundations",
    order: 3,

    type: "apply",
    difficulty: "transfer",

    formula: null,

    title: "Workplace Mission",
    subtitle: "Choose and construct the formula.",

    objective:
      "Determine which Excel function solves a workplace problem and construct the formula independently.",

    scenario:
      "An inventory manager is reviewing stock levels and needs to identify the lowest quantity currently available.",

    prompt:
      "Inventory quantities are stored in D2:D7. Enter the formula that should be placed in D8 to return the lowest inventory level.",

    columns: [
      {
        letter: "A",
        heading: "Product",
        cells: [
          { row: "2", value: "Keyboard" },
          { row: "3", value: "Mouse" },
          { row: "4", value: "Monitor" },
          { row: "5", value: "Headset" },
          { row: "6", value: "Webcam" },
          { row: "7", value: "Dock" },
        ],
      },
      {
        letter: "D",
        heading: "Inventory",
        cells: [
          { row: "2", value: "24" },
          { row: "3", value: "17" },
          { row: "4", value: "9" },
          { row: "5", value: "31" },
          { row: "6", value: "14" },
          { row: "7", value: "22" },
        ],
      },
    ],

    scaffold: null,

    correctAnswer: "=MIN(D2:D7)",

    hint:
      "The manager needs the smallest numeric value in the inventory range. Which Formula Foundations function returns the smallest value?",

    correctFeedback:
      "Correct! You identified MIN as the appropriate function and constructed the formula independently.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

export function getFoundationRetrievalChallenge(id) {
  return foundationRetrievalChallenges.find(
    (challenge) => challenge.id === id
  );
}

export function getRetrievalChallengesByModule(moduleId) {
  if (moduleId === "foundations") {
    return foundationRetrievalChallenges;
  }

  return [];
}