import { User, Task } from "../../../shared/types";

// fake data to start with
const users: User[] = [{ id: 0 }];

const tasks: Task[] = [
  {
    id: 1,
    name: "Wash dishes",
    complete: false,
    tags: ["red", "green"],
    due: "duedate",
    user: 0,
  },
];

export async function getTask(id: number) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      console.log("match found");
      return tasks[i];
    }
  }
  console.log("no match found");
  return null;
}
