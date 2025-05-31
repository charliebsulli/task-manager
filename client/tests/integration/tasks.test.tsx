import { render, screen } from "../test-utils";
import { Tag, Task } from "../../../shared/types";
import { server } from "../../src/mocks/node";
import FilterableTaskList from "../../src/components/FilterableTaskList";
import userEvent from "@testing-library/user-event";

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
    server.listen();
  });

  test("Create a task", async () => {
    render(
      <FilterableTaskList startingTasks={fakeTasks} startingTags={fakeTags} />
    );

    // create a new task
    const taskInput = screen.getByPlaceholderText("Task...");
    userEvent.type(taskInput, "New Task");
    const dateInput = screen.getByPlaceholderText(/Due/);
    userEvent.type(dateInput, "6/1");
    const tagSelect = screen.getByRole("combobox");
    userEvent.selectOptions(tagSelect, "tag1");
    const submit = screen.getByText(/submit/i);
    userEvent.click(submit);

    // check that the new task appears in the list
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });
  //   test("Edit a task", async () => {});
  //   test("Change task status", async () => {});
  //   test("Delete a task", async () => {});
});
