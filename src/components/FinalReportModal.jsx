import { useState } from "react";
import ReportRow from "./ReportRow";
import ReportTask from "./ReportTask";

function FinalReportModal({ onComplete }) {
  const [answers, setAnswers] = useState({
    total: "",
    average: "",
    status: "",
  });

  const [attempts, setAttempts] = useState({
    total: 0,
    average: 0,
    status: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  const correctAnswers = {
    total: "=SUM(B2:B4)",
    average: "=AVERAGE(D2:D4)",
    status: '=IF(B2>=C2,"Met","Not Met")',
  };

  const isCorrect = {
    total:
      answers.total === correctAnswers.total,

    average:
      answers.average === correctAnswers.average,

    status:
      answers.status === correctAnswers.status,
  };

  const allCorrect =
    isCorrect.total &&
    isCorrect.average &&
    isCorrect.status;

  const updateAnswer = (field, value) => {
    if (
      submitted &&
      isCorrect[field]
    ) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const checkReport = () => {
    setAttempts((previous) => ({
      total:
        isCorrect.total
          ? previous.total
          : previous.total + 1,

      average:
        isCorrect.average
          ? previous.average
          : previous.average + 1,

      status:
        isCorrect.status
          ? previous.status
          : previous.status + 1,
    }));

    setSubmitted(true);
  };

  return (
    <div className="modal-overlay">
      <section
        className="final-report-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
      >
        <p className="challenge-label">
          Final Challenge
        </p>

        <h2 id="report-title">
          Restore the Monthly Report
        </h2>

        <p className="report-intro">
          You recovered all three formulas.
          Apply them to finish the spreadsheet.
        </p>

        {/* =========================================
            EXCEL REPORT
        ========================================= */}

        <div className="excel-report">
          <div className="excel-column-row">
            <span />
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
            <span>E</span>
          </div>

          <ReportRow
            number="1"
            values={[
              "Employee",
              "Sales",
              "Target",
              "Quiz Score",
              "Status",
            ]}
            header
          />

          <ReportRow
            number="2"
            values={[
              "Maya",
              "5400",
              "5000",
              "80",
              "?",
            ]}
          />

          <ReportRow
            number="3"
            values={[
              "Daniel",
              "4200",
              "5000",
              "90",
              "?",
            ]}
          />

          <ReportRow
            number="4"
            values={[
              "Sofia",
              "6100",
              "5000",
              "100",
              "?",
            ]}
          />
        </div>

        {/* =========================================
            REPORT TASKS
        ========================================= */}

        <div className="report-tasks">
          <ReportTask
            number="1"
            title="Calculate total sales"
            description="Choose the formula that adds Sales from B2 through B4."
            value={answers.total}
            onChange={(value) =>
              updateAnswer(
                "total",
                value
              )
            }
            options={[
              "=SUM(B2:B4)",
              "=AVERAGE(B2:B4)",
              "=COUNT(B2:B4)",
            ]}
            submitted={submitted}
            correct={isCorrect.total}
            attempts={attempts.total}
            feedbackType="sum"
          />

          <ReportTask
            number="2"
            title="Calculate average quiz score"
            description="Choose the formula that calculates the average of D2 through D4."
            value={answers.average}
            onChange={(value) =>
              updateAnswer(
                "average",
                value
              )
            }
            options={[
              "=SUM(D2:D4)",
              "=AVERAGE(D2:D4)",
              "=COUNT(D2:D4)",
            ]}
            submitted={submitted}
            correct={isCorrect.average}
            attempts={attempts.average}
            feedbackType="average"
          />

          <ReportTask
            number="3"
            title="Determine Maya's status"
            description='Compare Maya’s Sales in B2 with her Target in C2. Return "Met" when Sales is at least the Target.'
            value={answers.status}
            onChange={(value) =>
              updateAnswer(
                "status",
                value
              )
            }
            options={[
              '=IF(B2>=C2,"Met","Not Met")',
              '=IF(B2<C2,"Met","Not Met")',
              "=SUM(B2:C2)",
            ]}
            submitted={submitted}
            correct={isCorrect.status}
            attempts={attempts.status}
            feedbackType="if"
          />
        </div>

        {/* =========================================
            ASSESSMENT FEEDBACK
        ========================================= */}

        {submitted &&
          !allCorrect && (
            <div className="assessment-summary">
              <strong>
                You're making progress.
              </strong>

              <span>
                Correct responses are saved.
                Use the diagnostic hints to
                revise the remaining tasks.
              </span>
            </div>
          )}

        {submitted &&
          allCorrect && (
            <div className="assessment-success">
              <strong>
                Report restored! ✓
              </strong>

              <span>
                You successfully applied
                SUM, AVERAGE, and IF.
              </span>
            </div>
          )}

        {/* =========================================
            ACTION BUTTON
        ========================================= */}

        {!allCorrect ? (
          <button
            type="button"
            className="continue-button report-button"
            onClick={checkReport}
          >
            {submitted
              ? "Check Again"
              : "Check Report"}
          </button>
        ) : (
          <button
            type="button"
            className="continue-button report-button"
            onClick={onComplete}
          >
            Complete Quest ✓
          </button>
        )}
      </section>
    </div>
  );
}

export default FinalReportModal;