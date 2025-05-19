import { Task } from "../../../shared/types";

function Checkbox({ status }: { status: boolean }) {
  return <input className="checkbox" type="checkbox" />;
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
    <div className="task-container">
      <Checkbox status={task.complete} />
      <h1>{task.name}</h1>
      <DeleteButton />
    </div>
  );
}
