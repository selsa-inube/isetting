import {
  Assisted,
  Breadcrumbs,
  Stack,
  useMediaQuery,
  inube,
  Button,
} from "@inube/design-system";
import { DecisionModal } from "@components/feedback/DecisionModal";
import { PageTitle } from "@components/PageTitle";
import { RenderMessage } from "@components/feedback/RenderMessage";
import { InitializerForm } from "@pages/privileges/outlets/forms/InitializerForm";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { buttonOptionsMock } from "@mocks/privileges/button/buttonOptionsMock.mock";

import {
  CrateLinixUseCaseConfig,
  finishAssistedModalConfig,
  stepsAddingLinixUseCase,
} from "./config/addingLinixUseCase.config";
import { StyledAssistedContainer } from "./styles";

import {
  IFormAddLinixUseCase,
  IHandleChangeFormData,
  IFormAddLinixUseCaseRef,
  titleButtonTextAssited,
} from "./types";

import { saveLinixUseCase } from "./utils";
import { GeneralInformationForm } from "../components/GeneralInformationForm";

import { ClientServerButtonSelection } from "../components/ClientServerButtonSelection";
import { VerificationAddLinixUseCase } from "../components/VerificationForm";
import { LoadingApp } from "@src/pages/login/outlets/LoadingApp";

function finishModal(
  handleCloseModal: () => void,
  loading: boolean,
  handleFinishForm: () => void
) {
  const { title, description, actionText, appearance } =
    finishAssistedModalConfig;

  return (
    <DecisionModal
      title={title}
      description={description}
      actionText={actionText}
      loading={loading}
      appearance={appearance}
      closeModal={handleCloseModal}
      handleClick={handleFinishForm}
    />
  );
}

