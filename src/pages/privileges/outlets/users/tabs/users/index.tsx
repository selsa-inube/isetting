import { useState } from "react";
import {
  Table,
  useMediaQuery,
  SectionMessage,
  Stack,
} from "@inube/design-system";

import { userEntriesDataMock } from "@mocks/apps/privileges/users/users.mock";
import {
  usersBreakPointsConfig,
  usersTitlesConfig,
} from "@pages/privileges/outlets/users/config/usersTable.config";
import { ActivateFormOptions } from "@pages/privileges/outlets/forms/ActivateFormOptions";
import { deleteUserMessages } from "@pages/privileges/outlets/users/config/deleteUser.config";
import { activateUserMessages } from "@pages/privileges/outlets/users/config/activateUser.config";
import { activateUserModal } from "@pages/privileges/outlets/users/config/activateUser.config";
import { IGeneralInformationEntry } from "@pages/privileges/outlets/users/types/forms.types";
import { EAppearance } from "@src/types/colors.types";
import { EMessageType, IMessage } from "@src/types/messages.types";

import { EditUser } from "./EditUser";
import { DeleteUser } from "./DeleteUser";
import { StyledMessageContainer } from "./styles";

const initialMessageState: IMessage = {
  show: false,
  title: "",
  description: "",
  icon: <></>,
  appearance: "" as EAppearance,
};

interface UsersTabProps {
  searchText: string;
}

function UsersTab(props: UsersTabProps) {
  const { searchText } = props;
  const [users, setUsers] = useState(userEntriesDataMock);
  const [message, setMessage] = useState(initialMessageState);

  const deleteUser = (user: IGeneralInformationEntry) => {
    let MessageType = EMessageType.SUCCESS;

    try {
      setUsers((prevUsers) =>
        prevUsers.filter((oldUser) => user.id !== oldUser.id)
      );
    } catch (error) {
      MessageType = EMessageType.FAILED;
    }

    const { icon, title, description, appearance } =
      deleteUserMessages[MessageType];

    handleShowMessage({
      title,
      description: description(user),
      icon,
      appearance,
    });
  };

  const handleActivateUser = (user: IGeneralInformationEntry) => {
    let messageType = EMessageType.ACTIVATION;

    const newUsers = users.map((actUser) => {
      if (actUser.id === user.id) {
        return {
          ...actUser,
          active: !actUser.active,
        };
      }
      return actUser;
    });

    setUsers(newUsers);

    if (user.active) {
      messageType = EMessageType.DEACTIVATION;
    }

    const { title, description, icon, appearance } =
      activateUserMessages[messageType];

    handleShowMessage({
      title,
      description: description(user),
      icon,
      appearance,
    });
  };

  const handleShowMessage = (message: IMessage) => {
    const { title, description, icon, appearance } = message;
    setMessage({
      show: true,
      title,
      description,
      icon,
      appearance,
    });
  };

  const onCloseMessage = () => {
    setMessage(initialMessageState);
  };

  const smallScreen = useMediaQuery("(max-width: 850px)");

  const actions = [
    {
      id: "1",
      actionName: "Activar",
      content: (user: IGeneralInformationEntry) => (
        <ActivateFormOptions<IGeneralInformationEntry>
          data={user}
          handleActivate={() => handleActivateUser(user)}
          showComplete={smallScreen}
          activateModalConfig={activateUserModal}
        />
      ),
      type: "gray",
    },
    {
      id: "2",
      actionName: "Editar",
      content: (entry: IGeneralInformationEntry) => (
        <EditUser entry={entry} showComplete={smallScreen} />
      ),
      type: "primary",
    },
    {
      id: "3",
      actionName: "Eliminar",
      content: (user: IGeneralInformationEntry) => (
        <DeleteUser
          user={user}
          handleDeleteUser={() => deleteUser(user)}
          showComplete={smallScreen}
        />
      ),
      type: "error",
    },
  ];

  return (
    <>
      <Table
        id="portal"
        titles={usersTitlesConfig}
        actions={actions}
        entries={users}
        breakpoints={usersBreakPointsConfig}
        filter={searchText}
        modalTitle="Usuario"
      />
      {message.show && (
        <StyledMessageContainer>
          <Stack justifyContent="flex-end" width="100%">
            <SectionMessage
              title={message.title}
              description={message.description}
              icon={message.icon}
              appearance={message.appearance}
              duration={4000}
              closeSectionMessage={onCloseMessage}
            />
          </Stack>
        </StyledMessageContainer>
      )}
    </>
  );
}

export { UsersTab };
