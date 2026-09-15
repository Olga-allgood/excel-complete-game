function ModuleCard({
  module,
  status = "locked",
  completedCount = 0,
  onSelect,
}) {
  const total = module.challenges.length;

  const isLocked = status === "locked";
  const isComplete = status === "complete";

  const percentage =
    total === 0
      ? 0
      : Math.round((completedCount / total) * 100);

  return (
    <button
      type="button"
      className={`module-card module-card-${status}`}
      onClick={() => !isLocked && onSelect(module.id)}
      disabled={isLocked}
    >
      <div className="module-card-top">
        <span className="module-number">
          MODULE {module.number}
        </span>

        <span className={`module-status module-status-${status}`}>
          {isComplete
            ? "✓ Complete"
            : isLocked
              ? "🔒 Locked"
              : "Available"}
        </span>
      </div>

      <h3>{module.title}</h3>

      <p>{module.subtitle}</p>

      <div className="module-formulas">
        {module.challenges.map((challenge) => (
          <span key={challenge.id}>
            {challenge.formula}
          </span>
        ))}
      </div>

      <div className="module-card-progress">
        <div className="module-progress-track">
          <div
            className="module-progress-fill"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <small>
          {completedCount}/{total} skills
        </small>
      </div>

      {!isLocked && (
        <span className="module-action">
          {isComplete ? "Replay Module →" : "Start Quest →"}
        </span>
      )}
    </button>
  );
}

export default ModuleCard;