import { Task } from "../../../shared/types";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import "./components.css";

export default function TaskList({
  tasks,
  onDelete,
}: {
  tasks: Task[];
  onDelete: (id: number) => void;
}) {
  const listItems = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onDelete={() => onDelete(task.id)}
    ></TaskItem>
  ));
  return (
    <div className="list-container">
      <TaskHeader />
      {listItems}
      <TaskForm />
    </div>
  );
}
