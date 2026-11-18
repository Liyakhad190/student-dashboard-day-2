export default function StatusBadge({ status }) {
  const normalized = status?.toLowerCase() === "active" ? "active" : "inactive";
  return <span className={`status-badge status-${normalized}`}>{status}</span>;
}
