import { students as initialStudents } from "./students";

export const DEFAULT_CARD_VALID_THROUGH = "2027-06-30";
const CARD_STATUS_KEY = "college-student-id-card-status";
const STUDENTS_KEY = "college-managed-students";

export function getManagedStudents() {
  const saved = localStorage.getItem(STUDENTS_KEY);
  return saved ? JSON.parse(saved) : initialStudents;
}

export function saveManagedStudents(students) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

export function getCardStatusMap() {
  const saved = localStorage.getItem(CARD_STATUS_KEY);
  return saved ? JSON.parse(saved) : {};
}

export function setStudentCardActive(studentId, isActive) {
  const statuses = getCardStatusMap();
  statuses[studentId] = isActive;
  localStorage.setItem(CARD_STATUS_KEY, JSON.stringify(statuses));
}

export function isStudentCardActive(studentId) {
  const statuses = getCardStatusMap();
  return statuses[studentId] ?? true;
}

export function getStudentId(student) {
  return `MSAJCE-${String(student.id).padStart(6, "0")}`;
}

export function getCardVerificationStatus(student) {
  if (!student) return "invalid";
  if (student.status !== "Active" || !isStudentCardActive(student.id)) return "inactive";

  const validThrough = new Date(
    `${student.idCardValidThrough || DEFAULT_CARD_VALID_THROUGH}T23:59:59`
  );
  if (Number.isNaN(validThrough.getTime()) || validThrough < new Date()) return "expired";
  return "valid";
}
