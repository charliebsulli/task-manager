import { useState } from "react";
import { TaskParams, Tag } from "../../../shared/types";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import TagSelectDropdown from "./TagSelectDropdown";

export default function TaskEditForm({
  startingTask,
  onSubmit,
  onCancel,
  tags,
}: {
  startingTask: TaskParams;
  onSubmit: (newParams: TaskParams) => void;
  onCancel: () => void;
  tags: Map<string, Tag>;
}) {
  const [taskName, setTaskName] = useState(startingTask.name);
  const [date, setDate] = useState(startingTask.due);
  const [chosenTags, setChosenTags] = useState(new Set(startingTask.tags));

  function handleTaskNameChange(newTaskName: string) {
    setTaskName(newTaskName);
  }

  // function handleDateChange(newDate: string) {
  //   setDate(newDate);
  // }

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

  function handleDateChange(date: Date | null) {
    if (!date) {
      setDate(new Date());
    } else {
      setDate(date);
    }
  }

  function handleSubmitClick() {
    const params: TaskParams = {
      name: taskName,
      tags: [...chosenTags].sort(),
      due: date,
    };
    onSubmit(params);
  }

  return (
    <>
      <hr className="mx-5 my-2 text-slate-400"></hr>
      <form className="flex flex-col gap-1 mx-1.5">
        <input
          type="text"
          placeholder="Task..."
          value={taskName}
          onChange={(e) => handleTaskNameChange(e.target.value)}
          className="input-box"
        ></input>
        <div className="m-w-1/6 input-box">
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
        <div className="flex flex-row">
          <button
            type="button"
            className="btn-secondary w-1/2 mr-0.5"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary w-1/2 ml-0.5"
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
