import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MathHome from "./contentHome/homeMath.jsx";
import SideBarMenu from "./sideBarMenu/sideBarMenu.jsx";
import CalculusQuiz from "./calculusHome/calculusHome.jsx";
import FactoringQuiz from "./factoringHome/factoringHome.jsx";
import Calc1_tangent_Line_Quiz from "./Quizs/calculusQuiz/calcQuiz.jsx";
import CodeEditor from "./codeEditor.jsx";

import data from "./../data/data.js";
import calcData from "../data/calcData.js";
import factorData from "../data/factorData.js";
import Calc1_tangent_Line_QuizData from "../data/quizData/calcQuizData.js";

import "./app.css";

export default function App() {
  const [message, setMessage] = useState("");
  const [activeMenu, setActiveMenu] = useState("math");
  const [section, setSection] = useState("math");
  const [calcState, setCalcState] = useState("CalculusQuiz");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* This is the Route to HomePage*/}
        <Route
          path="/"
          element={
            <Home
              section={section}
              setSection={setSection}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          }
        />

        {/* This is a Route to quizCalcPage */}
        <Route
          path="/quizCalc"
          element={
            <CalculusQuiz
              title={calcData.CalculusQuiz.title}
              topics={calcData.CalculusQuiz.topics}
            />
          }
        />

        {/*This is a Route to quizFacterPage*/}
        <Route
          path="/quizFactor"
          element={
            <FactoringQuiz
              title={factorData.FactorQuiz.title}
              topics={factorData.FactorQuiz.topics}
            />
          }
        />

        {/* This is a Route to calcQuestion page */}
        <Route
          path="/calcQuestion"
          element={
            <Calc1_tangent_Line_Quiz quizes={Calc1_tangent_Line_QuizData} />
          }
        />

        {/* This is a Route to Code Editor page */}
        <Route path="/codeEditor" element={<CodeEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

//HomePage
function Home({ section, setSection, activeMenu, setActiveMenu }) {
  return (
    <div className="app-container">
      <SideBarMenu
        setSection={setSection}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="main-content">
        <MathHome items={data[section]} title={section} />
      </div>
    </div>
  );
}
