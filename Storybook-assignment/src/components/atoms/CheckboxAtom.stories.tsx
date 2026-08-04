import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckboxAtom from "./CheckboxAtom";

const meta: Meta<typeof CheckboxAtom> = {
  title: "Atoms/CheckboxAtom",
  component: CheckboxAtom,

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

type Story = StoryObj<typeof CheckboxAtom>;

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