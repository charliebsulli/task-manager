import { LuTrash2 } from "react-icons/lu";

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
      <span
        role="status"
        className="btn-secondary shadow:sm flex group peer-checked:bg-indigo-200 peer-checked:text-indigo-800"
      >
        <p className="flex-10/12 ml-1 select-none">{name}</p>
        <label className="scale-0 group-hover:scale-100">
          <button
            type="button"
            onClick={onDelete}
            className="text-slate-300 hover:text-slate-500 select-none mt-1 scale-115 px-1"
          >
            <LuTrash2 />
          </button>
        </label>
      </span>
    </label>
  );
}
