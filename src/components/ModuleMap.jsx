import ModuleCard from "./ModuleCard";

function ModuleMap({
  modules,
  completedChallengeIds = [],
  onSelectModule,
  onResetProgress,
}) {
  const getCompletedCount = (module) =>
    module.challenges.filter((challenge) =>
      completedChallengeIds.includes(challenge.id)
    ).length;

  const isModuleComplete = (module) =>
    getCompletedCount(module) ===
    module.challenges.length;

  const getModuleStatus = (module, index) => {
    if (isModuleComplete(module)) {
      return "complete";
    }

    if (index === 0) {
      return "available";
    }

    const previousModule = modules[index - 1];

    if (isModuleComplete(previousModule)) {
      return "available";
    }

    return "locked";
  };

  const totalSkills = modules.reduce(
    (total, module) =>
      total + module.challenges.length,
    0
  );

  const completedSkills = modules.reduce(
    (total, module) =>
      total + getCompletedCount(module),
    0
  );

  const overallProgress =
    totalSkills === 0
      ? 0
      : Math.round(
          (completedSkills / totalSkills) * 100
        );

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset all progress? This will return all modules to their starting state."
    );

    if (confirmed) {
      onResetProgress();
    }
  };

  return (
    <main className="module-map">
      <header className="module-map-header">
        <p className="eyebrow">
          Excel Quest
        </p>

        <h1>Formula Adventure</h1>

        <p>
          Build workplace Excel skills by completing five
          progressive learning missions.
        </p>
      </header>

      <section className="overall-progress">
        <div className="overall-progress-heading">
          <span>Quest Progress</span>

          <strong>
            {completedSkills}/{totalSkills} skills
          </strong>
        </div>

        <div className="module-progress-track">
          <div
            className="module-progress-fill"
            style={{
              width: `${overallProgress}%`,
            }}
          />
        </div>
      </section>

      <section
        className="module-grid"
        aria-label="Excel Quest modules"
      >
        {modules.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            status={getModuleStatus(
              module,
              index
            )}
            completedCount={
              getCompletedCount(module)
            }
            onSelect={onSelectModule}
          />
        ))}
      </section>

      {completedSkills > 0 && (
        <div className="reset-progress-area">
          <button
            type="button"
            className="reset-progress-button"
            onClick={handleReset}
          >
            Reset Progress
          </button>
        </div>
      )}

      <footer className="module-map-footer">
        <span>© Olga Orlova</span>
        <span
          className="footer-divider"
          aria-hidden="true"
        >
          ·
        </span>
        <span>
          Technical Instructional Designer
        </span>
      </footer>
    </main>
  );
}

export default ModuleMap;