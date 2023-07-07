import { branchesFormEditUser } from "@src/mocks/apps/privileges/users/branchesForm.mock";
import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { AssignmentForm, AssignmentFormProps } from "..";
import { IEntry } from "../types";

const story = {
  components: [AssignmentForm],
  title: "components/forms/templates/AssignmentForm",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<AssignmentFormProps> = (args) => (
  <AssignmentForm {...args} />
);

const handleChange = (newEntries: IEntry[]) => {
  action("Form template changes: ")(newEntries);
};

export const Default = Template.bind({});
Default.args = {
  handleChange,
  entries: branchesFormEditUser,
  title: "Sucursales",
};

export default story;
