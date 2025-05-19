import { Task } from "../../../shared/types";
import TagFilter from "./TagFilter";
import TaskList from "./TaskList";

import "./components.css";

export default function FilterableTaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="container">
      <TagFilter />
      <TaskList tasks={tasks} />
    </div>
  );
}
