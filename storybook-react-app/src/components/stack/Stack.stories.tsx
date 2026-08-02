import type { Meta, StoryObj } from "@storybook/react";
import Stack from "./Stack";
import Button from "../atoms/Button";

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" spacing={15}>
      <Button text="Login" />
      <Button text="Register" />
      <Button text="Cancel" />
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Stack direction="column" spacing={15}>
      <Button text="Login" />
      <Button text="Register" />
      <Button text="Cancel" />
    </Stack>
  ),
};

export const NoSpacing: Story = {
  render: () => (
    <Stack direction="row" spacing={0}>
      <Button text="One" />
      <Button text="Two" />
      <Button text="Three" />
    </Stack>
  ),
};

export const WrapOverflow: Story = {
  render: () => (
    <Stack direction="row" spacing={10} wrap={true}>
      <Button text="Button 1" />
      <Button text="Button 2" />
      <Button text="Button 3" />
      <Button text="Button 4" />
      <Button text="Button 5" />
      <Button text="Button 6" />
      <Button text="Button 7" />
      <Button text="Button 8" />
    </Stack>
  ),
};

export const Empty: Story = {
  render: () => <Stack />,
};