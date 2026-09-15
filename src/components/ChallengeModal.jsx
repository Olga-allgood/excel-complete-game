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

        {columns.map((column) => (
          <div
            key={`${column.letter}-${column.row}`}
            className="excel-data-cell excel-highlight-cell"
          >
            {column.value}
          </div>
        ))}
      </div>

      <div className="excel-visual-hint">
        {footer}
      </div>
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
  const challengeData = {
    sum: {
      title: "Recover SUM()",

      prompt:
        "The monthly report needs the total sales from B2 through B4. Which formula should you use?",

      visual: (
        <ExcelRangeVisual
          columns={[
            {
              letter: "B",
              heading: "Sales",
              cells: [
                {
                  row: "2",
                  value: "5400",
                },
                {
                  row: "3",
                  value: "4200",
                },
                {
                  row: "4",
                  value: "6100",
                },
              ],
            },
          ]}
          footer="Add the values in B2:B4."
        />
      ),

      answers: [
        "=SUM(B2:B4)",
        "=AVERAGE(B2:B4)",
        "=COUNT(B2:B4)",
      ],
    },

    average: {
      title: "Recover AVERAGE()",

      prompt:
        "The report needs the mean quiz score from B2 through B4. Which formula should you use?",

      visual: (
        <ExcelRangeVisual
          columns={[
            {
              letter: "B",
              heading: "Quiz Score",
              cells: [
                {
                  row: "2",
                  value: "80",
                },
                {
                  row: "3",
                  value: "90",
                },
                {
                  row: "4",
                  value: "100",
                },
              ],
            },
          ]}
          footer="Calculate the mean of B2:B4."
        />
      ),

      answers: [
        "=SUM(B2:B4)",
        "=AVERAGE(B2:B4)",
        "=COUNT(B2:B4)",
      ],
    },

    if: {
      title: "Recover IF()",

      prompt:
        'Maya should receive "Met" when Sales is at least the Target and "Not Met" otherwise. Which formula should you use?',

      visual: (
        <ExcelComparisonVisual
          columns={[
            {
              letter: "B",
              heading: "Sales",
              row: "2",
              value: "5400",
            },
            {
              letter: "C",
              heading: "Target",
              row: "2",
              value: "5000",
            },
          ]}
          footer="Compare Sales (B2) with Target (C2)."
        />
      ),

      answers: [
        '=IF(B2>=C2,"Met","Not Met")',
        '=IF(B2<C2,"Met","Not Met")',
        "=SUM(B2:C2)",
      ],
    },
  };

  const data = challengeData[challenge];

  return (
    <div className="modal-overlay">
      <section
        className="challenge-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-title"
      >
        <p className="challenge-label">
          Formula Challenge
        </p>

        <h2 id="challenge-title">
          {data.title}
        </h2>

        <p>{data.prompt}</p>

        {data.visual}

        <div className="answers">
          {data.answers.map((answer) => {
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