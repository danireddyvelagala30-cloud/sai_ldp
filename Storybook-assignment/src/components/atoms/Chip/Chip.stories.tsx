import type { Meta, StoryObj } from "@storybook/react-vite";
import Chip from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#19181C" }],
    },
  },
  argTypes: {
    label: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["default", "subtle", "purple", "outline", "fee"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: "12 months",
    variant: "default",
  },
};

export const FeeBadge: Story = {
  args: {
    label: "12.0% fee",
    variant: "fee",
    size: "small",
  },
};

export const Purple: Story = {
  args: {
    label: "Active Kick",
    variant: "purple",
  },
};

export const Outline: Story = {
  args: {
    label: "Monthly",
    variant: "outline",
  },
};
