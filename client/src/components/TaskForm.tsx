import { useState } from "react";
import { Task } from "../../../shared/types";

export default function TaskForm({
  onCreate,
}: {
  onCreate: (taskName: string, date: string, tags: string[]) => void;
}) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  // how to handle state for select menu?

  function handleTaskNameChange(newTaskName: string) {
    setTaskName(newTaskName);
  }

  function handleDateChange(newDate: string) {
    setDate(newDate);
  }

  function handleCreateClick() {
    onCreate(taskName, date, []);
    setTaskName("");
    setDate("");
  }

  return (
    <form className="task-form">
      <h1>Create a new task.</h1>
      <input
        type="text"
        placeholder="Task..."
        value={taskName}
        onChange={(e) => handleTaskNameChange(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Due date..."
        value={date}
        onChange={(e) => handleDateChange(e.target.value)}
      ></input>
      <select>
        <option>Pass down tags as props.</option>
      </select>
      <button type="button" className="create-task" onClick={handleCreateClick}>
        Add task
      </button>
    </form>
  );
}
