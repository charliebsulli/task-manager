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

  // given a task, use state to determine whether it should be displayed
  function filterTask(task: Task): boolean {
    return (
      (activeTag === NONE || task.tags.includes(activeTag)) &&
      (showComplete || !task.complete) &&
      (!onlyOverdue || isOverdue(task))
    );
  }

  function isOverdue(task: Task): boolean {
    return task.due.getTime() < Date.now() && !task.complete;
  }

  const listItems = Array.from(tasks, ([_id, task]) =>
    filterTask(task) ? (
      <TaskItem
        key={_id}
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
      ></TaskItem>
    ) : (
      <span key={_id}></span>
    )
  );

  return (
    <div className="w-3/4 mt-2 flex flex-col gap-0.5">
      <TaskHeader
        showComplete={showComplete}
        handleShowCompleteToggle={handleShowCompleteToggle}
        onlyOverdue={onlyOverdue}
        handleOnlyOverdueToggle={handleOnlyOverdueToggle}
      />
      {listItems}
      <TaskForm onCreate={onCreate} tags={tags} defaultTag={activeTag} />
    </div>
  );
}
