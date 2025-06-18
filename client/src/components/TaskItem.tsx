import { useState } from "react";
import { Task, TaskParams, Tag } from "../../../shared/types";
import TaskEditForm from "./TaskEditForm";
import DateDisplay from "./DateDisplay";
import TaskCheckbox from "./TaskCheckbox";
import { LuPenLine, LuTrash2 } from "react-icons/lu";

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="mx-3 text-red-300 hover:text-red-500 cursor-pointer scale-125"
      onClick={onClick}
    >
      <LuTrash2 />
    </button>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="mt-1 text-slate-300 hover:text-slate-500 cursor-pointer scale-125"
      onClick={onClick}
    >
      <LuPenLine />
    </button>
  );
}

function TagList({ tagNames }: { tagNames: string[] }) {
  const listTags = tagNames.map((tagName, idx) => (
    <TagItem key={idx} tagName={tagName} />
  ));
  return <div className="flex flex-row gap-1">{listTags}</div>;
}

function TagItem({ tagName }: { tagName: string }) {
  return (
    <span className="bg-slate-300 rounded h-6">
      <p data-testid="tag-on-task" className="mx-1">
        {tagName}
      </p>
    </span>
  );
}

export default function TaskItem({
  task,
  onDelete,
  onStatusChange,
  onEditSubmit,
  allTags,
  isOverdue,
}: {
  task: Task;
  onDelete: () => void;
  onStatusChange: () => void;
  onEditSubmit: (newParams: TaskParams) => void;
  allTags: Map<string, Tag>;
  isOverdue: boolean;
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
  }

  return (
    <>
      {!editing && (
        <div className="flex flex-row py-1.5 group shadow-2xs">
          <TaskCheckbox
            status={task.complete}
            onStatusChange={onStatusChange}
          />
          <div className="flex flex-row gap-1 flex-5/12">
            <p className={task.complete ? "line-through text-slate-400" : ""}>
              {task.name}
            </p>
            <TagList tagNames={getTagNames(task.tags)} />
          </div>
          <DateDisplay due={task.due} isOverdue={isOverdue} />
          <span className="scale-0 group-hover:scale-100">
            {!editing && <EditButton onClick={handleEditClick} />}
            <DeleteButton onClick={onDelete} />
          </span>
        </div>
      )}
      {editing && (
        <TaskEditForm
          startingTask={{ name: task.name, due: task.due, tags: task.tags }}
          onSubmit={(newParams) => {
            handleEditClick();
            onEditSubmit(newParams);
          }}
          onCancel={handleEditClick}
          tags={allTags}
        />
      )}
    </>
  );
}
