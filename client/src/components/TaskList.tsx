import { Task, TaskParams, Tag } from "../../../shared/types";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { NONE } from "./FilterableTaskList";
import { useEffect, useState } from "react";

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  onCreate,
  tags,
  activeTag,
}: {
  tasks: Map<string, Task>;
  onDelete: (task: Task) => void;
  onEdit: (_id: string, newTask: Task) => void;
  onCreate: (taskParams: TaskParams) => void;
  tags: Map<string, Tag>;
  activeTag: string;
}) {
  const [showComplete, setShowComplete] = useState(false);
  const [onlyOverdue, setOnlyOverdue] = useState(false);
  const [sortByDue, setSortByDue] = useState(true);

  useEffect(() => {
    if (onlyOverdue) {
      setShowComplete(false);
    }
  }, [onlyOverdue]);

  useEffect(() => {
    if (showComplete) {
      setOnlyOverdue(false);
    }
  }, [showComplete]);

  function handleShowCompleteToggle() {
    setShowComplete(!showComplete);
  }

  function handleOnlyOverdueToggle() {
    setOnlyOverdue(!onlyOverdue);
  }

  function handleSortByDueToggle() {
    setSortByDue(!sortByDue);
  }

  // given a task, use state to determine whether it should be displayed
  function filterTask(task: Task): boolean {
    return (
      (activeTag === NONE || task.tags.includes(activeTag)) &&
      (showComplete || !task.complete) &&
      (!onlyOverdue || isOverdue(task))
    );
  }

  function isOverdue(task: Task): boolean {
    // get absolute year, month, date of task: these are set in UTC
    const year = task.due.getUTCFullYear();
    const month = task.due.getUTCMonth();
    const date = task.due.getUTCDate();

    // overdue is decided using local time zone
    const now = new Date(Date.now());
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    const datePassed =
      currentYear >= year && currentMonth >= month && currentDate > date;
    return datePassed && !task.complete;
  }

  function sortTasks(tasks: Map<string, Task>): Map<string, Task> {
    if (!sortByDue) {
      return tasks;
    }
    const sortedTaskMap = new Map([...tasks].sort(compareByDate));
    return sortedTaskMap;
  }

  function compareByDate(a: [string, Task], b: [string, Task]): number {
    const aDue = a[1].due.getTime();
    const bDue = b[1].due.getTime();
    return aDue - bDue;
  }

  const listItems = Array.from(sortTasks(tasks), ([_id, task]) => (
    <div key={_id} className={filterTask(task) ? "visible" : "collapse"}>
      <TaskItem
        task={task}
        onDelete={() => onDelete(task)}
        onStatusChange={() => {
          const newTask: Task = {
            ...task,
            complete: !task.complete,
          };
          onEdit(_id, newTask);
        }}
        onEditSubmit={(newParams: TaskParams) => {
          const newTask: Task = {
            ...task,
            name: newParams.name,
            tags: newParams.tags,
            due: newParams.due,
          };
          onEdit(_id, newTask);
        }}
        allTags={tags}
      />
    </div>
  ));

  return (
    <div className="w-3/4 mt-2 flex flex-col mx-5">
      <TaskHeader
        showComplete={showComplete}
        handleShowCompleteToggle={handleShowCompleteToggle}
        onlyOverdue={onlyOverdue}
        handleOnlyOverdueToggle={handleOnlyOverdueToggle}
        sortByDue={sortByDue}
        handleSortByDueToggle={handleSortByDueToggle}
      />
      {listItems}
      <hr className="mx-5 my-2 text-slate-400"></hr>
      <TaskForm onCreate={onCreate} tags={tags} defaultTag={activeTag} />
    </div>
  );
}
