import { useEffect, useState } from "react";
import { TaskParams, Tag } from "../../../shared/types";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import MultiSelectDropdown from "./TagSelectDropdown";
import TagSelectDropdown from "./TagSelectDropdown";

export default function TaskForm({
  onCreate,
  tags,
  defaultTag,
}: {
  onCreate: (newParams: TaskParams) => void;
  tags: Map<string, Tag>;
  defaultTag: string;
}) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date());
  // set of tagIds of selected tags in menu
  const [chosenTags, setChosenTags] = useState(new Set<string>());

  // when defaultTag changes, must useEffect to update chosenTags
  // otherwise component will not re-render with new defaultTag
  // useEffect(() => {
  //   setChosenTags([defaultTag]);
  // }, [defaultTag]);

  function handleTaskNameChange(newTaskName: string) {
    setTaskName(newTaskName);
  }

  function handleDateChange(date: Date | null) {
    if (!date) {
      setDate(new Date());
    } else {
      setDate(date);
    }
  }

  function handleCreateClick() {
    if (taskName.trim() === "") {
      return;
    }
    const params: TaskParams = {
      name: taskName,
      tags: [...chosenTags].sort(), // display tags in consistent order
      due: date,
    };
    onCreate(params);
    setTaskName("");
    setDate(new Date());
    setChosenTags(new Set<string>());
  }

  function handleTagChange(tagId: string) {
    // if tagId is in the set, remove it
    // otherwise, add it
    if (chosenTags.has(tagId)) {
      // immutability
      const newChosenTags = new Set(chosenTags);
      newChosenTags.delete(tagId);
      setChosenTags(newChosenTags);
    } else {
      const newChosenTags = new Set(chosenTags.add(tagId));
      setChosenTags(newChosenTags);
    }
  }

  return (
    <form className="flex flex-col gap-1 mx-1.5">
      <input
        type="text"
        placeholder="Task..."
        value={taskName}
        onChange={(e) => handleTaskNameChange(e.target.value)}
        className="input-box"
      ></input>
      <div className="max-w-1/6 rounded px-1">
        <DatePicker
          dateFormat={"MM/dd"}
          selected={date}
          onChange={(date) => handleDateChange(date)}
        />
      </div>
      <TagSelectDropdown
        tags={tags}
        chosenTags={chosenTags}
        onChange={handleTagChange}
      />
      <button type="button" className="btn-primary" onClick={handleCreateClick}>
        Add task
      </button>
    </form>
  );
}
