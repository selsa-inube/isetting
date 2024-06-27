import { useEffect, useState } from "react";

import { Table, useMediaQuery } from "@inube/design-system";
import {
  usersBreakPointsConfig,
  usersTitlesConfig,
} from "@pages/privileges/outlets/users/config/usersTable.config";
import { LoadingApp } from "@pages/login/outlets/LoadingApp";
import { IGeneralInformationUsersForm } from "@services/users/users.types";
import { getAll } from "@mocks/utils/dataMock.service";
import { RenderMessage } from "@components/feedback/RenderMessage";

import { actionsConfigUsers } from "./config/dataUsers.config";

import { IMessageState } from "../../types/forms.types";
import { deleteUserMessages } from "./DeleteModal/config/deleteLinixUsers.config";

interface UsersTabProps {
  searchText: string;
}

function UsersTab(props: UsersTabProps) {
  const { searchText } = props;
  const [users, setUsers] = useState<IGeneralInformationUsersForm[]>([]);
  const [message, setMessage] = useState<IMessageState>({
    visible: false,
  });
  const [idDeleted, setIdDeleted] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll("linix-users")
      .then((data) => {
        if (data !== null) {
          setUsers(data as IGeneralInformationUsersForm[]);
        }
      })
      .catch((error) => {
        console.info(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [users]);

  useEffect(() => {
    const filterRecordRemoved = users.filter(
      (users) => users.k_Usuari !== idDeleted
    );
    filterRecordRemoved &&
      setMessage({
        visible: true,
        data: deleteUserMessages.success,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDeleted]);

  const handleCloseSectionMessage = () => {
    setMessage({
      visible: false,
    });
  };

  const smallScreen = useMediaQuery("(max-width: 850px)");

  return (
    <>
      {loading ? (
        <LoadingApp />
      ) : (
        <Table
          id="portal"
          titles={usersTitlesConfig}
          actions={actionsConfigUsers(smallScreen, users, setIdDeleted)}
          entries={users}
          breakpoints={usersBreakPointsConfig}
          filter={searchText}
          modalTitle="Usuario"
        />
      )}
      {idDeleted && message.visible && (
        <RenderMessage
          message={message}
          handleCloseMessage={handleCloseSectionMessage}
          onMessageClosed={handleCloseSectionMessage}
        />
      )}
    </>
  );
}

export { UsersTab };
