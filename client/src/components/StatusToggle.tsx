// determines whether to show completed tasks
export default function StatusToggle({
  showComplete,
  handleChange,
}: {
  showComplete: boolean;
  handleChange: () => void;
}) {
  return (
    <label>
      <p>Show completed</p>
      <input
        type="checkbox"
        checked={showComplete}
        onChange={handleChange}
      ></input>
    </label>
  );
}
