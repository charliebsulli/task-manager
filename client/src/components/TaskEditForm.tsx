import { useState } from "react";
import { TaskParams, Tag } from "../../../shared/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [chosenTags, setChosenTags] = useState(startingTask.tags);

  function handleTaskNameChange(newTaskName: string) {
    setTaskName(newTaskName);
  }

  // function handleDateChange(newDate: string) {
  //   setDate(newDate);
  // }

  function handleTagChange(tagId: string) {
    setChosenTags([tagId]);
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
      tags: chosenTags,
      due: date,
    };
    onSubmit(params);
  }

  const tagOptions = Array.from(tags, ([_id, tag]) => (
    <option key={_id} value={_id}>
      {tag.name}
    </option>
  ));

  return (
    <>
      <hr className="mx-5 my-2 text-slate-400"></hr>
      <form className="flex flex-col gap-1 mx-1.5">
        <input
          type="text"
          placeholder="Task..."
          value={taskName}
          onChange={(e) => handleTaskNameChange(e.target.value)}
        ></input>
        <div className="m-w-1/6">
          <DatePicker
            dateFormat={"MM/dd"}
            selected={date}
            onChange={(date) => handleDateChange(date)}
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
