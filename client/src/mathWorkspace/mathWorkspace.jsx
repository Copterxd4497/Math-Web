import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mathWorkspace.css";

export default function MathWorkspace() {
  const navigate = useNavigate();
  const [expression, setExpression] = useState("sin(x)");
  const [result, setResult] = useState("");
  const [plotData, setPlotData] = useState(null);
  const [history, setHistory] = useState([]);
  const plotRef = useRef(null);
  const mathRef = useRef(null);

  // Load math.js and plotly
  useEffect(() => {
    const loadLibraries = async () => {
      // Load math.js
      const mathScript = document.createElement("script");
      mathScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.11.0/math.min.js";
      mathScript.async = true;
      document.head.appendChild(mathScript);

      // Load plotly.js
      const plotlyScript = document.createElement("script");
      plotlyScript.src =
        "https://cdn.plot.ly/plotly-latest.min.js";
      plotlyScript.async = true;
      document.head.appendChild(plotlyScript);

      mathRef.current = window.math;
    };

    loadLibraries();
  }, []);

  const evaluateExpression = (expr) => {
    try {
      if (!window.math) {
        setResult("Loading math library...");
        return;
      }

      const result = window.math.evaluate(expr);
      const resultStr = typeof result === "object" ? JSON.stringify(result) : String(result);
      
      setResult(resultStr);
      setHistory([{ expr, result: resultStr }, ...history.slice(0, 9)]);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  const plotFunction = (expr) => {
    try {
      if (!window.math || !window.Plotly) {
        setResult("Loading libraries...");
        return;
      }

      // Generate x values
      const xValues = [];
      const yValues = [];
      
      for (let x = -10; x <= 10; x += 0.1) {
        try {
          const y = window.math.evaluate(expr, { x });
          if (typeof y === "number" && isFinite(y)) {
            xValues.push(x);
            yValues.push(y);
          }
        } catch (e) {
          // Skip points that can't be calculated
        }
      }

      if (xValues.length === 0) {
        setResult("Error: Could not plot function");
        return;
      }

      const trace = {
        x: xValues,
        y: yValues,
        mode: "lines",
        line: { color: "#4ade80", width: 2 },
        name: expr,
      };

      const layout = {
        title: `Graph of: ${expr}`,
        xaxis: { title: "x", zeroline: true, gridcolor: "rgba(107, 122, 143, 0.2)" },
        yaxis: { title: "y", zeroline: true, gridcolor: "rgba(107, 122, 143, 0.2)" },
        plot_bgcolor: "rgba(30, 41, 54, 0.5)",
        paper_bgcolor: "rgba(15, 20, 25, 0.5)",
        font: { color: "rgba(255, 255, 255, 0.9)" },
        margin: { l: 50, r: 50, t: 50, b: 50 },
      };

      window.Plotly.newPlot(plotRef.current, [trace], layout, {
        responsive: true,
      });

      setResult(`Graph plotted successfully for: ${expr}`);
      setHistory([
        { expr, result: `Graph plotted` },
        ...history.slice(0, 9),
      ]);
    } catch (error) {
      setResult(`Error plotting function: ${error.message}`);
    }
  };

  const handleEvaluate = () => {
    evaluateExpression(expression);
  };

  const handlePlot = () => {
    plotFunction(expression);
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
    if (plotRef.current) {
      window.Plotly.purge(plotRef.current);
    }
  };

  const handleHistoryClick = (expr) => {
    setExpression(expr);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="math-workspace-container">
      <div className="math-header">
        <button onClick={handleBack} className="back-btn">
          ← Back
        </button>
        <h1>Math Workspace</h1>
        <p className="subtitle">Evaluate expressions and plot functions</p>
      </div>

      <div className="math-content">
        <div className="math-panel">
          <div className="input-section">
            <label htmlFor="expression">Enter Expression or Function:</label>
            <input
              id="expression"
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleEvaluate();
              }}
              placeholder="e.g., sin(x), 2+2, x^2-3x+2"
              className="expression-input"
            />
            <div className="button-group">
              <button onClick={handleEvaluate} className="btn primary">
                Evaluate
              </button>
              <button onClick={handlePlot} className="btn plot-btn">
                Plot
              </button>
              <button onClick={handleClear} className="btn clear-btn">
                Clear
              </button>
            </div>
          </div>

          <div className="result-section">
            <h3>Result</h3>
            <div className="result-box">
              {result ? <pre>{result}</pre> : <p className="placeholder">Result will appear here</p>}
            </div>
          </div>

          <div className="history-section">
            <h3>History</h3>
            <div className="history-list">
              {history.length === 0 ? (
                <p className="placeholder">No history yet</p>
              ) : (
                history.map((item, idx) => (
                  <div
                    key={idx}
                    className="history-item"
                    onClick={() => handleHistoryClick(item.expr)}
                  >
                    <code>{item.expr}</code>
                    <span className="history-result">{item.result.substring(0, 30)}...</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="plot-panel">
          <div className="plot-section">
            <h3>Graph Visualization</h3>
            <div ref={plotRef} className="plot-container"></div>
          </div>
        </div>
      </div>

      <div className="math-reference">
        <h4>Common Functions:</h4>
        <p>
          sin(x), cos(x), tan(x), sqrt(x), abs(x), log(x), exp(x), pow(x,n),
          max(...), min(...), sum(...), prod(...)
        </p>
      </div>
    </div>
  );
}
