import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RadioAtom from "./RadioAtom";

describe("RadioAtom", () => {
  it("should render the radio button", () => {
    render(
      <RadioAtom
        label="Male"
        name="gender"
        value="male"
      />
    );

    expect(
      screen.getByRole("radio", {
        name: "Male",
      })
    ).toBeInTheDocument();
  });

  it("should initially be unchecked", () => {
    render(
      <RadioAtom
        label="Male"
        name="gender"
        value="male"
      />
    );

    expect(
      screen.getByRole("radio", {
        name: "Male",
      })
    ).not.toBeChecked();
  });

  it("should be checked when checked prop is true", () => {
    render(
      <RadioAtom
        label="Male"
        name="gender"
        value="male"
        checked
        onChange={() => {}}
      />
    );

    expect(
      screen.getByRole("radio", {
        name: "Male",
      })
    ).toBeChecked();
  });

  it("should select the radio when clicked", async () => {
    const user = userEvent.setup();

    render(
      <RadioAtom
        label="Male"
        name="gender"
        value="male"
      />
    );

    const radio = screen.getByRole("radio", {
      name: "Male",
    });

    await user.click(radio);

    expect(radio).toBeChecked();
  });

  it("should call onChange when selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioAtom
        label="Male"
        name="gender"
        value="male"
        onChange={handleChange}
      />
    );

    await user.click(
      screen.getByRole("radio", {
        name: "Male",
      })
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should have the correct value", () => {
    render(
      <RadioAtom
        label="Male"
        name="gender"
        value="male"
      />
    );

    expect(
      screen.getByRole("radio", {
        name: "Male",
      })
    ).toHaveValue("male");
  });

  it("should be disabled", () => {
    render(
      <RadioAtom
        label="Male"
        name="gender"
        value="male"
        disabled
      />
    );

    expect(
      screen.getByRole("radio", {
        name: "Male",
      })
    ).toBeDisabled();
  });

  it("should support radio group behavior", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <RadioAtom
          label="Male"
          name="gender"
          value="male"
        />

        <RadioAtom
          label="Female"
          name="gender"
          value="female"
        />
      </div>
    );

    const male = screen.getByRole("radio", {
      name: "Male",
    });

    const female = screen.getByRole("radio", {
      name: "Female",
    });

    await user.click(male);

    expect(male).toBeChecked();
    expect(female).not.toBeChecked();

    await user.click(female);

    expect(female).toBeChecked();
    expect(male).not.toBeChecked();
  });
});