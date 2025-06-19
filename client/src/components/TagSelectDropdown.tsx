import { Tag } from "@/shared/types";
import { useEffect, useRef, useState } from "react";

export default function TagSelectDropdown({
  tags,
  chosenTags,
  onChange,
}: {
  tags: Map<string, Tag>;
  chosenTags: Set<string>;
  onChange: (tagId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // useRef?

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function Option({
    taskId,
    taskName,
    isChecked,
    onChange,
  }: {
    taskId: string;
    taskName: string;
    isChecked: boolean;
    onChange: () => void;
  }) {
    return (
      <label className="select-none">
        <div className="w-40 bg-white px-1 py-1 hover:bg-slate-300">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            className="mr-1"
          ></input>
          <span>{taskName}</span>
        </div>
      </label>
    );
  }

  function DisplayText() {
    if (chosenTags.size === 0) {
      return <span>Select tags...</span>;
    } else {
      let text = "";
      for (const tag of chosenTags) {
        text += tags.get(tag)?.name + ", ";
      }
      text = text.slice(0, -2);
      return <span>{text}</span>;
    }
  }

  function handleClick() {
    setOpen(!open);
  }

  const tagOptions = Array.from(tags, ([_id, tag]) => (
    <div key={_id} className="">
      <Option
        taskId={_id}
        taskName={tag.name}
        isChecked={chosenTags.has(_id)}
        onChange={() => onChange(_id)}
      />
    </div>
  ));

  return (
    <div ref={dropdownRef} className="shadow-2xs">
      <button
        type="button"
        className={"input-box pr-2 " + (open ? "ring-2 ring-blue-500" : "")}
        onClick={handleClick}
      >
        <span>
          <DisplayText />
        </span>
      </button>
      <div className="absolute rounded z-10">{open && tagOptions}</div>
    </div>
  );
}
