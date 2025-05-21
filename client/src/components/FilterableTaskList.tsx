"use client";

import { useState } from "react";
import { Task, TaskParams } from "../../../shared/types";
import TagFilter from "./TagFilter";
import TaskList from "./TaskList";

import { useCreateTask } from "@/api/create-task";

import "./components.css";
import { useDeleteTask } from "@/api/delete-task";
import { useUpdateTask } from "@/api/update-task";

export default function FilterableTaskList({
  startingTasks,
}: {
  startingTasks: Task[];
}) {
  // maintain list of tasks here instead of re-fetching
  // the tasks are ONLY stored here, and passed down as props to the rest of the components
  const [tasks, setTasks] = useState(startingTasks);

  const createMutation = useCreateTask();
  const deleteMutation = useDeleteTask();
  const updateMutation = useUpdateTask();

  function handleDelete(id: number) {
    // make API request to delete
    deleteMutation.mutate(id, {
      onSuccess: () => {
        // if it succeeds, delete the task from local state
        let newTasks = [...tasks];
        for (let i = 0; i < newTasks.length; i++) {
          if (newTasks[i].id == id) {
            newTasks.splice(i, 1);
          }
        }
        setTasks(newTasks);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  }

  function handleEdit(id: number, newTask: Task) {
    // make API request to edit
    updateMutation.mutate(newTask, {
      onSuccess: () => {
        // if it succeeds, update local state of task
        let newTasks = [...tasks];
        for (let i = 0; i < newTasks.length; i++) {
          if (newTasks[i].id == id) {
            newTasks[i] = newTask;
          }
        }
        setTasks(newTasks);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  }

  function handleCreate({ name, tags, due }: TaskParams) {
    let newTask: Task = {
      id: 8, // change to ensure unique ID
      name: name,
      complete: false,
      tags: tags,
      due: due,
      user: 0,
    };

    // make API request to create
    createMutation.mutate(newTask, {
      onSuccess: () => {
        // if it succeeds, add this task to local state
        let newTasks = [...tasks, newTask];
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
