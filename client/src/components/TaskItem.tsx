import { Task } from "../../../shared/types";

function Checkbox({ status }: { status: boolean }) {
  return (
    <button type="button" className="checkbox">
      {status ? "[ ]" : "[X]"}
    </button>
  );
}

function DeleteButton() {
  return (
    <button type="button" className="delete">
      Delete
    </button>
  );
}

export default function TaskItem({ task }: { task: Task }) {
  return (
    <div className="container">
      <Checkbox status={task.complete} />
      <h1>{task.name}</h1>
      <DeleteButton />
    </div>
  );
}
