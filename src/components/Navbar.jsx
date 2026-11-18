import { Link } from "react-router-dom";

const roleNames = {
  admin: "Administrator",
  faculty: "Faculty",
  student: "Student"
};

export default function Navbar({ pageTitle, user, onLogout, onMenuOpen }) {
  const initials = user?.name
    ?.split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";
  const profilePath = user?.role === "student"
    ? "/student/profile"
    : user?.role === "faculty"
      ? "/faculty/dashboard"
      : "/admin/settings";

  return (
    <header className="navbar">
      <div className="navbar-heading">
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          onClick={onMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="nav-page-title">
          <h1>{pageTitle}</h1>
          <p>College Portal <span>/</span> {roleNames[user?.role] || "Portal"} <span>/</span> {pageTitle}</p>
        </div>
      </div>

      <div className="nav-right">
        <details className="notification-menu">
          <summary className="notification" aria-label="Notifications">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>
            <i aria-hidden="true" />
          </summary>
          <div className="nav-popover">
            <strong>Notifications</strong>
            <p>You’re all caught up.</p>
          </div>
        </details>

        <details className="profile-menu">
          <summary className="admin-profile">
            {user?.student?.image
              ? <img className="admin-avatar profile-avatar-image" src={user.student.image} alt="" />
              : <span className="admin-avatar">{initials}</span>}
            <span className="profile-name">{user?.name}</span>
            <span className="profile-role">{roleNames[user?.role] || "User"}</span>
            <span className="profile-chevron" aria-hidden="true">⌄</span>
          </summary>
          <div className="nav-popover profile-popover">
            <strong>{user?.name}</strong>
            <span>{roleNames[user?.role] || "User"}</span>
            <Link to={profilePath}>View profile</Link>
            <button type="button" onClick={onLogout}>Sign out</button>
          </div>
        </details>
        <button className="logout-button" type="button" onClick={onLogout}>Sign out</button>
      </div>
    </header>
  );
}
