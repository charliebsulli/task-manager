export default function IconToggleButton({
  status,
  handleChange,
  icon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tooltip,
}: {
  status: boolean;
  handleChange: () => void;
  icon: React.ReactNode;
  tooltip: string;
}) {
  return (
    <label
      className={
        !status
          ? "btn-secondary icon-btn group/inner relative"
          : "btn-secondary icon-btn bg-indigo-200 text-indigo-800 group/inner relative"
      }
    >
      <input
        type="checkbox"
        checked={status}
        onChange={handleChange}
        className="sr-only"
      ></input>
      {icon}
      {/* <span className="btn-tooltip group-hover/inner:scale-100">{tooltip}</span> */}
    </label>
  );
}
