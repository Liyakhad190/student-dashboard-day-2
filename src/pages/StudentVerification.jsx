import { Link, useParams } from "react-router-dom";
import {
  DEFAULT_CARD_VALID_THROUGH,
  getCardVerificationStatus,
  getManagedStudents,
  getStudentId
} from "../data/studentIdCards";

const results = {
  valid: { title: "VALID STUDENT ID", message: "This student ID is active and within its validity period." },
  inactive: { title: "INACTIVE STUDENT ID", message: "This student account or ID card has been deactivated." },
  expired: { title: "EXPIRED STUDENT ID", message: "This student ID card is past its validity period." },
  invalid: { title: "INVALID STUDENT ID", message: "No student record matches this verification link." }
};

export default function StudentVerification() {
  const { studentId } = useParams();
  const student = getManagedStudents().find((item) => String(item.id) === studentId);
  const status = getCardVerificationStatus(student);
  const result = results[status];
  const validityDate = student?.idCardValidThrough || DEFAULT_CARD_VALID_THROUGH;

  return (
    <main className="verification-page">
      <article className="verification-card">
        <div className="verification-brand">
          <div className="college-logo">MS</div>
          <div><strong>Mohamed Sathak A.J. College of Engineering</strong><span>Student ID Verification</span></div>
        </div>
        <div className={`verification-result ${status}`} role="status">
          <strong>{result.title}</strong>
          <span>{result.message}</span>
        </div>
        {student && (
          <div className="verification-student">
            <img src={student.image} alt={`${student.name} student photograph`} />
            <div>
              <h1>{student.name}</h1>
              <p><span>Register Number</span><strong>{student.registerNo}</strong></p>
              <p><span>Student ID</span><strong>{getStudentId(student)}</strong></p>
              <p><span>Department</span><strong>{student.department}</strong></p>
              <p><span>Academic Year</span><strong>{student.year}</strong></p>
              <p><span>ID Card Valid Through</span><strong>{new Date(`${validityDate}T00:00:00`).toLocaleDateString()}</strong></p>
            </div>
          </div>
        )}
        <p className="verification-disclaimer">
          This preview checks the current application records. Production verification must use a trusted backend service.
        </p>
        <Link className="verification-home" to="/login">College Portal</Link>
      </article>
    </main>
  );
}
