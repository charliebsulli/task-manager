import { useState } from "react";
import { Task, TaskParams, Tag } from "../../../shared/types";

export default function TaskForm({
  onCreate,
  tags,
}: {
  onCreate: (newParams: TaskParams) => void;
  tags: Map<string, Tag>;
}) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [chosenTags, setChosenTags] = useState([""]);

  function handleTaskNameChange(newTaskName: string) {
    setTaskName(newTaskName);
  }

  function handleDateChange(newDate: string) {
    setDate(newDate);
  }

  function handleCreateClick() {
    let params: TaskParams = {
      name: taskName,
      tags: chosenTags,
      due: date,
    };
    onCreate(params);
    setTaskName("");
    setDate("");
  }

  function handleTagChange(tagId: string) {
    console.log(tagId);
    setChosenTags([tagId]);
  }

  const tagOptions = Array.from(tags, ([_id, tag]) => (
    <option key={_id} value={_id}>
      {tag.name}
    </option>
  ));

  return (
    <form className="task-form">
      <h1>Create a new task.</h1>
      <input
        type="text"
        placeholder="Task..."
        value={taskName}
        onChange={(e) => handleTaskNameChange(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Due date..."
        value={date}
        onChange={(e) => handleDateChange(e.target.value)}
      ></input>
      <select name="tags" onChange={(e) => handleTagChange(e.target.value)}>
        <option value="">Select tag...</option>
        {tagOptions}
      </select>
      <button type="button" className="create-task" onClick={handleCreateClick}>
        Submit
      </button>
    </form>
  );
}
