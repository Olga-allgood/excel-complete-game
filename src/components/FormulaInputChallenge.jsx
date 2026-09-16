import { useEffect, useState } from "react";

/* =========================================================
   FORMULA HELPERS
========================================================= */

function normalizeFormula(formula = "") {
  return formula
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}

function getFunctionName(formula = "") {
  const normalized = normalizeFormula(formula);
  const match = normalized.match(/^=([A-Z]+)/);

  return match?.[1] || "";
}

function getSimpleRange(formula = "") {
  const normalized = normalizeFormula(formula);

  const match = normalized.match(
    /([A-Z]+\d+:[A-Z]+\d+)/
  );

  return match?.[1] || "";
}

function getSpreadsheetRows(columns = []) {
  return [
    ...new Set(
      columns.flatMap((column) =>
        (column.cells || []).map((cell) =>
          String(cell.row)
        )
      )
    ),
  ].sort(
    (a, b) => Number(a) - Number(b)
  );
}

/* =========================================================
   GUIDANCE HELPERS
========================================================= */

function getGuidanceContent(challenge) {
  const moduleId = challenge?.moduleId;
  const expectedFunction = getFunctionName(
    challenge?.correctAnswer
  );

  /* ---------------------------------------------------------
     BUSINESS LOGIC
  --------------------------------------------------------- */

  if (moduleId === "logic") {
    if (expectedFunction === "IF") {
      return {
        stepOneTitle: "Identify the decision",
        stepOneMessage:
          "What condition should Excel test? Then determine what Excel should return when that condition is true and when it is false.",

        stepThreeTitle: "Assemble the IF formula",
        stepThreeMessage:
          "An IF formula contains a condition, a result when the condition is true, and a result when it is false.",

        pattern:
          '=IF(condition, "if true", "if false")',
      };
    }

    if (expectedFunction === "IFS") {
      return {
        stepOneTitle: "Identify the conditions",
        stepOneMessage:
          "Identify each condition Excel needs to test and the result associated with each condition. Put the most restrictive condition first.",

        stepThreeTitle: "Assemble the IFS formula",
        stepThreeMessage:
          "IFS evaluates condition-result pairs in order and returns the result for the first true condition.",

        pattern:
          '=IFS(condition1, result1, condition2, result2, ...)',
      };
    }

    if (expectedFunction === "AND") {
      return {
        stepOneTitle: "Identify the requirements",
        stepOneMessage:
          "Look for every requirement in the task. AND should be used when all of the conditions must be true.",

        stepThreeTitle: "Assemble the AND formula",
        stepThreeMessage:
          "Place each required condition inside AND, separated by commas.",

        pattern:
          "=AND(condition1, condition2)",
      };
    }

    if (expectedFunction === "OR") {
      return {
        stepOneTitle: "Identify the alternatives",
        stepOneMessage:
          "Look for the conditions in the task. OR should be used when at least one of the conditions can be true.",

        stepThreeTitle: "Assemble the OR formula",
        stepThreeMessage:
          "Place the alternative conditions inside OR, separated by commas.",

        pattern:
          "=OR(condition1, condition2)",
      };
    }

    if (expectedFunction === "IFERROR") {
      return {
        stepOneTitle: "Identify the calculation",
        stepOneMessage:
          "First identify the calculation Excel should attempt. Then determine what should appear if that calculation produces an error.",

        stepThreeTitle: "Assemble the IFERROR formula",
        stepThreeMessage:
          "IFERROR contains the calculation first and the fallback value second.",

        pattern:
          '=IFERROR(calculation, "if error")',
      };
    }
  }

  /* ---------------------------------------------------------
     LOOKUP MISSION
  --------------------------------------------------------- */

  if (moduleId === "lookups") {
    if (expectedFunction === "XLOOKUP") {
      return {
        stepOneTitle: "Identify the lookup",
        stepOneMessage:
          "Determine the value Excel should search for, the range where it should search, and the range containing the value to return.",
        stepThreeTitle: "Assemble the XLOOKUP formula",
        stepThreeMessage:
          "XLOOKUP uses the lookup value first, then the lookup array, then the return array.",
        pattern:
          "=XLOOKUP(lookup_value, lookup_array, return_array)",
      };
    }

    if (expectedFunction === "VLOOKUP") {
      return {
        stepOneTitle: "Identify the lookup table",
        stepOneMessage:
          "Determine the value to find, the full table containing it, and which column in that table contains the result.",
        stepThreeTitle: "Assemble the VLOOKUP formula",
        stepThreeMessage:
          "For an exact match, VLOOKUP uses the lookup value, table, return-column number, and FALSE.",
        pattern:
          "=VLOOKUP(lookup_value, table_array, col_index_num, FALSE)",
      };
    }

    if (expectedFunction === "INDEX") {
      return {
        stepOneTitle: "Separate the two jobs",
        stepOneMessage:
          "MATCH finds the position of the lookup value. INDEX uses that position to return the corresponding value from another range.",
        stepThreeTitle: "Combine INDEX and MATCH",
        stepThreeMessage:
          "Place MATCH inside INDEX so the row position found by MATCH becomes the row used by INDEX.",
        pattern:
          "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))",
      };
    }
  }

  /* ---------------------------------------------------------
     DATA CLEANUP
  --------------------------------------------------------- */

  if (moduleId === "text") {
    if (expectedFunction === "TRIM") {
      return {
        stepOneTitle: "Identify the text to clean",
        stepOneMessage:
          "Find the cell containing the text with unwanted spaces.",
        stepThreeTitle: "Assemble the TRIM formula",
        stepThreeMessage:
          "TRIM needs one text value or cell reference.",
        pattern: "=TRIM(text)",
      };
    }

    if (
      expectedFunction === "LEFT" ||
      expectedFunction === "RIGHT"
    ) {
      return {
        stepOneTitle: "Identify the text and direction",
        stepOneMessage:
          `Find the text cell and determine how many characters Excel should return from the ${expectedFunction === "LEFT" ? "left" : "right"} side.`,
        stepThreeTitle: `Assemble the ${expectedFunction} formula`,
        stepThreeMessage:
          `${expectedFunction} uses the text first and the number of characters second.`,
        pattern:
          `=${expectedFunction}(text, num_chars)`,
      };
    }

    if (expectedFunction === "LEN") {
      return {
        stepOneTitle: "Identify the text to measure",
        stepOneMessage:
          "Find the cell whose number of characters needs to be counted.",
        stepThreeTitle: "Assemble the LEN formula",
        stepThreeMessage:
          "LEN needs one text value or cell reference.",
        pattern: "=LEN(text)",
      };
    }

    if (expectedFunction === "TEXTJOIN") {
      return {
        stepOneTitle: "Identify what should be combined",
        stepOneMessage:
          "Determine the delimiter, whether empty cells should be ignored, and which text cells should be joined.",
        stepThreeTitle: "Assemble the TEXTJOIN formula",
        stepThreeMessage:
          "TEXTJOIN uses the delimiter first, the ignore-empty choice second, and the text values or range last.",
        pattern:
          '=TEXTJOIN(delimiter, ignore_empty, text1, ...)',
      };
    }
  }

  /* ---------------------------------------------------------
     DATA ANALYSIS
  --------------------------------------------------------- */

  if (moduleId === "analysis") {
    if (expectedFunction === "SUMIF") {
      return {
        stepOneTitle: "Identify the condition",
        stepOneMessage:
          "Determine which range Excel should test, what criterion it should look for, and which values should be totaled.",
        stepThreeTitle: "Assemble the SUMIF formula",
        stepThreeMessage:
          "SUMIF uses the criteria range, the criterion, and then the sum range.",
        pattern:
          "=SUMIF(criteria_range, criteria, sum_range)",
      };
    }

    if (expectedFunction === "SUMIFS") {
      return {
        stepOneTitle: "Identify all conditions",
        stepOneMessage:
          "Determine the values to total and each criteria-range/criterion pair that must be satisfied.",
        stepThreeTitle: "Assemble the SUMIFS formula",
        stepThreeMessage:
          "SUMIFS begins with the sum range, followed by each criteria range and criterion.",
        pattern:
          "=SUMIFS(sum_range, criteria_range1, criteria1, ...)",
      };
    }

    if (expectedFunction === "COUNTIF") {
      return {
        stepOneTitle: "Identify what should be counted",
        stepOneMessage:
          "Determine which range Excel should test and the single criterion records must meet.",
        stepThreeTitle: "Assemble the COUNTIF formula",
        stepThreeMessage:
          "COUNTIF uses the criteria range first and the criterion second.",
        pattern:
          "=COUNTIF(range, criteria)",
      };
    }

    if (expectedFunction === "COUNTIFS") {
      return {
        stepOneTitle: "Identify all counting conditions",
        stepOneMessage:
          "Determine each range Excel should test and the criterion paired with that range.",
        stepThreeTitle: "Assemble the COUNTIFS formula",
        stepThreeMessage:
          "COUNTIFS uses criteria-range/criterion pairs.",
        pattern:
          "=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)",
      };
    }

    if (expectedFunction === "AVERAGEIF") {
      return {
        stepOneTitle: "Identify the condition and values",
        stepOneMessage:
          "Determine which range Excel should test, the criterion it should apply, and which matching values should be averaged.",
        stepThreeTitle: "Assemble the AVERAGEIF formula",
        stepThreeMessage:
          "AVERAGEIF uses the criteria range, criterion, and average range.",
        pattern:
          "=AVERAGEIF(criteria_range, criteria, average_range)",
      };
    }
  }

  /* ---------------------------------------------------------
     DEFAULT — FORMULA FOUNDATIONS
  --------------------------------------------------------- */

  return {
    stepOneTitle: "Identify the calculation",
    stepOneMessage:
      "What does the task ask Excel to do: add values, calculate an average, count records, or find a minimum or maximum?",

    stepThreeTitle: "Assemble the formula",
    stepThreeMessage:
      "Put the pieces together using this pattern:",

    pattern: "=FUNCTION(range)",
  };
}

