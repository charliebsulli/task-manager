"use client";

import FilterableTaskList from "@/components/FilterableTaskList";
import { Task } from "../../../shared/types";
import { useTasks } from "@/api/get-tasks";

export default function Home() {
  const tasks = useTasks();

  if (tasks.status === "pending") {
    return <span>Loading...</span>;
  }

  if (tasks.status === "error") {
    return <span>Error: {tasks.error.message}</span>;
  }

  return (
    <FilterableTaskList startingTasks={tasks.data.data}></FilterableTaskList>
  );
}
