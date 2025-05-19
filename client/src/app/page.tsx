import FilterableTaskList from "@/components/FilterableTaskList";
import { Task } from "../../../shared/types";

export default function Home() {
  return <FilterableTaskList startingTasks={tasks}></FilterableTaskList>;
}
// Temporary tasks until API connected
// For now, equivalent to fetching all the tasks for user 0

const tasks: Task[] = [
  {
    id: 1,
    name: "Wash dishes",
    complete: false,
    tags: ["red", "green"],
    due: "4/13",
    user: 0,
  },
  {
    id: 2,
    name: "Buy groceries",
    complete: true,
    tags: ["blue"],
    due: "5/12",
    user: 0,
  },
  {
    id: 3,
    name: "Write report",
    complete: false,
    tags: ["yellow", "green"],
    due: "10/25",
    user: 0,
  },
  {
    id: 4,
    name: "Call plumber",
    complete: true,
    tags: [],
    due: "11/11",
    user: 0,
  },
  {
    id: 5,
    name: "Schedule meeting",
    complete: false,
    tags: ["purple"],
    due: "11/11",
    user: 0,
  },
];