/* =========================================================
   SPREADSHEET
========================================================= */

function SpreadsheetVisual({ columns = [] }) {
  if (!columns.length) {
    return null;
  }

  const rowNumbers =
    getSpreadsheetRows(columns);

  return (
    <div className="retrieval-table-wrapper">
      <div
        className="retrieval-table"
        style={{
          gridTemplateColumns: `46px repeat(${columns.length}, minmax(150px, 1fr))`,
        }}
      >
        <div className="retrieval-corner" />

        {columns.map((column) => (
          <div
            key={`letter-${column.letter}`}
            className="retrieval-column-letter"
          >
            {column.letter}
          </div>
        ))}

        <div className="retrieval-row-number">
          1
        </div>

        {columns.map((column) => (
          <div
            key={`${column.letter}-heading`}
            className="retrieval-heading-cell"
          >
            {column.heading}
          </div>
        ))}

        {rowNumbers.map((rowNumber) => (
          <SpreadsheetRow
            key={rowNumber}
            rowNumber={rowNumber}
            columns={columns}
          />
        ))}
      </div>
    </div>
  );
}

function SpreadsheetRow({
  rowNumber,
  columns,
}) {
  return (
    <>
      <div className="retrieval-row-number">
        {rowNumber}
      </div>

      {columns.map((column) => {
        const cell = (
          column.cells || []
        ).find(
          (item) =>
            String(item.row) ===
            String(rowNumber)
        );

        return (
          <div
            key={`${column.letter}-${rowNumber}`}
            className="retrieval-data-cell"
          >
            {cell?.value ?? ""}
          </div>
        );
      })}
    </>
  );
}

