import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";
import Icon from "../icon/Icon";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
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
      options: ["primary", "secondary", "back", "reset", "ghost", "nav"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    active: {
      control: "boolean",
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Review Your Credit",
    variant: "primary",
    fullWidth: true,
  },
};

export const BackButton: Story = {
  args: {
    label: "Back",
    variant: "back",
    startIcon: <Icon name="back" size={16} color="#E8E7F0" />,
  },
};

export const ResetButton: Story = {
  args: {
    label: "Reset",
    variant: "reset",
    size: "small",
  },
};

export const NavActive: Story = {
  args: {
    label: "Cash Acceleration",
    variant: "nav",
    active: true,
    startIcon: <Icon name="cash-acceleration" size={20} color="#FFFFFF" />,
  },
};

export const NavInactive: Story = {
  args: {
    label: "Home",
    variant: "nav",
    active: false,
    startIcon: <Icon name="home" size={20} color="#A5A5B2" />,
  },
};

export const GhostLink: Story = {
  args: {
    label: "Watch how to",
    variant: "ghost",
    startIcon: <Icon name="lightning" size={18} color="#A5A5B2" />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Review Your Credit",
    variant: "primary",
    disabled: true,
    fullWidth: true,
  },
};
