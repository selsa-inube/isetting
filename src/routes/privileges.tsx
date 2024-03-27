import { Route, Routes } from "react-router-dom";

import { PrivilegesOptions } from "@pages/privileges/outlets/options";
import { Invite } from "@pages/privileges/outlets/users/invite";
import { EditUser } from "@pages/privileges/outlets/users/edit-user";
import { Users } from "@pages/privileges/outlets/users";
import { Privileges } from "@pages/privileges";
import { ErrorPage } from "@components/layout/ErrorPage";
import { CompleteInvitation } from "@pages/privileges/outlets/users/complete-invitation";
import { LinixUseCase } from "@pages/privileges/outlets/linixUseCase";
import { Roles } from "@pages/privileges/outlets/roles";
import { AddingLinixUseCase } from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case";
import { AddRol } from "@pages/privileges/outlets/roles/add-role";
import { EditCaseLinix } from "@src/pages/privileges/outlets/linixUseCase/components/EditModal";

function PrivilegesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Privileges />}>
        <Route path="options" element={<PrivilegesOptions />} />
        <Route path="users" element={<Users />} />
        <Route path="linixUseCase" element={<LinixUseCase />} />
        <Route path="roles" element={<Roles />} />
        <Route
          path="linixUseCase/adding-linix-use-case"
          element={<AddingLinixUseCase />}
        />
        <Route path="roles/add-role" element={<AddRol />} />
        <Route path="users/invite" element={<Invite />} />
        <Route path="users/edit/:user_id" element={<EditUser />} />
        <Route path="linixUseCase/edit/:user_id" element={<EditCaseLinix />} />
        <Route
          path="users/complete-invitation/:invitation_id"
          element={<CompleteInvitation />}
        />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { PrivilegesRoutes };
