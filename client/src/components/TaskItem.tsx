import { Task } from "../../../shared/types";

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
      defaultChecked={status}
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
}: {
  task: Task;
  onDelete: () => void;
  onStatusChange: () => void;
}) {
  return (
    <div className="task-container">
      <Checkbox status={task.complete} onStatusChange={onStatusChange} />
      <div className="tagged-task">
        <p className="task-name">{task.name}</p>
        <TagList tags={task.tags} />
      </div>
      <DueDateTime dueDateTime={task.due} />
      <DeleteButton onClick={onDelete} />
    </div>
  );
}
