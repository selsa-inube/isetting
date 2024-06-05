import { IGeneralInformationUsersForm } from "@src/services/users/users.types";

interface IUsersContext {
  users: IGeneralInformationUsersForm[];
  setUsers: React.Dispatch<
    React.SetStateAction<IGeneralInformationUsersForm[]>
  >;
}

export type { IUsersContext };
