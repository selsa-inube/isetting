import React, { useState } from "react";
import { ActivateUserUI } from "./interface";

function ActivateUser(props) {
  const { user } = props;
  const [showActivateUserModal, setShowActivateUserModal] = useState(false);
  const [active, setActive] = useState(false);

  const handleToggleModal = () => {
    setShowActivateUserModal(!showActivateUserModal);
  };

  const onActionConfirm = () => {
    setActive(!active);
  };

  return (
    <>
      <ActivateUserUI
        active={active}
        showActivateUserModal={showActivateUserModal}
        user={user}
        id={user.id}
        handleToggleModal={handleToggleModal}
        onActionConfirm={onActionConfirm}
      />
    </>
  );
}

export { ActivateUser };
