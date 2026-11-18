import { additionalStudents, students as initialStudents } from "./students";

export const DEFAULT_CARD_VALID_THROUGH = "2027-06-30";
const CARD_STATUS_KEY = "college-student-id-card-status";
const STUDENTS_KEY = "college-managed-students";
const STUDENT_SEED_VERSION_KEY = "college-student-seed-version";
const STUDENT_SEED_VERSION = "3";

export function getManagedStudents() {
  const saved = localStorage.getItem(STUDENTS_KEY);
  if (!saved) {
    localStorage.setItem(STUDENT_SEED_VERSION_KEY, STUDENT_SEED_VERSION);
    return initialStudents;
  }

  const managed = JSON.parse(saved);
  if (localStorage.getItem(STUDENT_SEED_VERSION_KEY) === STUDENT_SEED_VERSION) {
    return managed;
  }

  const existingIds = new Set(managed.map((student) => String(student.id)));
  const seededStudents = new Map(additionalStudents.map((student) => [String(student.id), student]));
  const sharedSeedAvatars = new Set([
    "/student-avatars/student-1.jpg",
    "/student-avatars/student-2.jpg",
    "/student-avatars/student-3.jpg"
  ]);
  const migrated = [
    ...managed.map((student) => {
      const seededStudent = seededStudents.get(String(student.id));
      return seededStudent && sharedSeedAvatars.has(student.image)
        ? { ...student, image: seededStudent.image }
        : student;
    }),
    ...additionalStudents.filter((student) => !existingIds.has(String(student.id)))
  ];
  saveManagedStudents(migrated);
  localStorage.setItem(STUDENT_SEED_VERSION_KEY, STUDENT_SEED_VERSION);
  return migrated;
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
