import { createContext, useMemo, useState } from "react";
import { IUsersContext } from "./types";
import { IGeneralInformationUsersForm } from "@src/services/users/users.types";

const UsersContext = createContext<IUsersContext>({} as IUsersContext);

interface UsersProviderProps {
  children: React.ReactNode;
}

function UsersProvider(props: UsersProviderProps) {
  const { children } = props;

  const [users, setUsers] = useState<IGeneralInformationUsersForm[]>([]);

  const authContext = useMemo(
    () => ({
      users,
      setUsers,
    }),
    [users, setUsers]
  );

  return (
    <UsersContext.Provider value={authContext}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
export type { UsersProviderProps };
