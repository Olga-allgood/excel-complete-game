function ModuleProgress({
  module,
  completedChallengeIds = [],
}) {
  if (!module) {
    return null;
  }

  const completedCount = module.challenges.filter((challenge) =>
    completedChallengeIds.includes(challenge.id)
  ).length;

  const total = module.challenges.length;

  const percentage =
    total === 0
      ? 0
      : Math.round((completedCount / total) * 100);

  return (
    <section
      className="module-progress"
      aria-label={`${module.title} progress`}
    >
      <div className="module-progress-heading">
        <div>
          <span>
            Module {module.number}
          </span>

          <strong>
            {module.title}
          </strong>
        </div>

        <span>
          {completedCount}/{total} skills
        </span>
      </div>

      <div className="module-progress-track">
        <div
          className="module-progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="module-progress-skills">
        {module.challenges.map((challenge) => {
          const completed =
            completedChallengeIds.includes(challenge.id);

          return (
            <span
              key={challenge.id}
              className={
                completed
                  ? "module-skill-complete"
                  : "module-skill-pending"
              }
            >
              {completed ? "✓ " : ""}
              {challenge.formula}
            </span>
          );
        })}
      </div>
    </section>
  );
}

export default ModuleProgress;