import { EMessageType } from "@src/types/messages.types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { TextsUI } from "./interface";
import { finishAssistedMessagesConfig } from "@src/pages/privileges/outlets/users/complete-invitation/config/completeInvitation.config";
import { privilegeUserTabsConfig } from "@src/pages/privileges/outlets/users/config/usersTabs.config";
import { IUsersMessage } from "@src/pages/privileges/outlets/users/types/users.types";
import { colorTabsConfig } from "./config/colorTabs.config";
import { textFormsConfig } from "./config/text.config";

function Texts() {
  const [isSelected, setIsSelected] = useState<string>();
  const [searchText, setSearchText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState(colorTabsConfig.primary.id);
  const [message, setMessage] = useState<IUsersMessage>({
    visible: false,
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state?.tab) {
      setIsSelected(location.state.tab);
      if (location.state?.messageType && location.state?.username) {
        handleShowMessage(location.state.messageType, location.state.username);
      }
    }
  }, [location]);

  // const handleTabChange = (tabId: string) => {
  //   setIsSelected(tabId);
  // };

  const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleToggleMenuInvitation = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleCloseMenuInvitation = () => {
    setShowMenu(false);
  };

  const handleShowMessage = (messageType: EMessageType, username: string) => {
    const { title, description, appearance, icon } =
      finishAssistedMessagesConfig[
        messageType as keyof typeof finishAssistedMessagesConfig
      ];

    setMessage({
      visible: true,
      data: {
        title,
        description: description(username),
        icon,
        appearance,
      },
    });
  };

  const handleCloseMessage = () => {
    setMessage({
      visible: false,
    });
  };

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  // const handleCloseModal = () => {
  //   setControlModal((prevControlModal) => ({
  //     ...prevControlModal,
  //     show: false,
  //   }));
  // };

  const handleContinueTab = () => {
    // setCurrentFormHasChanges(false);
    // setSelectedTab(controlModal.continueTab);
  };

  return (
    <TextsUI
      textConfig={textFormsConfig}
      selectedTab={selectedTab}
      isSelected={isSelected || privilegeUserTabsConfig.privilegesUsers.id}
      searchText={searchText}
      handleTabChange={handleTabChange}
      handleContinueTab={handleContinueTab}
      handleSearchText={handleSearchText}
      showMenu={showMenu}
      handleToggleMenuInvitation={handleToggleMenuInvitation}
      handleCloseMenuInvitation={handleCloseMenuInvitation}
      message={message}
      handleCloseMessage={handleCloseMessage}
    />
  );
}

export { Texts };