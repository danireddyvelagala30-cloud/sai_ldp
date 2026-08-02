import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckboxAtom from "./CheckboxAtom";

const meta: Meta<typeof CheckboxAtom> = {
  title: "Atoms/CheckboxAtom",
  component: CheckboxAtom,
};

export default meta;

type Story = StoryObj<typeof CheckboxAtom>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};