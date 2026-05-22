import { useLocation, useNavigate } from "react-router-dom";
import "./calcQuiz.css";

export default function Calc1_tangent_Line_Quiz({ quizes }) {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.topic;

  const handleQuestionClick = (question) => {
    navigate(question.URL, {
      state: { question, topic },
    });
  };

  if (!topic) {
    return (
      <div className="calc-quiz-container">
        <div className="error-message">
          <p>No topic selected. Please select a topic from Calculus Quiz.</p>
          <button onClick={() => navigate("/quizCalc")} className="btn primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="calc-quiz-container">
      <div className="quiz-header">
        <button onClick={() => navigate("/quizCalc")} className="back-btn">
          ← Back
        </button>
        <h1>{topic.explanation}</h1>
      </div>
      <div className="quiz-content">
        <div className="quiz-questions">
          {Object.entries(quizes).map(([key, question]) => (
            <button
              key={key}
              className="quiz-question"
              onClick={() => handleQuestionClick(question)}
            >
              <div className="question-number">Question {question.ID}</div>
              <h3 className="question-name">{question.Name}</h3>
              <p className="question-difficulty">
                Difficulty:{" "}
                <span
                  className={`difficulty-${question.Difficulty.toLowerCase()}`}
                >
                  {question.Difficulty}
                </span>
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
