import { useEffect, useState } from "react";
import MathHome from "./contentHome/homeMath";
import SideBarMenu from "./sideBarMenu/sideBarMenu";
import data from "./../data/data.js";

import "./app.css";

export default function App() {
  const [message, setMessage] = useState("");
  const [activeMenu, setActiveMenu] = useState("math");
  const [section, setSection] = useState("math");

  useEffect(() => {
    fetch("https://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  });

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
