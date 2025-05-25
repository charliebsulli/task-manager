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
    <label className="mx-3 my-0">
      <input
        type="checkbox"
        checked={status}
        onChange={onStatusChange}
        className="peer w-0 h-0 opacity-0 absolute"
      />
      <span className="btn-primary flex group peer-checked:bg-slate-400 peer-checked:hover:bg-slate-400">
        <p className="flex-10/12 ml-1 select-none">{name}</p>
        <label className="scale-0 group-hover:scale-100">
          <button
            type="button"
            onClick={onDelete}
            className="w-0 h-0 opacity-0 absolute"
          ></button>
          <span className="mr-1 text-red-300 hover:text-red-500 align-middle select-none">
            X
          </span>
        </label>
      </span>
    </label>
  );
}
