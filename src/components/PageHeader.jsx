export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  avatar
}) {
  return (
    <header className="page-header">
      <div className="page-heading">
        {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {(actions || avatar) && (
        <div className="page-header-actions">
          {avatar}
          {actions}
        </div>
      )}
    </header>
  );
}
