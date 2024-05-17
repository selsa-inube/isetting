import localforage from "localforage";

import { intializedData } from "@src/mocks/utils/dataMock.service";
import { intializedTokenData } from "@mocks/themeService/themeService.mock";
import { DocumentsServiceMock } from "@mocks/privileges/documents/DocumentsServiceMock.mock";
import { clientServerMock } from "@mocks/privileges/client-server/client-serverServiceMock.mock";
import { buttonOptionsMock } from "@mocks/privileges/button/buttonOptionsMock.mock";
import { webOptionsMock } from "@src/mocks/privileges/web/webOptionsMock.mock";
import { linixUseCases } from "@mocks/privileges/linixUseCases/LinixUseCases.mock";
import { mockRoles } from "@mocks/privileges/roles/Roles.mock";
import { mockActions } from "@mocks/privileges/actions/Actions.mock";
import { MockPositions } from "@mocks/privileges/positions/Positions.mock";
import { userEntriesDataMock } from "../apps/privileges/users/users.mock";
import { invitationEntriesDataMock } from "../apps/privileges/invitations/invitations.mock";
import { branchesFormEditUser } from "../apps/privileges/users/branchesForm.mock";
import { projectsFormEditUser } from "../apps/privileges/users/projectsForm.mock";
import { eventsFormEditUser } from "../apps/privileges/users/eventsForm.mock";
import { aidBudgetsFormEditUser } from "../apps/privileges/users/aidBudgetsForm.mock";
import { payrollsFormEditUser } from "../apps/privileges/users/payrollsForm.mock";

export function initializeDataDB() {
  localforage.clear();

  intializedTokenData();
  intializedData<typeof DocumentsServiceMock[number]>(
    "documents",
    DocumentsServiceMock
  );

  intializedData<typeof clientServerMock[number]>(
    "clients-server",
    clientServerMock
  );

  intializedData<typeof buttonOptionsMock[number]>(
    "button-options",
    buttonOptionsMock
  );
  intializedData<typeof webOptionsMock[number]>("web-options", webOptionsMock);
  intializedData<typeof linixUseCases[number]>(
    "linix-use-cases",
    linixUseCases
  );
  intializedData<typeof mockRoles[number]>("linix-roles", mockRoles);
  intializedData<typeof MockPositions[number]>(
    "linix-positions",
    MockPositions
  );
  intializedData<typeof invitationEntriesDataMock[number]>(
    "linix-invitations",
    invitationEntriesDataMock
  );
  intializedData<typeof mockActions[number]>("linix-actions", mockActions);
  intializedData<typeof mockActions[number]>(
    "linix-users",
    userEntriesDataMock
  );
  intializedData<typeof mockActions[number]>(
    "linix-users-branches",
    branchesFormEditUser
  );
  intializedData<typeof mockActions[number]>(
    "linix-users-projects",
    projectsFormEditUser
  );
  intializedData<typeof mockActions[number]>(
    "linix-users-events",
    eventsFormEditUser
  );
  intializedData<typeof mockActions[number]>(
    "linix-users-aidBudgetUnits",
    aidBudgetsFormEditUser
  );
  intializedData<typeof mockActions[number]>(
    "linix-users-payrolls",
    payrollsFormEditUser
  );
}
