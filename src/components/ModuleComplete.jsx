function ModuleComplete({
  module,
  onContinue,
  onReplay,
}) {
  if (!module) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <section
        className="module-complete"
        role="dialog"
        aria-modal="true"
        aria-labelledby="module-complete-title"
      >
        <div className="module-complete-icon">
          ✓
        </div>

        <p className="module-complete-label">
          MODULE {module.number} COMPLETE
        </p>

        <h2 id="module-complete-title">
          {module.title}
        </h2>

        <p>
          You recovered all {module.challenges.length} skills
          in this module.
        </p>

        <div className="module-complete-skills">
          {module.challenges.map((challenge) => (
            <span key={challenge.id}>
              ✓ {challenge.formula}
            </span>
          ))}
        </div>

        <div className="module-complete-actions">
          {onReplay && (
            <button
              type="button"
              className="secondary-button"
              onClick={onReplay}
            >
              Replay Module
            </button>
          )}

          <button
            type="button"
            className="continue-button"
            onClick={onContinue}
          >
            Return to Quest Map →
          </button>
        </div>
      </section>
    </div>
  );
}

export default ModuleComplete;