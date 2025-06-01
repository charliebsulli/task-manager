import TaskItem from "../../src/components/TaskItem";
import { Tag, Task } from "../../../shared/types";
import { render, screen } from "../test-utils";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("../../src/components/TaskForm", () => ({
  default: vi.fn(() => <p>Task Edit Form</p>),
}));

// (TaskForm as jest.Mock).mockImplementation(() => <p>Task Edit Form</p>);

describe("TaskItem component", () => {
  const task: Task = {
    _id: "1",
    name: "Test Task",
    complete: false,
    due: "2023-10-10T12:00:00Z",
    tags: ["tagId1", "tagId2"],
    userId: "test-user",
  };

  const tag1: Tag = { _id: "tagId1", name: "tag1", userId: "test-user" };
  const tag2: Tag = { _id: "tagId2", name: "tag2", userId: "test-user" };

  const allTags = new Map<string, Tag>([
    ["tagId1", tag1],
    ["tagId2", tag2],
  ]);

  const onStatusChange = vi.fn();
  const onDelete = vi.fn();
  const onEditSubmit = vi.fn();

  const props = {
    task,
    onDelete,
    onStatusChange,
    onEditSubmit,
    allTags,
  };

  beforeEach(() => {
    vi.clearAllMocks(); // clear mock calls before each test
  });

  test("Renders task with name and date", async () => {
    render(<TaskItem {...props} />);

    expect(screen.getByText(task.name)).toBeInTheDocument();
    expect(screen.getByText(task.due)).toBeInTheDocument();
  });

  test("Renders tag names", () => {
    render(<TaskItem {...props} />);

    expect(screen.getByText(tag1.name)).toBeInTheDocument();
    expect(screen.getByText(tag2.name)).toBeInTheDocument();
  });

  test("Checkbox renders and can be clicked", async () => {
    render(<TaskItem {...props} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox); // user events return promises, so use async/await
    expect(onStatusChange).toHaveBeenCalledTimes(1);
  });

  test("Delete button renders and can be clicked", async () => {
    render(<TaskItem {...props} />);

    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  test("Edit button shows edit form", async () => {
    render(<TaskItem {...props} />);

    expect(screen.queryByText(/Form/)).toBeNull();

    const editButton = screen.getByText("Edit");
    await userEvent.click(editButton);

    expect(screen.getByText(/Form/)).toBeInTheDocument();
  });
});
