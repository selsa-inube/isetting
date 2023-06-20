import { NavLink } from "..";
import { MdKeyboardArrowRight } from "react-icons/md";
import { appsConfig } from "@pages/home/config/apps.config";
import { BrowserRouter } from "react-router-dom";

const story = {
  component: [NavLink],
  title: "components/navigation/NavLink",
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template = (args) => <NavLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: appsConfig[0].label,
  icon: appsConfig[0].icon,
  icon2: <MdKeyboardArrowRight />,
  isSelected: false,
  url: appsConfig[0].url,
};

export const Selected = Template.bind({});
Selected.args = {
  label: appsConfig[0].label,
  icon: appsConfig[0].icon,
  icon2: <MdKeyboardArrowRight />,
  isSelected: true,
  url: appsConfig[0].url,
};

export default story;