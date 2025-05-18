import { Task } from "../../../shared/types";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import "./components.css";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const listItems = tasks.map((task) => (
    <TaskItem key={task.id} task={task}></TaskItem>
  ));
  return (
    <div>
      <TaskHeader />
      {listItems}
      <TaskForm />
    </div>
  );
}
