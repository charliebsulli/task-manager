import TaskItem from "../../src/components/TaskItem";
import { Tag, Task } from "../../../shared/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";

test("renders TaskItem component", async () => {
  const task: Task = {
    _id: "1",
    name: "Test Task",
    complete: false,
    due: "2023-10-10T12:00:00Z",
    tags: ["tag1", "tag2"],
    userId: "test-user",
  };

  const tag1: Tag = { _id: "tag1", name: "tag1", userId: "test-user" };
  const tag2: Tag = { _id: "tag2", name: "tag2", userId: "test-user" };

  const allTags = new Map<string, Tag>([
    ["tag1", tag1],
    ["tag2", tag2],
  ]);

  const onStatusChange = jest.fn();
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  render(
    <TaskItem
      task={task}
      onDelete={onDelete}
      onStatusChange={onStatusChange}
      onEditSubmit={onEdit}
      allTags={allTags}
    />
  );

  expect(screen.getByText(task.name)).toBeInTheDocument();
  expect(screen.getByText(task.due)).toBeInTheDocument();
  expect(screen.getByText("tag1")).toBeInTheDocument();
  expect(screen.getByText("tag2")).toBeInTheDocument();

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();

  await userEvent.click(checkbox); // user events return promises, so use async/await
  expect(onStatusChange).toHaveBeenCalledTimes(1);

  const deleteButton = screen.getByText("Delete");
  await userEvent.click(deleteButton);
  expect(onDelete).toHaveBeenCalledTimes(1);

  const editButton = screen.getByText("Edit");
  await userEvent.click(editButton);
  // edit button should show edit form
  // use integration testing to check full edit functionality
  // ideally this would not break in changes to edit form
  expect(screen.getByPlaceholderText("Task...")).toBeInTheDocument();
});
