import { Task } from "../../../shared/types";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import "./components.css";

export default function TaskList({
  tasks,
  onDelete,
  onStatusChange,
  onEdit,
  onCreate,
}: {
  tasks: Task[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number) => void;
  onEdit: (id: number, newTask: Task) => void;
  onCreate: (taskName: string, date: string, tags: string[]) => void;
}) {
  const listItems = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onDelete={() => onDelete(task.id)}
      onStatusChange={() => onStatusChange(task.id)}
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
