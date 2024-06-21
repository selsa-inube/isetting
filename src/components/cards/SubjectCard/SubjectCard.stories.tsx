import { BrowserRouter } from "react-router-dom";
import { MdPersonOutline } from "react-icons/md";

import { StoryFn } from "@storybook/react";

import { ILabel } from "./types";
import { SubjectCard, SubjectCardProps } from ".";

const story = {
  component: [SubjectCard],
  title: "components/cards/SubjectCard",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const data = {
  username: "David Leonardo Garzón",
  userID: "45645",
  mail: "lgarzon@gmail.com",
  invitationDate: "11/JUN/2022",
  status: "Sent",
  id: 10,
};

const labels: ILabel[] = [
  {
    id: "userID",
    titleName: "User Id",
    priority: 0,
  },
  {
    id: "username",
    titleName: "Username",
    priority: 1,
  },
  {
    id: "mail",
    titleName: "Mail",
    priority: 2,
  },
  {
    id: "invitationDate",
    titleName: "Invitation Date",
    priority: 3,
  },
  {
    id: "status",
    titleName: "Status",
    priority: 4,
  },
];

const Template: StoryFn<SubjectCardProps> = (args) => <SubjectCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  subjectData: data,
  title: "User Information",
};

export const WithLabels = Template.bind({});
WithLabels.args = {
  subjectData: data,
  title: "User Information",
  icon: <MdPersonOutline size={24} />,
  labels,
};

export default story;
