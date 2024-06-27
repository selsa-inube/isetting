import { BrowserRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";
import { SearchUserCard, SearchUserCardProps } from ".";

const story = {
  component: SearchUserCard,
  title: "components/cards/SearchUserCard",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const data: any = [
  {
    id: "11",
    username: "David Leonardo Garzón",
    code: "LGARZON",
    userID: "1256545",
    position: "Credit Analyst",
    active: false,
    email: "dgarzon@sistemasenlinea.com.co",
    phone: "3123202874",
  },
  {
    id: "13",
    username: "David Leonardo Garzón",
    code: "LGARZON",
    userID: "1256545",
    position: "Credit Analyst",
    active: false,
    email: "dgarzon@sistemasenlinea.com.co",
    phone: "3123202874",
  },
  {
    id: "12",
    username: "Angie Pinilla",
    code: "APINILLA",
    userID: "789654",
    position: "Adviser",
    active: true,
    email: "apinilla@sistemasenlinea.com.co",
    phone: "1212145789",
  },
];

const searchData = {
  "Digita el nombre o numero de identificación.": "",
};

const Template: StoryFn<SearchUserCardProps> = (args) => (
  <SearchUserCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userData: data,
  searchFieldData: searchData,
  label: "Nombre",
  name: "searchUser",
  id: "searchUser",
  placeholder: "Buscar usuario",
  title: "Búsqueda",
  infoTitle: "Busca el usuario para enviar la invitación.",
  idModal: "searchField",
  nameModal: "searchField",
  labelModal: "Digita el nombre o numero de identificación.",
  placeholderModal: "Digita el nombre o numero de identificación.",
  onUserSelect: () => {},
};

export default story;
