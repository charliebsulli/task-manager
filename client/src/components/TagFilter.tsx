import { Tag } from "../../../shared/types";
import TagForm from "./TagForm";
import TagSwitch from "./TagSwitch";

export default function TagFilter({
  tags,
  active,
  onFilterChange,
  onCreate,
  onDelete,
}: {
  tags: Map<string, Tag>;
  active: string;
  onFilterChange: (_id: string) => void;
  onCreate: (name: string) => void;
  onDelete: (_id: string) => void;
}) {
  const listTags = Array.from(tags, ([_id, tag]) => (
    <TagSwitch
      key={_id}
      name={tag.name}
      status={_id === active}
      onStatusChange={() => onFilterChange(_id)}
      onDelete={() => onDelete(_id)}
    />
  ));
  return (
    <div className="fixed top-0 left-0 h-screen bg-slate-100 flex flex-col gap-1.5 w-1/4">
      <div className="mt-3"></div>
      {listTags}
      <TagForm onCreate={onCreate}></TagForm>
    </div>
  );
}
