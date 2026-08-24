import type { Meta, StoryObj } from "@storybook/react-vite";
import Text from "./Text";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,

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

type Story = StoryObj<typeof Text>;

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
