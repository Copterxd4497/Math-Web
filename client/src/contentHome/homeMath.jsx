import { Link } from "react-router-dom";

import "./homeMath.css";

export default function MathHome({ items, title }) {
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="math-home">
      <h1 className="page-title">Welcome to {capitalizedTitle}</h1>

      <div className="cards-container">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-icon">{item.card_icon}</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <Link to="/quizCalc">
                <button className="card-btn">Learn More →</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No content available</p>
        )}
      </div>
    </div>
  );
}
