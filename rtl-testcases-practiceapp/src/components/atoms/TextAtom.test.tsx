import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TextAtom from "./TextAtom";

describe("TextAtom", () => {
  it("should render text", () => {
    render(
      <TextAtom>
        Hello Reddy
      </TextAtom>
    );

    expect(
      screen.getByText("Hello Reddy")
    ).toBeInTheDocument();
  });

  it("should render paragraph by default", () => {
    render(
      <TextAtom>
        Hello
      </TextAtom>
    );

    const text = screen.getByText("Hello");

    expect(text.tagName).toBe("P");
  });

  it("should render h1 when as is h1", () => {
    render(
      <TextAtom as="h1">
        Welcome
      </TextAtom>
    );

    expect(
      screen.getByRole("heading", {
        name: "Welcome",
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it("should render h2 when as is h2", () => {
    render(
      <TextAtom as="h2">
        Candidate Details
      </TextAtom>
    );

    expect(
      screen.getByRole("heading", {
        name: "Candidate Details",
        level: 2,
      })
    ).toBeInTheDocument();
  });

  it("should render h3 when as is h3", () => {
    render(
      <TextAtom as="h3">
        Personal Information
      </TextAtom>
    );

    expect(
      screen.getByRole("heading", {
        name: "Personal Information",
        level: 3,
      })
    ).toBeInTheDocument();
  });

  it("should render span when as is span", () => {
    render(
      <TextAtom as="span">
        Status
      </TextAtom>
    );

    const text = screen.getByText("Status");

    expect(text.tagName).toBe("SPAN");
  });
});