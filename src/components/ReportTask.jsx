function ReportTask({
  number,
  title,
  description,
  value,
  onChange,
  options,
  submitted,
  correct,
  attempts,
  feedbackType,
}) {
  const feedback = getTaskFeedback(
    feedbackType,
    attempts,
    value
  );

  const statusClass =
    !submitted
      ? ""
      : correct
        ? "report-task-correct"
        : "report-task-incorrect";

  const selectClass =
    !submitted
      ? ""
      : correct
        ? "task-select-correct"
        : "task-select-incorrect";

  return (
    <div className={`report-task ${statusClass}`}>
      <div
        className={`task-number ${
          submitted && correct
            ? "task-number-correct"
            : submitted
              ? "task-number-incorrect"
              : ""
        }`}
      >
        {submitted && correct
          ? "✓"
          : submitted
            ? "!"
            : number}
      </div>

      <div className="task-content">
        <div className="task-heading-row">
          <strong className="task-title">
            {title}
          </strong>

          {submitted && correct && (
            <span className="task-status task-status-correct">
              ✓ Correct
            </span>
          )}

          {submitted && !correct && (
            <span className="task-status task-status-incorrect">
              ! Try Again
            </span>
          )}
        </div>

        <p>{description}</p>

        <select
          className={selectClass}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          disabled={submitted && correct}
          aria-label={title}
          aria-invalid={submitted && !correct}
        >
          <option value="">
            Select a formula
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        {submitted && correct && (
          <div className="task-feedback task-feedback-correct">
            <strong>
              Nice work! ✓
            </strong>

            <span>
              {getCorrectFeedback(feedbackType)}
            </span>
          </div>
        )}

        {submitted &&
          !correct &&
          !value && (
            <div className="task-feedback task-feedback-incorrect">
              <strong>
                Choose a formula.
              </strong>

              <span>
                Think about what Excel needs to do,
                then select the function that matches
                that purpose.
              </span>
            </div>
          )}

        {submitted &&
          !correct &&
          value && (
            <div className="task-feedback task-feedback-incorrect">
              <strong>
                Not quite. Try again.
              </strong>

              <span>{feedback}</span>
            </div>
          )}
      </div>
    </div>
  );
}

/* =========================================================
   CORRECT FEEDBACK
========================================================= */

function getCorrectFeedback(feedbackType) {
  if (feedbackType === "sum") {
    return "SUM adds the values in B2:B4 to calculate total sales.";
  }

  if (feedbackType === "average") {
    return "AVERAGE calculates the arithmetic mean of the quiz scores in D2:D4.";
  }

  if (feedbackType === "if") {
    return 'You correctly compared Sales in B2 with Target in C2. Because the condition checks whether B2 is greater than or equal to C2, IF returns "Met" when Maya reaches her target and "Not Met" when she does not.';
  }

  return "";
}

/* =========================================================
   DIAGNOSTIC FEEDBACK
========================================================= */

function getTaskFeedback(
  feedbackType,
  attempts,
  selectedAnswer
) {
  if (feedbackType === "sum") {
    if (
      selectedAnswer ===
      "=AVERAGE(B2:B4)"
    ) {
      return "AVERAGE calculates a mean, but this task asks for the total Sales. Look at B2:B4 and choose the function that adds those values.";
    }

    if (
      selectedAnswer ===
      "=COUNT(B2:B4)"
    ) {
      return "COUNT tells you how many numeric cells are in B2:B4. This task needs the combined Sales amount, so choose the function that adds the values.";
    }

    if (attempts <= 1) {
      return "This task asks for one total from several sales values. Which function adds numbers together?";
    }

    return "The Sales values are in B2:B4. Use the function that adds every value in that range.";
  }

  if (feedbackType === "average") {
    if (
      selectedAnswer ===
      "=SUM(D2:D4)"
    ) {
      return "SUM would give you the total of the quiz scores. This task asks for their mean. Look at D2:D4 and choose the function that calculates an average.";
    }

    if (
      selectedAnswer ===
      "=COUNT(D2:D4)"
    ) {
      return "COUNT would tell you how many numeric scores are in D2:D4. It would not calculate their mean. Choose the function that averages those values.";
    }

    if (attempts <= 1) {
      return "This task asks for the mean score, not the total. Which Excel function calculates a mean?";
    }

    return "The quiz scores are in D2:D4. Use the function that adds those values and divides by the number of scores.";
  }

  if (feedbackType === "if") {
    if (
      selectedAnswer ===
      '=IF(B2<C2,"Met","Not Met")'
    ) {
      return 'You chose the correct function and the correct cells, but the comparison is reversed. B2 contains Sales and C2 contains Target. "Met" should be returned when Sales is at least the Target, so the condition needs to check whether B2 is greater than or equal to C2.';
    }

    if (
      selectedAnswer ===
      "=SUM(B2:C2)"
    ) {
      return 'You identified the relevant cells, but SUM adds the values instead of comparing them. Here Excel needs to compare Sales in B2 with Target in C2 and then return "Met" or "Not Met" based on that comparison.';
    }

    if (attempts <= 1) {
      return "Start with Maya's row. Sales is in B2 and Target is in C2. The formula needs to compare those two cells and make a decision.";
    }

    if (attempts === 2) {
      return 'Use the structure IF(condition, value_if_true, value_if_false). The condition should ask whether Sales in B2 is greater than or equal to Target in C2.';
    }

    return 'Build the condition around B2 >= C2. If it is true, return "Met"; otherwise return "Not Met".';
  }

  return "";
}

export default ReportTask;