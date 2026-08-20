import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ButtonAtom from "./ButtonAtom";

describe("ButtonAtom", () => {
  it("should render the button", () => {
    render(<ButtonAtom>Click Me</ButtonAtom>);

    expect(
      screen.getByRole("button", {
        name: "Click Me",
      })
    ).toBeInTheDocument();
  });

  it("should display the correct text", () => {
    render(<ButtonAtom>Submit</ButtonAtom>);

    expect(
      screen.getByText("Submit")
    ).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <ButtonAtom onClick={handleClick}>
        Submit
      </ButtonAtom>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    render(
      <ButtonAtom disabled>
        Submit
      </ButtonAtom>
    );

    expect(
      screen.getByRole("button", {
        name: "Submit",
      })
    ).toBeDisabled();
  });

  it("should have button type by default", () => {
    render(
      <ButtonAtom>
        Submit
      </ButtonAtom>
    );

    expect(
      screen.getByRole("button", {
        name: "Submit",
      })
    ).toHaveAttribute("type", "button");
  });

  it("should support submit type", () => {
    render(
      <ButtonAtom type="submit">
        Submit
      </ButtonAtom>
    );

    expect(
      screen.getByRole("button", {
        name: "Submit",
      })
    ).toHaveAttribute("type", "submit");
  });
});