// determines whether to sort tasks by due date
export default function SortByDueToggle({
  sortByDue,
  handleChange,
}: {
  sortByDue: boolean;
  handleChange: () => void;
}) {
  return (
    <label>
      <p>Sort by due</p>
      <input
        type="checkbox"
        checked={sortByDue}
        onChange={handleChange}
      ></input>
    </label>
  );
}
