import { clientsDataMock } from "@mocks/login/clients.mock";

import { RadioClient, RadioClientProps } from "./index";

const story = {
  components: [RadioClient],
  title: "components/Cards/RadioClient",
  argTypes: {
    handleChange: { action: "checked" },
  },
};

const Default = (args: RadioClientProps) => <RadioClient {...args} />;

Default.args = {
  id: clientsDataMock[2].id,
  name: "client",
  value: clientsDataMock[2].name,
  label: clientsDataMock[2].name,
  logo: clientsDataMock[2].logo,
};

export default story;

export { Default };
