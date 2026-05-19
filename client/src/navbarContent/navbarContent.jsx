import { useNavigate } from "react-router-dom";
import "./navbarContent.css";

export default function NavBarContent({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const tabs = [
    { id: "quiz", label: "Quiz" },
    { id: "explanation", label: "Explanation" },
    { id: "equations", label: "Solved Equations" },
  ];

  return (
    <div className="navbar-content">
      <nav className="navbar">
        <button className="home-button" onClick={() => navigate("/")}>
          Home
        </button>
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
