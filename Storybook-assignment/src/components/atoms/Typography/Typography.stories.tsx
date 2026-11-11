import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#19181C" }],
    },
  },
  argTypes: {
    text: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["muted", "white", "light", "primary"],
    },
    fontWeight: {
      control: "select",
      options: ["normal", "bold", "lighter"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    text: "Seeder Design System - Atoms",
    variant: "white",
    fontWeight: "bold",
  },
};

export const Heading: Story = {
  args: {
    text: "Review Your Credit",
    variant: "white",
    fontWeight: "bold",
  },
};

export const Primary: Story = {
  args: {
    text: "$350,000.00 selected of",
    variant: "primary",
    fontWeight: "bold",
  },
};

export const Muted: Story = {
  args: {
    text: "Slide to autoselect",
    variant: "muted",
    fontWeight: "normal",
  },
};

export const Light: Story = {
  args: {
    text: "Contract 1",
    variant: "light",
    fontWeight: "bold",
  },
};


