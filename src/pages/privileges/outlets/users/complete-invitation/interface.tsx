import { MdPersonOutline } from "react-icons/md";
import {
  Assisted,
  Breadcrumbs,
  Stack,
  useMediaQuery,
} from "@inube/design-system";

import { SubjectCard } from "@components/cards/SubjectCard";
import { DecisionModal } from "@components/feedback/DecisionModal";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { PageTitle } from "@components/PageTitle";

import { InitializerForm } from "@pages/privileges/outlets/forms/InitializerForm";
import { GeneralInformationForm } from "@pages/privileges/outlets/forms/GeneralInfoForm";

import {
  IAssignmentFormEntry,
  IFormsInvitation,
  IGeneralInformationEntry,
} from "../types/forms.types";

import {
  CompleteInvitationUserConfig,
  completeInvitationSubjectCardLabels,
  finishAssistedModalConfig,
  stepsRegisterUserConfig,
} from "./config/completeInvitation.config";
import { invitationNotFoundConfig } from "./config/invitationNotFound.config";

import { StyledAssistedContainer } from "./styles";

export interface IVerificationData {
  id: string;
  title: string;
  content: React.ReactNode;
  fullwidth?: boolean;
}

function finishModal(
  handleCloseModal: () => void,
  handleCompleteInvitation: () => void
) {
  const { title, description, actionText, appearance } =
    finishAssistedModalConfig;

  return (
    <DecisionModal
      title={title}
      description={description}
      actionText={actionText}
      loading={false}
      appearance={appearance}
      closeModal={handleCloseModal}
      handleClick={handleCompleteInvitation}
    />
  );
}

interface CompleteInvitationUIProps {
  invitationData: IFormsInvitation;
  handleSubmit: (
    values: IGeneralInformationEntry | IAssignmentFormEntry[]
  ) => void;
  handleNextStep: (step: number) => void;
  handlePrevStep: (step: number) => void;
  currentStep: number;
  handleCompleteInvitation: () => void;
  handleToggleModal: () => void;
  showModal: boolean;
  verificationData: Record<string, IVerificationData>;
}

function CompleteInvitationUI(props: CompleteInvitationUIProps) {
  const {
    invitationData,
    handleSubmit,
    handleNextStep,
    handlePrevStep,
    currentStep,
    handleCompleteInvitation,
    handleToggleModal,
    showModal,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");

  const {
    generalInformation: { entries: currentInformation },
  } = invitationData;

  const invitationCardData = currentInformation
    ? {
        username: currentInformation.username,
        userID: currentInformation.userID,
        email: currentInformation.email,
        invitationDate: currentInformation.invitationDate || "",
      }
    : {
        username: "",
        userID: "",
        email: "",
        invitationDate: "",
      };

  return (
    <Stack direction="column" padding={smallScreen ? "s200" : "s400 s800"}>
      <Stack gap="48px" direction="column">
        <Stack gap="32px" direction="column">
          <Breadcrumbs crumbs={CompleteInvitationUserConfig[0].crumbs} />
          <Stack justifyContent="space-between" alignItems="center" gap="50px">
            <PageTitle
              title={CompleteInvitationUserConfig[0].title}
              description={CompleteInvitationUserConfig[0].description}
              navigatePage="/privileges/users"
            />
            {currentInformation && invitationCardData && (
              <SubjectCard
                subjectData={invitationCardData}
                title="Información del usuario"
                icon={<MdPersonOutline size={24} />}
                labels={completeInvitationSubjectCardLabels}
              />
            )}
          </Stack>
        </Stack>
        {currentInformation ? (
          <>
            <StyledAssistedContainer>
              <Assisted
                steps={Object.values(stepsRegisterUserConfig)}
                currentStepId={currentStep}
                handlePrev={handlePrevStep}
                handleNext={
                  currentStep === Object.values(stepsRegisterUserConfig).length
                    ? handleToggleModal
                    : handleNextStep
                }
              />
            </StyledAssistedContainer>

            {currentStep === stepsRegisterUserConfig.generalInformation.id && (
              <GeneralInformationForm
                currentInformation={currentInformation}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.branches.id && (
              <InitializerForm
                dataOptionsForms={invitationData.branches.entries}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.projects.id && (
              <InitializerForm
                dataOptionsForms={invitationData.projects.entries}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.events.id && (
              <InitializerForm
                dataOptionsForms={invitationData.events.entries}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.aidBudgetUnits.id && (
              <InitializerForm
                dataOptionsForms={invitationData.aidBudgetUnits.entries}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.payrolls.id && (
              <InitializerForm
                dataOptionsForms={invitationData.payrolls.entries}
                handleSubmit={handleSubmit}
              />
            )}
          </>
        ) : (
          <ItemNotFound
            image={invitationNotFoundConfig.image}
            title={invitationNotFoundConfig.title}
            description={invitationNotFoundConfig.description}
            buttonDescription={invitationNotFoundConfig.buttonDescription}
            route={invitationNotFoundConfig.route}
          />
        )}
      </Stack>
      {showModal && finishModal(handleToggleModal, handleCompleteInvitation)}
    </Stack>
  );
}

export { CompleteInvitationUI };
