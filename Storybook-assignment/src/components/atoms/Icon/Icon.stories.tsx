import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#19181C" }],
    },
  },
  argTypes: {
    name: {
      control: "select",
      options: [
        "logo",
        "home",
        "cash-acceleration",
        "back",
        "info",
        "lightning",
        "chevron-down",
        "check",
      ],
    },
    size: {
      control: { type: "number", min: 12, max: 64, step: 2 },
    },
    color: {
      control: "color",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "home",
    size: 24,
    color: "#A5A5B2",
  },
};

export const Logo: Story = {
  args: {
    name: "logo",
    size: 32,
  },
};

export const CashAcceleration: Story = {
  args: {
    name: "cash-acceleration",
    size: 24,
    color: "#E8E7F0",
  },
};

export const BackArrow: Story = {
  args: {
    name: "back",
    size: 20,
    color: "#E8E7F0",
  },
};

export const Info: Story = {
  args: {
    name: "info",
    size: 18,
    color: "#727080",
  },
};

export const Lightning: Story = {
  args: {
    name: "lightning",
    size: 20,
    color: "#A5A5B2",
  },
};
