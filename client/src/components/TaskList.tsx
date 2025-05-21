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
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newTask: Task) => void;
  onCreate: (taskParams: TaskParams) => void;
}) {
  // maybe pull the status change/edit submit functions out to simplify list items
  const listItems = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onDelete={() => onDelete(task.id)}
      onStatusChange={() => {
        const newTask: Task = {
          id: task.id,
          name: task.name,
          complete: !task.complete,
          tags: task.tags,
          due: task.due,
          user: task.user,
        };
        onEdit(task.id, newTask);
      }}
      onEditSubmit={(newParams: TaskParams) => {
        const newTask: Task = {
          id: task.id,
          name: newParams.name,
          complete: task.complete,
          tags: newParams.tags,
          due: newParams.due,
          user: task.user,
        };
        onEdit(task.id, newTask);
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
