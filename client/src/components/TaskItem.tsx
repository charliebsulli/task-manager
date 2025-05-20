import { useState } from "react";
import { Task, TaskParams } from "../../../shared/types";
import TaskForm from "./TaskForm";

function Checkbox({
  status,
  onStatusChange,
}: {
  status: boolean;
  onStatusChange: () => void;
}) {
  return (
    <input
      className="checkbox"
      type="checkbox"
      checked={status}
      onChange={onStatusChange}
    />
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="delete" onClick={onClick}>
      Delete
    </button>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="edit" onClick={onClick}>
      Edit
    </button>
  );
}

function DueDateTime({ dueDateTime }: { dueDateTime: string }) {
  return <p className="due-date">{dueDateTime}</p>;
}

function TagList({ tags }: { tags: string[] }) {
  const listTags = tags.map((tag, idx) => <Tag key={idx} tag={tag} />);
  return <div className="tags-container">{listTags}</div>;
}

function Tag({ tag }: { tag: string }) {
  return <p className="tag">{tag}</p>;
}

export default function TaskItem({
  task,
  onDelete,
  onStatusChange,
  onEditSubmit,
}: {
  task: Task;
  onDelete: () => void;
  onStatusChange: () => void;
  onEditSubmit: (newParams: TaskParams) => void;
}) {
  const [editing, setEditing] = useState(false);

  function handleEditClick() {
    setEditing(!editing);

    // if we're hiding the form it should reset
    // the state of the form without changing anything
  }

  return (
    <>
      <div className="task-container">
        <Checkbox status={task.complete} onStatusChange={onStatusChange} />
        <div className="tagged-task">
          <p className="task-name">{task.name}</p>
          <TagList tags={task.tags} />
        </div>
        <DueDateTime dueDateTime={task.due} />
        <EditButton onClick={handleEditClick} />
        <DeleteButton onClick={onDelete} />
      </div>
      {editing && <TaskForm onCreate={onEditSubmit} />}
    </>
  );
}
