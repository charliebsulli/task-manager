// determines whether to filter to only overdue tasks
export default function OverdueToggle({
  onlyOverdue,
  handleChange,
}: {
  onlyOverdue: boolean;
  handleChange: () => void;
}) {
  return (
    <label>
      <p>Overdue</p>
      <input
        type="checkbox"
        checked={onlyOverdue}
        onChange={handleChange}
      ></input>
    </label>
  );
}
