import { useState } from "react";
import { Task, TaskParams, Tag } from "../../../shared/types";
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
    <button
      type="button"
      className="mr-1.5 text-red-300 hover:text-red-500"
      onClick={onClick}
    >
      Delete
    </button>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="mr-4 text-slate-300 hover:text-slate-500"
      onClick={onClick}
    >
      Edit
    </button>
  );
}

function DueDateTime({ dueDateTime }: { dueDateTime: string }) {
  return <p className="flex-5/12 ml-1">{dueDateTime}</p>;
}

function TagList({ tagNames }: { tagNames: string[] }) {
  const listTags = tagNames.map((tagName, idx) => (
    <TagItem key={idx} tagName={tagName} />
  ));
  return <div className="tags-container">{listTags}</div>;
}

function TagItem({ tagName }: { tagName: string }) {
  return (
    <span className="bg-slate-300 rounded h-6">
      <p className="mx-1">{tagName}</p>
    </span>
  );
}

export default function TaskItem({
  task,
  onDelete,
  onStatusChange,
  onEditSubmit,
  allTags,
}: {
  task: Task;
  onDelete: () => void;
  onStatusChange: () => void;
  onEditSubmit: (newParams: TaskParams) => void;
  allTags: Map<string, Tag>;
}) {
  const [editing, setEditing] = useState(false);

  // given a list of tag `_ids`, create a list of corresponding tag names
  // this implicitly but badly handles case where a Tag is deleted from
  // the database
  function getTagNames(tagIds: string[]) {
    const tagNames = [];
    for (let i = 0; i < tagIds.length; i++) {
      const name = allTags.get(tagIds[i])?.name;
      if (name) {
        tagNames.push(name);
      }
    }
    return tagNames;
  }

  function handleEditClick() {
    setEditing(!editing);

    // if we're hiding the form it should reset
    // the state of the form without changing anything
  }

  return (
    <>
      <div className="flex flex-row">
        <Checkbox status={task.complete} onStatusChange={onStatusChange} />
        <div className="flex flex-row gap-1 flex-5/12">
          <p className="">{task.name}</p>
          <TagList tagNames={getTagNames(task.tags)} />
        </div>
        <DueDateTime dueDateTime={task.due} />
        {!editing && <EditButton onClick={handleEditClick} />}
        <DeleteButton onClick={onDelete} />
      </div>
      {editing && (
        <TaskForm
          onCreate={(newParams) => {
            handleEditClick();
            onEditSubmit(newParams);
          }}
          tags={allTags}
        />
      )}
    </>
  );
}
