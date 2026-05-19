import { useState } from "react";
import NavBarContent from "../navbarContent/navbarContent";
import "./factoringHome.css";

export default function FactoringHome() {
  const [activeTab, setActiveTab] = useState("quiz");

  const renderContent = () => {
    switch (activeTab) {
      case "quiz":
        return (
          <div className="content-section">
            <h2>Factoring Quiz</h2>
            <p>
              Welcome to the Factoring Quiz section. Test your factoring skills
              here!
            </p>
            <div className="quiz-area">
              {/* Quiz content will go here */}
              <p>Quiz questions and problems will be displayed here.</p>
            </div>
          </div>
        );
      case "explanation":
        return (
          <div className="content-section">
            <h2>Explanations</h2>
            <p>Learn factoring concepts with detailed explanations.</p>
            <div className="explanation-area">
              {/* Explanation content will go here */}
              <p>Detailed explanations and tutorials will be displayed here.</p>
            </div>
          </div>
        );
      case "equations":
        return (
          <div className="content-section">
            <h2>Solved Equations</h2>
            <p>Browse through solved equations and examples.</p>
            <div className="equations-area">
              {/* Solved equations will go here */}
              <p>Step-by-step solved equations will be displayed here.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="factoring-container">
      <NavBarContent activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content-wrapper">{renderContent()}</div>
    </div>
  );
}
