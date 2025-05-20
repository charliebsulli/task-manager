"use client";

import { useState } from "react";
import { Task, TaskParams } from "../../../shared/types";
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

  function handleDelete(id: number) {
    // make API request to delete

    // if it succeeds, delete the task from local state
    let newTasks = [...tasks];
    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id == id) {
        newTasks.splice(i, 1);
      }
    }
    setTasks(newTasks);
  }

  function handleStatusChange(id: number) {
    // triggered by clicking checkbox
    // make API request to edit

    // if it succeeds, edit the task locally
    let newTasks = [...tasks];
    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id == id) {
        newTasks[i].complete = !newTasks[i].complete;
      }
    }
    setTasks(newTasks);
    console.log("status update");
  }

  function handleEdit(id: number, newTask: Task) {
    // make API request to edit

    // if it succeeds, update local state of task
    let newTasks = [...tasks];
    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id == id) {
        newTasks[i] = newTask;
      }
    }
    setTasks(newTasks);
  }

  function handleCreate({ name, tags, due }: TaskParams) {
    // try to construct a task from this data
    let newTask: Task = {
      id: 8, // change to ensure unique ID
      name: name,
      complete: false,
      tags: tags,
      due: due,
      user: 0,
    };

    // make API request to add

    // if it succeeds, add this task to local state
    let newTasks = [...tasks, newTask];
    setTasks(newTasks);
  }

  return (
    <div className="container">
      <TagFilter />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onEdit={handleEdit}
        onCreate={handleCreate}
      />
    </div>
  );
}
