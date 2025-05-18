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

// get Task by id
export async function getTask(id: number) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      return tasks[i];
    }
  }
  return null;
}

// edit Task by id
export async function editTask(newTask: Task) {
  const id = newTask.id;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i] = newTask;
      return tasks[i];
    }
  }
  return null;
}

// create Task
export async function createTask(newTask: Task) {
  // for now do not care if ids are the same, this is just for starting development
  // so if the task with this id already exists, it will override
  editTask(newTask).then((tryEdit) => {
    if (tryEdit) {
      return;
    }
    // current id does not exist, add new entry
    tasks.push(newTask);
  });
}

// delete Task by id
export async function deleteTask(id: number) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
    }
  }
}
