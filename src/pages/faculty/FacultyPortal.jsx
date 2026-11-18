import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";
import DashboardStats from "../../components/DashboardStats";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";
import StudentGrid from "../../components/StudentGrid";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { students } from "../../data/students";

const links = [
  { to: "/faculty/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/faculty/students", label: "My Students", icon: "◉" },
  { to: "/faculty/attendance", label: "Attendance", icon: "✓" },
  { to: "/faculty/assignments", label: "Assignments", icon: "▤" },
  { to: "/faculty/materials", label: "Study Materials", icon: "▣" },
  { to: "/faculty/timetable", label: "Timetable", icon: "◷" },
  { to: "/faculty/announcements", label: "Announcements", icon: "◫" }
];

export default function FacultyPortal() {
  const location = useLocation();
  const page = location.pathname.split("/").pop();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ department: "", year: "", status: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [attendance, setAttendance] = useState({});
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [assignments, setAssignments] = useState([
    { title: "Machine Learning Mini Project", due: "25 Nov 2026" },
    { title: "Data Analytics Report", due: "25 Nov 2026" }
  ]);
  const dismissToast = useCallback(() => setToastMessage(""), [setToastMessage]);

  const assignedStudents = students.filter((student) => student.department === "AIML");
  const filtered = assignedStudents.filter((student) =>
    `${student.name} ${student.registerNo} ${student.email}`.toLowerCase().includes(search.toLowerCase()) &&
    (!filters.department || student.department === filters.department) &&
    (!filters.year || student.year === filters.year) &&
    (!filters.status || student.status === filters.status)
  );

  const title = links.find((item) => item.to.endsWith(page))?.label || "Faculty Dashboard";

  const createAssignment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const assignment = {
      title: String(formData.get("title")).trim(),
      due: String(formData.get("due"))
    };
    setAssignments((current) => [...current, assignment]);
    setAssignmentDialogOpen(false);
    setToastMessage("Assignment added for this session; backend storage is not connected.");
  };

  return (
    <DashboardShell title="Faculty Portal" links={links}>
      <PageHeader
        eyebrow={page === "dashboard" ? "FACULTY WORKSPACE" : "TEACHING & LEARNING"}
        title={page === "dashboard" ? "Welcome, Dr. Maya Patel" : title}
        description="Manage your assigned classes and students."
      />

      {page === "dashboard" && (
        <>
          <DashboardStats items={[
            { label: "Assigned Students", value: assignedStudents.length, icon: "◉", description: "Across your assigned classes" },
            { label: "Assigned Subjects", value: 4, icon: "▤", description: "Current semester" },
            { label: "Today's Classes", value: 3, icon: "◷", description: "Scheduled for today" },
            { label: "Pending Assignments", value: 5, icon: "!", description: "Awaiting review" }
          ]} />
          <section className="content-card">
            <div className="section-header"><h2>Today's Schedule</h2></div>
            <div className="schedule-list">
              <div><strong>Machine Learning</strong><span>AIML 3A · 9:00 AM</span></div>
              <div><strong>Data Analytics</strong><span>AIML 3A · 11:00 AM</span></div>
              <div><strong>Project Guidance</strong><span>Lab 2 · 2:00 PM</span></div>
            </div>
          </section>
        </>
      )}

      {page === "students" && (
        <section className="students-section">
          <div className="section-header"><h2>Assigned Students ({filtered.length})</h2></div>
          <div className="search-filter">
            <SearchBar search={search} setSearch={setSearch} />
            <FilterDropdown filters={filters} setFilters={setFilters} />
          </div>
          <StudentGrid
            students={filtered}
            onView={setSelectedStudent}
            onEdit={() => {}}
            onDelete={() => {}}
            canManage={false}
          />
        </section>
      )}

      {page === "attendance" && (
        <section className="content-card">
          <div className="attendance-toolbar">
            <select defaultValue="AIML 3A"><option>AIML 3A</option><option>CSE 3B</option></select>
            <select defaultValue="Machine Learning"><option>Machine Learning</option><option>Data Analytics</option></select>
            <input type="date" defaultValue="2026-11-18" />
            <Button onClick={() => setToastMessage(
              Object.keys(attendance).length
                ? "Attendance marked for this session; backend storage is not connected."
                : "Mark at least one student before saving attendance."
            )}>Save Attendance</Button>
          </div>
          <div className="table-wrap">
            <table><thead><tr><th>Student</th><th>Register No.</th><th>Status</th></tr></thead>
              <tbody>{assignedStudents.map((student) => (
                <tr key={student.id}><td>{student.name}</td><td>{student.registerNo}</td><td>
                  <div className="attendance-actions">
                    <Button
                      variant={attendance[student.id] === "Present" ? "primary" : "secondary"}
                      onClick={() => setAttendance((records) => ({ ...records, [student.id]: "Present" }))}
                    >Present</Button>
                    <Button
                      variant={attendance[student.id] === "Absent" ? "danger" : "secondary"}
                      onClick={() => setAttendance((records) => ({ ...records, [student.id]: "Absent" }))}
                    >Absent</Button>
                  </div>
                </td></tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      )}

      {page === "assignments" && (
        <section className="content-card">
          <div className="section-header"><h2>Assignments</h2><Button onClick={() => setAssignmentDialogOpen(true)}>Create Assignment</Button></div>
          <div className="assignment-grid">
            {assignments.map((assignment) => (
              <article className="assignment-card" key={assignment.title}><h3>{assignment.title}</h3><p>Due: {assignment.due}</p><span>Submission records unavailable</span><Button variant="secondary" onClick={() => setToastMessage("Submission records are not connected to a backend yet.")}>View Submissions</Button></article>
            ))}
          </div>
        </section>
      )}

      {page === "materials" && (
        <section className="content-card">
          <div className="section-header"><h2>Study Materials</h2><Button onClick={() => setToastMessage("Study-material uploads require connected file storage.")}>Upload Material</Button></div>
          <div className="management-list">
            {["Machine Learning Unit 1.pdf", "Data Analytics Notes.pdf", "Semester Project Guide.pdf"].map((file) => (
              <div className="management-row" key={file}><strong>{file}</strong><Button variant="secondary" onClick={() => setToastMessage("Material management requires connected file storage.")}>Manage</Button></div>
            ))}
          </div>
        </section>
      )}

      {page === "timetable" && (
        <section className="content-card">
          <div className="section-header"><h2>My Timetable</h2></div>
          <div className="table-wrap"><table><thead><tr><th>Subject</th><th>Class</th><th>Time</th><th>Room</th></tr></thead>
            <tbody><tr><td>Machine Learning</td><td>AIML 3A</td><td>Mon 9:00–10:00 AM</td><td>Room 301</td></tr><tr><td>Data Analytics</td><td>AIML 3A</td><td>Tue 11:00 AM–12:00 PM</td><td>Lab 2</td></tr></tbody>
          </table></div>
        </section>
      )}

      {page === "announcements" && (
        <section className="content-card"><div className="section-header"><h2>Class Announcements</h2><Button onClick={() => setToastMessage("Publishing announcements requires a connected college service.")}>Publish Announcement</Button></div>
          <div className="announcement-card"><h3>Project review scheduled</h3><p>Please prepare your progress presentations for Friday.</p><span>AIML 3A · 18 Nov 2026</span></div>
        </section>
      )}

      {assignmentDialogOpen && (
        <Modal
          title="Create assignment"
          description="Add an assignment for your assigned classes."
          onClose={() => setAssignmentDialogOpen(false)}
        >
          <form className="app-form" onSubmit={createAssignment}>
            <label>Assignment title <span aria-hidden="true">*</span>
              <input name="title" required maxLength={120} placeholder="e.g. Machine learning case study" />
            </label>
            <label>Submission deadline <span aria-hidden="true">*</span>
              <input name="due" type="date" required />
            </label>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setAssignmentDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Create assignment</Button>
            </div>
          </form>
        </Modal>
      )}

      {selectedStudent && (
        <Modal
          title="Student profile"
          description="A student assigned to your classes."
          onClose={() => setSelectedStudent(null)}
        >
          <div className="faculty-student-profile">
            <img src={selectedStudent.image} alt={`${selectedStudent.name} profile`} />
            <h2>{selectedStudent.name}</h2>
            <p>{selectedStudent.registerNo}</p>
            <div className="profile-details">
              <div><span>Department</span><strong>{selectedStudent.department}</strong></div>
              <div><span>Academic year</span><strong>{selectedStudent.year}</strong></div>
              <div><span>Email</span><strong>{selectedStudent.email}</strong></div>
            </div>
          </div>
        </Modal>
      )}
      <Toast message={toastMessage} onDismiss={dismissToast} />
    </DashboardShell>
  );
}
