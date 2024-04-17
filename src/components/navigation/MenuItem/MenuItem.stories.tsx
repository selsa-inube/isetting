import { MdAndroid } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { MenuItem, MenuItemProps } from ".";

const meta: Meta<typeof MenuItem> = {
  title: "components/data/MenuItem",
  component: MenuItem,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default = (args: MenuItemProps) => <MenuItem {...args} />;
Default.args = {
  title: "Title",
  description: "Description",
  iconBefore: <MdAndroid />,
  spacing: "wide",
  isDisabled: false,
};

export const IconAfter = (args: MenuItemProps) => <MenuItem {...args} />;
IconAfter.args = {
  title: "Title",
  description: "Description",
  iconAfter: <MdAndroid />,
  spacing: "wide",
  isDisabled: false,
};

export const Disabled = (args: MenuItemProps) => <MenuItem {...args} />;
Disabled.args = {
  ...Default.args,
  isDisabled: true,
};

export default meta;
