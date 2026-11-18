import StudentCard from "./StudentCard";

function StudentGrid({ students, onView, onEdit, onDelete, canManage = true }) {

  return (

    <div className="student-grid">

      {students.length > 0 ? (

        students.map((student) => (

          <StudentCard
            key={student.id}
            student={student}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            canManage={canManage}
          />

        ))

      ) : (
        <div className="empty-state">
          <span aria-hidden="true">⌕</span>
          <h3>No students found</h3>
          <p>Try adjusting your search terms or filters.</p>
        </div>
      )}

    </div>

  );

}

export default StudentGrid;