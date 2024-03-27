import { DecisionModal } from "@components/feedback/DecisionModal";
import { Switch } from "@inube/design-system";

import { activateUserModal } from "@pages/privileges/outlets/users/config/activateUser.config";
import { EMessageType } from "@src/types/messages.types";

import { IActivateOptionModal } from "./types";

interface IctivateFormOptionsUI {
  active: boolean;
  showActivateOptions: boolean;
  id: string;
  handleToggleModal: () => void;
  handleActivateOptions: () => void;
  showComplete: boolean;
  activateModalConfig: typeof activateUserModal;
}

function ActivateOptionsModal(props: IActivateOptionModal) {
  const {
    active,
    handleToggleModal,
    handleActivateOptions: handleActivateUser,
    id,
    activateModalConfig,
  } = props;
  let messageType = EMessageType.DEACTIVATION;
  if (!active) {
    messageType = EMessageType.ACTIVATION;
  }

  const {
    title = "",
    description,
    textAction,
    appearance,
  } = activateModalConfig[messageType];

  return (
    <DecisionModal
      title={title}
      description={description(id)}
      actionText={textAction}
      appearance={appearance}
      closeModal={handleToggleModal}
      handleClick={handleActivateUser}
    />
  );
}

export function ActivateFormOptionsUI(props: IctivateFormOptionsUI) {
  const {
    active,
    showActivateOptions: showActivateUserModal,
    id,
    handleToggleModal,
    handleActivateOptions: handleActivateUser,
    showComplete,
    activateModalConfig,
  } = props;

  return (
    <>
      <Switch
        checked={active}
        onChange={handleToggleModal}
        id={id}
        label={showComplete ? "Activar" : ""}
        padding={`s0 s0 s0 ${showComplete ? "s200" : "s0"}`}
      />

      {showActivateUserModal && (
        <ActivateOptionsModal
          active={active}
          id={id}
          handleToggleModal={handleToggleModal}
          handleActivateOptions={handleActivateUser}
          activateModalConfig={activateModalConfig}
        />
      )}
    </>
  );
}
