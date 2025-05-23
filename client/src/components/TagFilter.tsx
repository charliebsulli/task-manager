import { Tag } from "../../../shared/types";

export default function TagFilter({ tags }: { tags: Tag[] }) {
  const listTags = tags.map((value) => <li key={value._id}>{value.name}</li>);
  return (
    <div className="filters-container">
      <ul>{listTags}</ul>
    </div>
  );
}
