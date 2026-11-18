import { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";
import Button from "../../components/Button";
import StudentIDCard from "../../components/StudentIDCard";
import PageHeader from "../../components/PageHeader";
import Toast from "../../components/Toast";
import DashboardStats from "../../components/DashboardStats";
import { useAuth } from "../../context/AuthContext";
import { getManagedStudents, isStudentCardActive } from "../../data/studentIdCards";

const links = [
  { to: "/student/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/student/id-card", label: "My ID Card", icon: "▣" },
  { to: "/student/attendance", label: "My Attendance", icon: "✓" },
  { to: "/student/timetable", label: "My Timetable", icon: "◷" },
  { to: "/student/results", label: "My Results", icon: "▤" },
  { to: "/student/assignments", label: "My Assignments", icon: "▣" },
  { to: "/student/materials", label: "Study Materials", icon: "↓" },
  { to: "/student/announcements", label: "Announcements", icon: "◫" },
  { to: "/student/profile", label: "My Profile", icon: "◉" }
];

export default function StudentPortal() {
  const { user } = useAuth();
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState("");
  const [profile, setProfile] = useState({ phone: "+91 98765 43210", address: "Chennai, Tamil Nadu" });
  const dismissToast = useCallback(() => setToastMessage(""), []);
  const page = location.pathname.split("/").pop();
  const student = user?.role === "student"
    ? getManagedStudents().find((item) => item.id === user.id) || user.student
    : undefined;
  const title = links.find((item) => item.to.endsWith(page))?.label || "Student Dashboard";

  return (
    <DashboardShell title="Student Portal" links={links}>
      <PageHeader
        eyebrow={page === "dashboard" ? "STUDENT WORKSPACE" : "MY ACADEMICS"}
        title={page === "dashboard" ? `Welcome back, ${student?.name}` : title}
        description="Your academic information and college services, all in one place."
        avatar={page === "dashboard" && <img className="welcome-avatar" src={student?.image} alt="" />}
      />

      {page === "dashboard" && (
        <>
          <div className="student-welcome-card">
            <img src={student?.image} alt="" />
            <div><span>Register Number</span><strong>{student?.registerNo}</strong></div>
            <div><span>Department</span><strong>{student?.department}</strong></div>
            <div><span>Academic Year</span><strong>{student?.year}</strong></div>
            <Link to="/student/id-card" className="student-id-shortcut">View digital ID card <span aria-hidden="true">→</span></Link>
          </div>
          <DashboardStats items={[
            { label: "Attendance", value: "92%", icon: "✓", description: "Overall for this semester" },
            { label: "Subjects", value: "6", icon: "▤", description: "Current semester" },
            { label: "Assignments", value: "2 pending", icon: "▣", description: "Due this week" },
            { label: "Notices", value: "3 new", icon: "◫", description: "College and department" }
          ]} />
        </>
      )}

      {page === "id-card" && (
        <section className="id-card-section">
          <StudentIDCard student={student} cardActive={student ? isStudentCardActive(student.id) : false} />
        </section>
      )}

      {page === "attendance" && (
        <section className="content-card">
          <div className="attendance-overview"><div><span>Overall Attendance</span><strong>92%</strong></div><div className="progress-track"><div style={{ width: "92%" }} /></div></div>
          <div className="attendance-subjects">
            {[["Machine Learning", "95%", "38 / 40"], ["Data Analytics", "90%", "27 / 30"], ["Computer Networks", "88%", "22 / 25"]].map(([subject, percent, classes]) =>
              <div className="attendance-subject" key={subject}><div><strong>{subject}</strong><span>{classes} classes</span></div><div className="progress-track"><div style={{ width: percent }} /></div><strong>{percent}</strong></div>
            )}
          </div>
        </section>
      )}

      {page === "timetable" && (
        <section className="content-card"><div className="section-header"><h2>Weekly Timetable</h2></div>
          <div className="table-wrap"><table><thead><tr><th>Subject</th><th>Faculty</th><th>Day</th><th>Time</th><th>Room</th></tr></thead><tbody>
            <tr><td>Machine Learning</td><td>Dr. Maya Patel</td><td>Monday</td><td>9:00–10:00 AM</td><td>301</td></tr>
            <tr><td>Data Analytics</td><td>Prof. Raj Kumar</td><td>Tuesday</td><td>11:00 AM–12:00 PM</td><td>Lab 2</td></tr>
            <tr><td>Computer Networks</td><td>Dr. Sneha Rao</td><td>Wednesday</td><td>10:00–11:00 AM</td><td>204</td></tr>
          </tbody></table></div>
        </section>
      )}

      {page === "results" && (
        <section className="content-card"><div className="section-header"><h2>Published Results — Semester 5</h2></div>
          <div className="table-wrap"><table><thead><tr><th>Subject</th><th>Internal</th><th>Examination</th><th>Total</th><th>Grade</th></tr></thead><tbody>
            <tr><td>Machine Learning</td><td>42 / 50</td><td>78 / 100</td><td>120 / 150</td><td>A</td></tr>
            <tr><td>Data Analytics</td><td>40 / 50</td><td>74 / 100</td><td>114 / 150</td><td>A</td></tr>
          </tbody></table></div>
        </section>
      )}

      {page === "assignments" && (
        <section className="content-card"><div className="section-header"><h2>My Assignments</h2></div>
          <div className="assignment-grid">
            {[["Machine Learning Mini Project", "Submitted", "15 Nov 2026"], ["Data Analytics Report", "Pending", "25 Nov 2026"]].map(([name, status, due]) =>
              <article className="assignment-card" key={name}><h3>{name}</h3><p>Deadline: {due}</p><span className={`status-pill ${status === "Submitted" ? "submitted" : ""}`}>{status}</span><Button variant="secondary">{status === "Submitted" ? "View Submission" : "Upload Submission"}</Button></article>
            )}
          </div>
        </section>
      )}

      {page === "materials" && (
        <section className="content-card"><div className="section-header"><h2>Study Materials</h2></div>
          <div className="management-list">{["Machine Learning Unit 1.pdf", "Data Analytics Notes.pdf", "Computer Networks Presentation.pptx"].map((file) =>
            <div className="management-row" key={file}><strong>{file}</strong><Button variant="secondary" onClick={() => setToastMessage("This demo has no downloadable file attached yet.")}>Download</Button></div>
          )}</div>
        </section>
      )}

      {page === "announcements" && (
        <section className="content-card"><div className="section-header"><h2>Announcements</h2></div>
          <div className="announcement-card"><h3>Semester examination schedule</h3><p>The published timetable is available on the student portal.</p><span>College · 17 Nov 2026</span></div>
          <div className="announcement-card"><h3>Machine Learning project review</h3><p>Present project progress in Room 301 on Friday.</p><span>AIML 3A · 18 Nov 2026</span></div>
        </section>
      )}

      {page === "profile" && (
        <section className="profile-page">
          <div className="profile-summary">
            <img src={student?.image} alt={`${student?.name} profile`} />
            <h2>{student?.name}</h2>
            <p>{student?.email}</p>
            <div className="profile-details">
              <div><span>Register number</span><strong>{student?.registerNo}</strong></div>
              <div><span>Department</span><strong>{student?.department}</strong></div>
              <div><span>Academic year</span><strong>{student?.year}</strong></div>
            </div>
          </div>
          <form className="profile-form" onSubmit={(event) => { event.preventDefault(); setToastMessage("Permitted profile details saved for this session."); }}>
            <label>Phone Number<input value={profile.phone} onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))} /></label>
            <label>Address<textarea value={profile.address} onChange={(event) => setProfile((current) => ({ ...current, address: event.target.value }))} /></label>
            <label>Department<input value={student?.department || ""} disabled /></label>
            <label>Academic Year<input value={student?.year || ""} disabled /></label>
            <Button type="submit">Save Profile</Button>
            <Button variant="secondary" onClick={() => setToastMessage("Password changes require a secure account service.")}>Change Password</Button>
          </form>
        </section>
      )}
      <Toast message={toastMessage} onDismiss={dismissToast} />
    </DashboardShell>
  );
}
