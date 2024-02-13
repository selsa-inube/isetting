import { MdOutlineMoreHoriz, MdPersonAddAlt, MdSearch } from "react-icons/md";
import {
  Breadcrumbs,
  Button,
  Icon,
  Stack,
  Tabs,
  Textfield,
  useMediaQuery,
} from "@inube/design-system";

import { Menu } from "@components/navigation/Menu";
import { PageTitle } from "@components/PageTitle";

import {
  privilegeConfig,
  privilegeOptionsConfig,
} from "../options/config/privileges.config";
import { menuInvitationLinks } from "./config/menuInvitation.config";
import { privilegeUserTabsConfig } from "./config/usersTabs.config";

import { IUsersMessage } from "./types/users.types";
import { InvitationsTab } from "./tabs/invitations";
import { UsersTab } from "./tabs/users";
import { StyledContainer } from "./styles";
import { RenderMessage } from "@components/feedback/RenderMessage";

interface UsersUIProps {
  isSelected: string;
  searchText: string;
  handleTabChange: (id: string) => void;
  handleSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showMenu: boolean;
  handleToggleMenuInvitation: () => void;
  handleCloseMenuInvitation: () => void;
  message: IUsersMessage;
  handleCloseMessage: () => void;
}

export function UsersUI(props: UsersUIProps) {
  const {
    isSelected,
    searchText,
    handleTabChange,
    handleSearchText,
    showMenu,
    handleToggleMenuInvitation,
    handleCloseMenuInvitation,
    message,
    handleCloseMessage,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");

  return (
    <>
      <Stack
        direction="column"
        width="-webkit-fill-available"
        padding={smallScreen ? "s300" : "s400 s800"}
      >
        <Stack gap="48px" direction="column">
          <Stack gap="24px" direction="column">
            <Breadcrumbs crumbs={privilegeOptionsConfig[0].crumbs} />
            <PageTitle
              title={privilegeConfig.label}
              description={privilegeConfig.description}
              navigatePage="/privileges"
            />
          </Stack>
          <StyledContainer>
            <Stack gap="32px" direction="column">
              <Tabs
                tabs={Object.values(privilegeUserTabsConfig)}
                selectedTab={isSelected}
                onChange={handleTabChange}
                type={smallScreen ? "select" : "tabs"}
              />
              <Stack justifyContent="space-between" alignItems="center">
                <Textfield
                  name="searchUser"
                  id="searchUser"
                  placeholder="Buscar..."
                  type="search"
                  iconBefore={<MdSearch />}
                  size="compact"
                  value={searchText}
                  onChange={handleSearchText}
                />

                {smallScreen ? (
                  <>
                    <Icon
                      icon={<MdOutlineMoreHoriz />}
                      size="24px"
                      onClick={handleToggleMenuInvitation}
                      cursorHover={true}
                      appearance="dark"
                    />
                    {showMenu && (
                      <Menu
                        options={menuInvitationLinks}
                        handleClose={handleCloseMenuInvitation}
                      />
                    )}
                  </>
                ) : (
                  <Button
                    iconBefore={<MdPersonAddAlt />}
                    spacing="wide"
                    type="link"
                    path="/privileges/users/invite"
                  >
                    Invitar usuario
                  </Button>
                )}
              </Stack>
              {isSelected === privilegeUserTabsConfig.privilegesUsers.id && (
                <UsersTab searchText={searchText} />
              )}
              {isSelected ===
                privilegeUserTabsConfig.privilegesInvitations.id && (
                <InvitationsTab searchText={searchText} />
              )}
            </Stack>
          </StyledContainer>
        </Stack>
        {message.visible && (
          <RenderMessage
            message={message}
            handleCloseMessage={handleCloseMessage}
            onMessageClosed={() => {}}
          />
        )}
      </Stack>
    </>
  );
}
