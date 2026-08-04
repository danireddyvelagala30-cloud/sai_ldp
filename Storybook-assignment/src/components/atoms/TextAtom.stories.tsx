import type { Meta, StoryObj } from "@storybook/react-vite";
import TextAtom from "./TextAtom";

const meta: Meta<typeof TextAtom> = {
  title: "Atoms/TextAtom",
  component: TextAtom,

  argTypes: {
    text: {
      control: "text",
    },

    color: {
      control: "color",
    },

    fontSize: {
      control: {
        type: "number",
        min: 12,
        max: 40,
        step: 2,
      },
    },

    fontWeight: {
      control: {
        type: "select",
      },
      options: ["normal", "bold", "lighter"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextAtom>;

export const Default: Story = {
  args: {
    text: "Hello Storybook",
    color: "#000000",
    fontSize: 18,
    fontWeight: "normal",
  },
};

export const Heading: Story = {
  args: {
    text: "Candidate Information",
    color: "#2952FF",
    fontSize: 28,
    fontWeight: "bold",
  },
};