import { IGeneralInformationUsersForm } from "./users.types";

const mapUsersApiToEntity = (
  users: Record<string, string | number | object>
): IGeneralInformationUsersForm => {
  const buildUsers: IGeneralInformationUsersForm = {
    k_Usuari: String(users.k_Usuari),
    n_Usuari: String(users.n_Usuari),
    a_Numnit: String(users.a_Numnit),
    k_Grupo: String(users.k_Grupo),
    i_Activo: String(users.i_Activo),
  };
  return buildUsers;
};

const mapUserApiToEntities = (
  users: Record<string, string | number | object>[]
): IGeneralInformationUsersForm[] => {
  return users.map(mapUsersApiToEntity);
};
export { mapUserApiToEntities, mapUsersApiToEntity };
