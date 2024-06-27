import { MdErrorOutline, MdThumbUpOffAlt } from "react-icons/md";

import { EAppearance } from "@src/types/colors.types";
import { IInvitationsEntry } from "@services/users/invitation.types";

const resendInvitationModal = {
  title: "Reenviar Invitación",
  description: ({ userName }: IInvitationsEntry) =>
    `¿Esta seguro de que quiere reenviar la invitación ${userName} ?`,
  textAction: "Resend",
  appearance: EAppearance.SUCCESS,
};

const resendInvitationMessages = {
  success: {
    id: 1,
    icon: <MdThumbUpOffAlt size={18} />,
    title: "¡Reenvío exitoso!",
    description: ({ userName }: IInvitationsEntry) =>
      `Hemos reenviado con éxito la invitación al usuario ${userName}`,
    appearance: EAppearance.SUCCESS,
  },
  failed: {
    id: 2,
    icon: <MdErrorOutline size={18} />,
    title: "Ups, ¡algo salió mal!",
    description: ({ userName }: IInvitationsEntry) =>
      `Hemos presentado problemas para reenviar la invitación al usuario ${userName}`,
    appearance: EAppearance.ERROR,
  },
};

export { resendInvitationMessages, resendInvitationModal };
