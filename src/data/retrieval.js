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
   BUSINESS LOGIC — RETRIEVAL PRACTICE
========================================================= */

export const logicRetrievalChallenges = [
  {
    id: "retrieval-if",
    moduleId: "logic",
    order: 1,

    type: "complete",
    difficulty: "supported",

    formula: "IF()",

    title: "Complete the Formula",
    subtitle: "Build an IF decision rule.",

    objective:
      "Construct an IF formula using a condition, a result when true, and a result when false.",

    scenario:
      "A sales manager is preparing a performance report. Employees who reach at least $5,000 in sales should be marked as Met. Everyone else should be marked as Not Met.",

    prompt:
      'Sales are stored in B2. Enter the complete Excel formula that returns "Met" when B2 is at least 5000 and "Not Met" otherwise.',

    columns: [
      {
        letter: "A",
        heading: "Employee",
        cells: [{ row: "2", value: "Maya" }],
      },
      {
        letter: "B",
        heading: "Sales",
        cells: [{ row: "2", value: "5400" }],
      },
    ],

    scaffold:
      '=IF( condition, "if true", "if false" )',

    correctAnswer:
      '=IF(B2>=5000,"Met","Not Met")',

    hint:
      "Test whether B2 is greater than or equal to 5000. Then provide the text returned when the condition is true and when it is false.",

    correctFeedback:
      'Correct! Your IF formula tests the sales requirement and returns "Met" or "Not Met" based on the result.',
  },

  {
    id: "retrieval-and",
    moduleId: "logic",
    order: 2,

    type: "construct",
    difficulty: "independent",

    formula: "AND()",

    title: "Construct the Formula",
    subtitle: "Check two requirements from scratch.",

    objective:
      "Retrieve the syntax of AND and construct a formula that evaluates two conditions.",

    scenario:
      "Employees qualify for a quarterly bonus only when they have at least $5,000 in sales and a performance rating of at least 4.5.",

    prompt:
      "Sales are stored in B2 and Rating is stored in C2. Enter the complete Excel formula that checks whether both bonus requirements are satisfied.",

    columns: [
      {
        letter: "A",
        heading: "Employee",
        cells: [{ row: "2", value: "Jordan" }],
      },
      {
        letter: "B",
        heading: "Sales",
        cells: [{ row: "2", value: "6200" }],
      },
      {
        letter: "C",
        heading: "Rating",
        cells: [{ row: "2", value: "4.7" }],
      },
    ],

    scaffold: null,

    correctAnswer:
      "=AND(B2>=5000,C2>=4.5)",

    hint:
      "The employee must satisfy both requirements. Think about the logical function that returns TRUE only when every condition is true.",

    correctFeedback:
      "Correct! AND checks both requirements and returns TRUE only when the sales and rating conditions are both satisfied.",
  },

  {
    id: "retrieval-iferror",
    moduleId: "logic",
    order: 3,

    type: "apply",
    difficulty: "transfer",

    formula: null,

    title: "Workplace Mission",
    subtitle: "Choose and construct the formula.",

    objective:
      "Determine which logical Excel function can handle a calculation error and construct the formula independently.",

    scenario:
      "A manager is calculating revenue per order. Some employees have no recorded orders, which causes the division calculation to return an error.",

    prompt:
      'Revenue is stored in B2 and Orders in C2. Enter a formula that calculates Revenue per Order but displays "N/A" if the calculation produces an error.',

    columns: [
      {
        letter: "A",
        heading: "Employee",
        cells: [{ row: "2", value: "Priya" }],
      },
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

    scaffold: null,

    correctAnswer:
      '=IFERROR(B2/C2,"N/A")',

    hint:
      'The division B2/C2 produces an error when C2 is zero. Which Business Logic function lets you replace an error with another value?',

    correctFeedback:
      'Correct! You identified IFERROR and used it to display "N/A" when the Revenue per Order calculation cannot be completed.',
  },
];

/* =========================================================
   LOOKUP MISSION — RETRIEVAL PRACTICE
========================================================= */

export const lookupRetrievalChallenges = [
  /* =========================================================
     TASK 1 — COMPLETE
  ========================================================= */

  {
    id: "retrieval-xlookup",
    moduleId: "lookups",
    order: 1,

    type: "complete",
    difficulty: "supported",

    formula: "XLOOKUP()",

    title: "Complete the Formula",
    subtitle: "Retrieve a value with XLOOKUP.",

    objective:
      "Construct an XLOOKUP formula by identifying the lookup value, lookup array, and return array.",

    scenario:
      "A purchasing manager needs to enter a product code and immediately return the matching unit price.",

    prompt:
      "The product code to find is in E2. Product codes are stored in A2:A6 and prices are stored in C2:C6. Enter the complete formula that returns the matching price.",

    columns: [
      {
        letter: "A",
        heading: "Product Code",
        cells: [
          { row: "2", value: "P-101" },
          { row: "3", value: "P-102" },
          { row: "4", value: "P-103" },
          { row: "5", value: "P-104" },
          { row: "6", value: "P-105" },
        ],
      },
      {
        letter: "C",
        heading: "Unit Price",
        cells: [
          { row: "2", value: "24.50" },
          { row: "3", value: "18.75" },
          { row: "4", value: "42.00" },
          { row: "5", value: "31.25" },
          { row: "6", value: "15.50" },
        ],
      },
      {
        letter: "E",
        heading: "Find Code",
        cells: [
          { row: "2", value: "P-104" },
        ],
      },
    ],

    scaffold:
      "=XLOOKUP( lookup_value, lookup_array, return_array )",

    correctAnswer:
      "=XLOOKUP(E2,A2:A6,C2:C6)",

    hint:
      "Start with the code in E2. Search for it in A2:A6, then return the corresponding value from C2:C6.",

    correctFeedback:
      "Correct! XLOOKUP searches the product-code column and returns the matching unit price.",
  },

  /* =========================================================
     TASK 2 — CONSTRUCT
  ========================================================= */

  {
    id: "retrieval-vlookup",
    moduleId: "lookups",
    order: 2,

    type: "construct",
    difficulty: "independent",

    formula: "VLOOKUP()",

    title: "Construct the Formula",
    subtitle: "Build a VLOOKUP formula from scratch.",

    objective:
      "Retrieve VLOOKUP syntax and construct an exact-match lookup independently.",

    scenario:
      "An HR coordinator needs to look up an employee ID and return the employee's department from a reference table.",

    prompt:
      "The employee ID to find is in E2. The lookup table is A2:C6, and Department is the third column of that table. Enter an exact-match VLOOKUP formula.",

    columns: [
      {
        letter: "A",
        heading: "Employee ID",
        cells: [
          { row: "2", value: "E101" },
          { row: "3", value: "E102" },
          { row: "4", value: "E103" },
          { row: "5", value: "E104" },
          { row: "6", value: "E105" },
        ],
      },
      {
        letter: "B",
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
        heading: "Department",
        cells: [
          { row: "2", value: "Sales" },
          { row: "3", value: "Finance" },
          { row: "4", value: "Operations" },
          { row: "5", value: "Marketing" },
          { row: "6", value: "Support" },
        ],
      },
      {
        letter: "E",
        heading: "Find ID",
        cells: [
          { row: "2", value: "E103" },
        ],
      },
    ],

    scaffold: null,

    correctAnswer:
      "=VLOOKUP(E2,A2:C6,3,FALSE)",

    hint:
      "VLOOKUP needs the lookup value, the full table, the number of the return column, and FALSE for an exact match.",

    correctFeedback:
      "Correct! Your VLOOKUP searches E2 in the first column of A2:C6 and returns the exact match from column 3.",
  },

  /* =========================================================
     TASK 3 — APPLY
  ========================================================= */

  {
    id: "retrieval-index-match",
    moduleId: "lookups",
    order: 3,

    type: "apply",
    difficulty: "transfer",

    formula: null,

    title: "Workplace Mission",
    subtitle: "Choose and construct the lookup formula.",

    objective:
      "Determine how INDEX and MATCH can work together to return a value from a flexible lookup.",

    scenario:
      "A project manager needs to enter a project code and return the project owner. The owner column appears to the left of the project-code column.",

    prompt:
      "The project code to find is in E2. Owners are stored in A2:A6 and project codes are stored in C2:C6. Enter a formula using INDEX and MATCH that returns the owner.",

    columns: [
      {
        letter: "A",
        heading: "Owner",
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
        heading: "Project Code",
        cells: [
          { row: "2", value: "PR-21" },
          { row: "3", value: "PR-22" },
          { row: "4", value: "PR-23" },
          { row: "5", value: "PR-24" },
          { row: "6", value: "PR-25" },
        ],
      },
      {
        letter: "E",
        heading: "Find Project",
        cells: [
          { row: "2", value: "PR-24" },
        ],
      },
    ],

    scaffold: null,

    correctAnswer:
      "=INDEX(A2:A6,MATCH(E2,C2:C6,0))",

    hint:
      "MATCH can find the position of E2 in C2:C6. INDEX can use that position to return the corresponding value from A2:A6.",

    correctFeedback:
      "Correct! MATCH finds the project-code position and INDEX returns the owner from the corresponding row.",
  },
];

/* =========================================================
   DATA CLEANUP — RETRIEVAL PRACTICE
========================================================= */

export const textRetrievalChallenges = [
  /* =========================================================
     TASK 1 — COMPLETE
  ========================================================= */

  {
    id: "retrieval-trim",
    moduleId: "text",
    order: 1,

    type: "complete",
    difficulty: "supported",

    formula: "TRIM()",

    title: "Complete the Formula",
    subtitle: "Remove unwanted spaces with TRIM.",

    objective:
      "Construct a TRIM formula that cleans extra spaces from imported text.",

    scenario:
      "A customer list was imported from another system, and some customer names contain extra spaces.",

    prompt:
      "The unclean customer name is stored in B2. Enter the complete formula that removes unnecessary spaces from the text.",

    columns: [
      {
        letter: "A",
        heading: "Customer ID",
        cells: [
          { row: "2", value: "C-204" },
        ],
      },
      {
        letter: "B",
        heading: "Imported Name",
        cells: [
          { row: "2", value: "  Maya Chen  " },
        ],
      },
    ],

    scaffold:
      "=TRIM( text )",

    correctAnswer:
      "=TRIM(B2)",

    hint:
      "TRIM needs the cell containing the text you want to clean. The imported name is in B2.",

    correctFeedback:
      "Correct! TRIM removes unnecessary spaces from the text stored in B2.",
  },

  /* =========================================================
     TASK 2 — CONSTRUCT
  ========================================================= */

  {
    id: "retrieval-left",
    moduleId: "text",
    order: 2,

    type: "construct",
    difficulty: "independent",

    formula: "LEFT()",

    title: "Construct the Formula",
    subtitle: "Extract characters from the left.",

    objective:
      "Retrieve LEFT syntax and extract a fixed number of characters independently.",

    scenario:
      "An operations team uses order IDs whose first three characters identify the regional office.",

    prompt:
      "The order ID is stored in B2. Enter a formula that returns the first 3 characters of the order ID.",

    columns: [
      {
        letter: "A",
        heading: "Order",
        cells: [
          { row: "2", value: "1048" },
        ],
      },
      {
        letter: "B",
        heading: "Order ID",
        cells: [
          { row: "2", value: "SEA-1048" },
        ],
      },
    ],

    scaffold: null,

    correctAnswer:
      "=LEFT(B2,3)",

    hint:
      "Use the text cell first, followed by the number of characters you want Excel to return.",

    correctFeedback:
      "Correct! LEFT returns the first three characters from the order ID in B2.",
  },

  /* =========================================================
     TASK 3 — APPLY
  ========================================================= */

  {
    id: "retrieval-textjoin",
    moduleId: "text",
    order: 3,

    type: "apply",
    difficulty: "transfer",

    formula: null,

    title: "Workplace Mission",
    subtitle: "Choose and construct the formula.",

    objective:
      "Determine which text function combines several cells using a delimiter.",

    scenario:
      "A coordinator needs to create a readable location label from separate City, State, and ZIP fields.",

    prompt:
      'City is in B2, State is in C2, and ZIP is in D2. Enter a formula that combines the three values with ", " between them and ignores empty cells.',

    columns: [
      {
        letter: "B",
        heading: "City",
        cells: [
          { row: "2", value: "Seattle" },
        ],
      },
      {
        letter: "C",
        heading: "State",
        cells: [
          { row: "2", value: "WA" },
        ],
      },
      {
        letter: "D",
        heading: "ZIP",
        cells: [
          { row: "2", value: "98101" },
        ],
      },
    ],

    scaffold: null,

    correctAnswer:
      '=TEXTJOIN(", ",TRUE,B2:D2)',

    hint:
      "Use the function that joins text with a delimiter. The delimiter is a comma followed by a space, TRUE ignores empty cells, and the values are in B2:D2.",

    correctFeedback:
      "Correct! TEXTJOIN combines the location fields with a comma-space delimiter and ignores empty cells.",
  },
];

/* =========================================================
   DATA ANALYSIS — RETRIEVAL PRACTICE
========================================================= */

export const analysisRetrievalChallenges = [
  /* =========================================================
     TASK 1 — COMPLETE
  ========================================================= */

  {
    id: "retrieval-sumif",
    moduleId: "analysis",
    order: 1,

    type: "complete",
    difficulty: "supported",

    formula: "SUMIF()",

    title: "Complete the Formula",
    subtitle: "Total values that meet one condition.",

    objective:
      "Construct a SUMIF formula using a criteria range, criterion, and sum range.",

    scenario:
      "A regional manager needs to calculate total sales for the West region.",

    prompt:
      'Regions are stored in A2:A7 and Sales in C2:C7. Enter the complete formula that totals Sales where Region equals "West".',

    columns: [
      {
        letter: "A",
        heading: "Region",
        cells: [
          { row: "2", value: "West" },
          { row: "3", value: "East" },
          { row: "4", value: "West" },
          { row: "5", value: "North" },
          { row: "6", value: "West" },
          { row: "7", value: "East" },
        ],
      },
      {
        letter: "C",
        heading: "Sales",
        cells: [
          { row: "2", value: "5400" },
          { row: "3", value: "4200" },
          { row: "4", value: "6100" },
          { row: "5", value: "3900" },
          { row: "6", value: "5800" },
          { row: "7", value: "4700" },
        ],
      },
    ],

    scaffold:
      "=SUMIF( criteria_range, criteria, sum_range )",

    correctAnswer:
      '=SUMIF(A2:A7,"West",C2:C7)',

    hint:
      'Excel should test A2:A7 for "West" and add the corresponding values from C2:C7.',

    correctFeedback:
      "Correct! SUMIF totals only the sales rows whose region is West.",
  },

  /* =========================================================
     TASK 2 — CONSTRUCT
  ========================================================= */

  {
    id: "retrieval-countifs",
    moduleId: "analysis",
    order: 2,

    type: "construct",
    difficulty: "independent",

    formula: "COUNTIFS()",

    title: "Construct the Formula",
    subtitle: "Count records that meet multiple conditions.",

    objective:
      "Retrieve COUNTIFS syntax and count records using two criteria.",

    scenario:
      "A training manager needs to count employees who completed training and scored at least 80.",

    prompt:
      'Completion status is stored in B2:B7 and Score in C2:C7. Enter a formula that counts rows where Status is "Complete" and Score is at least 80.',

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
          { row: "7", value: "Leo" },
        ],
      },
      {
        letter: "B",
        heading: "Status",
        cells: [
          { row: "2", value: "Complete" },
          { row: "3", value: "Complete" },
          { row: "4", value: "In Progress" },
          { row: "5", value: "Complete" },
          { row: "6", value: "Complete" },
          { row: "7", value: "In Progress" },
        ],
      },
      {
        letter: "C",
        heading: "Score",
        cells: [
          { row: "2", value: "92" },
          { row: "3", value: "76" },
          { row: "4", value: "88" },
          { row: "5", value: "84" },
          { row: "6", value: "95" },
          { row: "7", value: "79" },
        ],
      },
    ],

    scaffold: null,

    correctAnswer:
      '=COUNTIFS(B2:B7,"Complete",C2:C7,">=80")',

    hint:
      'COUNTIFS uses range/criterion pairs. Test B2:B7 for "Complete" and C2:C7 for values greater than or equal to 80.',

    correctFeedback:
      "Correct! COUNTIFS counts only employees who satisfy both the completion and score requirements.",
  },

  /* =========================================================
     TASK 3 — APPLY
  ========================================================= */

  {
    id: "retrieval-averageif",
    moduleId: "analysis",
    order: 3,

    type: "apply",
    difficulty: "transfer",

    formula: null,

    title: "Workplace Mission",
    subtitle: "Choose and construct the formula.",

    objective:
      "Determine which conditional analysis function calculates an average for records that meet a criterion.",

    scenario:
      "A support manager wants to know the average customer rating for tickets handled by the Premium team.",

    prompt:
      'Team is stored in B2:B7 and Rating in C2:C7. Enter a formula that returns the average Rating for rows where Team equals "Premium".',

    columns: [
      {
        letter: "A",
        heading: "Ticket",
        cells: [
          { row: "2", value: "T-201" },
          { row: "3", value: "T-202" },
          { row: "4", value: "T-203" },
          { row: "5", value: "T-204" },
          { row: "6", value: "T-205" },
          { row: "7", value: "T-206" },
        ],
      },
      {
        letter: "B",
        heading: "Team",
        cells: [
          { row: "2", value: "Premium" },
          { row: "3", value: "Standard" },
          { row: "4", value: "Premium" },
          { row: "5", value: "Standard" },
          { row: "6", value: "Premium" },
          { row: "7", value: "Premium" },
        ],
      },
      {
        letter: "C",
        heading: "Rating",
        cells: [
          { row: "2", value: "4.8" },
          { row: "3", value: "4.1" },
          { row: "4", value: "4.6" },
          { row: "5", value: "4.3" },
          { row: "6", value: "4.9" },
          { row: "7", value: "4.5" },
        ],
      },
    ],

    scaffold: null,

    correctAnswer:
      '=AVERAGEIF(B2:B7,"Premium",C2:C7)',

    hint:
      'You need the conditional function that averages values. Test B2:B7 for "Premium" and average the matching values in C2:C7.',

    correctFeedback:
      "Correct! AVERAGEIF calculates the average rating only for rows assigned to the Premium team.",
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

export function getLogicRetrievalChallenge(id) {
  return logicRetrievalChallenges.find(
    (challenge) => challenge.id === id
  );
}

export function getLookupRetrievalChallenge(id) {
  return lookupRetrievalChallenges.find(
    (challenge) => challenge.id === id
  );
}

export function getTextRetrievalChallenge(id) {
  return textRetrievalChallenges.find(
    (challenge) => challenge.id === id
  );
}

export function getAnalysisRetrievalChallenge(id) {
  return analysisRetrievalChallenges.find(
    (challenge) => challenge.id === id
  );
}

export function getRetrievalChallengesByModule(moduleId) {
  if (moduleId === "foundations") {
    return foundationRetrievalChallenges;
  }

  if (moduleId === "logic") {
    return logicRetrievalChallenges;
  }

  if (moduleId === "lookups") {
    return lookupRetrievalChallenges;
  }

  if (moduleId === "text") {
    return textRetrievalChallenges;
  }

  if (moduleId === "analysis") {
    return analysisRetrievalChallenges;
  }

  return [];
}