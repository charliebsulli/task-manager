import { Task, TaskParams } from "../../../shared/types";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import "./components.css";

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  onCreate,
}: {
  tasks: Map<string, Task>;
  onDelete: (task: Task) => void;
  onEdit: (_id: string, newTask: Task) => void;
  onCreate: (taskParams: TaskParams) => void;
}) {
  const listItems = Array.from(tasks, ([_id, task]) => (
    <TaskItem
      key={_id}
      task={task}
      onDelete={() => onDelete(task)}
      onStatusChange={() => {
        const newTask: Task = {
          ...task,
          complete: !task.complete,
        };
        onEdit(_id, newTask);
      }}
      onEditSubmit={(newParams: TaskParams) => {
        const newTask: Task = {
          ...task,
          name: newParams.name,
          tags: newParams.tags,
          due: newParams.due,
        };
        onEdit(_id, newTask);
      }}
    ></TaskItem>
  ));
  return (
    <div className="list-container">
      <TaskHeader />
      {listItems}
      <TaskForm onCreate={onCreate} />
    </div>
  );
}
