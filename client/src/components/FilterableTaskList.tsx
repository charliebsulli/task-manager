"use client";

import { useState } from "react";
import { Task, TaskParams } from "../../../shared/types";
import TagFilter from "./TagFilter";
import TaskList from "./TaskList";

import { useCreateTask } from "@/api/create-task";

import "./components.css";
import { useDeleteTask } from "@/api/delete-task";
import { useUpdateTask } from "@/api/update-task";

/**
 * Given an array of Tasks, constructs a map of those Tasks using the `_id` field as a key
 * @param tasks An array of Task objects
 * @returns A mapping of Task `_id`s to Tasks
 */
function createTaskMap(tasks: Task[]) {
  const taskMap = new Map();
  for (let i = 0; i < tasks.length; i++) {
    taskMap.set(tasks[i]._id, tasks[i]);
  }
  return taskMap;
}

export default function FilterableTaskList({
  startingTasks,
}: {
  startingTasks: Task[];
}) {
  // maintain list of tasks here instead of re-fetching
  // the tasks are ONLY stored here, and passed down as props to the rest of the components
  const [tasks, setTasks] = useState(createTaskMap(startingTasks));

  const createMutation = useCreateTask();
  const deleteMutation = useDeleteTask();
  const updateMutation = useUpdateTask();

  function handleDelete(task: Task) {
    // make API request to delete
    deleteMutation.mutate(task._id, {
      onSuccess: () => {
        // if it succeeds, delete the task from local state
        const newTasks = new Map(tasks);
        newTasks.delete(task._id);
        setTasks(newTasks);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  }

  function handleEdit(_id: string, newTask: Task) {
    // make API request to edit
    updateMutation.mutate(newTask, {
      onSuccess: () => {
        // if it succeeds, update local state of task
        const newTasks = new Map(tasks);
        newTasks.set(_id, newTask);
        setTasks(newTasks);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  }

  function handleCreate({ name, tags, due }: TaskParams) {
    let newTask = {
      _id: "temp", // DB will generate _id
      name: name,
      complete: false,
      tags: tags,
      due: due,
      user: 0,
    };

    // make API request to create
    createMutation.mutate(newTask, {
      onSuccess: (data) => {
        // if it succeeds, add this task to local state
        // first, replace with _id assigned by DB
        const newId = data.data;
        newTask = {
          ...newTask,
          _id: newId,
        };
        const newTasks = new Map(tasks);
        newTasks.set(newId, newTask);
        setTasks(newTasks);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  }

  return (
    <div className="container">
      <TagFilter />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onCreate={handleCreate}
      />
    </div>
  );
}
