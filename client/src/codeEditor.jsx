import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ace from "ace-builds/src-noconflict/ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-sql";

import "./codeEditor.css";

const LANGUAGE_TEMPLATES = {
  python: `# Problem: {QUESTION}
# Difficulty: {DIFFICULTY}

def solve():
    # Write your solution here
    return "Hello World"

print(solve())`,
  javascript: `// Problem: {QUESTION}
// Difficulty: {DIFFICULTY}

function solve() {
  // Write your solution here
  return "Hello World";
}

console.log(solve());`,
  sql: `-- Problem: {QUESTION}
-- Difficulty: {DIFFICULTY}

SELECT 'Hello World' AS result;`,
};

const LANGUAGE_MODES = {
  python: "ace/mode/python",
  javascript: "ace/mode/javascript",
  sql: "ace/mode/sql",
};

export default function CodeEditor() {
  const editorRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const question = location.state?.question;
  const topic = location.state?.topic;
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("python");
  const editorInstance = useRef(null);
  const pyodideInstance = useRef(null);

  // Load Pyodide on component mount
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
        );
        await response.text();

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        script.async = true;
        script.onload = async () => {
          const pyodide = await window.loadPyodide();
          pyodideInstance.current = pyodide;
          setIsLoading(false);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
        setIsLoading(false);
      }
    };

    loadPyodide();
  }, []);

  useEffect(() => {
    const editor = ace.edit(editorRef.current);
    editorInstance.current = editor;

    editor.setTheme("ace/theme/monokai");
    editor.session.setMode(LANGUAGE_MODES[language]);

    const template = LANGUAGE_TEMPLATES[language]
      .replace("{QUESTION}", question?.Name || "Code Challenge")
      .replace("{DIFFICULTY}", question?.Difficulty || "Medium");

    editor.setValue(template, -1);

    return () => {
      editor.destroy();
    };
  }, [question, language]);

  const handleRun = async () => {
    const code = editorInstance.current.getValue();

    if (language === "python") {
      if (!pyodideInstance.current) {
        setOutput(
          "Python environment is loading... Please try again in a moment.",
        );
        return;
      }

      try {
        const pyodide = pyodideInstance.current;

        // Create a custom output capturing mechanism
        await pyodide.runPythonAsync(`
import sys
import io
from contextlib import redirect_stdout, redirect_stderr

output_buffer = io.StringIO()
error_buffer = io.StringIO()
        `);

        // Redirect stdout and stderr, then run the code
        const result = await pyodide.runPythonAsync(`
with redirect_stdout(output_buffer), redirect_stderr(error_buffer):
    try:
        exec("""${code.replace(/"/g, '\\"')}""")
    except Exception as e:
        print(f"Error: {e}")

output_buffer.getvalue()
        `);

        setOutput(result || "Code executed successfully");
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    } else if (language === "javascript") {
      try {
        const logs = [];
        const originalLog = console.log;
        const originalError = console.error;

        console.log = (...args) => {
          logs.push(
            args
              .map((arg) => {
                if (typeof arg === "object") {
                  return JSON.stringify(arg, null, 2);
                }
                return String(arg);
              })
              .join(" "),
          );
        };

        console.error = (...args) => {
          logs.push(
            "Error: " +
              args
                .map((arg) => {
                  if (typeof arg === "object") {
                    return JSON.stringify(arg, null, 2);
                  }
                  return String(arg);
                })
                .join(" "),
          );
        };

        // Execute the code in a safe way
        new Function(code)();

        console.log = originalLog;
        console.error = originalError;

        setOutput(logs.join("\n") || "Code executed successfully");
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    } else if (language === "sql") {
      // For SQL, we'll show a simple simulation since we can't execute actual SQL
      try {
        // Simple SQL validation
        if (
          code.trim().toUpperCase().startsWith("SELECT") ||
          code.trim().toUpperCase().startsWith("INSERT") ||
          code.trim().toUpperCase().startsWith("UPDATE") ||
          code.trim().toUpperCase().startsWith("DELETE")
        ) {
          setOutput(
            "SQL Query executed successfully\n\n" +
              "(Note: This is a client-side editor. Use a database system to execute actual SQL queries.)",
          );
        } else {
          setOutput(
            "Error: Invalid SQL statement. Must start with SELECT, INSERT, UPDATE, or DELETE.",
          );
        }
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    }
  };

  const handleSubmit = () => {
    handleRun();
    // Add submission logic here
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClearOutput = () => {
    setOutput("");
  };

  return (
    <div className="code-editor-container">
      <div className="editor-header-compact">
        <button onClick={handleBack} className="back-btn">
          ← Back
        </button>
        <div className="question-info-compact">
          <h2>{question?.Name || "Code Challenge"}</h2>
          <span
            className={`difficulty-badge difficulty-${question?.Difficulty.toLowerCase()}`}
          >
            {question?.Difficulty}
          </span>
        </div>
        <div className="language-selector">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-dropdown"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="sql">SQL</option>
          </select>
        </div>
      </div>
      <div className="editor-wrapper">
        <div className="editor-section">
          <div ref={editorRef} className="editor"></div>
          <div className="editor-actions">
            <button
              onClick={handleRun}
              className="btn run-btn"
              disabled={
                isLoading || (language === "python" && !pyodideInstance.current)
              }
            >
              {isLoading ? "Loading Python..." : "▶ Run"}
            </button>
            <button onClick={handleSubmit} className="btn primary">
              Submit Solution
            </button>
          </div>
        </div>
        <div className="output-section">
          <div className="output-header">
            <h3>Output</h3>
            {output && (
              <button onClick={handleClearOutput} className="clear-btn">
                Clear
              </button>
            )}
          </div>
          <div className="output-content">
            {isLoading ? (
              <p className="placeholder">Loading Python environment...</p>
            ) : output ? (
              <pre>{output}</pre>
            ) : (
              <p className="placeholder">Run your code to see output</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
