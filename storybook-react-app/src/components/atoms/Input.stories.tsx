import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,

  argTypes: {
    placeholder: {
      control: "text",
    },

    disabled: {
      control: "boolean",
    },

    onChange: {
      action: "Input Changed",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Username: Story = {
  args: {
    placeholder: "Enter Username",
  },
};

export const Email: Story = {
  args: {
    placeholder: "Enter Email",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter Password",
    type: "password",
  },
};