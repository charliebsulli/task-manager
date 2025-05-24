export default function TagSwitch({
  name,
  status,
  onStatusChange,
}: {
  name: string;
  status: boolean;
  onStatusChange: () => void;
}) {
  return (
    <div className="tag-switch">
      <label className="switch">
        <input type="checkbox" checked={status} onChange={onStatusChange} />
        <span className="toggle">{name}</span>
      </label>
      <label className="delete-tag">
        <button type="button"></button>
        <span className="delete-tag-button">X</span>
      </label>
    </div>
  );
}
