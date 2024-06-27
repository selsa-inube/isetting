import { MdPersonOutline } from "react-icons/md";

import {
  Assisted,
  Breadcrumbs,
  Stack,
  useMediaQuery,
  Button,
  inube,
} from "@inube/design-system";
import { SubjectCard } from "@components/cards/SubjectCard";
import { DecisionModal } from "@components/feedback/DecisionModal";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { PageTitle } from "@components/PageTitle";
import { InitializerForm } from "@pages/privileges/outlets/forms/InitializerForm";
import { LoadingApp } from "@pages/login/outlets/LoadingApp";
import { IInvitationsEntry } from "@services/users/invitation.types";

import {
  CompleteInvitationUserConfig,
  completeInvitationSubjectCardLabels,
  finishAssistedModalConfig,
  stepsRegisterUserConfig,
} from "./config/completeInvitation.config";
import { invitationNotFoundConfig } from "./config/invitationNotFound.config";
import { StyledContainerAssisted, StyledContainerLoading } from "./styles";
import { GeneralInformationForm } from "./GeneralInformation";

import {
  IFormCompleteInvitation,
  IFormCompleteInvitationRef,
  IStep,
  titleButtonTextAssited,
} from "./types";
import { IAssignmentFormEntry } from "../../../types/forms.types";

import { VerificationAddInvitation } from "../verificationForm";

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
  currentStep: number;
  formReferences: IFormCompleteInvitationRef;
  invitationData: IFormCompleteInvitation;
  isCurrentFormValid: boolean;
  loading: boolean;
  positionsOptions: Record<string, unknown>[];
  showModal: boolean;
  steps: IStep[];
  handleCompleteInvitation: () => void;
  handleNextStep: (step: number) => void;
  handlePrevStep: (step: number) => void;
  handleSubmit: (values: IInvitationsEntry | IAssignmentFormEntry[]) => void;
  handleToggleModal: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

function CompleteInvitationUI(props: CompleteInvitationUIProps) {
  const {
    currentStep,
    formReferences,
    isCurrentFormValid,
    invitationData,
    loading,
    positionsOptions,
    showModal,
    steps,
    handleCompleteInvitation,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    handleToggleModal,
    setIsCurrentFormValid,
    setCurrentStep,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");

  const {
    generalInformation: { values: currentInformation },
  } = invitationData;

  const invitationCardData = currentInformation
    ? {
        userName: currentInformation.userName,
        userIdentification: currentInformation.userIdentification,
        email: currentInformation.email,
        dateStart: currentInformation.dateStart || "",
      }
    : {
        userName: "",
        userIdentification: "",
        email: "",
        dateStart: "",
      };

  return loading ? (
    <StyledContainerLoading>
      <LoadingApp />
    </StyledContainerLoading>
  ) : (
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
            <StyledContainerAssisted cursorDisabled={!isCurrentFormValid}>
              <Assisted
                steps={Object.values(stepsRegisterUserConfig)}
                currentStepId={currentStep}
                handlePrev={handlePrevStep}
                handleNext={
                  currentStep === Object.values(stepsRegisterUserConfig).length
                    ? handleToggleModal
                    : handleNextStep
                }
                titleButtonText={titleButtonTextAssited}
              />
            </StyledContainerAssisted>

            {currentStep === stepsRegisterUserConfig.generalInformation.id && (
              <GeneralInformationForm
                initialValues={currentInformation}
                ref={formReferences.generalInformation}
                onFormValid={setIsCurrentFormValid}
                positionsOptions={positionsOptions}
              />
            )}
            {currentStep === stepsRegisterUserConfig.branches.id && (
              <InitializerForm
                dataOptionsForms={invitationData.branches.values}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.projects.id && (
              <InitializerForm
                dataOptionsForms={invitationData.projects.values}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.events.id && (
              <InitializerForm
                dataOptionsForms={invitationData.events.values}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.aidBudgetUnits.id && (
              <InitializerForm
                dataOptionsForms={invitationData.aidBudgetUnits.values}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.payrolls.id && (
              <InitializerForm
                dataOptionsForms={invitationData.payrolls.values}
                handleSubmit={handleSubmit}
              />
            )}
            {currentStep === stepsRegisterUserConfig.verification.id && (
              <VerificationAddInvitation
                steps={invitationData}
                setCurrentStep={setCurrentStep}
              />
            )}

            <Stack gap={inube.spacing.s200} justifyContent="flex-end">
              <Button
                onClick={handlePrevStep}
                type="button"
                disabled={currentStep === steps[0].id}
                spacing="compact"
                variant="none"
                appearance="gray"
              >
                Atrás
              </Button>

              <Button
                onClick={handleNextStep}
                spacing="compact"
                disabled={!isCurrentFormValid}
              >
                {currentStep === steps.length ? "Enviar" : "Siguiente"}
              </Button>
            </Stack>
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
