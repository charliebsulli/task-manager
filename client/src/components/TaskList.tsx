import { Task, TaskParams, Tag } from "../../../shared/types";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { NONE } from "./FilterableTaskList";

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
  const listItems = Array.from(tasks, ([_id, task]) =>
    activeTag === NONE || task.tags.includes(activeTag) ? (
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
    <div className="w-3/4 mt-2">
      <TaskHeader />
      {listItems}
      <TaskForm onCreate={onCreate} tags={tags} defaultTag={activeTag} />
    </div>
  );
}
