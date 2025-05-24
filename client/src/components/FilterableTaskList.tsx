"use client";

import { useState } from "react";
import { Task, TaskParams, Tag } from "../../../shared/types";
import TagFilter from "./TagFilter";
import TaskList from "./TaskList";

import { useCreateTask } from "@/api/tasks/create-task";

import "./components.css";
import { useDeleteTask } from "@/api/tasks/delete-task";
import { useUpdateTask } from "@/api/tasks/update-task";
import { UseQueryResult } from "@tanstack/react-query";

export const NONE = "none";

/**
 * Given an array of Tasks or Tags, constructs a map using the `_id` field as a key
 * @param items An array of Task or Tag objects
 * @returns A mapping of `_id`s to ojbects
 */
function createMap(items: Task[] | Tag[]) {
  const map = new Map();
  for (let i = 0; i < items.length; i++) {
    map.set(items[i]._id, items[i]);
  }
  return map;
}

export default function FilterableTaskList({
  startingTasks,
  startingTags,
}: {
  startingTasks: Task[];
  startingTags: Tag[];
}) {
  // maintain list of tasks here instead of re-fetching
  // the tasks are ONLY stored here, and passed down as props to the rest of the components
  const [tasks, setTasks] = useState(createMap(startingTasks));

  // maintain list of tags here, indexed by _id
  const [tags, setTags] = useState(createMap(startingTags));

  // tag which the shown list is filtered by
  const [activeTag, setActiveTag] = useState(NONE);

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

  // update filter
  // _id is the _id of the task to change the filter to
  function handleFilterChange(_id: string) {
    if (activeTag === _id) {
      setActiveTag(NONE);
    } else {
      setActiveTag(_id);
    }
  }

  return (
    <div className="container">
      <TagFilter
        tags={tags}
        active={activeTag}
        onFilterChange={handleFilterChange}
      />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onCreate={handleCreate}
        tags={tags}
        activeTag={activeTag}
      />
    </div>
  );
}
