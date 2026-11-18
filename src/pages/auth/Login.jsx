import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to={`/${user.role}/dashboard`} replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(`/${result.role}/dashboard`);
  };

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-brand" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M2 9.5 12 4l10 5.5L12 15 2 9.5Z" fill="currentColor" />
            <path d="M6 12v4.5c3.5 2.3 8.5 2.3 12 0V12M21 10v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="login-kicker">MSAJ College Portal</p>
        <h1>Welcome back</h1>
        <p className="login-subtitle">Sign in to continue to your dashboard</p>

        {error && <div className="form-error">{error}</div>}

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@college.edu"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />

        <button className="login-button" type="submit">Login</button>
        <button className="forgot-button" type="button">Forgot Password?</button>

        <div className="demo-logins">
          <strong>Demo accounts</strong>
          <span>Admin: admin@college.edu / admin123</span>
          <span>Faculty: faculty@college.edu / faculty123</span>
          <span>Student: 311824103012@msajce-edu.in / student123</span>
        </div>
      </form>
    </main>
  );
}
