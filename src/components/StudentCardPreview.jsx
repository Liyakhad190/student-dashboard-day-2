export default function StudentCardPreview({ student, cardRef, children }) {
  return (
    <article
      className="student-id-card"
      ref={cardRef}
      data-print-card={`student-id-${student.id}`}
      aria-label={`Digital student identity card for ${student.name}`}
    >
      {children}
    </article>
  );
}
