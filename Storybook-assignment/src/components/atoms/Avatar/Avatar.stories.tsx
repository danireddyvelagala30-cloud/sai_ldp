import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#19181C" }],
    },
  },
  argTypes: {
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    shape: {
      control: "select",
      options: ["circle", "rounded"],
    },
    fallback: {
      control: "text",
    },
    showDropdown: {
      control: "boolean",
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    alt: "User",
    size: "medium",
    showDropdown: true,
  },
};

export const FallbackText: Story = {
  args: {
    fallback: "SK",
    size: "medium",
    showDropdown: true,
  },
};

export const Small: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    size: "large",
  },
};
