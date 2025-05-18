import FilterableTaskList from "@/components/FilterableTaskList";
import { Task } from "../../../shared/types";

export default function Home() {
  return <FilterableTaskList tasks={tasks}></FilterableTaskList>;
}

// Temporary tasks until API connected

const tasks: Task[] = [
  {
    id: 1,
    name: "Wash dishes",
    complete: false,
    tags: ["red", "green"],
    due: "duedate",
    user: 0,
  },
  {
    id: 2,
    name: "Buy groceries",
    complete: true,
    tags: ["blue"],
    due: "duedate",
    user: 0,
  },
  {
    id: 3,
    name: "Write report",
    complete: false,
    tags: ["yellow", "green"],
    due: "duedate",
    user: 0,
  },
  {
    id: 4,
    name: "Call plumber",
    complete: true,
    tags: [],
    due: "duedate",
    user: 0,
  },
  {
    id: 5,
    name: "Schedule meeting",
    complete: false,
    tags: ["purple"],
    due: "duedate",
    user: 0,
  },
];
