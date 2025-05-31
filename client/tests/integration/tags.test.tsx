import { server } from "@/mocks/node";
import { Tag, Task } from "../../../shared/types";
import FilterableTaskList from "@/components/FilterableTaskList";
import { render, screen } from "../test-utils";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeAll, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Tag integration tests", () => {
  const fakeTasks: Task[] = [
    {
      _id: "task1",
      name: "Test Task 1",
      complete: false,
      tags: ["tag1", "tag2"],
      due: "5/30",
      userId: "user1",
    },
    {
      _id: "task2",
      name: "Test Task 2",
      complete: true,
      tags: ["tag2"],
      due: "5/31",
      userId: "user1",
    },
  ];

  const fakeTags: Tag[] = [
    { _id: "tag1", name: "Tag 1", userId: "user1" },
    { _id: "tag2", name: "Tag 2", userId: "user1" },
  ];

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: "warn",
    });
  });

  test("Create a tag", async () => {
    render(
      <FilterableTaskList startingTasks={fakeTasks} startingTags={fakeTags} />
    );

    // create a new tag
    const tagInput = screen.getByPlaceholderText("Add tag...");
    await userEvent.type(tagInput, "New Tag");
    const createButton = screen.getByText(/Create/i);
    await userEvent.click(createButton);

    // check that the new tag appears in the sidebar
    expect(screen.getByText("New Tag", { selector: "p" })).toBeInTheDocument();

    // and in the create task select menu
    // NOTE this will break if I hide the create task form by default
    expect(
      screen.getByText("New Tag", { selector: "option" })
    ).toBeInTheDocument();
  });

  test("Create a tag then create a task with that tag", async () => {
    render(
      <FilterableTaskList startingTasks={fakeTasks} startingTags={fakeTags} />
    );

    // create a new tag
    const tagInput = screen.getByPlaceholderText("Add tag...");
    await userEvent.type(tagInput, "New Tag");
    const createButton = screen.getByText(/Create/i);
    await userEvent.click(createButton);

    // create a new task with that tag
    const taskInput = screen.getByPlaceholderText("Task...");
    await userEvent.type(taskInput, "New Task");
    const dateInput = screen.getByPlaceholderText(/Due/);
    await userEvent.type(dateInput, "6/1");
    const tagSelect = screen.getByRole("combobox");
    await userEvent.selectOptions(tagSelect, "New Tag");
    const submit = screen.getByText(/submit/i);
    await userEvent.click(submit);

    // check that the new task appears in the list
    expect(screen.getByText("New Task")).toBeInTheDocument();

    // and that the tag displayed on the task
    throw new Error("add test to check tag on task");
  });

  test("Delete a tag", async () => {
    render(
      <FilterableTaskList startingTasks={fakeTasks} startingTags={fakeTags} />
    );

    // delete the first tag
    const deleteButton = screen.getAllByText("X")[0];
    await userEvent.click(deleteButton);

    // the tag should not exist anymore
    expect(screen.queryByText("Tag 1")).not.toBeInTheDocument();
  });

  test("Filter by tag then de-select that tag", async () => {
    render(
      <FilterableTaskList startingTasks={fakeTasks} startingTags={fakeTags} />
    );

    // NOTE: moving components around could break this test since we getAll

    // click on the first tag to filter by it
    const tagButton = screen.getAllByText("Tag 1", { selector: "p" })[0];
    await userEvent.click(tagButton);

    // only task 2 should be visible
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Task 2")).not.toBeInTheDocument();

    // clicking the tag again should clear the filter
    await userEvent.click(tagButton);
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  test("Filter by tag then select a different tag", async () => {
    render(
      <FilterableTaskList startingTasks={fakeTasks} startingTags={fakeTags} />
    );

    // click on the first tag to filter by it
    const tag1Button = screen.getAllByText("Tag 1", { selector: "p" })[0];
    await userEvent.click(tag1Button);

    // only task 2 should be visible
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Task 2")).not.toBeInTheDocument();

    // clicking the other tag should show both tasks
    const tag2Button = screen.getAllByText("Tag 2", { selector: "p" })[0];
    await userEvent.click(tag2Button);
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });
});
