import { useState } from "react";

export default function TagForm({
  onCreate,
}: {
  onCreate: (name: string) => void;
}) {
  const [tagName, setTagName] = useState("");

  function handleTagNameChange(newTagName: string) {
    setTagName(newTagName);
  }

  function handleCreateClick() {
    onCreate(tagName);
    setTagName("");
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Add tag..."
        value={tagName}
        onChange={(e) => handleTagNameChange(e.target.value)}
      ></input>
      <button type="button" onClick={handleCreateClick}>
        Create
      </button>
    </form>
  );
}
