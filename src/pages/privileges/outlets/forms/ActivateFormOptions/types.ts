import { activateUserModal } from "../../users/config/activateUser.config";

export interface IActivateOptionModal {
  active: boolean;
  handleToggleModal: () => void;
  handleActivateOptions: () => void;
  id: string;
  activateModalConfig: typeof activateUserModal;
}
