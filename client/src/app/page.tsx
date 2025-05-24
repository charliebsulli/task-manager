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

  return (
    <FilterableTaskList
      startingTasks={tasks.data.data}
      startingTags={tags.data.data}
    ></FilterableTaskList>
  );
}
