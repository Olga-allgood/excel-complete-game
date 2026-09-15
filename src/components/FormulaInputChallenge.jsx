import { useEffect, useState } from "react";

function normalizeFormula(formula) {
  return formula
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}

function FormulaInputChallenge({
  challenge,
  onComplete,
}) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setAnswer("");
    setFeedback("");
    setAttempts(0);
    setIsCorrect(false);
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
    type,
  } = challenge;

  const checkAnswer = () => {
    if (!answer.trim()) {
      setFeedback(
        "Enter a formula before checking your answer."
      );
      return;
    }

    const learnerAnswer = normalizeFormula(answer);
    const expectedAnswer = normalizeFormula(correctAnswer);

    if (learnerAnswer === expectedAnswer) {
      setIsCorrect(true);

      setFeedback(
        correctFeedback ||
          "Correct! You constructed the formula successfully."
      );

      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (!answer.trim().startsWith("=")) {
      setFeedback(
        "Excel formulas begin with =. Add an equals sign and try again."
      );
      return;
    }

    if (newAttempts === 1) {
      setFeedback(
        "Not quite. Check both the function and the cell range, then try again."
      );
      return;
    }

    setFeedback(
      hint ||
        "Review the spreadsheet and construct the formula again."
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isCorrect) {
      checkAnswer();
    }
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete(challenge.id);
    }
  };

  return (
    <section className="formula-input-challenge">
      <header className="formula-input-header">
        <div>
          <span className="formula-input-level">
            RETRIEVAL PRACTICE
          </span>

          <h2>{title}</h2>

          {subtitle && (
            <p className="formula-input-subtitle">
              {subtitle}
            </p>
          )}
        </div>

        {type && (
          <span className="retrieval-type">
            {type}
          </span>
        )}
      </header>

      {scenario && (
        <div className="formula-input-scenario">
          <strong>Workplace Scenario</strong>
          <p>{scenario}</p>
        </div>
      )}

      {columns.length > 0 && (
        <div className="retrieval-sheet-wrapper">
          <div
            className="retrieval-sheet"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(140px, 1fr))`,
            }}
          >
            {columns.map((column) => (
              <div
                className="retrieval-column"
                key={column.letter}
              >
                <div className="retrieval-column-letter">
                  {column.letter}
                </div>

                <div className="retrieval-column-heading">
                  {column.heading}
                </div>

                {column.cells.map((cell) => (
                  <div
                    className="retrieval-cell"
                    key={`${column.letter}-${cell.row}`}
                  >
                    <span className="retrieval-row-number">
                      {cell.row}
                    </span>

                    <span>{cell.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="formula-input-task">
        <p className="retrieval-prompt">
          {prompt}
        </p>

        {scaffold && (
          <div className="formula-scaffold">
            <span>Formula structure</span>
            <code>{scaffold}</code>
          </div>
        )}

        <label
          className="formula-input-label"
          htmlFor="formula-answer"
        >
          Enter your Excel formula
        </label>

        <div className="formula-entry">
          <span className="formula-fx">
            fx
          </span>

          <input
            id="formula-answer"
            type="text"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);

              if (!isCorrect) {
                setFeedback("");
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your formula here"
            autoComplete="off"
            spellCheck="false"
            disabled={isCorrect}
            autoFocus
          />
        </div>

        {feedback && (
          <div
            className={
              isCorrect
                ? "formula-feedback formula-feedback-correct"
                : "formula-feedback formula-feedback-try-again"
            }
          >
            {feedback}
          </div>
        )}

        {!isCorrect &&
          attempts >= 2 &&
          hint && (
            <div className="formula-hint">
              <strong>Hint:</strong>{" "}
              {hint}
            </div>
          )}

        <div className="formula-input-actions">
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
      </div>
    </section>
  );
}

export default FormulaInputChallenge;