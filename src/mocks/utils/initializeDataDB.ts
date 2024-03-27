import localforage from "localforage";

import { intializedData } from "@src/mocks/utils/dataMock.service";
import { intializedTokenData } from "@mocks/themeService/themeService.mock";
import { DocumentsServiceMock } from "@mocks/privileges/documents/DocumentsServiceMock.mock";
import { clientServerMock } from "@mocks/privileges/client-server/client-serverServiceMock.mock";
import { buttonOptionsMock } from "@mocks/privileges/button/buttonOptionsMock.mock";
import { webOptionsMock } from "@src/mocks/privileges/web/webOptionsMock.mock";
import { linixUseCases } from "@mocks/privileges/linixUseCases/LinixUseCases.mock";
import { mockRoles } from "@mocks/privileges/roles/Roles.mock";

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
}
