import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";
import DashboardStats from "../../components/DashboardStats";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";
import StudentGrid from "../../components/StudentGrid";
import Button from "../../components/Button";
import StudentIDCard from "../../components/StudentIDCard";
import PageHeader from "../../components/PageHeader";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import {
  DEFAULT_CARD_VALID_THROUGH,
  getCardStatusMap,
  getManagedStudents,
  isStudentCardActive,
  saveManagedStudents,
  setStudentCardActive
} from "../../data/studentIdCards";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/admin/students", label: "Students", icon: "◉" },
  { to: "/admin/id-cards", label: "Student ID Cards", icon: "▣" },
  { to: "/admin/faculty", label: "Faculty", icon: "♙" },
  { to: "/admin/departments", label: "Departments", icon: "◆" },
  { to: "/admin/academic-years", label: "Academic Years", icon: "▤" },
  { to: "/admin/classes", label: "Class Management", icon: "▣" },
  { to: "/admin/assignments", label: "Faculty Assignments", icon: "↔" },
  { to: "/admin/announcements", label: "Announcements", icon: "◫" },
  { to: "/admin/accounts", label: "Account Management", icon: "⚙" },
  { to: "/admin/settings", label: "Settings", icon: "⚙" }
];

export default function AdminPortal() {
  const location = useLocation();
  const page = location.pathname.split("/").pop();
  const [students, setStudents] = useState(() => getManagedStudents());
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ department: "", year: "", status: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDialog, setStudentDialog] = useState(null);
  const [studentFormError, setStudentFormError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [cardStatuses, setCardStatuses] = useState(() => getCardStatusMap());
  const [cardManageMessage, setCardManageMessage] = useState("");

  const updateStudents = (update) => {
    const next = update(students);
    saveManagedStudents(next);
    setStudents(next);
  };

  const filteredStudents = students.filter((student) =>
    (`${student.name} ${student.registerNo} ${student.email}`.toLowerCase().includes(search.toLowerCase())) &&
    (!filters.department || student.department === filters.department) &&
    (!filters.year || student.year === filters.year) &&
    (!filters.status || student.status === filters.status)
  );

  const dismissToast = useCallback(() => setToastMessage(""), []);

  const openAddStudent = () => {
    setStudentFormError("");
    setStudentDialog({
      mode: "add",
      student: {
        name: "",
        registerNo: "",
        department: "CSE",
        year: "1st Year",
        email: ""
      }
    });
  };

  const editStudent = (student) => {
    setStudentFormError("");
    setStudentDialog({ mode: "edit", student: { ...student } });
  };

  const saveStudent = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const student = {
      name: String(formData.get("name")).trim(),
      registerNo: String(formData.get("registerNo")).trim(),
      department: String(formData.get("department")),
      year: String(formData.get("year")),
      email: String(formData.get("email")).trim()
    };
    const currentId = studentDialog.mode === "edit" ? studentDialog.student.id : null;
    const duplicate = students.some((item) =>
      item.id !== currentId &&
      (item.registerNo.toLowerCase() === student.registerNo.toLowerCase() ||
        item.email.toLowerCase() === student.email.toLowerCase())
    );
    if (duplicate) {
      setStudentFormError("Register number and email must be unique.");
      return;
    }

    if (studentDialog.mode === "edit") {
      updateStudents((items) => items.map((item) =>
        item.id === currentId ? { ...item, ...student } : item
      ));
      setToastMessage("Student record updated.");
    } else {
      updateStudents((items) => [...items, {
        ...student,
        id: Date.now(),
        image: "/student-avatars/student-1.jpg",
        status: "Active"
      }]);
      setToastMessage("Student added.");
    }
    setStudentDialog(null);
  };

  const confirmDeleteStudent = () => {
    const id = studentDialog.student.id;
    updateStudents((items) => items.filter((item) => item.id !== id));
    setSelectedStudent(null);
    setStudentDialog(null);
    setToastMessage("Student record deleted.");
  };

  const deleteStudent = (id) => {
    const student = students.find((item) => item.id === id);
    if (student) setStudentDialog({ mode: "delete", student });
  };

  const renderStudents = () => (
    <section className="students-section">
      <div className="section-header"><h2>Student Records ({filteredStudents.length})</h2></div>
      <div className="search-filter">
        <SearchBar search={search} setSearch={setSearch} />
        <FilterDropdown filters={filters} setFilters={setFilters} />
      </div>
      <StudentGrid
        students={filteredStudents}
        onView={setSelectedStudent}
        onEdit={editStudent}
        onDelete={deleteStudent}
      />
    </section>
  );

  const simplePage = (title, description, items) => (
    <section className="content-card">
      <div className="section-header"><h2>{title}</h2><p>{description}</p></div>
      <div className="management-list">
        {items.map((item) => (
          <div className="management-row" key={item}>
            <strong>{item}</strong>
            <Button variant="secondary" onClick={() => setToastMessage(`${item} selected.`)}>Manage</Button>
          </div>
        ))}
      </div>
    </section>
  );

  const pageTitle = page === "dashboard" ? "Admin Dashboard" : links.find((item) => item.to.endsWith(page))?.label || "Admin";

  const toggleCard = (student) => {
    const active = !isStudentCardActive(student.id);
    setStudentCardActive(student.id, active);
    setCardStatuses((statuses) => ({ ...statuses, [student.id]: active }));
  };

  const updateStudentPhoto = (event, student) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setCardManageMessage("Choose an image file for the student photograph.");
      return;
    }
    if (file.size > 500 * 1024) {
      setCardManageMessage("Choose an image smaller than 500 KB.");
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => setCardManageMessage("Unable to read the selected photograph.");
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setCardManageMessage("The selected photograph could not be converted.");
        return;
      }
      try {
        updateStudents((items) => items.map((item) =>
          item.id === student.id ? { ...item, image: reader.result } : item
        ));
        setCardManageMessage(`Photo updated for ${student.name}.`);
      } catch (error) {
        console.error("Unable to save the student photograph.", error);
        setCardManageMessage("Unable to save the photograph in browser storage.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <DashboardShell title="College Management" links={links}>
      <PageHeader
        eyebrow={page === "dashboard" ? "ADMIN OVERVIEW" : "COLLEGE MANAGEMENT"}
        title={page === "dashboard" ? "Welcome back, Admin" : pageTitle}
        description={page === "dashboard" ? "Here’s an overview of your college community." : `Manage ${pageTitle.toLowerCase()} and keep records up to date.`}
        actions={(page === "dashboard" || page === "students") && <Button onClick={openAddStudent}>+ Add Student</Button>}
      />

      {page === "dashboard" && (
        <>
          <DashboardStats items={[
            { label: "Total Students", value: students.length, icon: "◉", description: "Registered student records" },
            { label: "Total Faculty", value: 12, icon: "♙", description: "Across college departments" },
            { label: "Departments", value: 4, icon: "◆", description: "Academic departments" },
            { label: "Active Accounts", value: students.filter((item) => item.status === "Active").length + 12, icon: "✓", description: "Students and faculty" }
          ]} />
          {renderStudents()}
        </>
      )}
      {page === "students" && renderStudents()}
      {page === "id-cards" && (
        <section className="admin-id-cards">
          {cardManageMessage && <p className="card-manage-message" role="status">{cardManageMessage}</p>}
          {students.map((student) => {
            const active = cardStatuses[student.id] ?? true;
            return (
              <div className="admin-id-card-item" key={student.id}>
                <StudentIDCard student={student} cardActive={active} />
                <div className="id-card-admin-tools">
                  <label className="id-card-photo-upload">
                    Update Student Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => updateStudentPhoto(event, student)}
                    />
                  </label>
                  <label className="id-card-date-field">
                    Card valid through
                    <input
                      type="date"
                      required
                      value={student.idCardValidThrough || DEFAULT_CARD_VALID_THROUGH}
                      onChange={(event) => {
                        const idCardValidThrough = event.target.value;
                        if (!idCardValidThrough) return;
                        updateStudents((items) => items.map((item) =>
                          item.id === student.id ? { ...item, idCardValidThrough } : item
                        ));
                      }}
                    />
                  </label>
                  <Button
                    variant={active ? "danger" : "primary"}
                    onClick={() => toggleCard(student)}
                  >
                    {active ? "Deactivate / Revoke ID Card" : "Reactivate ID Card"}
                  </Button>
                </div>
              </div>
            );
          })}
        </section>
      )}
      {page === "faculty" && simplePage("Faculty Members", "View and manage faculty records.", ["Dr. Maya Patel — AIML", "Prof. Raj Kumar — CSE", "Dr. Sneha Rao — ECE"])}
      {page === "departments" && simplePage("Departments", "Assign departments and academic heads.", ["AIML", "CSE", "ECE", "EEE"])}
      {page === "academic-years" && simplePage("Academic Years", "Configure student academic levels.", ["1st Year", "2nd Year", "3rd Year", "4th Year"])}
      {page === "classes" && simplePage("Classes", "Manage classes, subjects and room allocations.", ["AIML 3A", "CSE 3B", "ECE 2A"])}
      {page === "assignments" && simplePage("Faculty Assignments", "Assign faculty members to classes and subjects.", ["Dr. Maya Patel → AIML 3A", "Prof. Raj Kumar → CSE 3B"])}
      {page === "announcements" && simplePage("Announcements", "Publish college-wide, department and examination announcements.", ["Semester examination schedule", "College sports day", "AIML department meeting"])}
      {page === "accounts" && simplePage("Account Management", "Activate or deactivate student and faculty accounts.", ["Arun Kumar — Active", "Priya S — Active", "Dr. Maya Patel — Active"])}
      {page === "settings" && simplePage("System Settings", "Configure college and portal preferences.", ["College Profile", "Academic Calendar", "Notification Settings"])}

      {selectedStudent && (
        <Modal
          title="Student profile"
          description="Academic and contact details for this student."
          onClose={() => setSelectedStudent(null)}
        >
            <img src={selectedStudent.image} alt={`${selectedStudent.name} profile`} className="profile-image" />
            <h2>{selectedStudent.name}</h2>
            <p className="profile-register">{selectedStudent.registerNo}</p>
            <div className="profile-details">
              <div><span>Department</span><strong>{selectedStudent.department}</strong></div>
              <div><span>Academic Year</span><strong>{selectedStudent.year}</strong></div>
              <div><span>Email Address</span><strong>{selectedStudent.email}</strong></div>
              <div><span>Student Status</span><strong>{selectedStudent.status}</strong></div>
            </div>
            <Button onClick={() => setSelectedStudent(null)}>Close Profile</Button>
        </Modal>
      )}

      {studentDialog?.mode !== "delete" && studentDialog && (
        <Modal
          title={studentDialog.mode === "add" ? "Add student" : "Edit student"}
          description="Enter the official student details below."
          onClose={() => setStudentDialog(null)}
        >
          <form className="app-form" onSubmit={saveStudent}>
            <div className="app-form-grid">
              <label>Full name <span aria-hidden="true">*</span>
                <input name="name" required maxLength={100} defaultValue={studentDialog.student.name} placeholder="e.g. Arun Kumar" />
              </label>
              <label>Register number <span aria-hidden="true">*</span>
                <input name="registerNo" required maxLength={30} defaultValue={studentDialog.student.registerNo} placeholder="e.g. 311824103012" />
              </label>
              <label>Department <span aria-hidden="true">*</span>
                <select name="department" required defaultValue={studentDialog.student.department}>
                  {["AIML", "CSE", "ECE", "EEE"].map((department) => <option key={department}>{department}</option>)}
                </select>
              </label>
              <label>Academic year <span aria-hidden="true">*</span>
                <select name="year" required defaultValue={studentDialog.student.year}>
                  {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((year) => <option key={year}>{year}</option>)}
                </select>
              </label>
              <label className="form-grid-full">Email address <span aria-hidden="true">*</span>
                <input name="email" type="email" required maxLength={254} defaultValue={studentDialog.student.email} placeholder="student@college.edu" />
              </label>
            </div>
            {studentFormError && <p className="form-inline-error" role="alert">{studentFormError}</p>}
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setStudentDialog(null)}>Cancel</Button>
              <Button type="submit">{studentDialog.mode === "add" ? "Add student" : "Save changes"}</Button>
            </div>
          </form>
        </Modal>
      )}

      {studentDialog?.mode === "delete" && (
        <Modal
          title="Delete student record?"
          description={`This will remove ${studentDialog.student.name}'s record from this browser.`}
          onClose={() => setStudentDialog(null)}
        >
          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setStudentDialog(null)}>Keep record</Button>
            <Button variant="danger" onClick={confirmDeleteStudent}>Delete record</Button>
          </div>
        </Modal>
      )}
      <Toast message={toastMessage} onDismiss={dismissToast} />
    </DashboardShell>
  );
}
