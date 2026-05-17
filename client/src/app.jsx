import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MathHome from "./contentHome/homeMath";
import SideBarMenu from "./sideBarMenu/sideBarMenu";
import CalculusQuiz from "./calculusHome/calculusHome.jsx";

import data from "./../data/data.js";

import "./app.css";

export default function App() {
  const [message, setMessage] = useState("");
  const [activeMenu, setActiveMenu] = useState("math");
  const [section, setSection] = useState("math");

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
        <Route path="/quizCalc" element={<CalculusQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

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
