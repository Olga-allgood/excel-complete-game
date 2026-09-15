export const textChallenges = [
  {
    id: "trim",
    category: "text",
    order: 1,
    formula: "TRIM()",
    title: "Clean Customer Names",
    subtitle: "Remove extra spaces.",
    objective:
      "Use TRIM to remove unnecessary spaces from imported text.",
    scenario:
      "Customer names imported from another system contain extra spaces.",
    prompt:
      "Which formula cleans the text stored in A2?",
    columns: [
      {
        letter: "A",
        heading: "Customer",
        cells: [
          { row: "2", value: "  Maya   Chen  " },
        ],
      },
    ],
    visualHint:
      "Remove extra spaces while preserving normal spacing between words.",
    answers: [
      "=TRIM(A2)",
      "=CLEAN(A2)",
      "=LEN(A2)",
    ],
    correctAnswer: "=TRIM(A2)",
    correctFeedback:
      "Correct! TRIM removes unnecessary spaces from the text.",
    feedback: {
      "=CLEAN(A2)":
        "CLEAN removes non-printing characters rather than ordinary extra spaces.",
      "=LEN(A2)":
        "LEN counts characters. It does not remove spaces.",
    },
  },

  {
    id: "left",
    category: "text",
    order: 2,
    formula: "LEFT()",
    title: "Extract Region Code",
    subtitle: "Take characters from the left.",
    objective:
      "Use LEFT to extract a specified number of characters from the beginning of text.",
    scenario:
      "Order IDs begin with a three-character region code.",
    prompt:
      "Which formula extracts SEA from the order ID in A2?",
    columns: [
      {
        letter: "A",
        heading: "Order ID",
        cells: [
          { row: "2", value: "SEA-10452" },
        ],
      },
    ],
    visualHint:
      "The region code is the first three characters.",
    answers: [
      "=LEFT(A2,3)",
      "=RIGHT(A2,3)",
      "=LEN(A2,3)",
    ],
    correctAnswer: "=LEFT(A2,3)",
    correctFeedback:
      "Correct! LEFT returns the first three characters: SEA.",
    feedback: {
      "=RIGHT(A2,3)":
        "RIGHT extracts characters from the end of the text.",
      "=LEN(A2,3)":
        "LEN counts characters and does not extract part of a string.",
    },
  },

  {
    id: "right",
    category: "text",
    order: 3,
    formula: "RIGHT()",
    title: "Extract Year",
    subtitle: "Take characters from the right.",
    objective:
      "Use RIGHT to extract characters from the end of text.",
    scenario:
      "A report code ends with a four-digit year.",
    prompt:
      "Which formula extracts 2026 from the value in A2?",
    columns: [
      {
        letter: "A",
        heading: "Report Code",
        cells: [
          { row: "2", value: "SALES-2026" },
        ],
      },
    ],
    visualHint:
      "The year is the final four characters.",
    answers: [
      "=RIGHT(A2,4)",
      "=LEFT(A2,4)",
      "=MID(A2,4)",
    ],
    correctAnswer: "=RIGHT(A2,4)",
    correctFeedback:
      "Correct! RIGHT returns the last four characters.",
    feedback: {
      "=LEFT(A2,4)":
        "LEFT starts at the beginning of the text.",
      "=MID(A2,4)":
        "MID requires both a starting position and number of characters.",
    },
  },

  {
    id: "len",
    category: "text",
    order: 4,
    formula: "LEN()",
    title: "Validate Account IDs",
    subtitle: "Count characters.",
    objective:
      "Use LEN to determine the number of characters in text.",
    scenario:
      "Account IDs should contain exactly eight characters.",
    prompt:
      "Which formula returns the number of characters in A2?",
    columns: [
      {
        letter: "A",
        heading: "Account ID",
        cells: [
          { row: "2", value: "AC104582" },
        ],
      },
    ],
    visualHint:
      "You need the length of the text, not part of the text.",
    answers: [
      "=LEN(A2)",
      "=COUNT(A2)",
      "=LEFT(A2)",
    ],
    correctAnswer: "=LEN(A2)",
    correctFeedback:
      "Correct! LEN returns the number of characters in the account ID.",
    feedback: {
      "=COUNT(A2)":
        "COUNT counts numeric cells, not characters in text.",
      "=LEFT(A2)":
        "LEFT extracts characters rather than counting them.",
    },
  },

  {
    id: "textjoin",
    category: "text",
    order: 5,
    formula: "TEXTJOIN()",
    title: "Build Contact Labels",
    subtitle: "Combine text values.",
    objective:
      "Use TEXTJOIN to combine multiple text values using a delimiter.",
    scenario:
      "A contact list stores first name, last name, and department in separate cells.",
    prompt:
      'Which formula combines A2:C2 using " - " as the separator?',
    columns: [
      {
        letter: "A",
        heading: "First",
        cells: [{ row: "2", value: "Maya" }],
      },
      {
        letter: "B",
        heading: "Last",
        cells: [{ row: "2", value: "Chen" }],
      },
      {
        letter: "C",
        heading: "Department",
        cells: [{ row: "2", value: "Sales" }],
      },
    ],
    visualHint:
      "Combine all three values and place the same separator between them.",
    answers: [
      '=TEXTJOIN(" - ",TRUE,A2:C2)',
      "=SUM(A2:C2)",
      '=LEFT(A2:C2," - ")',
    ],
    correctAnswer:
      '=TEXTJOIN(" - ",TRUE,A2:C2)',
    correctFeedback:
      "Correct! TEXTJOIN combines the three text values using the chosen separator.",
    feedback: {
      "=SUM(A2:C2)":
        "SUM is for numeric addition, not combining text.",
      '=LEFT(A2:C2," - ")':
        "LEFT extracts characters from text. It does not join multiple cells.",
    },
  },
];

export function getTextChallenge(id) {
  return textChallenges.find(
    (challenge) => challenge.id === id
  );
}