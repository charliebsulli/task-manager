import TaskForm from "../../src/components/TaskForm";
import { Tag } from "../../../shared/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";

// submit button calls a create function with task params from form
describe("TaskForm component", () => {
  const tag1: Tag = { _id: "tagId1", name: "tag1", userId: "test-user" };
  const tag2: Tag = { _id: "tagId2", name: "tag2", userId: "test-user" };

  const tags = new Map<string, Tag>([
    ["tagId1", tag1],
    ["tagId2", tag2],
  ]);

  const onCreate = vi.fn();

  // given mm/dd date, make a date object
  // as expected to be produced from
  // react datepicker
  // const makeDate: (date: string) => {};

  test("Task name input updates with user input", async () => {
    render(<TaskForm onCreate={onCreate} tags={tags} />);

    const taskInput = screen.getByPlaceholderText("Task...");
    await userEvent.type(taskInput, "New Task");

    expect(taskInput).toHaveValue("New Task");
  });

  test("Date input updates with user input", async () => {
    render(<TaskForm onCreate={onCreate} tags={tags} />);

    const dateInput = screen.getAllByRole("textbox")[1];
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, "12/12");

    expect(dateInput).toHaveValue("12/12");
  });

  test("Tag dropdown displays tag options", async () => {
    render(<TaskForm onCreate={onCreate} tags={tags} />);
    const tagSelect = screen.getByText("Select tags...");
    await userEvent.click(tagSelect);

    // check that options are in the select menu
    screen.getByText("tag1");
    screen.getByText("tag2");
  });

  test("User can select a tag from the dropdown", async () => {
    render(<TaskForm onCreate={onCreate} tags={tags} />);

    const tagSelect = screen.getByText("Select tags...");
    await userEvent.click(tagSelect);

    const tag1 = screen.getByText("tag1");
    await userEvent.click(tag1);

    expect(screen.queryByText("Select tags...")).toBeNull();

    await userEvent.click(screen.getAllByText("tag1")[0]);

    expect(screen.getByText("tag1"));
  });

  test("Submit button calls onCreate with task params", async () => {
    render(<TaskForm onCreate={onCreate} tags={tags} />);

    // fill out the form
    const taskInput = screen.getByPlaceholderText("Task...");
    await userEvent.type(taskInput, "New Task");

    const tagSelect = screen.getByText("Select tags...");
    await userEvent.click(tagSelect);

    const tag1 = screen.getByText("tag1");
    await userEvent.click(tag1);

    // click the submit button
    const submitButton = screen.getByRole("button", { name: /add task/i });
    await userEvent.click(submitButton);
    expect(onCreate).toHaveBeenCalledWith({
      name: "New Task",
      tags: ["tagId1"],
      due: expect.any(Date),
    });
  });
});
