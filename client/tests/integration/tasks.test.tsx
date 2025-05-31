import { render, screen } from "../test-utils";
import { Tag, Task } from "../../../shared/types";
import { server } from "../../src/mocks/node";
import FilterableTaskList from "../../src/components/FilterableTaskList";
import userEvent from "@testing-library/user-event";
import { describe, test, beforeAll, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Task integration tests", () => {
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

  test("Create a task", async () => {
    render(
      <FilterableTaskList startingTasks={fakeTasks} startingTags={fakeTags} />
    );

    // create a new task
    const taskInput = screen.getByPlaceholderText("Task...");
    await userEvent.type(taskInput, "New Task");
    const dateInput = screen.getByPlaceholderText(/Due/);
    await userEvent.type(dateInput, "6/1");
    const tagSelect = screen.getByRole("combobox");
    await userEvent.selectOptions(tagSelect, "tag1");
    const submit = screen.getByText(/submit/i);
    await userEvent.click(submit);

    // check that the new task appears in the list
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  // maybe wait on this until I change edit form
  // test("Edit a task", async () => {
  //   render(
  //     <FilterableTaskList startingTasks={fakeTasks} startingTags={fakeTags} />
  //   );

  //   const editButton = screen.getAllByText("Edit")[0];
  //   await userEvent.click(editButton);
  //   const taskInput = screen.getAllByPlaceholderText("Task...")[0];
  //   await userEvent.type(taskInput, "Edited");
  // });
  test("Change task status", async () => {
    render(
      <FilterableTaskList startingTasks={fakeTasks} startingTags={fakeTags} />
    );

    const checkbox = screen.getAllByRole("checkbox")[2]; // checkbox for task1
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
  //   test("Delete a task", async () => {});
});
