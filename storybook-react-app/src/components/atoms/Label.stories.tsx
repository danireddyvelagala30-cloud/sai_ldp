import type { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Name: Story = {
  args: {
    text: "Student Name",
  },
};

export const Email: Story = {
  args: {
    text: "Email Address",
  },
};

export const Password: Story = {
  args: {
    text: "Password",
  },
};