function QuestComplete() {
  return (
    <section className="quest-complete quest-complete-final">
      <div className="completion-badge">
        ✓
      </div>

      <div className="completion-content">
        <p>
          Excel Quest Complete
        </p>

        <h2>
          Report Restored!
        </h2>

        <div className="completion-formulas">
          <span>
            ✓ SUM()
          </span>

          <span>
            ✓ AVERAGE()
          </span>

          <span>
            ✓ IF()
          </span>
        </div>

        <div className="completion-message">
          You recovered the missing formulas
          and successfully completed the
          monthly report.
        </div>
      </div>
    </section>
  );
}

export default QuestComplete;