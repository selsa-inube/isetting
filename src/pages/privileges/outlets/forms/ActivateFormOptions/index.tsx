import { useState } from "react";

import { ActivateFormOptionsUI } from "./interface";
import { IActivateModalConfig } from "./types";

export interface IDataActivateOption {
  id: string;
  active: boolean;
}

interface IActivateFormOptionsProps<T extends IDataActivateOption> {
  handleActivate: () => void;
  showComplete: boolean;
  data: T;
  activateModalConfig: IActivateModalConfig;
}

export function ActivateFormOptions<T extends IDataActivateOption>(
  props: IActivateFormOptionsProps<T>
) {
  const { data, handleActivate, showComplete, activateModalConfig } = props;
  const [showActivateUserModal, setShowActivateUserModal] = useState(false);

  const handleToggleModal = () => {
    setShowActivateUserModal(!showActivateUserModal);
  };

  return (
    <ActivateFormOptionsUI
      active={data.active}
      showActivateOptions={showActivateUserModal}
      id={data.id}
      handleToggleModal={handleToggleModal}
      handleActivateOptions={handleActivate}
      showComplete={showComplete}
      activateModalConfig={activateModalConfig}
    />
  );
}
