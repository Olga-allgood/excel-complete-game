import { useEffect, useRef, useState } from "react";
import "./App.css";

import Spreadsheet from "./components/Spreadsheet";
import FormulaToken from "./components/FormulaToken";
import ChallengeModal from "./components/ChallengeModal";
import FinalReportModal from "./components/FinalReportModal";
import QuestComplete from "./components/QuestComplete";

const WORLD_WIDTH = 2700;

const SUM_X = 520;
const AVERAGE_X = 1250;
const IF_X = 1880;
const REPORT_X = 2380;

const CHECKPOINT_DISTANCE = 55;

function App() {
  const [playerX, setPlayerX] = useState(80);

  const [currentChallenge, setCurrentChallenge] = useState(null);

  const [sumCollected, setSumCollected] = useState(false);
  const [averageCollected, setAverageCollected] = useState(false);
  const [ifCollected, setIfCollected] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [reportComplete, setReportComplete] = useState(false);

  const movementTimer = useRef(null);

  /* =========================================================
     PROGRESS
  ========================================================= */

  const collectedCount =
    Number(sumCollected) +
    Number(averageCollected) +
    Number(ifCollected);

  const progress = reportComplete
    ? 100
    : collectedCount === 3
      ? 82
      : collectedCount * 24;

  /* =========================================================
     MOVEMENT
  ========================================================= */

  const moveRight = () => {
    if (currentChallenge || reportComplete) return;

    setPlayerX((previous) =>
      Math.min(previous + 18, WORLD_WIDTH - 100)
    );
  };

  const moveLeft = () => {
    if (currentChallenge || reportComplete) return;

    setPlayerX((previous) =>
      Math.max(previous - 18, 0)
    );
  };

  /* =========================================================
     HOLD-TO-MOVE
  ========================================================= */

  const stopMoving = () => {
    if (movementTimer.current) {
      window.clearInterval(movementTimer.current);
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

    movementTimer.current = window.setInterval(() => {
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
    const handleKeyDown = (event) => {
      if (currentChallenge || reportComplete) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveRight();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLeft();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentChallenge, reportComplete]);

  /* =========================================================
     CHECKPOINT ACTIVATION
  ========================================================= */

  useEffect(() => {
    if (
      !sumCollected &&
      Math.abs(playerX - SUM_X) <= CHECKPOINT_DISTANCE
    ) {
      openChallenge("sum");
      return;
    }

    if (
      sumCollected &&
      !averageCollected &&
      Math.abs(playerX - AVERAGE_X) <= CHECKPOINT_DISTANCE
    ) {
      openChallenge("average");
      return;
    }

    if (
      averageCollected &&
      !ifCollected &&
      Math.abs(playerX - IF_X) <= CHECKPOINT_DISTANCE
    ) {
      openChallenge("if");
      return;
    }

    if (
      ifCollected &&
      !reportComplete &&
      Math.abs(playerX - REPORT_X) <= 75
    ) {
      openChallenge("report");
    }
  }, [
    playerX,
    sumCollected,
    averageCollected,
    ifCollected,
    reportComplete,
  ]);

  /* =========================================================
     CAMERA
  ========================================================= */

  const cameraX = Math.max(
    0,
    Math.min(
      playerX - 420,
      WORLD_WIDTH - 1000
    )
  );

  /* =========================================================
     CHALLENGES
  ========================================================= */

  const openChallenge = (challenge) => {
    stopMoving();

    setCurrentChallenge(challenge);
    setSelectedAnswer("");
    setFeedback("");
  };

  const getChallengeCorrectAnswer = (challenge) => {
    if (challenge === "sum") {
      return "=SUM(B2:B4)";
    }

    if (challenge === "average") {
      return "=AVERAGE(B2:B4)";
    }

    if (challenge === "if") {
      return '=IF(B2>=C2,"Met","Not Met")';
    }

    return "";
  };

  const isCurrentChallengeCorrect =
    selectedAnswer &&
    selectedAnswer ===
      getChallengeCorrectAnswer(currentChallenge);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    /* SUM */

    if (currentChallenge === "sum") {
      if (answer === "=SUM(B2:B4)") {
        setSumCollected(true);

        setFeedback(
          "Correct! SUM adds the values in B2:B4 to calculate total sales."
        );

        return;
      }

      if (answer === "=AVERAGE(B2:B4)") {
        setFeedback(
          "AVERAGE would calculate the mean of B2:B4, but this task asks for the total sales. Choose the function that adds all values in the range."
        );

        return;
      }

      if (answer === "=COUNT(B2:B4)") {
        setFeedback(
          "COUNT would tell you how many numeric cells are in B2:B4. It would not calculate the total sales. Choose the function that adds the values."
        );

        return;
      }
    }

    /* AVERAGE */

    if (currentChallenge === "average") {
      if (answer === "=AVERAGE(B2:B4)") {
        setAverageCollected(true);

        setFeedback(
          "Correct! AVERAGE calculates the mean of the values in B2:B4."
        );

        return;
      }

      if (answer === "=SUM(B2:B4)") {
        setFeedback(
          "SUM would give you the total of B2:B4. This task asks for the mean score, so choose the function that calculates an average."
        );

        return;
      }

      if (answer === "=COUNT(B2:B4)") {
        setFeedback(
          "COUNT would tell you how many numeric scores are in B2:B4. It would not calculate their mean. Choose the function that averages those values."
        );

        return;
      }
    }

    /* IF */

    if (currentChallenge === "if") {
      if (
        answer ===
        '=IF(B2>=C2,"Met","Not Met")'
      ) {
        setIfCollected(true);

        setFeedback(
          'Correct! IF compares Sales in B2 with Target in C2. Because the condition checks whether B2 is greater than or equal to C2, the formula returns "Met" when the target is reached.'
        );

        return;
      }

      if (
        answer ===
        '=IF(B2<C2,"Met","Not Met")'
      ) {
        setFeedback(
          'You chose the correct function and the correct cells, but the comparison is reversed. B2 contains Sales and C2 contains Target. "Met" should be returned when Sales is at least the Target, so the condition needs to check whether B2 is greater than or equal to C2.'
        );

        return;
      }

      if (answer === "=SUM(B2:C2)") {
        setFeedback(
          'You identified the relevant cells, but SUM adds the values instead of comparing them. Here Excel needs to compare Sales in B2 with Target in C2 and then return "Met" or "Not Met" based on that comparison.'
        );

        return;
      }
    }
  };

  const challengeCompleted =
    (currentChallenge === "sum" && sumCollected) ||
    (currentChallenge === "average" && averageCollected) ||
    (currentChallenge === "if" && ifCollected);

  const continueGame = () => {
    setCurrentChallenge(null);
    setSelectedAnswer("");
    setFeedback("");

    setPlayerX((previous) =>
      Math.min(
        previous + 95,
        WORLD_WIDTH - 100
      )
    );
  };

  const completeReport = () => {
    setReportComplete(true);
    setCurrentChallenge(null);
    setPlayerX(REPORT_X + 90);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="app">
      {/* HEADER */}

      <header className="game-header">
        <div>
          <p className="eyebrow">
            Excel Quest
          </p>

          <h1>
            Formula Adventure
          </h1>
        </div>

        <div className="formula-inventory">
          <span>Recovered:</span>

          <InventoryItem
            label="SUM()"
            collected={sumCollected}
          />

          <InventoryItem
            label="AVERAGE()"
            collected={averageCollected}
          />

          <InventoryItem
            label="IF()"
            collected={ifCollected}
          />
        </div>
      </header>

      {/* MISSION */}

      <section className="mission-card">
        <div className="mission-copy">
          <strong>Mission:</strong>{" "}
          Recover the three missing formulas
          and repair the monthly report.
        </div>

        <div className="desktop-instruction">
          ← → Move
        </div>
      </section>

      {/* PROGRESS */}

      <section
        className="quest-progress"
        aria-label="Quest progress"
      >
        <div className="progress-heading">
          <span>
            Quest Progress
          </span>

          <strong>
            {reportComplete
              ? "Complete"
              : `${collectedCount}/3 formulas`}
          </strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </section>

      {/* GAME */}

      <section className="game-world">
        <div
          className="world"
          style={{
            width: `${WORLD_WIDTH}px`,
            transform: `translateX(-${cameraX}px)`,
          }}
        >
          {/* SUM ZONE */}

          <ZoneLabel
            x={90}
            number="01"
            title="Total Sales"
            subtitle="The total is missing."
          />

          <Spreadsheet
            className="first-sheet"
            headers={[
              "Employee",
              "Sales",
              "Target",
              "Status",
            ]}
            values={[
              "Maya",
              "5400",
              "5000",
              "?",
            ]}
          />

          {/* AVERAGE ZONE */}

          <ZoneLabel
            x={1000}
            number="02"
            title="Quiz Scores"
            subtitle="Find the mean."
          />

          <Spreadsheet
            className="score-sheet"
            headers={[
              "Student",
              "Score 1",
              "Score 2",
              "Score 3",
            ]}
            values={[
              "Maya",
              "80",
              "90",
              "100",
            ]}
          />

          {/* IF ZONE */}

          <ZoneLabel
            x={1645}
            number="03"
            title="Target Status"
            subtitle="Determine whether the target was met."
          />

          <Spreadsheet
            className="status-sheet"
            headers={[
              "Employee",
              "Sales",
              "Target",
              "Status",
            ]}
            values={[
              "Maya",
              "5400",
              "5000",
              "?",
            ]}
          />

          {/* TOKENS */}

          {!sumCollected && (
            <FormulaToken
              x={SUM_X}
              label="SUM()"
              hint="Reach to unlock"
            />
          )}

          {sumCollected &&
            !averageCollected && (
              <FormulaToken
                x={AVERAGE_X}
                label="AVERAGE()"
                hint="Reach to unlock"
                wide
              />
            )}

          {averageCollected &&
            !ifCollected && (
              <FormulaToken
                x={IF_X}
                label="IF()"
                hint="Reach to unlock"
              />
            )}

          {/* CHECKPOINTS */}

          {sumCollected &&
            !averageCollected && (
              <Checkpoint
                x={650}
                text="✓ SUM recovered"
              />
            )}

          {averageCollected &&
            !ifCollected && (
              <Checkpoint
                x={1380}
                text="✓ AVERAGE recovered"
              />
            )}

          {ifCollected &&
            !reportComplete && (
              <Checkpoint
                x={2010}
                text="✓ IF recovered — reach the report!"
              />
            )}

          {/* REPORT */}

          {ifCollected && (
            <div
              className={`report-station ${
                reportComplete
                  ? "report-complete"
                  : ""
              }`}
              style={{
                left: `${REPORT_X}px`,
              }}
            >
              <span className="report-icon">
                {reportComplete
                  ? "✓"
                  : "📊"}
              </span>

              <small>
                {reportComplete
                  ? "QUEST COMPLETE"
                  : "FINAL CHALLENGE"}
              </small>

              <strong>
                {reportComplete
                  ? "REPORT RESTORED"
                  : "FINISH REPORT"}
              </strong>
            </div>
          )}

          {/* PLAYER */}

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

          {/* GROUND */}

          <div className="ground">
            {Array.from(
              { length: 28 },
              (_, index) => (
                <div
                  className="cell"
                  key={index}
                >
                  {String.fromCharCode(
                    65 + (index % 26)
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* MOBILE CONTROLS */}

      {!reportComplete && (
        <section className="mobile-controls">
          <button
            type="button"
            className="control-button"
            onPointerDown={() =>
              startMoving("left")
            }
            onPointerUp={stopMoving}
            onPointerCancel={stopMoving}
            onPointerLeave={stopMoving}
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
            onPointerCancel={stopMoving}
            onPointerLeave={stopMoving}
            aria-label="Move right"
          >
            →
          </button>
        </section>
      )}

      {/* FORMULA CHALLENGE */}

      {currentChallenge &&
        currentChallenge !== "report" && (
          <ChallengeModal
            challenge={currentChallenge}
            selectedAnswer={selectedAnswer}
            feedback={feedback}
            completed={challengeCompleted}
            isCorrect={Boolean(
              isCurrentChallengeCorrect
            )}
            onAnswer={handleAnswer}
            onContinue={continueGame}
          />
        )}

      {/* FINAL REPORT */}

      {currentChallenge === "report" && (
        <FinalReportModal
          onComplete={completeReport}
        />
      )}

      {/* COMPLETE */}

      {reportComplete && (
        <QuestComplete />
      )}
    </main>
  );
}

/* =========================================================
   SMALL WORLD-ONLY COMPONENTS
========================================================= */

function ZoneLabel({
  x,
  number,
  title,
  subtitle,
}) {
  return (
    <div
      className="zone-label"
      style={{
        left: `${x}px`,
      }}
    >
      <span>
        Zone {number}
      </span>

      <strong>
        {title}
      </strong>

      <small>
        {subtitle}
      </small>
    </div>
  );
}

function InventoryItem({
  label,
  collected,
}) {
  return (
    <div
      className={`inventory-item ${
        collected
          ? "collected"
          : "locked"
      }`}
    >
      {collected && "✓ "}
      {label}
    </div>
  );
}

function Checkpoint({
  x,
  text,
}) {
  return (
    <div
      className="checkpoint-message"
      style={{
        left: `${x}px`,
      }}
    >
      {text}
    </div>
  );
}

export default App;