import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SelectAtom from "./SelectAtom";

const options = [
  {
    label: "India",
    value: "india",
  },
  {
    label: "USA",
    value: "usa",
  },
  {
    label: "Canada",
    value: "canada",
  },
];

describe("SelectAtom", () => {
  it("should render the select", () => {
    render(
      <SelectAtom options={options} />
    );

    expect(
      screen.getByRole("combobox")
    ).toBeInTheDocument();
  });

  it("should render the label", () => {
    render(
      <SelectAtom
        label="Country"
        options={options}
      />
    );

    expect(
      screen.getByLabelText("Country")
    ).toBeInTheDocument();
  });

  it("should render all options", () => {
    render(
      <SelectAtom options={options} />
    );

    expect(
      screen.getByRole("option", {
        name: "India",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "USA",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Canada",
      })
    ).toBeInTheDocument();
  });

  it("should have a default option", () => {
    render(
      <SelectAtom options={options} />
    );

    expect(
      screen.getByRole("option", {
        name: "Select an option",
      })
    ).toBeInTheDocument();
  });

  it("should select an option", async () => {
    const user = userEvent.setup();

    render(
      <SelectAtom options={options} />
    );

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "india");

    expect(select).toHaveValue("india");
  });

  it("should call onChange when an option is selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <SelectAtom
        options={options}
        onChange={handleChange}
      />
    );

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "usa");

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should support a controlled value", () => {
    render(
      <SelectAtom
        options={options}
        value="canada"
        onChange={() => {}}
      />
    );

    expect(
      screen.getByRole("combobox")
    ).toHaveValue("canada");
  });

  it("should be disabled", () => {
    render(
      <SelectAtom
        options={options}
        disabled
      />
    );

    expect(
      screen.getByRole("combobox")
    ).toBeDisabled();
  });
});