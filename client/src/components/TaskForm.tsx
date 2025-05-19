import { useState } from "react";
import { Task } from "../../../shared/types";

export default function TaskForm({
  onCreate,
}: {
  onCreate: (newTask: Task) => void;
}) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  // how to handle state for select menu?
  return (
    <form className="task-form">
      <h1>Create a new task.</h1>
      <input type="text" placeholder="Task..."></input>
      <input type="text" placeholder="Due date..."></input>
      <select>
        <option>Pass down tags as props.</option>
      </select>
      <button type="button">Add task</button>
    </form>
  );
}
