"use client";

import { useState } from "react";
import { Task, TaskParams, Tag } from "../../../shared/types";
import TagFilter from "./TagFilter";
import TaskList from "./TaskList";

import { useCreateTask } from "@/api/tasks/create-task";

import "./components.css";
import { useDeleteTask } from "@/api/tasks/delete-task";
import { useUpdateTask } from "@/api/tasks/update-task";
import { useCreateTag } from "@/api/tags/create-tag";
import { useDeleteTag } from "@/api/tags/delete-tag";
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

  const createTaskMutation = useCreateTask();
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const createTagMutation = useCreateTag();
  const deleteTagMutation = useDeleteTag();

  function handleDeleteTask(task: Task) {
    // make API request to delete
    deleteTaskMutation.mutate(task._id, {
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

  function handleEditTask(_id: string, newTask: Task) {
    // make API request to edit
    updateTaskMutation.mutate(newTask, {
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

  function handleCreateTask({ name, tags, due }: TaskParams) {
    let newTask: Task = {
      _id: "temp", // DB will generate _id
      name: name,
      complete: false,
      tags: tags,
      due: due,
      user: 0,
    };

    // make API request to create
    createTaskMutation.mutate(newTask, {
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

  function handleCreateTag(name: string) {
    let newTag: Tag = {
      _id: "temp",
      name: name,
      user: 0,
    };

    createTagMutation.mutate(newTag, {
      onSuccess: (data) => {
        const newId = data.data;
        newTag = {
          ...newTag,
          _id: newId,
        };
        const newTags = new Map(tags);
        newTags.set(newId, newTag);
        setTags(newTags);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  }

  function handleDeleteTag(_id: string) {
    deleteTagMutation.mutate(_id, {
      onSuccess: () => {
        const newTags = new Map(tags);
        newTags.delete(_id);
        setTags(newTags);
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
        onCreate={handleCreateTag}
        onDelete={handleDeleteTag}
      />
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onCreate={handleCreateTask}
        tags={tags}
        activeTag={activeTag}
      />
    </div>
  );
}
