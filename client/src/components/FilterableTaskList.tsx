"use client";

import { useState } from "react";
import { Task } from "../../../shared/types";
import TagFilter from "./TagFilter";
import TaskList from "./TaskList";

import "./components.css";

export default function FilterableTaskList({
  startingTasks,
}: {
  startingTasks: Task[];
}) {
  // maintain list of tasks here instead of re-fetching
  // the tasks are ONLY stored here, and passed down as props to the rest of the components
  const [tasks, setTasks] = useState(startingTasks);

  function deleteTask(id: number) {
    // make API request to delete

    // if it succeeds, delete the task from local state
    let newTasks = [...tasks];
    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id == id) {
        newTasks.splice(i, 1);
      }
    }
    setTasks(newTasks);
    console.log("delete fn reached");
    console.log(tasks);
  }
  return (
    <div className="container">
      <TagFilter />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}
