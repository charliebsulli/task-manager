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
    <form className="mx-3 flex flex-row">
      <input
        type="text"
        placeholder="Add tag..."
        value={tagName}
        onChange={(e) => handleTagNameChange(e.target.value)}
        className="mr-3 flex-3/5 min-w-0"
      ></input>
      <button
        className="bg-slate-300 rounded group hover:bg-purple-100"
        type="button"
        onClick={handleCreateClick}
      >
        <p className="mx-1">Create</p>
      </button>
    </form>
  );
}
