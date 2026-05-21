import { useState } from "react";
import NavBarContent from "../navbarContent/navbarContent";
import "./factoringHome.css";

export default function FactoringQuiz({ title, topics }) {
  const [activeTab, setActiveTab] = useState("quiz");

  const renderContent = () => {
    switch (activeTab) {
      case "quiz":
        return (
          <div className="content-section">
            <h2>{title}</h2>
            <p>
              Welcome to the Factoring Quiz section. Test your factoring skills
              here!
            </p>

            <div className="topics-grid">
              {Object.values(topics).map((item, index) => (
                <div className="card" key={index}>
                  <h3>{item.explanation}</h3>
                  <a href={item.link} className="btn primary">
                    Start Practice
                  </a>
                  <a href={item.tutorial} className="btn secondary">
                    View Tutorial
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case "explanation":
        return (
          <div className="content-section">
            <h2>{title} - Explanations</h2>
            <p>Learn factoring concepts with detailed explanations.</p>

            <div className="topics-grid">
              {Object.values(topics).map((item, index) => (
                <div className="card" key={index}>
                  <h3>{item.explanation}</h3>
                  <a href={item.link} className="btn primary">
                    Read Explanation
                  </a>
                  <a href={item.tutorial} className="btn secondary">
                    Tutorial
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case "equations":
        return (
          <div className="content-section">
            <h2> {title} - Solved Equations</h2>
            <p>Browse through solved equations and examples.</p>

            <div className="topics-grid">
              {Object.values(topics).map((item, index) => (
                <div className="card" key={index}>
                  <h3>{item.explanation}</h3>
                  <a href={item.link} className="btn primary">
                    View Solution
                  </a>
                </div>
              ))}
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
