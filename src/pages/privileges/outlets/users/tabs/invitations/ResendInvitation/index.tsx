import { useState } from "react";
import { IInvitationsEntry } from "@services/users/invitation.types";
import { ResendInvitationUI } from "./interface";

interface ResendInvitationProps {
  invitation: IInvitationsEntry;
  handleResendInvitation: () => void;
  showComplete: boolean;
}

function ResendInvitation(props: ResendInvitationProps) {
  const { invitation, handleResendInvitation, showComplete } = props;
  const [showResendInvModal, setShowResendInvModal] = useState(false);

  const toggleModal = () => {
    setShowResendInvModal(!showResendInvModal);
  };

  const resendInvitationUser = () => {
    handleResendInvitation();
  };
  return (
    <ResendInvitationUI
      showResendInvModal={showResendInvModal}
      toggleModal={toggleModal}
      resendInvitationUser={resendInvitationUser}
      invitation={invitation}
      showComplete={showComplete}
    />
  );
}

export { ResendInvitation };
export type { ResendInvitationProps };
