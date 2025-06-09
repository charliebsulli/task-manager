"use client";

import FilterableTaskList from "@/components/FilterableTaskList";
import { Task } from "../../../shared/types";
import { useTasks } from "@/api/tasks/get-tasks";
import { useTags } from "@/api/tags/get-tags";

export default function Home() {
  const tasks = useTasks(); // similarly, could move this loading status to TaskList
  // then, could show skeleton of UI while loading instead of nothing

  const tags = useTags(); // maybe pass this down, loading status can be in TagFilter

  if (tasks.status === "pending" || tags.status === "pending") {
    return <span>Loading...</span>;
  }

  if (tasks.status === "error" || tags.status === "error") {
    return <span>Error: tasks or tags failed to load.</span>;
  }

  // construct date objects from the stored date strings
  const taskList = tasks.data.data;
  const correctedTaskList = [];
  for (let i = 0; i < taskList.length; i++) {
    const correctedTask: Task = {
      ...taskList[i],
      due: new Date(taskList[i].due), // convert string recieved from request back into Date
    };
    correctedTaskList.push(correctedTask);
  }

  return (
    <FilterableTaskList
      startingTasks={correctedTaskList}
      startingTags={tags.data.data}
    ></FilterableTaskList>
  );
}
