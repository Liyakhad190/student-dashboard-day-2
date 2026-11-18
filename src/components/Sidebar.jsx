import { NavLink } from "react-router-dom";

export default function Sidebar({
  links,
  user,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onClose,
  onLogout
}) {
  const roleTitle = {
    admin: "Administration",
    faculty: "Faculty workspace",
    student: "Student workspace"
  }[user?.role] || "College workspace";

  const initials = user?.name
    ?.split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

  return (
    <aside className={`portal-sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark" aria-hidden="true">MS</span>
        <div className="sidebar-brand-copy">
          <strong>MSAJCE</strong>
          <span>College Portal</span>
        </div>
        <button
          type="button"
          className="sidebar-collapse-button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggleCollapse}
        >
          {collapsed ? "›" : "‹"}
        </button>
        <button
          type="button"
          className="sidebar-close-button"
          aria-label="Close navigation menu"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>
      <nav className="sidebar-navigation" aria-label={`${roleTitle} navigation`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            title={collapsed ? link.label : undefined}
            end={link.to.endsWith("/dashboard")}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon" aria-hidden="true">{link.icon}</span>
            <span className="sidebar-link-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <footer className="sidebar-user">
        <div className="sidebar-user-details">
          {user?.student?.image
            ? <img src={user.student.image} alt="" />
            : <span className="sidebar-user-avatar">{initials}</span>}
          <div>
            <strong>{user?.name}</strong>
            <span>{roleTitle}</span>
          </div>
        </div>
        <button type="button" className="sidebar-signout" onClick={onLogout} title="Sign out">
          <span aria-hidden="true">↪</span><span className="sidebar-link-label">Sign out</span>
        </button>
      </footer>
    </aside>
  );
}
