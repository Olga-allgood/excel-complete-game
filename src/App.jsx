import { useEffect, useRef, useState } from "react";
import "./App.css";

import ChallengeModal from "./components/ChallengeModal";
import FormulaInputChallenge from "./components/FormulaInputChallenge";
import FormulaToken from "./components/FormulaToken";
import ModuleComplete from "./components/ModuleComplete";
import ModuleMap from "./components/ModuleMap";
import ModuleProgress from "./components/ModuleProgress";

import {
  curriculumModules,
  getModuleById,
} from "./data/curriculum";

import {
  foundationRetrievalChallenges,
} from "./data/retrieval";

const WORLD_START = 300;
const CHALLENGE_SPACING = 430;
const CHECKPOINT_DISTANCE = 55;
const PLAYER_STEP = 18;

function App() {
  /* =========================================================
     NAVIGATION
  ========================================================= */

  const [screen, setScreen] = useState("map");
  const [activeModuleId, setActiveModuleId] = useState(null);

  /* =========================================================
     LEVEL 1 — GAME STATE
  ========================================================= */

  const [playerX, setPlayerX] = useState(80);

  const [currentChallengeId, setCurrentChallengeId] =
    useState(null);

  const [completedChallengeIds, setCompletedChallengeIds] =
    useState([]);

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const movementTimer = useRef(null);

  /* =========================================================
     LEVEL 2 — RETRIEVAL PRACTICE
  ========================================================= */

  const [retrievalStarted, setRetrievalStarted] =
    useState(false);

  const [retrievalIndex, setRetrievalIndex] =
    useState(0);

  const [retrievalComplete, setRetrievalComplete] =
    useState(false);

  /* =========================================================
     ACTIVE MODULE
  ========================================================= */

  const activeModule = activeModuleId
    ? getModuleById(activeModuleId)
    : null;

  const currentChallenge =
    activeModule?.challenges.find(
      (challenge) =>
        challenge.id === currentChallengeId
    ) ?? null;

  const completedInActiveModule = activeModule
    ? activeModule.challenges.filter((challenge) =>
        completedChallengeIds.includes(challenge.id)
      ).length
    : 0;

  const activeModuleComplete =
    Boolean(activeModule) &&
    completedInActiveModule ===
      activeModule.challenges.length;

  /* =========================================================
     RETRIEVAL DATA
  ========================================================= */

  // Foundations gets Level 2 retrieval practice.
  // We use the module title because the curriculum module ID
  // is not "foundations".
  const hasRetrievalPractice =
    activeModule?.title === "Formula Foundations";

  const retrievalTotal =
    hasRetrievalPractice
      ? foundationRetrievalChallenges.length
      : 0;

  const currentRetrievalChallenge =
    hasRetrievalPractice &&
    retrievalStarted &&
    !retrievalComplete
      ? foundationRetrievalChallenges[
          retrievalIndex
        ] ?? null
      : null;

  /* =========================================================
     GENERATED WORLD
  ========================================================= */

  const checkpoints = activeModule
    ? activeModule.challenges.map(
        (challenge, index) => ({
          challenge,
          x:
            WORLD_START +
            index * CHALLENGE_SPACING,
        })
      )
    : [];

  const worldWidth = activeModule
    ? Math.max(
        1400,
        WORLD_START +
          activeModule.challenges.length *
            CHALLENGE_SPACING +
          400
      )
    : 1400;

  /* =========================================================
     MODULE SELECTION
  ========================================================= */

  const selectModule = (moduleId) => {
    const module = getModuleById(moduleId);

    if (!module) {
      return;
    }

    setActiveModuleId(moduleId);
    setCurrentChallengeId(null);
    setSelectedAnswer("");
    setFeedback("");

    setRetrievalStarted(false);
    setRetrievalIndex(0);
    setRetrievalComplete(false);

    const firstIncompleteIndex =
      module.challenges.findIndex(
        (challenge) =>
          !completedChallengeIds.includes(
            challenge.id
          )
      );

    if (firstIncompleteIndex > 0) {
      setPlayerX(
        WORLD_START +
          firstIncompleteIndex *
            CHALLENGE_SPACING -
          120
      );
    } else {
      setPlayerX(80);
    }

    setScreen("module");
  };

  /* =========================================================
     MOVEMENT
  ========================================================= */

  const moveRight = () => {
    if (
      currentChallengeId ||
      activeModuleComplete
    ) {
      return;
    }

    setPlayerX((previous) =>
      Math.min(
        previous + PLAYER_STEP,
        worldWidth - 100
      )
    );
  };

  const moveLeft = () => {
    if (
      currentChallengeId ||
      activeModuleComplete
    ) {
      return;
    }

    setPlayerX((previous) =>
      Math.max(previous - PLAYER_STEP, 0)
    );
  };

  const stopMoving = () => {
    if (movementTimer.current) {
      window.clearInterval(
        movementTimer.current
      );

      movementTimer.current = null;
    }
  };

  const startMoving = (direction) => {
    stopMoving();

    if (direction === "left") {
      moveLeft();
    } else {
      moveRight();
    }

    movementTimer.current =
      window.setInterval(() => {
        if (direction === "left") {
          moveLeft();
        } else {
          moveRight();
        }
      }, 85);
  };

  useEffect(() => {
    return () => {
      stopMoving();
    };
  }, []);

  /* =========================================================
     KEYBOARD
  ========================================================= */

  useEffect(() => {
    if (screen !== "module") {
      return;
    }

    const handleKeyDown = (event) => {
      if (
        currentChallengeId ||
        activeModuleComplete
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setPlayerX((previous) =>
          Math.min(
            previous + PLAYER_STEP,
            worldWidth - 100
          )
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setPlayerX((previous) =>
          Math.max(
            previous - PLAYER_STEP,
            0
          )
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    screen,
    currentChallengeId,
    activeModuleComplete,
    worldWidth,
  ]);

  /* =========================================================
     CHECKPOINT ACTIVATION
  ========================================================= */

  useEffect(() => {
    if (
      screen !== "module" ||
      !activeModule ||
      currentChallengeId ||
      activeModuleComplete
    ) {
      return;
    }

    const nextChallenge =
      activeModule.challenges.find(
        (challenge) =>
          !completedChallengeIds.includes(
            challenge.id
          )
      );

    if (!nextChallenge) {
      return;
    }

    const checkpoint = checkpoints.find(
      ({ challenge }) =>
        challenge.id === nextChallenge.id
    );

    if (!checkpoint) {
      return;
    }

    if (
      Math.abs(
        playerX - checkpoint.x
      ) <= CHECKPOINT_DISTANCE
    ) {
      stopMoving();

      setSelectedAnswer("");
      setFeedback("");

      setCurrentChallengeId(
        nextChallenge.id
      );
    }
  }, [
    playerX,
    screen,
    activeModule,
    currentChallengeId,
    completedChallengeIds,
    checkpoints,
    activeModuleComplete,
  ]);

  /* =========================================================
     CAMERA
  ========================================================= */

  const cameraX = Math.max(
    0,
    Math.min(
      playerX - 420,
      worldWidth - 1000
    )
  );

  /* =========================================================
     LEVEL 1 — ANSWERS
  ========================================================= */

  const isCurrentChallengeCorrect =
    Boolean(
      currentChallenge &&
        selectedAnswer ===
          currentChallenge.correctAnswer
    );

  const challengeCompleted =
    Boolean(
      currentChallenge &&
        completedChallengeIds.includes(
          currentChallenge.id
        )
    );

  const handleAnswer = (answer) => {
    if (!currentChallenge) {
      return;
    }

    setSelectedAnswer(answer);

    if (
      answer ===
      currentChallenge.correctAnswer
    ) {
      setCompletedChallengeIds(
        (previous) => {
          if (
            previous.includes(
              currentChallenge.id
            )
          ) {
            return previous;
          }

          return [
            ...previous,
            currentChallenge.id,
          ];
        }
      );

      setFeedback(
        currentChallenge.correctFeedback ||
          "Correct! You recovered this Excel skill."
      );

      return;
    }

    setFeedback(
      currentChallenge.feedback?.[
        answer
      ] ||
        "Not quite. Review the spreadsheet and think about what the formula needs to accomplish."
    );
  };

  /* =========================================================
     LEVEL 1 — CONTINUE
  ========================================================= */

  const continueGame = () => {
    const completedId =
      currentChallengeId;

    setCurrentChallengeId(null);
    setSelectedAnswer("");
    setFeedback("");

    const completedCheckpoint =
      checkpoints.find(
        ({ challenge }) =>
          challenge.id === completedId
      );

    if (completedCheckpoint) {
      setPlayerX(
        Math.min(
          completedCheckpoint.x + 95,
          worldWidth - 100
        )
      );
    }
  };

  /* =========================================================
     LEVEL 2 — RETRIEVAL PRACTICE
  ========================================================= */

  const startRetrievalPractice = () => {
    stopMoving();

    setCurrentChallengeId(null);
    setSelectedAnswer("");
    setFeedback("");

    setRetrievalIndex(0);
    setRetrievalComplete(false);
    setRetrievalStarted(true);
  };

  const completeRetrievalChallenge = () => {
    const isLastChallenge =
      retrievalIndex ===
      foundationRetrievalChallenges.length -
        1;

    if (isLastChallenge) {
      setRetrievalComplete(true);
      return;
    }

    setRetrievalIndex(
      (previous) => previous + 1
    );
  };

  /* =========================================================
     RETURN TO MAP
  ========================================================= */

  const returnToMap = () => {
    stopMoving();

    setCurrentChallengeId(null);
    setSelectedAnswer("");
    setFeedback("");

    setActiveModuleId(null);
    setPlayerX(80);

    setRetrievalStarted(false);
    setRetrievalIndex(0);
    setRetrievalComplete(false);

    setScreen("map");
  };

  /* =========================================================
     REPLAY MODULE
  ========================================================= */

  const replayModule = () => {
    if (!activeModule) {
      return;
    }

    const challengeIds =
      activeModule.challenges.map(
        (challenge) => challenge.id
      );

    setCompletedChallengeIds(
      (previous) =>
        previous.filter(
          (id) =>
            !challengeIds.includes(id)
        )
    );

    setCurrentChallengeId(null);
    setSelectedAnswer("");
    setFeedback("");

    setPlayerX(80);

    setRetrievalStarted(false);
    setRetrievalIndex(0);
    setRetrievalComplete(false);
  };

  /* =========================================================
     QUEST MAP
  ========================================================= */

  if (screen === "map") {
    return (
      <ModuleMap
        modules={curriculumModules}
        completedChallengeIds={
          completedChallengeIds
        }
        onSelectModule={selectModule}
      />
    );
  }

  if (!activeModule) {
    return (
      <main className="app">
        <button
          type="button"
          onClick={returnToMap}
        >
          Return to Quest Map
        </button>
      </main>
    );
  }

  /* =========================================================
     LEVEL 2 — RETRIEVAL PRACTICE SCREEN
  ========================================================= */

  if (
    hasRetrievalPractice &&
    retrievalStarted &&
    !retrievalComplete &&
    currentRetrievalChallenge
  ) {
    return (
      <main className="app">
        <header className="game-header">
          <div>
            <p className="eyebrow">
              Excel Quest
            </p>

            <h1>{activeModule.title}</h1>

            <p className="module-game-subtitle">
              Level 2 — Retrieval Practice
            </p>
          </div>

          <button
            type="button"
            className="map-button"
            onClick={returnToMap}
          >
            ← Quest Map
          </button>
        </header>

        <section className="mission-card">
          <div className="mission-copy">
            <strong>
              Retrieval Practice:
            </strong>{" "}
            Construct formulas without
            relying on multiple-choice
            answers.
          </div>

          <div className="desktop-instruction">
            {retrievalIndex + 1}/
            {retrievalTotal}
          </div>
        </section>

        <FormulaInputChallenge
          challenge={
            currentRetrievalChallenge
          }
          onComplete={
            completeRetrievalChallenge
          }
        />
      </main>
    );
  }

  /* =========================================================
     MODULE WORLD
  ========================================================= */

  return (
    <main className="app">
      <header className="game-header">
        <div>
          <p className="eyebrow">
            Excel Quest
          </p>

          <h1>{activeModule.title}</h1>

          <p className="module-game-subtitle">
            {activeModule.subtitle}
          </p>
        </div>

        <button
          type="button"
          className="map-button"
          onClick={returnToMap}
        >
          ← Quest Map
        </button>
      </header>

      <ModuleProgress
        module={activeModule}
        completedChallengeIds={
          completedChallengeIds
        }
      />

      <section className="mission-card">
        <div className="mission-copy">
          <strong>Mission:</strong>{" "}
          Recover all{" "}
          {activeModule.challenges.length}{" "}
          Excel skills to complete this
          module.
        </div>

        <div className="desktop-instruction">
          ← → Move
        </div>
      </section>

      <section className="game-world">
        <div
          className="world"
          style={{
            width: `${worldWidth}px`,
            transform: `translateX(-${cameraX}px)`,
          }}
        >
          <div
            className="quest-start-sign"
            style={{
              left: "60px",
            }}
          >
            <small>
              MODULE {activeModule.number}
            </small>

            <strong>
              {activeModule.title}
            </strong>

            <span>
              Move → to begin
            </span>
          </div>

          {checkpoints.map(
            (
              { challenge, x },
              index
            ) => {
              const completed =
                completedChallengeIds.includes(
                  challenge.id
                );

              const previousChallenges =
                activeModule.challenges.slice(
                  0,
                  index
                );

              const unlocked =
                previousChallenges.every(
                  (
                    previousChallenge
                  ) =>
                    completedChallengeIds.includes(
                      previousChallenge.id
                    )
                );

              return (
                <div key={challenge.id}>
                  <div
                    className={`generated-zone ${
                      completed
                        ? "generated-zone-complete"
                        : ""
                    }`}
                    style={{
                      left: `${
                        x - 105
                      }px`,
                    }}
                  >
                    <span>
                      SKILL{" "}
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <strong>
                      {challenge.title}
                    </strong>

                    <small>
                      {
                        challenge.subtitle
                      }
                    </small>
                  </div>

                  {completed ? (
                    <div
                      className="completed-formula-token"
                      style={{
                        left: `${x}px`,
                      }}
                    >
                      <span>✓</span>

                      <strong>
                        {
                          challenge.formula
                        }
                      </strong>

                      <small>
                        Recovered
                      </small>
                    </div>
                  ) : unlocked ? (
                    <FormulaToken
                      x={x}
                      label={
                        challenge.formula
                      }
                      hint="Reach to unlock"
                      wide={
                        challenge.formula
                          .length > 8
                      }
                    />
                  ) : (
                    <div
                      className="locked-formula-token"
                      style={{
                        left: `${x}px`,
                      }}
                    >
                      <span>🔒</span>

                      <strong>
                        {
                          challenge.formula
                        }
                      </strong>

                      <small>
                        Complete previous
                        skill
                      </small>
                    </div>
                  )}
                </div>
              );
            }
          )}

          <div
            className="player"
            style={{
              left: `${playerX}px`,
              bottom: "70px",
            }}
            aria-label="Excel Quest player"
          >
            <div className="player-head">
              <div className="player-hair" />
            </div>

            <div className="player-body">
              <span>XL</span>
            </div>

            <div className="player-feet">
              <span />
              <span />
            </div>
          </div>

          <div className="ground">
            {Array.from(
              {
                length: Math.ceil(
                  worldWidth / 95
                ),
              },
              (_, index) => (
                <div
                  className="cell"
                  key={index}
                >
                  {String.fromCharCode(
                    65 +
                      (index % 26)
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {!activeModuleComplete && (
        <section className="mobile-controls">
          <button
            type="button"
            className="control-button"
            onPointerDown={() =>
              startMoving("left")
            }
            onPointerUp={stopMoving}
            onPointerCancel={
              stopMoving
            }
            onPointerLeave={
              stopMoving
            }
            aria-label="Move left"
          >
            ←
          </button>

          <button
            type="button"
            className="control-button"
            onPointerDown={() =>
              startMoving("right")
            }
            onPointerUp={stopMoving}
            onPointerCancel={
              stopMoving
            }
            onPointerLeave={
              stopMoving
            }
            aria-label="Move right"
          >
            →
          </button>
        </section>
      )}

      {currentChallenge && (
        <ChallengeModal
          challenge={{
            ...currentChallenge,
            moduleTitle:
              activeModule.title,
          }}
          selectedAnswer={
            selectedAnswer
          }
          feedback={feedback}
          completed={
            challengeCompleted
          }
          isCorrect={
            isCurrentChallengeCorrect
          }
          onAnswer={handleAnswer}
          onContinue={continueGame}
        />
      )}

      {/* =====================================================
          FOUNDATIONS — LEVEL 2 UNLOCK
      ===================================================== */}

      {activeModuleComplete &&
        !currentChallenge &&
        hasRetrievalPractice &&
        !retrievalStarted && (
          <div className="level-two-unlock">
            <p className="eyebrow">
              LEVEL 1 COMPLETE
            </p>

            <h2>
              Retrieval Practice Unlocked
            </h2>

            <p>
              You recovered the Formula
              Foundations skills. Now
              construct formulas without
              multiple-choice support.
            </p>

            <button
              type="button"
              className="continue-button"
              onClick={
                startRetrievalPractice
              }
            >
              Start Level 2 →
            </button>
          </div>
        )}

      {/* =====================================================
          MODULE COMPLETE
      ===================================================== */}

      {activeModuleComplete &&
        !currentChallenge &&
        (!hasRetrievalPractice ||
          retrievalComplete) && (
          <ModuleComplete
            module={activeModule}
            onContinue={returnToMap}
            onReplay={replayModule}
          />
        )}
    </main>
  );
}

export default App;