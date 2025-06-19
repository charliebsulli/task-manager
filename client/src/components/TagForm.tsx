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
    if (tagName.trim() === "") {
      return;
    }
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
        className="mr-3 flex-3/5 min-w-0 rounded px-0.5 placeholder-slate-500"
      ></input>
      <button
        className="btn-secondary"
        type="button"
        onClick={handleCreateClick}
      >
        <p className="mx-1">Create</p>
      </button>
    </form>
  );
}
