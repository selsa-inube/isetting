import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { Icon } from "@inube/design-system";

import { mockRoles } from "@mocks/privileges/roles/Roles.mock";
import { ActivateFormOptions } from "@pages/privileges/outlets/forms/ActivateFormOptions";
import { DeleteUser } from "@pages/privileges/outlets/users/tabs/users/DeleteUser";

import { DetailsModal } from "../components/DetailsModal";
import { activateRoleModal } from "./activateRole.config";

export const titlesOptions = [
  {
    id: "k_Rol",
    titleName: "Code",
    priority: 0,
  },

  {
    id: "n_Rol",
    titleName: "Nombre",
    priority: 1,
  },

  {
    id: "n_Uso",
    titleName: "Aplicación",
    priority: 2,
  },
];

export const RolesBreakPointsConfig = [
  { breakpoint: "(min-width: 1091px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1090px)", totalColumns: 3 },
  { breakpoint: "(max-width: 1002px)", totalColumns: 2 },
  { breakpoint: "(max-width: 837px)", totalColumns: 3 },
  { breakpoint: "(max-width: 550px)", totalColumns: 2 },
  { breakpoint: "(max-width: 360px)", totalColumns: 1 },
];

const dataDetailsRol = (k_Rol: string) => {
  const data = [mockRoles.find((role) => role.k_Rol === k_Rol)!].map(
    (roleselectd) => ({
      Código: roleselectd?.k_Rol,
      Nombre: roleselectd?.n_Rol,
      Aplicación: roleselectd?.n_Uso,
      Activo: roleselectd?.i_Activo === "Y" ? "active" : "inactive",
    })
  );

  return [...data].shift();
};

const selectedData = (k_Rol: string) =>
  mockRoles.find((role) => role.k_Rol === k_Rol);

const handleActive = () => "Esto es un servicio de Backend";

export const actionsConfig = [
  {
    id: "i_activo",
    actionName: "Activo",
    content: ({ k_Rol }: { k_Rol: string }) => {
      const role = selectedData(k_Rol);
      const adjustedRole = {
        id: role?.k_Rol || "",
        active: role?.i_Activo === "Y" || false,
      };

      return (
        <ActivateFormOptions
          handleActivate={() => handleActive()}
          data={adjustedRole}
          showComplete={false}
          activateModalConfig={activateRoleModal}
        />
      );
    },
    type: "secondary",
  },
  {
    id: "Details",
    actionName: "Detalles",
    content: ({ id }: { id: string }) => (
      <DetailsModal data={dataDetailsRol(id)} />
    ),
    type: "secondary",
  },
  {
    id: "Edit",
    actionName: "Editar",
    content: ({ id }: { id: string }) => (
      <Link to={`edit/${id}`} onClick={() => selectedData(id)}>
        <Icon icon={<MdModeEdit />} size="16px" appearance="dark" />
      </Link>
    ),
    type: "primary",
  },
  {
    id: "Delete",
    actionName: "Eliminar",
    content: ({ id }: { id: string }) => <DeleteUser user={selectedData(id)} />,
    type: "remove",
  },
];
