import Button from "./Button";
import StatusBadge from "./StatusBadge";

function StudentCard({ student, onView, onEdit, onDelete, canManage = true }) {

  return (

    <div className="student-card">

      <div className="student-header">

        <img
          src={student.image}
          alt={student.name}
          className="student-image"
        />

        <div>
          <h3>{student.name}</h3>
          <p className="student-register">{student.registerNo}</p>
        </div>

      </div>

      <div className="student-details">

        <div className="student-card-tags">
          <span>{student.department}</span>
          <span>{student.year}</span>
        </div>
        <p><span>Email</span> {student.email}</p>
        <StatusBadge status={student.status} />

      </div>

      <div className="student-actions">

        <Button
          variant="primary"
          onClick={() => onView(student)}
        >
          View Profile
        </Button>

        {canManage && (
          <>
            <Button
              variant="secondary"
              onClick={() => onEdit(student)}
            >
              Edit
            </Button>

            <Button
              variant="danger"
              onClick={() => onDelete(student.id)}
            >
              Delete
            </Button>
          </>
        )}

      </div>

    </div>

  );
}

export default StudentCard;