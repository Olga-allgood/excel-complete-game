export const foundationChallenges = [
  {
    id: "sum",
    category: "foundations",
    order: 1,
    formula: "SUM()",
    title: "Total Sales",
    subtitle: "Add a range of values.",
    objective:
      "Use SUM to calculate the total of a range of numbers.",
    scenario:
      "A sales manager needs the total monthly sales from three employees.",
    prompt:
      "Which formula calculates the total Sales in B2:B4?",
    columns: [
      {
        letter: "B",
        heading: "Sales",
        cells: [
          { row: "2", value: "5400" },
          { row: "3", value: "4200" },
          { row: "4", value: "6100" },
        ],
      },
    ],
    visualHint:
      "Add all values from B2 through B4.",
    answers: [
      "=SUM(B2:B4)",
      "=AVERAGE(B2:B4)",
      "=SUM(B2+B4)",
    ],
    correctAnswer: "=SUM(B2:B4)",
    correctFeedback:
      "Correct! SUM adds all values in the range B2:B4.",
    feedback: {
      "=AVERAGE(B2:B4)":
        "AVERAGE calculates the mean. The task asks for the total.",
      "=SUM(B2+B4)":
        "This only references B2 and B4. The range B2:B4 includes B2, B3, and B4.",
    },
  },

  {
    id: "average",
    category: "foundations",
    order: 2,
    formula: "AVERAGE()",
    title: "Average Score",
    subtitle: "Find the mean.",
    objective:
      "Use AVERAGE to calculate the arithmetic mean of a range.",
    scenario:
      "A training manager needs the average assessment score for three learners.",
    prompt:
      "Which formula calculates the average Score in D2:D4?",
    columns: [
      {
        letter: "D",
        heading: "Score",
        cells: [
          { row: "2", value: "80" },
          { row: "3", value: "90" },
          { row: "4", value: "100" },
        ],
      },
    ],
    visualHint:
      "Calculate the mean of D2 through D4.",
    answers: [
      "=AVERAGE(D2:D4)",
      "=SUM(D2:D4)",
      "=COUNT(D2:D4)",
    ],
    correctAnswer: "=AVERAGE(D2:D4)",
    correctFeedback:
      "Correct! AVERAGE adds the scores and divides by the number of numeric values.",
    feedback: {
      "=SUM(D2:D4)":
        "SUM gives the total, not the mean.",
      "=COUNT(D2:D4)":
        "COUNT tells you how many numeric cells there are, not their average.",
    },
  },

  {
    id: "count",
    category: "foundations",
    order: 3,
    formula: "COUNT()",
    title: "Count Scores",
    subtitle: "Count numeric entries.",
    objective:
      "Use COUNT to determine how many cells in a range contain numbers.",
    scenario:
      "A training coordinator wants to know how many learners have a recorded assessment score.",
    prompt:
      "Which formula counts the numeric scores in D2:D6?",
    columns: [
      {
        letter: "D",
        heading: "Score",
        cells: [
          { row: "2", value: "88" },
          { row: "3", value: "92" },
          { row: "4", value: "" },
          { row: "5", value: "76" },
          { row: "6", value: "95" },
        ],
      },
    ],
    visualHint:
      "One cell is blank. Count only cells containing numbers.",
    answers: [
      "=COUNT(D2:D6)",
      "=SUM(D2:D6)",
      "=AVERAGE(D2:D6)",
    ],
    correctAnswer: "=COUNT(D2:D6)",
    correctFeedback:
      "Correct! COUNT counts the numeric cells and ignores the blank cell.",
    feedback: {
      "=SUM(D2:D6)":
        "SUM adds the scores instead of counting how many scores exist.",
      "=AVERAGE(D2:D6)":
        "AVERAGE calculates the mean of the scores instead of counting them.",
    },
  },

  {
    id: "min",
    category: "foundations",
    order: 4,
    formula: "MIN()",
    title: "Lowest Inventory",
    subtitle: "Find the smallest value.",
    objective:
      "Use MIN to identify the lowest numeric value in a range.",
    scenario:
      "An operations manager needs to identify the product with the lowest inventory level.",
    prompt:
      "Which formula returns the lowest inventory value in C2:C5?",
    columns: [
      {
        letter: "C",
        heading: "Inventory",
        cells: [
          { row: "2", value: "18" },
          { row: "3", value: "12" },
          { row: "4", value: "27" },
          { row: "5", value: "9" },
        ],
      },
    ],
    visualHint:
      "Look for the smallest number in C2:C5.",
    answers: [
      "=MIN(C2:C5)",
      "=MAX(C2:C5)",
      "=COUNT(C2:C5)",
    ],
    correctAnswer: "=MIN(C2:C5)",
    correctFeedback:
      "Correct! MIN returns the smallest numeric value in the range.",
    feedback: {
      "=MAX(C2:C5)":
        "MAX returns the largest value. The manager needs the lowest inventory.",
      "=COUNT(C2:C5)":
        "COUNT tells you how many numeric cells exist, not the lowest value.",
    },
  },

  {
    id: "max",
    category: "foundations",
    order: 5,
    formula: "MAX()",
    title: "Top Sales",
    subtitle: "Find the largest value.",
    objective:
      "Use MAX to identify the highest numeric value in a range.",
    scenario:
      "A sales manager wants to identify the highest individual sales result.",
    prompt:
      "Which formula returns the highest Sales value in B2:B5?",
    columns: [
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
    visualHint:
      "Find the largest number in B2:B5.",
    answers: [
      "=MAX(B2:B5)",
      "=MIN(B2:B5)",
      "=SUM(B2:B5)",
    ],
    correctAnswer: "=MAX(B2:B5)",
    correctFeedback:
      "Correct! MAX returns the largest sales value in the range.",
    feedback: {
      "=MIN(B2:B5)":
        "MIN returns the smallest value, not the highest.",
      "=SUM(B2:B5)":
        "SUM calculates total sales rather than the highest individual result.",
    },
  },
];

export function getFoundationChallenge(id) {
  return foundationChallenges.find(
    (challenge) => challenge.id === id
  );
}