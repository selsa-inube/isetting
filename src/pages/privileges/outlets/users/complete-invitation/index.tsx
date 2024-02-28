import { aidBudgetsFormInvitation } from "@mocks/apps/privileges/invitations/aidBudgetsForm.mock";
import { branchesFormInvitation } from "@mocks/apps/privileges/invitations/branchesForm.mock";
import { eventsFormInvitation } from "@mocks/apps/privileges/invitations/eventsForm.mock";
import { invitationEntriesDataMock } from "@mocks/apps/privileges/invitations/invitations.mock";
import { payrollsFormInvitation } from "@mocks/apps/privileges/invitations/payrollsForm.mock";
import { projectsFormInvitation } from "@mocks/apps/privileges/invitations/projectsForm.mock";
import { IVerificationData } from "@pages/privileges/outlets/users/complete-invitation/interface";
import { EMessageType } from "@src/types/messages.types";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AidBudgetsForm } from "../edit-user/forms/AidBudgetsForm";
import { BranchesForm } from "../edit-user/forms/BranchesForm";
import { GeneralInformationForm } from "../edit-user/forms/GeneralInfoForm";
import { PayrollsForm } from "../edit-user/forms/PayrollsForm";
import { ProjectsForm } from "../edit-user/forms/ProjectsForm";
import {
  IAssignmentFormEntry,
  IFormsInvitation,
  IGeneralInformationEntry,
} from "../types/forms.types";
import { stepsRegisterUserConfig } from "./config/completeInvitation.config";
import { CompleteInvitationUI } from "./interface";

function CompleteInvitation() {
  const { invitation_id } = useParams<{ invitation_id: string }>();

  const [currentStep, setCurrentStep] = useState<number>(
    stepsRegisterUserConfig.generalInformation.id
  );
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [invitationData, setInvitationData] = useState<IFormsInvitation>({
    generalInformation: { entries: getInvitationInformation() },
    branches: { entries: branchesFormInvitation },
    projects: { entries: projectsFormInvitation },
    events: { entries: eventsFormInvitation },
    aidBudgetUnits: { entries: aidBudgetsFormInvitation },
    payrolls: { entries: payrollsFormInvitation },
  });

  function getInvitationInformation() {
    return invitationEntriesDataMock.find(
      (invitation) => invitation.id === invitation_id
    );
  }

  const handleSubmit = (
    values: IGeneralInformationEntry | IAssignmentFormEntry[]
  ) => {
    const stepKey = Object.entries(stepsRegisterUserConfig).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (stepKey) {
      setInvitationData((prevInvitationData) => ({
        ...prevInvitationData,
        [stepKey]: { entries: values },
      }));
    }
  };

  const handleNextStep = (step: number) => {
    setCurrentStep(step + 1);
  };

  const handlePrevStep = (step: number) => {
    setCurrentStep(step - 1);
  };

  const handleCompleteInvitation = () => {
    if (invitationData.generalInformation.entries) {
      navigate("/privileges/users", {
        state: {
          messageType: EMessageType.SUCCESS,
          username: invitationData.generalInformation.entries.username,
          tab: "privileges-invitations",
        },
      });
    }
  };

  const handleToggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const verificationData: { [key: string]: IVerificationData } = {
    generalInformation: {
      id: "generalInformation",
      title: "General",
      content: invitationData.generalInformation.entries && (
        <GeneralInformationForm
          currentInformation={invitationData.generalInformation.entries}
          readOnly
          handleSubmit={() => {}}
        />
      ),
      fullwidth: true,
    },
    branches: {
      id: "branches",
      title: "Sucursales",
      content: (
        <BranchesForm
          currentBranches={invitationData.branches.entries}
          readOnly
          handleSubmit={() => {}}
        />
      ),
    },
    projects: {
      id: "projects",
      title: "Proyectos",
      content: (
        <ProjectsForm
          currentProjects={invitationData.projects.entries}
          readOnly
          handleSubmit={() => {}}
        />
      ),
    },
    events: {
      id: "events",
      title: "Eventos",
      content: (
        <AidBudgetsForm
          currentAidBudgetUnits={invitationData.events.entries}
          readOnly
          handleSubmit={() => {}}
        />
      ),
    },
    aidBudgets: {
      id: "aidBudgets",
      title: "Unidades de ayuda",
      content: (
        <AidBudgetsForm
          currentAidBudgetUnits={invitationData.aidBudgetUnits.entries}
          readOnly
          handleSubmit={() => {}}
        />
      ),
    },
    payrolls: {
      id: "payrolls",
      title: "Nómina",
      content: (
        <PayrollsForm
          currentPayrolls={invitationData.payrolls.entries}
          readOnly
          handleSubmit={() => {}}
        />
      ),
    },
  };

  return (
    <CompleteInvitationUI
      invitationData={invitationData}
      handleSubmit={handleSubmit}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      currentStep={currentStep}
      handleToggleModal={handleToggleModal}
      handleCompleteInvitation={handleCompleteInvitation}
      showModal={showModal}
      verificationData={verificationData}
    />
  );
}

export { CompleteInvitation };
