export const lookupChallenges = [
  {
    id: "xlookup",
    category: "lookups",
    order: 1,
    formula: "XLOOKUP()",
    title: "Employee Lookup",
    subtitle: "Find a matching record.",
    objective:
      "Use XLOOKUP to retrieve information associated with an exact matching value.",
    scenario:
      "HR needs to find an employee's department using their employee ID.",
    prompt:
      "Which formula finds employee ID E103 in A2:A5 and returns the Department from C2:C5?",
    columns: [
      {
        letter: "A",
        heading: "Employee ID",
        cells: [
          { row: "2", value: "E101" },
          { row: "3", value: "E102" },
          { row: "4", value: "E103" },
          { row: "5", value: "E104" },
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
        ],
      },
    ],
    visualHint:
      "Search the ID column and return the corresponding value from Department.",
    answers: [
      '=XLOOKUP("E103",A2:A5,C2:C5)',
      '=XLOOKUP("E103",C2:C5,A2:A5)',
      '=SUM(A2:A5)',
    ],
    correctAnswer:
      '=XLOOKUP("E103",A2:A5,C2:C5)',
    correctFeedback:
      "Correct! XLOOKUP searches A2:A5 for E103 and returns the matching Department.",
    feedback: {
      '=XLOOKUP("E103",C2:C5,A2:A5)':
        "The lookup and return arrays are reversed.",
      "=SUM(A2:A5)":
        "SUM performs arithmetic and cannot retrieve a matching department.",
    },
  },

  {
    id: "vlookup",
    category: "lookups",
    order: 2,
    formula: "VLOOKUP()",
    title: "Product Price",
    subtitle: "Use a legacy table lookup.",
    objective:
      "Use VLOOKUP to retrieve a value from a table using a lookup value in the first column.",
    scenario:
      "A purchasing team uses a legacy workbook to retrieve product prices by product code.",
    prompt:
      "Which formula finds P103 in A2:C5 and returns the price from the third column using an exact match?",
    columns: [
      {
        letter: "A",
        heading: "Product",
        cells: [
          { row: "2", value: "P101" },
          { row: "3", value: "P102" },
          { row: "4", value: "P103" },
          { row: "5", value: "P104" },
        ],
      },
      {
        letter: "C",
        heading: "Price",
        cells: [
          { row: "2", value: "$18" },
          { row: "3", value: "$24" },
          { row: "4", value: "$31" },
          { row: "5", value: "$27" },
        ],
      },
    ],
    visualHint:
      "P103 is in the first column of the lookup table. Price is column 3.",
    answers: [
      '=VLOOKUP("P103",A2:C5,3,FALSE)',
      '=VLOOKUP("P103",A2:C5,2,FALSE)',
      '=VLOOKUP("P103",C2:C5,3,FALSE)',
    ],
    correctAnswer:
      '=VLOOKUP("P103",A2:C5,3,FALSE)',
    correctFeedback:
      "Correct! VLOOKUP searches the first column and returns the value from column 3 using an exact match.",
    feedback: {
      '=VLOOKUP("P103",A2:C5,2,FALSE)':
        "Column index 2 would return the second column, not Price.",
      '=VLOOKUP("P103",C2:C5,3,FALSE)':
        "The lookup value must be searched in the first column of the table array.",
    },
  },

  {
    id: "index-match",
    category: "lookups",
    order: 3,
    formula: "INDEX+MATCH",
    title: "Flexible Lookup",
    subtitle: "Find a position, then return a value.",
    objective:
      "Combine MATCH and INDEX to perform a flexible lookup.",
    scenario:
      "A reporting analyst needs to find a customer's account manager from a customer ID.",
    prompt:
      "Which formula finds C203 in A2:A5 and returns the corresponding manager from B2:B5?",
    columns: [
      {
        letter: "A",
        heading: "Customer ID",
        cells: [
          { row: "2", value: "C201" },
          { row: "3", value: "C202" },
          { row: "4", value: "C203" },
          { row: "5", value: "C204" },
        ],
      },
      {
        letter: "B",
        heading: "Manager",
        cells: [
          { row: "2", value: "Ana" },
          { row: "3", value: "Marcus" },
          { row: "4", value: "Priya" },
          { row: "5", value: "Jordan" },
        ],
      },
    ],
    visualHint:
      "MATCH finds the row position. INDEX returns the manager at that position.",
    answers: [
      '=INDEX(B2:B5,MATCH("C203",A2:A5,0))',
      '=MATCH(B2:B5,INDEX("C203",A2:A5,0))',
      '=INDEX(A2:A5,MATCH("C203",B2:B5,0))',
    ],
    correctAnswer:
      '=INDEX(B2:B5,MATCH("C203",A2:A5,0))',
    correctFeedback:
      "Correct! MATCH finds C203's position and INDEX returns the manager from the same position.",
    feedback: {
      '=MATCH(B2:B5,INDEX("C203",A2:A5,0))':
        "MATCH and INDEX have different jobs. MATCH should locate the customer ID; INDEX should return the manager.",
      '=INDEX(A2:A5,MATCH("C203",B2:B5,0))':
        "The lookup and return ranges are reversed.",
    },
  },
];

export function getLookupChallenge(id) {
  return lookupChallenges.find(
    (challenge) => challenge.id === id
  );
}