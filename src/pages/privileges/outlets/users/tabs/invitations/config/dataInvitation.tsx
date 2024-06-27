import { Link } from "react-router-dom";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

import { Stack, Icon } from "@inube/design-system";
import { deleteItemData } from "@mocks/utils/dataMock.service";
import { IInvitationsEntry } from "@services/users/invitation.types";

import { ResendInvitation } from "../ResendInvitation";

import { deleteInvitationModal } from "../DeleteInvitation/config/deleteInvitation.config";
import { DeleteLinixInvitation } from "../DeleteInvitation";

export const actionsConfigInvitation = (
  isHovered: boolean,
  handleResendInvitation: (invitation: IInvitationsEntry) => void,
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>,
  smallScreen: boolean,
  setIdDeleted: (show: string) => void
) => {
  const invitationsTableActions = [
    {
      id: "Complete",
      actionName: "Completar",
      content: ({
        invitationId,
        status,
      }: {
        invitationId: string;
        status: string;
      }) => (
        <Link to={`complete-invitation/${invitationId}`}>
          <Stack
            justifyContent="space-around"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Icon
              appearance={isHovered ? "primary" : "dark"}
              parentHover={isHovered ? true : false}
              icon={<MdOutlineAssignmentTurnedIn />}
              disabled={status === "Sent"}
              cursorHover
            />
          </Stack>
        </Link>
      ),
      type: "gray",
    },

    {
      id: "Resend",
      actionName: "Reenviar",
      content: (invitation: IInvitationsEntry) => (
        <ResendInvitation
          invitation={invitation}
          handleResendInvitation={() => handleResendInvitation(invitation)}
          showComplete={smallScreen}
        />
      ),
      type: "primary",
    },
    {
      id: "Delete",
      actionName: "Eliminar",
      content: ({
        customerId,
        userName,
      }: {
        customerId: string;
        userName: string;
      }) => (
        <DeleteLinixInvitation
          deleteLinixInvitationModal={deleteInvitationModal}
          linixInvitation={customerId}
          nameLinixInvitation={userName}
          handleDeleteLinixInvitation={deleteItemData}
          setIdDeleted={setIdDeleted}
        />
      ),
      type: "error",
    },
  ];
  return invitationsTableActions;
};
