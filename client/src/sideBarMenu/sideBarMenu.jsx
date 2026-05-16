import "./sideBarMenu.css";

export default function SideBarMenu({ activeMenu, setActiveMenu, setSection }) {
  const menuItems = [
    { id: "math", label: "Math", icon: "∑" },
    { id: "statistics", label: "Statistics", icon: "📊" },
    { id: "geometry", label: "Geometry", icon: "△" },
    { id: "algebra", label: "Algebra", icon: "ƒ" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">📐</div>
        <h2>MathEdu</h2>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? "active" : ""}`}
            onClick={() => setActiveMenu(item.id)}
            onClickCapture={() => setSection(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>© 2024 MathEdu</p>
      </div>
    </aside>
  );
}
