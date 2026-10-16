import type { Meta, StoryObj } from "@storybook/react-vite";
import Slider from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Atoms/Slider",
  component: Slider,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#19181C" }],
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 880000, step: 1000 },
    },
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
    disabled: {
      control: "boolean",
    },
    onChange: {
      action: "Slider Value Changed",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    value: 0,
    min: 0,
    max: 880000,
    step: 5000,
  },
};

export const PartiallySelected: Story = {
  args: {
    value: 350000,
    min: 0,
    max: 880000,
    step: 5000,
  },
};

export const FullySelected: Story = {
  args: {
    value: 880000,
    min: 0,
    max: 880000,
    step: 5000,
  },
};

export const Disabled: Story = {
  args: {
    value: 200000,
    min: 0,
    max: 880000,
    disabled: true,
  },
};
