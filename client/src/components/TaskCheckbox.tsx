import { LuCircle, LuCircleCheckBig } from "react-icons/lu";

export default function TaskCheckbox({
  status,
  onStatusChange,
}: {
  status: boolean;
  onStatusChange: () => void;
}) {
  return (
    <label className="cursor-pointer">
      <input
        className="peer w-0 h-0 opacity-0 absolute" // select-none w-4 h-4 border-1 m-1 rounded-2xl text-slate-400 checked:bg-emerald-400"
        type="checkbox"
        checked={status}
        onChange={onStatusChange}
      />
      <div className="w-3 h-3 mx-2 mt-1 scale-115 text-slate-500">
        {status ? <LuCircleCheckBig /> : <LuCircle />}
      </div>
    </label>
  );
}
