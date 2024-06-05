import { useContext, useEffect, useState } from "react";

import { Table, useMediaQuery } from "@inube/design-system";
import {
  usersBreakPointsConfig,
  usersTitlesConfig,
} from "@pages/privileges/outlets/users/config/usersTable.config";
import { LoadingApp } from "@pages/login/outlets/LoadingApp";
import { RenderMessage } from "@components/feedback/RenderMessage";

import { actionsConfigUsers, pruebas } from "./config/dataUsers.config";
import { IMessageState } from "../../types/forms.types";
import { deleteUserMessages } from "./DeleteModal/config/deleteLinixUsers.config";
import { getUsers } from "@src/services/users";
import { UsersContext } from "@src/context/users";
import { useAuth0 } from "@auth0/auth0-react";

interface UsersTabProps {
  searchText: string;
}

function UsersTab(props: UsersTabProps) {
  const { searchText } = props;
  const { users, setUsers } = useContext(UsersContext);
  const { user } = useAuth0();
  const [message, setMessage] = useState<IMessageState>({
    visible: false,
  });
  const [idDeleted, setIdDeleted] = useState("");
  const [loading, setLoading] = useState(true);

  const usersData = async () => {
    if (!user) return;
    if (users.length === 0) {
      setLoading(true);
      try {
        const newUsers = await getUsers();
        setUsers(newUsers);
      } catch (error) {
        console.info(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    usersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <LoadingApp time={40000} />
      ) : (
        <Table
          id="portal"
          titles={usersTitlesConfig}
          actions={actionsConfigUsers(smallScreen, users, setIdDeleted)}
          entries={pruebas(users)}
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
