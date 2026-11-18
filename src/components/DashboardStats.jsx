export default function DashboardStats({ items }) {
  return (
    <div className="stats-grid">
      {items.map((item) => (
        <article className="stat-card" key={item.label}>
          <div className="stat-card-heading">
            <span className="stat-icon" aria-hidden="true">{item.icon}</span>
            <h2>{item.value}</h2>
          </div>
          <h3>{item.label}</h3>
          {item.description && <p>{item.description}</p>}
        </article>
      ))}
    </div>
  );
}
