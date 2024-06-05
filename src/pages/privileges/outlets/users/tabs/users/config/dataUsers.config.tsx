import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";

import { Icon } from "@inube/design-system";
import { IGeneralInformationUsersForm } from "@src/services/users/users.types";
import { deleteItemData } from "@mocks/utils/dataMock.service";

import { deleteLinixUsersModal } from "../DeleteModal/config/deleteLinixUsers.config";
import { ActivateUsers } from "../ActivateFormOptions";
import { activateUsersModal } from "../ActivateFormOptions/config/activateUsers.config";
import { DeleteLinixUsers } from "../DeleteModal";

export const usersTable = (usersData: IGeneralInformationUsersForm[]) =>
  usersData.map((entry) => ({
    ...entry,
    k_Usuari: entry.k_Usuari,
    n_Usuari: entry.n_Usuari,
    a_Numnit: entry.a_Numnit,
  }));

export const actionsConfigUsers = (
  smallScreen: boolean,
  users: IGeneralInformationUsersForm[],
  setIdDeleted: (show: string) => void
) => {
  const selectedData = (k_Usuari: string) =>
    users.find((user) => user.k_Usuari === k_Usuari);
  const invitationsTableActions = [
    {
      id: " i_Activo",
      actionName: "Activo",
      content: ({ k_Usuari }: { k_Usuari: string }) => {
        const Users = selectedData(k_Usuari);
        const adjustedUsers = {
          id: Users?.k_Usuari || "",
          active: Users?.i_Activo === "Y" || false,
          name: Users?.n_Usuari || "",
        };
        return (
          <ActivateUsers
            handleActivate={() => {}}
            data={adjustedUsers}
            showComplete={false}
            activateModalConfig={activateUsersModal}
          />
        );
      },
      type: "secondary",
    },
    {
      id: "Edit",
      actionName: "Editar",
      content: ({ k_Usuari }: { k_Usuari: string }) => (
        <Link to={`edit/${k_Usuari}`}>
          <Icon appearance="dark" cursorHover icon={<MdModeEdit />} />
        </Link>
      ),
      type: "primary",
    },
    {
      id: "Delete",
      actionName: "Eliminar",
      content: ({
        k_Usuari,
        n_Usuari,
      }: {
        k_Usuari: string;
        n_Usuari: string;
      }) => (
        <DeleteLinixUsers
          linixUsers={k_Usuari}
          deleteLinixUsersModal={deleteLinixUsersModal}
          handleDeleteLinixUser={deleteItemData}
          setIdDeleted={setIdDeleted}
          nameLinixuser={n_Usuari}
        />
      ),
      type: "remove",
    },
  ];
  return invitationsTableActions;
};
