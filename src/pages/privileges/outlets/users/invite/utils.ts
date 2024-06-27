import { IInvitationsEntry } from "@services/users/invitation.types";
import localforage from "localforage";
import { IInviteFormValues } from "./types";

export const saveLinixInvitations = (addLinixInvitation: IInviteFormValues) => {
  const today = new Date();
  const formatDateStart = today.toISOString();

  const dateEnd = new Date();
  const nextMonth = new Date(dateEnd).getMonth() + 1;
  dateEnd.setMonth(nextMonth);
  const formatDateEnd = dateEnd.toISOString();

  const newLinixInvitation: IInvitationsEntry = {
    customerId: "",
    dateEnd: formatDateEnd,
    dateStart: formatDateStart,
    email: addLinixInvitation.email,
    invitationId: "",
    password: "",
    phoneNumber: addLinixInvitation.phoneNumber,
    requestingUser: "",
    status: "pending",
    userAccountId: "ACD0017EW65WS874125S",
    userIdentification: addLinixInvitation.userIdentification,
    userName: addLinixInvitation.userName,
  };
  localforage.getItem("linix-invitations").then((data) => {
    if (data) {
      localforage.setItem("linix-invitations", [
        ...(data as IInviteFormValues[]),
        newLinixInvitation,
      ]);
    } else {
      localforage.setItem("linix-invitations", [newLinixInvitation]);
    }
  });
};
