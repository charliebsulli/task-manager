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
    <div className="filters-container">
      {listTags}
      <TagForm onCreate={onCreate}></TagForm>
    </div>
  );
}
