import { entriesDataMock } from "../../../../mocks/apps/dataTable.mock";
import {
  actionsConfig,
  titlesConfig,
  breakPointsConfig,
} from "../../../../components/data/Table/config/dataTable.config";
import { mockPrivilegeOptionsConfig } from "../config/privileges.config";
import { mockPrivilegeUserTabsConfig } from "../users/config/privilegesUsers.config";
import { Breadcrumbs } from "../../../../components/navigation/Breadcrumbs";
import { PageTitle } from "../../../../components/PageTitle";
import { Table } from "../../../../components/data/Table";
import {
  Stack,
  Button,
  Tabs,
  TextField,
  useMediaQuery,
} from "@inube/design-system";
import { StyledContainer, StyledTextFieldContainer } from "./styles";
import { MdSearch, MdPersonAddAlt, MdOutlineMoreHoriz } from "react-icons/md";
import { useState } from "react";

function Users() {
  const [isSelected, setIsSelected] = useState(
    mockPrivilegeUserTabsConfig[0].id
  );

  const handleTabChange = (tabId) => {
    setIsSelected(tabId);
  };

  const smallScreen = useMediaQuery("(max-width: 580px)");

  return (
    <StyledContainer smallScreen={smallScreen}>
      <Stack gap="48px" direction="column">
        <Stack gap="32px" direction="column">
          <Breadcrumbs route={mockPrivilegeOptionsConfig[0].url} />
          <PageTitle
            title={mockPrivilegeOptionsConfig[0].label}
            icon={mockPrivilegeOptionsConfig[0].icon}
            description={mockPrivilegeOptionsConfig[0].description}
          />
        </Stack>
        <Stack gap="32px" direction="column">
          <Tabs
            tabs={mockPrivilegeUserTabsConfig}
            selectedTab={isSelected}
            handleSelectedTab={handleTabChange}
          />
          <Stack justifyContent="space-between" alignItems="center">
            <StyledTextFieldContainer>
              <TextField
                name="searchUser"
                id="searchUser"
                placeholder="Search..."
                type="search"
                minLength={1}
                iconBefore={<MdSearch size={18} />}
                size="compact"
                isFullWidth={true}
              />
            </StyledTextFieldContainer>

            {smallScreen ? (
              <Stack>
                <MdOutlineMoreHoriz size={24} cursor="pointer" />
              </Stack>
            ) : (
              <Button
                iconBefore={<MdPersonAddAlt size={18} />}
                spacing="compact"
              >
                Invite user
              </Button>
            )}
          </Stack>
          <Table
            titles={titlesConfig}
            entries={entriesDataMock}
            actions={actionsConfig}
            breakPoints={breakPointsConfig}
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

export { Users };
