import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CheckboxAtom from "./CheckboxAtom";

describe("CheckboxAtom", () => {
  it("should render the checkbox", () => {
    render(
      <CheckboxAtom label="Accept Terms" />
    );

    expect(
      screen.getByRole("checkbox", {
        name: "Accept Terms",
      })
    ).toBeInTheDocument();
  });

  it("should initially be unchecked", () => {
    render(
      <CheckboxAtom label="Accept Terms" />
    );

    expect(
      screen.getByRole("checkbox", {
        name: "Accept Terms",
      })
    ).not.toBeChecked();
  });

  it("should be checked when clicked", async () => {
    const user = userEvent.setup();

    render(
      <CheckboxAtom label="Accept Terms" />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Accept Terms",
    });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("should call onChange when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <CheckboxAtom
        label="Accept Terms"
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Accept Terms",
    });

    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should be disabled", () => {
    render(
      <CheckboxAtom
        label="Accept Terms"
        disabled
      />
    );

    expect(
      screen.getByRole("checkbox", {
        name: "Accept Terms",
      })
    ).toBeDisabled();
  });

  it("should be checked when checked prop is true", () => {
    render(
      <CheckboxAtom
        label="Accept Terms"
        checked
        onChange={() => {}}
      />
    );

    expect(
      screen.getByRole("checkbox", {
        name: "Accept Terms",
      })
    ).toBeChecked();
  });
});