const renderStepContent = (
  currentStep: number,
  formReferences: IFormAddLinixUseCaseRef,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  csOptions: Record<string, unknown>[],
  webOptions: Record<string, unknown>[],
  handleStepChange: (stepId: number) => void,
  handleUpdateFormData: (values: IHandleChangeFormData) => void,
  handleNextStep: (step: number) => void,
  formData: IFormAddLinixUseCase,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
) => {
  return (
    <>
      {currentStep === stepsAddingLinixUseCase.generalInformation.id && (
        <GeneralInformationForm
          initialValues={formData.generalInformation.values}
          handleSubmit={handleUpdateFormData}
          csOptions={csOptions}
          webOptions={webOptions}
          ref={formReferences.generalInformation}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === stepsAddingLinixUseCase.clientServerButton.id && (
        <ClientServerButtonSelection
          csSelected={formData.generalInformation.values.k_Opcion}
          handleSubmit={handleUpdateFormData}
          initialValues={formData.clientServerButton.values}
        />
      )}
      {currentStep === stepsAddingLinixUseCase.downloadableDocuments.id && (
        <InitializerForm
          dataOptionsForms={formData.downloadableDocuments.values}
          handleSubmit={handleUpdateFormData}
        />
      )}

      {currentStep === stepsAddingLinixUseCase.webReports.id && (
        <InitializerForm
          dataOptionsForms={formData.webReports.values}
          handleSubmit={handleUpdateFormData}
        />
      )}

      {currentStep === stepsAddingLinixUseCase.webOptions.id && (
        <InitializerForm
          dataOptionsForms={formData.webOptions.values}
          handleSubmit={handleUpdateFormData}
        />
      )}
      {currentStep === stepsAddingLinixUseCase.clientServerReports.id && (
        <InitializerForm
          dataOptionsForms={formData.clientServerReports.values}
          handleSubmit={handleUpdateFormData}
        />
      )}
      {currentStep === stepsAddingLinixUseCase.clientServerOptions.id && (
        <InitializerForm
          dataOptionsForms={formData.clientServerOptions.values}
          handleSubmit={handleUpdateFormData}
        />
      )}
      {currentStep === stepsAddingLinixUseCase.summary.id && (
        <VerificationAddLinixUseCase
          steps={formData}
          setCurrentStep={setCurrentStep}
        />
      )}
    </>
  );
};

interface AddingLinixUseCaseUIProps {
  message: IMessageState;
  loading: boolean;
  onCloseSectionMessage: () => void;
  handleFinishForm: () => void;
  handleNextStep: (step: number) => void;
  handlePrevStep: (step: number) => void;
  currentStep: number;
  handleToggleModal: () => void;
  showModal: boolean;
  handleUpdateFormData: (values: IHandleChangeFormData) => void;
  csOptions: Record<string, unknown>[];
  webOptions: Record<string, unknown>[];
  formReferences: IFormAddLinixUseCaseRef;
  handleStepChange: (stepId: number) => void;
  formData: IFormAddLinixUseCase;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  isCurrentFormValid: boolean;
  selectOptions: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

function AddingLinixUseCaseUI(props: AddingLinixUseCaseUIProps) {
  const {
    message,
    onCloseSectionMessage,
    loading,
    handleFinishForm,
    currentStep,
    handleToggleModal,
    showModal,
    handleNextStep,
    formData,
    handleUpdateFormData,
    csOptions,
    setIsCurrentFormValid,
    handleStepChange,
    webOptions,
    formReferences,
    isCurrentFormValid,
    setCurrentStep,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");
  const optionValidations = () => {
    const validate = buttonOptionsMock.filter(
      (buttonOptions) =>
        buttonOptions.OPCION_CLIENTE_SERVIDOR ===
        formData.generalInformation.values.k_Opcion
    );
    if (
      currentStep === Object.values(stepsAddingLinixUseCase).length &&
      validate.length !== 0
    ) {
      saveLinixUseCase(formData);
    } else if (validate.length === 0 && currentStep === 1) {
      handleNextStep(3);
    } else {
      handleNextStep(currentStep + 1);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingApp />
      ) : (
        <Stack direction="column" padding={smallScreen ? "s200" : "s400 s800"}>
          <Stack gap={inube.spacing.s600} direction="column">
            <Stack gap={inube.spacing.s400} direction="column">
              <Breadcrumbs crumbs={CrateLinixUseCaseConfig[0].crumbs} />
              <Stack
                justifyContent="space-between"
                alignItems="center"
                gap={inube.spacing.s650}
              >
                <PageTitle
                  title={CrateLinixUseCaseConfig[0].title}
                  description={CrateLinixUseCaseConfig[0].description}
                  navigatePage="/privileges/linixUseCase"
                />
              </Stack>
            </Stack>
            <>
              <StyledAssistedContainer $cursorDisabled={!isCurrentFormValid}>
                <Assisted
                  steps={Object.values(stepsAddingLinixUseCase)}
                  currentStepId={currentStep}
                  handlePrev={() => {
                    const prevStep =
                      currentStep ===
                      Object.values(stepsAddingLinixUseCase).length
                        ? currentStep - 1
                        : currentStep === 3 &&
                          !buttonOptionsMock.some(
                            (buttonOptions) =>
                              buttonOptions.OPCION_CLIENTE_SERVIDOR ===
                              formData.generalInformation.values.k_Opcion
                          )
                        ? 1
                        : currentStep - 1;
                    handleNextStep(prevStep);
                  }}
                  handleNext={() => {
                    const nextStep =
                      currentStep ===
                      Object.values(stepsAddingLinixUseCase).length
                        ? (handleToggleModal(), currentStep)
                        : currentStep === 1 &&
                          !buttonOptionsMock.some(
                            (buttonOptions) =>
                              buttonOptions.OPCION_CLIENTE_SERVIDOR ===
                              formData.generalInformation.values.k_Opcion
                          )
                        ? 3
                        : currentStep + 1;
                    handleNextStep(nextStep);
                  }}
                  titleButtonText={titleButtonTextAssited}
                />
              </StyledAssistedContainer>
              {renderStepContent(
                currentStep,
                formReferences,
                setIsCurrentFormValid,
                csOptions,
                webOptions,
                handleStepChange,
                handleUpdateFormData,
                handleNextStep,
                formData,
                setCurrentStep
              )}
            </>
            <Stack gap={inube.spacing.s200} justifyContent="flex-end">
              <Button
                onClick={() => {
                  const prevStep =
                    currentStep ===
                    Object.values(stepsAddingLinixUseCase).length
                      ? currentStep - 1
                      : currentStep === 3 &&
                        !buttonOptionsMock.some(
                          (buttonOptions) =>
                            buttonOptions.OPCION_CLIENTE_SERVIDOR ===
                            formData.generalInformation.values.k_Opcion
                        )
                      ? 1
                      : currentStep - 1;
                  handleNextStep(prevStep);
                }}
                type="button"
                disabled={currentStep === 1}
                spacing="compact"
                variant="none"
                appearance="gray"
              >
                Atrás
              </Button>

              <Button
                onClick={() => {
                  if (
                    currentStep ===
                    Object.values(stepsAddingLinixUseCase).length
                  ) {
                    handleToggleModal();
                  } else {
                    optionValidations();
                  }
                }}
                ing="compact"
                disabled={!isCurrentFormValid}
              >
                {currentStep === Object.values(stepsAddingLinixUseCase).length
                  ? "Enviar"
                  : "Siguiente"}
              </Button>
              {message.visible && (
                <RenderMessage
                  message={message}
                  handleCloseMessage={onCloseSectionMessage}
                  onMessageClosed={onCloseSectionMessage}
                />
              )}
            </Stack>
          </Stack>

          {showModal &&
            finishModal(handleToggleModal, loading, handleFinishForm)}
        </Stack>
      )}
    </>
  );
}

export { AddingLinixUseCaseUI };
