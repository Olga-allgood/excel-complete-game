export const logicChallenges = [
  {
    id: "if",
    category: "logic",
    order: 1,
    formula: "IF()",
    title: "Target Status",
    subtitle: "Make a decision.",
    objective:
      "Use IF to return different results depending on whether a condition is true or false.",
    scenario:
      "A sales manager needs Excel to identify whether an employee reached their sales target.",
    prompt:
      'Which formula returns "Met" when Sales is at least the Target and "Not Met" otherwise?',
    columns: [
      {
        letter: "B",
        heading: "Sales",
        cells: [{ row: "2", value: "5400" }],
      },
      {
        letter: "C",
        heading: "Target",
        cells: [{ row: "2", value: "5000" }],
      },
    ],
    visualHint:
      "Compare Sales in B2 with Target in C2.",
    answers: [
      '=IF(B2>=C2,"Met","Not Met")',
      '=IF(B2<C2,"Met","Not Met")',
      "=SUM(B2:C2)",
    ],
    correctAnswer:
      '=IF(B2>=C2,"Met","Not Met")',
    correctFeedback:
      'Correct! IF checks whether Sales is at least the Target and returns "Met" when the condition is true.',
    feedback: {
      '=IF(B2<C2,"Met","Not Met")':
        'The comparison is reversed. "Met" should be returned when Sales is greater than or equal to Target.',
      "=SUM(B2:C2)":
        "SUM performs arithmetic. This task requires a logical decision.",
    },
  },

  {
    id: "ifs",
    category: "logic",
    order: 2,
    formula: "IFS()",
    title: "Performance Rating",
    subtitle: "Evaluate multiple conditions.",
    objective:
      "Use IFS to evaluate multiple conditions in sequence.",
    scenario:
      "HR assigns ratings based on employee scores: 90+ is Excellent, 75+ is Good, and lower scores Need Improvement.",
    prompt:
      "Which formula assigns the correct performance category?",
    columns: [
      {
        letter: "B",
        heading: "Score",
        cells: [{ row: "2", value: "87" }],
      },
    ],
    visualHint:
      "Test the highest threshold first.",
    answers: [
      '=IFS(B2>=90,"Excellent",B2>=75,"Good",B2<75,"Needs Improvement")',
      '=IFS(B2>=75,"Good",B2>=90,"Excellent",B2<75,"Needs Improvement")',
      '=IF(B2>=90,"Excellent","Good")',
    ],
    correctAnswer:
      '=IFS(B2>=90,"Excellent",B2>=75,"Good",B2<75,"Needs Improvement")',
    correctFeedback:
      "Correct! IFS checks conditions in order and returns the result for the first true condition.",
    feedback: {
      '=IFS(B2>=75,"Good",B2>=90,"Excellent",B2<75,"Needs Improvement")':
        'IFS stops at the first true condition. A score of 95 would incorrectly become "Good".',
      '=IF(B2>=90,"Excellent","Good")':
        "This formula only handles two outcomes, but the task has three categories.",
    },
  },

  {
    id: "and",
    category: "logic",
    order: 3,
    formula: "AND()",
    title: "Bonus Eligibility",
    subtitle: "Check multiple requirements.",
    objective:
      "Use AND when every specified condition must be true.",
    scenario:
      "Employees qualify for a bonus only when Sales are at least $5,000 and their rating is at least 4.5.",
    prompt:
      "Which formula checks whether both requirements are satisfied?",
    columns: [
      {
        letter: "B",
        heading: "Sales",
        cells: [{ row: "2", value: "5400" }],
      },
      {
        letter: "C",
        heading: "Rating",
        cells: [{ row: "2", value: "4.7" }],
      },
    ],
    visualHint:
      "Both conditions must be TRUE.",
    answers: [
      "=AND(B2>=5000,C2>=4.5)",
      "=OR(B2>=5000,C2>=4.5)",
      "=IF(B2>=5000,C2>=4.5)",
    ],
    correctAnswer:
      "=AND(B2>=5000,C2>=4.5)",
    correctFeedback:
      "Correct! AND returns TRUE only when both requirements are satisfied.",
    feedback: {
      "=OR(B2>=5000,C2>=4.5)":
        "OR returns TRUE when either condition is satisfied. This task requires both.",
      "=IF(B2>=5000,C2>=4.5)":
        "IF makes a decision based on a condition. Here you need to test whether two requirements are both true.",
    },
  },

  {
    id: "or",
    category: "logic",
    order: 4,
    formula: "OR()",
    title: "Training Requirement",
    subtitle: "Check alternative conditions.",
    objective:
      "Use OR when at least one of several conditions must be true.",
    scenario:
      "An employee needs additional training if their score is below 70 or attendance is below 80%.",
    prompt:
      "Which formula checks whether at least one training condition is true?",
    columns: [
      {
        letter: "B",
        heading: "Score",
        cells: [{ row: "2", value: "68" }],
      },
      {
        letter: "C",
        heading: "Attendance",
        cells: [{ row: "2", value: "92%" }],
      },
    ],
    visualHint:
      "Either condition can trigger training.",
    answers: [
      "=OR(B2<70,C2<80%)",
      "=AND(B2<70,C2<80%)",
      "=SUM(B2:C2)",
    ],
    correctAnswer:
      "=OR(B2<70,C2<80%)",
    correctFeedback:
      "Correct! OR returns TRUE when at least one condition is satisfied.",
    feedback: {
      "=AND(B2<70,C2<80%)":
        "AND would require both conditions to be true.",
      "=SUM(B2:C2)":
        "SUM performs arithmetic rather than evaluating logical conditions.",
    },
  },

  {
    id: "iferror",
    category: "logic",
    order: 5,
    formula: "IFERROR()",
    title: "Clean Report Errors",
    subtitle: "Handle formula errors.",
    objective:
      "Use IFERROR to provide a useful result when another formula produces an error.",
    scenario:
      "A report calculates revenue per order. Some rows contain zero orders.",
    prompt:
      'Which formula displays "N/A" instead of an error when Revenue is divided by zero Orders?',
    columns: [
      {
        letter: "B",
        heading: "Revenue",
        cells: [{ row: "2", value: "12500" }],
      },
      {
        letter: "C",
        heading: "Orders",
        cells: [{ row: "2", value: "0" }],
      },
    ],
    visualHint:
      "Protect the division formula from an error.",
    answers: [
      '=IFERROR(B2/C2,"N/A")',
      '=IF(B2/C2,"N/A")',
      '=IFERROR(B2+C2,"N/A")',
    ],
    correctAnswer:
      '=IFERROR(B2/C2,"N/A")',
    correctFeedback:
      'Correct! IFERROR attempts the calculation and displays "N/A" when it produces an error.',
    feedback: {
      '=IF(B2/C2,"N/A")':
        "IF does not automatically catch calculation errors.",
      '=IFERROR(B2+C2,"N/A")':
        "IFERROR is correct, but Revenue per Order requires division.",
    },
  },
];

export function getLogicChallenge(id) {
  return logicChallenges.find(
    (challenge) => challenge.id === id
  );
}