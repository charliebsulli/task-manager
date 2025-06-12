export default function TaskCheckbox({
  status,
  onStatusChange,
}: {
  status: boolean;
  onStatusChange: () => void;
}) {
  return (
    <input
      className="mx-2"
      type="checkbox"
      checked={status}
      onChange={onStatusChange}
    />
  );
}
