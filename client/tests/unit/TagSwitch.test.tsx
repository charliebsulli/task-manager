import TagSwitch from "../../src/components/TagSwitch";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("TagSwitch component", () => {
  const name = "Test Tag";
  const status = false;
  const onStatusChange = vi.fn();
  const onDelete = vi.fn();

  test("Renders with tag name", () => {
    render(
      <TagSwitch
        name={name}
        status={status}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test("Clicking on TagSwitch calls onStatusChange", async () => {
    render(
      <TagSwitch
        name={name}
        status={status}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    );

    // want to check clicking on the tag switch span
    const btnSpan = screen.getByRole("status"); // the span has role status
    await userEvent.click(btnSpan);

    expect(onStatusChange).toHaveBeenCalledTimes(1);
  });

  test("Clicking on the delete button calls onDelete", async () => {
    render(
      <TagSwitch
        name={name}
        status={status}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    );

    const deleteButton = screen.getByRole("button");
    await userEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
