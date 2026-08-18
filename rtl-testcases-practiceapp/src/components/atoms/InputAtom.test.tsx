import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import InputAtom from "./InputAtom";

describe("InputAtom", () => {
  it("should render the input", () => {
    render(<InputAtom />);

    expect(
      screen.getByRole("textbox")
    ).toBeInTheDocument();
  });

  it("should render the label", () => {
    render(
      <InputAtom label="Username" />
    );

    expect(
      screen.getByLabelText("Username")
    ).toBeInTheDocument();
  });

  it("should render the placeholder", () => {
    render(
      <InputAtom
        placeholder="Enter username"
      />
    );

    expect(
      screen.getByPlaceholderText(
        "Enter username"
      )
    ).toBeInTheDocument();
  });

  it("should allow the user to type", async () => {
    const user = userEvent.setup();

    render(
      <InputAtom
        placeholder="Enter username"
      />
    );

    const input =
      screen.getByPlaceholderText(
        "Enter username"
      );

    await user.type(input, "Reddy");

    expect(input).toHaveValue("Reddy");
  });

  it("should call onChange when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <InputAtom
        placeholder="Enter username"
        onChange={handleChange}
      />
    );

    const input =
      screen.getByPlaceholderText(
        "Enter username"
      );

    await user.type(input, "Reddy");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should support email type", () => {
    render(
      <InputAtom type="email" />
    );

    expect(
      screen.getByRole("textbox")
    ).toHaveAttribute("type", "email");
  });

  it("should support password type", () => {
    render(
      <InputAtom type="password" />
    );

    const input =
      document.querySelector(
        'input[type="password"]'
      );

    expect(input).toBeInTheDocument();
  });

  it("should be disabled", () => {
    render(
      <InputAtom disabled />
    );

    expect(
      screen.getByRole("textbox")
    ).toBeDisabled();
  });
});