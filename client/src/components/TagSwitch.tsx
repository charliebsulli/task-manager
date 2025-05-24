export default function TagSwitch({
  name,
  status,
  onStatusChange,
  onDelete,
}: {
  name: string;
  status: boolean;
  onStatusChange: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="tag-switch">
      <label className="switch">
        <input type="checkbox" checked={status} onChange={onStatusChange} />
        <span className="toggle">{name}</span>
      </label>
      <label className="delete-tag">
        <button type="button" onClick={onDelete}></button>
        <span className="delete-tag-button">X</span>
      </label>
    </div>
  );
}
