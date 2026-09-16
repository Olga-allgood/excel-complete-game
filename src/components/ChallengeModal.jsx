import ExcelRangeVisual from "./ExcelRangeVisual";

function ExcelComparisonVisual({
  columns,
  footer,
}) {
  return (
    <div className="challenge-excel">
      <div
        className="challenge-excel-grid"
        style={{
          gridTemplateColumns: `42px repeat(${columns.length}, minmax(150px, 1fr))`,
        }}
      >
        <div className="excel-corner" />

        {columns.map((column) => (
          <div
            key={column.letter}
            className="excel-column-letter"
          >
            {column.letter}
          </div>
        ))}

        <div className="excel-row-number">
          1
        </div>

        {columns.map((column) => (
          <div
            key={`${column.letter}-header`}
            className="excel-header-cell"
          >
            {column.heading}
          </div>
        ))}

        <div className="excel-row-number">
          2
        </div>

        {columns.map((column) => {
          const firstCell =
            column.cells?.[0];

          return (
            <div
              key={`${column.letter}-2`}
              className="excel-data-cell excel-highlight-cell"
            >
              {firstCell?.value ?? ""}
            </div>
          );
        })}
      </div>

      {footer && (
        <div className="excel-visual-hint">
          {footer}
        </div>
      )}
    </div>
  );
}

function ChallengeModal({
  challenge,
  selectedAnswer,
  feedback,
  completed,
  isCorrect,
  onAnswer,
  onContinue,
}) {
  if (!challenge) {
    return null;
  }

  const {
    title,
    formula,
    prompt,
    columns = [],
    visualHint,
    answers = [],
    moduleTitle,
  } = challenge;

  /*
   * Use the comparison layout when the challenge
   * contains multiple columns with one data row.
   *
   * Otherwise use ExcelRangeVisual for ranges such
   * as B2:B4.
   */
  const isComparisonChallenge =
    columns.length > 1 &&
    columns.every(
      (column) =>
        Array.isArray(column.cells) &&
        column.cells.length === 1
    );

  return (
    <div className="modal-overlay">
      <section
        className="challenge-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-title"
      >
        <p className="challenge-label">
          {moduleTitle
            ? `${moduleTitle} · Formula Challenge`
            : "Formula Challenge"}
        </p>

        <h2 id="challenge-title">
          {title ||
            `Recover ${formula}`}
        </h2>

        {prompt && <p>{prompt}</p>}

        {columns.length > 0 &&
          (isComparisonChallenge ? (
            <ExcelComparisonVisual
              columns={columns}
              footer={visualHint}
            />
          ) : (
            <ExcelRangeVisual
              columns={columns}
              footer={visualHint}
            />
          ))}

        <div className="answers">
          {answers.map((answer) => {
            const isSelected =
              selectedAnswer === answer;

            const stateClass =
              !isSelected
                ? ""
                : isCorrect
                  ? "answer-correct"
                  : "answer-incorrect";

            return (
              <button
                key={answer}
                type="button"
                className={`answer-button ${stateClass}`}
                onClick={() =>
                  onAnswer(answer)
                }
                aria-pressed={isSelected}
              >
                {answer}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div
            className={`feedback ${
              isCorrect
                ? "correct-feedback"
                : "challenge-incorrect-feedback"
            }`}
          >
            <strong>
              {isCorrect
                ? "Nice work! ✓"
                : "Not quite. Try again."}
            </strong>

            <span>{feedback}</span>
          </div>
        )}

        {completed && (
          <button
            type="button"
            className="continue-button"
            onClick={onContinue}
          >
            Formula Recovered →
          </button>
        )}
      </section>
    </div>
  );
}

export default ChallengeModal;