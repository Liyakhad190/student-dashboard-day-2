import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardShell({ title, links, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageTitle = links.find((link) => link.to === location.pathname)?.label || title;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app dashboard-app">
      <Navbar
        pageTitle={pageTitle}
        user={user}
        onLogout={handleLogout}
        onMenuOpen={() => setMobileOpen(true)}
      />

      <div className={`dashboard-layout ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Sidebar
          links={links}
          user={user}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          onLogout={handleLogout}
        />
        {mobileOpen && (
          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
          />
        )}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
