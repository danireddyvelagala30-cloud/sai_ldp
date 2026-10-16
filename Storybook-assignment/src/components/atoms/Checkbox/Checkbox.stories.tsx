import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,

  argTypes: {
    checked: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },

    onChange: {
      action: "Checkbox Changed",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};
