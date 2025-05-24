import { Tag } from "../../../shared/types";
import TagSwitch from "./TagSwitch";

export default function TagFilter({
  tags,
  active,
  onFilterChange,
}: {
  tags: Map<string, Tag>;
  active: string;
  onFilterChange: (_id: string) => void;
}) {
  const listTags = Array.from(tags, ([_id, tag]) => (
    <TagSwitch
      key={_id}
      name={tag.name}
      status={_id === active}
      onStatusChange={() => onFilterChange(_id)}
    />
  ));
  return <div className="filters-container">{listTags}</div>;
}
