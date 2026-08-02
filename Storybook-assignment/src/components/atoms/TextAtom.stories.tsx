import type { Meta, StoryObj } from "@storybook/react-vite";
import TextAtom from "./TextAtom";

const meta: Meta<typeof TextAtom> = {
  title: "Atoms/TextAtom",
  component: TextAtom,
};

export default meta;

type Story = StoryObj<typeof TextAtom>;

export const Default: Story = {
  args: {
    text: "Contract 1",
  },
};

export const TotalPayable: Story = {
  args: {
    text: "Total Payable: $0.00",
  },
};