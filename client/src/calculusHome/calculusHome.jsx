import { useState } from "react";
import NavBarContent from "../navbarContent/navbarContent";
import "./calculusHome.css";

export default function CalculusQuiz({ title, topics }) {
  const [activeTab, setActiveTab] = useState("quiz");

  const renderContent = () => {
    switch (activeTab) {
      case "quiz":
        return (
          <div className="content-section">
            <h2>{title}</h2>
            <p>Test your knowledge with these topics:</p>

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
            <p>Detailed explanations and theory.</p>
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
            <h2>{title} - Solved Examples</h2>
            <p>Step-by-step solved problems.</p>
            <div className="topics-grid">
              {Object.values(topics).map((item, index) => (
                <div className="card" key={index}>
                  <h3>{item.explanation}</h3>
                  <a href={item.link} className="btn primary">
                    View Solution
                  </a>
                  <a href={item.tutorial} className="btn secondary">
                    Tutorial
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
    <div className="subject-container">
      <NavBarContent activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content-wrapper">{renderContent()}</div>
    </div>
  );
}
