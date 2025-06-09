import { useEffect, useState } from "react";
import { TaskParams, Tag } from "../../../shared/types";
import DatePicker from "react-datepicker";
console.log("about to import datepicker CSS");
import "react-datepicker/dist/react-datepicker.css";

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
  const [chosenTags, setChosenTags] = useState([defaultTag]);

  // when defaultTag changes, must useEffect to update chosenTags
  // otherwise component will not re-render with new defaultTag
  useEffect(() => {
    setChosenTags([defaultTag]);
  }, [defaultTag]);

  function handleTaskNameChange(newTaskName: string) {
    setTaskName(newTaskName);
  }

  // function handleDateChange(newDate: string) {
  //   setDate(newDate);
  // }

  function handleCreateClick() {
    if (taskName.trim() === "") {
      return;
    }
    const params: TaskParams = {
      name: taskName,
      tags: chosenTags,
      due: date,
    };
    onCreate(params);
    setTaskName("");
    setDate(new Date());
  }

  function handleTagChange(tagId: string) {
    setChosenTags([tagId]);
  }

  const tagOptions = Array.from(tags, ([_id, tag]) => (
    <option key={_id} value={_id}>
      {tag.name}
    </option>
  ));

  return (
    <form className="flex flex-col gap-1 mx-1.5">
      <input
        type="text"
        placeholder="Task..."
        value={taskName}
        onChange={(e) => handleTaskNameChange(e.target.value)}
      ></input>
      <div className="max-w-1/6">
        <DatePicker
          dateFormat={"MM/dd"}
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>
      <select
        name="tags"
        value={chosenTags[0]}
        onChange={(e) => handleTagChange(e.target.value)}
      >
        <option value="">Select tag...</option>
        {tagOptions}
      </select>
      <button type="button" className="btn-primary" onClick={handleCreateClick}>
        Submit
      </button>
    </form>
  );
}
