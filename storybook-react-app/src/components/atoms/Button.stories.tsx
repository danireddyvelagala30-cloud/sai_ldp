import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,

  argTypes: {
    backgroundColor: {
      control: "color",
    },

    disabled: {
      control: "boolean",
    },

    text: {
      control: "text",
    },

    onClick: {
      action: "Button Clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Login: Story = {
  args: {
    text: "Login",
    disabled: false,
    backgroundColor: "#1976d2",
  },
};

export const Register: Story = {
  args: {
    text: "Register",
    backgroundColor: "green",
  },
};

export const Disabled: Story = {
  args: {
    text: "Disabled",
    disabled: true,
  },
};