/* =========================================================
   FORMULA INPUT CHALLENGE
========================================================= */

function FormulaInputChallenge({
  challenge,
  onComplete,
}) {
  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState(null);

  const [attempts, setAttempts] =
    useState(0);

  const [isCorrect, setIsCorrect] =
    useState(false);

  const [answerRevealed, setAnswerRevealed] =
    useState(false);

  /* ---------------------------------------------------------
     RESET WHEN CHALLENGE CHANGES
  --------------------------------------------------------- */

  useEffect(() => {
    setAnswer("");
    setFeedback(null);
    setAttempts(0);
    setIsCorrect(false);
    setAnswerRevealed(false);
  }, [challenge?.id]);

  if (!challenge) {
    return null;
  }

  const {
    title,
    subtitle,
    scenario,
    prompt,
    columns = [],
    scaffold,
    correctAnswer,
    hint,
    correctFeedback,
  } = challenge;

  const expectedFunction =
    getFunctionName(correctAnswer);

  const expectedRange =
    getSimpleRange(correctAnswer);

  const [expectedStartCell, expectedEndCell] =
    expectedRange
      ? expectedRange.split(":")
      : ["", ""];

  const guidance =
    getGuidanceContent(challenge);

  /* =========================================================
     DIAGNOSTIC FEEDBACK
  ========================================================= */

  const getDiagnosticFeedback = (
    learnerAnswer,
    attemptNumber
  ) => {
    const trimmed =
      learnerAnswer.trim();

    const normalized =
      normalizeFormula(learnerAnswer);

    const learnerFunction =
      getFunctionName(learnerAnswer);

    const learnerRange =
      getSimpleRange(learnerAnswer);

    /* -------------------------------------------------------
       1. Missing equals sign
    ------------------------------------------------------- */

    if (!trimmed.startsWith("=")) {
      return {
        type: "syntax",
        title: "Start with =",
        message:
          "Excel formulas begin with an equals sign. Add = at the beginning and try again.",
      };
    }

    /* -------------------------------------------------------
       2. Correct function but comma instead of colon
       Applies to formulas that use a continuous range
    ------------------------------------------------------- */

    if (
      learnerFunction ===
        expectedFunction &&
      expectedRange &&
      normalized.includes(",") &&
      normalized.includes(
        expectedStartCell
      ) &&
      normalized.includes(
        expectedEndCell
      )
    ) {
      return {
        type: "range",
        title:
          "Your function is correct",
        message: `You found the correct cells. A continuous Excel range uses a colon (:), so think ${expectedStartCell}:${expectedEndCell}.`,
      };
    }

    /* -------------------------------------------------------
       3. Correct range, wrong function
    ------------------------------------------------------- */

    if (
      expectedRange &&
      learnerRange === expectedRange &&
      learnerFunction &&
      learnerFunction !==
        expectedFunction
    ) {
      return {
        type: "function",
        title:
          "Your cell range is correct",
        message:
          "Now reconsider the calculation. What does the task ask Excel to do with those values?",
      };
    }

    /* -------------------------------------------------------
       4. Correct function, malformed syntax
    ------------------------------------------------------- */

    if (
      learnerFunction ===
        expectedFunction &&
      (!normalized.includes("(") ||
        !normalized.endsWith(")"))
    ) {
      return {
        type: "syntax",
        title:
          "Check the formula structure",
        message:
          challenge.moduleId === "foundations"
            ? "You chose the correct function. Excel needs the cell range inside parentheses: =FUNCTION(range)."
            : "You chose the correct function. Review the guided formula pattern and check the arguments, separators, cell references, and parentheses.",
      };
    }

    /* -------------------------------------------------------
       5. Correct function, wrong range
       Applies to range-based formulas
    ------------------------------------------------------- */

    if (
      learnerFunction ===
        expectedFunction &&
      expectedRange &&
      learnerRange !== expectedRange
    ) {
      if (attemptNumber >= 2) {
        return {
          type: "range",
          title:
            "Your function is correct",
          message: `Now focus on the range. The data starts in ${expectedStartCell} and ends in ${expectedEndCell}.`,
        };
      }

      return {
        type: "range",
        title:
          "Your function is correct",
        message:
          "Now check which cells contain all of the values you need.",
      };
    }

    /* -------------------------------------------------------
       6. Correct range but function not recognized
    ------------------------------------------------------- */

    if (
      expectedRange &&
      learnerRange === expectedRange
    ) {
      return {
        type: "function",
        title:
          "Your range looks right",
        message:
          "Now identify the Excel function that matches the calculation in the task.",
      };
    }

    /* -------------------------------------------------------
       7. LOGIC-SPECIFIC SUPPORT
    ------------------------------------------------------- */

    if (
      challenge.moduleId === "logic" &&
      learnerFunction === expectedFunction
    ) {
      return {
        type: "support",
        title:
          "Your function is correct",
        message:
          "Now review the conditions, comparison operators, commas, cell references, and the values the formula should return.",
      };
    }

    /* -------------------------------------------------------
       8. Stronger feedback after repeated attempts
    ------------------------------------------------------- */

    if (attemptNumber >= 3) {
      return {
        type: "support",
        title:
          challenge.moduleId === "foundations"
            ? "Build it in three parts"
            : "Build the formula step by step",
        message:
          challenge.moduleId === "foundations"
            ? "Start with =, choose the function that matches the task, then place the cell range inside parentheses."
            : "Use the Guided Support below to identify each required argument, then assemble the formula.",
      };
    }

    /* -------------------------------------------------------
       DEFAULT
    ------------------------------------------------------- */

    return {
      type: "general",
      title: "Try again",
      message:
        challenge.moduleId === "foundations"
          ? "First identify the calculation the task requires. Then identify the cells containing the data."
          : "First identify what the task asks Excel to do. Then determine which function and cell references match that task.",
    };
  };

  /* =========================================================
     CHECK ANSWER
  ========================================================= */

  const checkAnswer = () => {
    if (!answer.trim()) {
      setFeedback({
        type: "general",
        title: "Enter a formula",
        message:
          "Construct your formula in the formula bar first.",
      });

      return;
    }

    const learnerAnswer =
      normalizeFormula(answer);

    const expectedAnswer =
      normalizeFormula(correctAnswer);

    if (
      learnerAnswer === expectedAnswer
    ) {
      setIsCorrect(true);

      setFeedback({
        type: "correct",
        title: "Correct!",
        message:
          correctFeedback ||
          "You constructed the formula correctly.",
      });

      return;
    }

    const nextAttempt =
      attempts + 1;

    setAttempts(nextAttempt);

    setFeedback(
      getDiagnosticFeedback(
        answer,
        nextAttempt
      )
    );
  };

  /* =========================================================
     SHOW ANSWER
  ========================================================= */

  const showAnswer = () => {
    setAnswerRevealed(true);

    setFeedback({
      type: "support",
      title: "Answer revealed",
      message:
        "Review the formula below, then type it into the formula bar yourself and select Check Formula.",
    });
  };

  /* =========================================================
     KEYBOARD
  ========================================================= */

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !isCorrect
    ) {
      event.preventDefault();
      checkAnswer();
    }
  };

  /* =========================================================
     CONTINUE
  ========================================================= */

  const handleContinue = () => {
    if (onComplete) {
      onComplete(challenge.id);
    }
  };

  /* =========================================================
     SCAFFOLD LEVELS
  ========================================================= */

  const showCalculationSupport =
    attempts >= 1 && !isCorrect;

  const showRangeSupport =
    attempts >= 2 &&
    !isCorrect &&
    expectedRange;

  const showFormulaSupport =
    attempts >= 3 && !isCorrect;

  const canRevealAnswer =
    attempts >= 3 &&
    !isCorrect &&
    !answerRevealed;

  /* =========================================================
     UI
  ========================================================= */

  return (
    <section className="formula-input-challenge">

      {/* =====================================================
          CHALLENGE HEADER
      ===================================================== */}

      <header className="retrieval-header">
        <p className="retrieval-eyebrow">
          Retrieval Practice
        </p>

        <h2>{title}</h2>

        {subtitle && (
          <p className="retrieval-subtitle">
            {subtitle}
          </p>
        )}
      </header>

      {/* =====================================================
          WORKPLACE SCENARIO
      ===================================================== */}

      {scenario && (
        <section className="retrieval-scenario">
          <span>
            Workplace Scenario
          </span>

          <p>{scenario}</p>
        </section>
      )}

      {/* =====================================================
          SPREADSHEET
      ===================================================== */}

      <SpreadsheetVisual
        columns={columns}
      />

      {/* =====================================================
          TASK
      ===================================================== */}

      <section className="retrieval-task">
        <span className="retrieval-section-label">
          Your Task
        </span>

        <p>{prompt}</p>
      </section>

      {/* =====================================================
          INITIAL SCAFFOLD
      ===================================================== */}

      {scaffold && (
        <div className="retrieval-formula-structure">
          <span>
            Formula structure
          </span>

          <code>{scaffold}</code>
        </div>
      )}

      {/* =====================================================
          FORMULA BAR
      ===================================================== */}

      <div className="retrieval-answer-area">
        <label
          htmlFor="formula-answer"
          className="retrieval-answer-label"
        >
          Enter your formula
        </label>

        <div
          className={`retrieval-formula-bar ${
            isCorrect
              ? "retrieval-formula-bar-correct"
              : ""
          }`}
        >
          <span
            className="retrieval-fx"
            aria-hidden="true"
          >
            fx
          </span>

          <input
            id="formula-answer"
            type="text"
            value={answer}
            onChange={(event) =>
              setAnswer(
                event.target.value
              )
            }
            onKeyDown={handleKeyDown}
            placeholder="=..."
            autoComplete="off"
            spellCheck="false"
            disabled={isCorrect}
            aria-describedby={
              feedback
                ? "formula-feedback"
                : undefined
            }
          />
        </div>

        <small className="retrieval-input-help">
          Press Enter or select Check Formula.
        </small>
      </div>

      {/* =====================================================
          FEEDBACK
      ===================================================== */}

      {feedback && (
        <div
          id="formula-feedback"
          className={`retrieval-feedback ${
            isCorrect
              ? "retrieval-feedback-correct"
              : "retrieval-feedback-guidance"
          }`}
          aria-live="polite"
        >
          <span className="retrieval-feedback-icon">
            {isCorrect ? "✓" : "→"}
          </span>

          <div>
            <strong>
              {feedback.title}
            </strong>

            <p>
              {feedback.message}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          PROGRESSIVE SCAFFOLDING
      ===================================================== */}

      {!isCorrect &&
        attempts > 0 && (
          <section className="retrieval-guidance">
            <div className="retrieval-guidance-header">
              <span>
                Guided Support
              </span>

              <small>
                {attempts}{" "}
                {attempts === 1
                  ? "attempt"
                  : "attempts"}
              </small>
            </div>

            {/* STEP 1 */}

            {showCalculationSupport && (
              <div className="retrieval-guidance-step">
                <span className="retrieval-step-number">
                  1
                </span>

                <div>
                  <strong>
                    {guidance.stepOneTitle}
                  </strong>

                  <p>
                    {guidance.stepOneMessage}
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2 — RANGE-BASED FORMULAS */}

            {showRangeSupport && (
              <div className="retrieval-guidance-step">
                <span className="retrieval-step-number">
                  2
                </span>

                <div>
                  <strong>
                    Identify the cells
                  </strong>

                  <p>
                    The relevant values begin
                    in{" "}
                    <code>
                      {expectedStartCell}
                    </code>{" "}
                    and end in{" "}
                    <code>
                      {expectedEndCell}
                    </code>
                    .
                  </p>

                  <p>
                    A continuous range is
                    written:
                  </p>

                  <code className="retrieval-range-example">
                    {expectedRange}
                  </code>
                </div>
              </div>
            )}

            {/* STEP 2 — NON-RANGE / MULTI-ARGUMENT FORMULAS */}

            {attempts >= 2 &&
              !expectedRange &&
              challenge.moduleId !== "foundations" && (
                <div className="retrieval-guidance-step">
                  <span className="retrieval-step-number">
                    2
                  </span>

                  <div>
                    <strong>
                      Map the task to the cells
                    </strong>

                    <p>
                      Review the spreadsheet
                      headings and identify which
                      cell references belong in
                      each part of the formula.
                    </p>
                  </div>
                </div>
              )}

            {/* STEP 3 */}

            {showFormulaSupport && (
              <div className="retrieval-guidance-step retrieval-guidance-step-final">
                <span className="retrieval-step-number">
                  3
                </span>

                <div>
                  <strong>
                    {guidance.stepThreeTitle}
                  </strong>

                  <p>
                    {guidance.stepThreeMessage}
                  </p>

                  <code className="retrieval-formula-pattern">
                    {guidance.pattern}
                  </code>
                </div>
              </div>
            )}

            {/* CHALLENGE-SPECIFIC HINT */}

            {attempts >= 2 &&
              hint && (
                <div className="retrieval-hint">
                  <strong>
                    Hint:
                  </strong>{" "}
                  {hint}
                </div>
              )}

            {/* SHOW ANSWER */}

            {canRevealAnswer && (
              <div className="retrieval-answer-reveal-action">
                <button
                  type="button"
                  className="retrieval-show-answer-button"
                  onClick={showAnswer}
                >
                  Show Answer
                </button>
              </div>
            )}

            {/* REVEALED ANSWER */}

            {answerRevealed && (
              <div className="retrieval-revealed-answer">
                <span>
                  Answer
                </span>

                <code>
                  {correctAnswer}
                </code>

                <p>
                  Type this formula into the
                  formula bar above, then select{" "}
                  <strong>
                    Check Formula
                  </strong>
                  .
                </p>
              </div>
            )}
          </section>
        )}

      {/* =====================================================
          ACTION
      ===================================================== */}

      <div className="retrieval-actions">
        {!isCorrect ? (
          <button
            type="button"
            className="continue-button"
            onClick={checkAnswer}
          >
            Check Formula
          </button>
        ) : (
          <button
            type="button"
            className="continue-button"
            onClick={handleContinue}
          >
            Continue →
          </button>
        )}
      </div>
    </section>
  );
}

export default FormulaInputChallenge;