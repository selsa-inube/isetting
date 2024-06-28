import {
  Assisted,
  Breadcrumbs,
  Button,
  Stack,
  useMediaQuery,
  inube,
} from "@inube/design-system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageTitle } from "@components/PageTitle";
import { InitializerForm } from "@pages/privileges/outlets/forms/InitializerForm";
import { DecisionModal } from "@components/feedback/DecisionModal";
import { RenderMessage } from "@components/feedback/RenderMessage";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";

import {
  IFormAddRole,
  IFormAddRoleRef,
  IInitialiceFormRole,
  IStep,
} from "../types";
import { titleButtonTextAssited } from "./types";
import { StyledContainerAssisted } from "./styles";
import {
  createRolConfig,
  stepsAddRol,
  finishAssistedRoleModalConfig,
  finishAssistedRoleMessagesConfig,
} from "./config/addRol.config";
import { GeneralInformationForm } from "../components/GeneralInformationForm";
import { AncillaryAccountsForm } from "../components/AncillaryAccountsForm";
import { VerificationAddRole } from "../components/VerificationForm";
import { saveRole } from "./utils";
import { LoadingApp } from "@src/pages/login/outlets/LoadingApp";

interface AddRolUIProps {
  addRoleFormValid: IFormAddRole;
  currentStep: number;
  formReferences: IFormAddRoleRef;
  steps: IStep[];
  isAddRoleFormValid?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted?: () => void;
  handleUpdateDataSwitchstep: (values: IInitialiceFormRole[]) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleAddRoleFormValid: (newValue: boolean) => void;
  loading: boolean;
}

export function AddRolUI(props: AddRolUIProps) {
  const {
    loading,
    addRoleFormValid,
    currentStep,
    formReferences,
    steps,
    isAddRoleFormValid,
    handleNextStep,
    handlePreviousStep,
    handleUpdateDataSwitchstep,
    setCurrentStep,
    handleAddRoleFormValid,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<IMessageState>({
    visible: false,
  });
  const navigate = useNavigate();

  const smallScreen = useMediaQuery("(max-width: 580px)");

  const {
    generalInformation: { values: generalInformationValues },
    ancillaryAccounts: { values: ancillaryAccountsValues },
    transactionTypes: { values: transactionTypesValues },
    businessRules: { values: businessRulesValues },
    crediboardTasks: { values: crediboardTasksValues },
    useCases: { values: useCasesValues },
  } = addRoleFormValid;

  const { title, description, actionText, appearance } =
    finishAssistedRoleModalConfig;

  const handleAddRole = async (addRoleData: IFormAddRole) => {
    saveRole(addRoleFormValid);

    await saveRole(addRoleData)
      .then((newK_Role) => {
        renderMessage(newK_Role, "success");
      })
      .catch((error) => {
        renderMessage("", "failed");
      })
      .finally(() => {
        handleToggleModal();
      });
  };

  const renderMessage = (
    k_Role: string | "",
    type: "success" | "failed" = "failed"
  ) => {
    let messageType;
    if (type === "success")
      messageType = finishAssistedRoleMessagesConfig.success;
    if (type === "failed")
      messageType = finishAssistedRoleMessagesConfig.failed;

    messageType &&
      setMessage({
        visible: true,
        data: {
          icon: messageType?.icon,
          title: messageType?.title,
          description: messageType.description(k_Role),
          appearance: messageType?.appearance,
        },
      });
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseSectionMessage = () => {
    setMessage({
      visible: false,
    });
    navigate("/privileges/roles");
  };

  return (
    <>
      {loading ? (
        <LoadingApp />
      ) : (
        <Stack direction="column" padding={smallScreen ? "s200" : "s400 s800"}>
          <Stack gap={inube.spacing.s600} direction="column">
            <Stack gap={inube.spacing.s400} direction="column">
              <Breadcrumbs crumbs={createRolConfig[0].crumbs} />
              <Stack
                justifyContent="space-between"
                alignItems="center"
                gap={inube.spacing.s650}
              >
                <PageTitle
                  title={createRolConfig[0].title}
                  description={createRolConfig[0].description}
                  navigatePage="/privileges/roles"
                />
              </Stack>
            </Stack>
            <>
              <StyledContainerAssisted cursorDisabled={!isAddRoleFormValid}>
                <Assisted
                  steps={steps}
                  currentStepId={currentStep}
                  handlePrev={handlePreviousStep}
                  handleNext={
                    currentStep === steps.length
                      ? handleToggleModal
                      : handleNextStep
                  }
                  titleButtonText={titleButtonTextAssited}
                />
              </StyledContainerAssisted>

              {currentStep === stepsAddRol.generalInformation.id && (
                <GeneralInformationForm
                  initialValues={generalInformationValues}
                  ref={formReferences.generalInformation}
                  handleAddRoleFormValid={handleAddRoleFormValid}
                  currentStep={currentStep}
                />
              )}

              {currentStep === stepsAddRol.auxiliaryAccounts.id && (
                <AncillaryAccountsForm
                  initialValues={ancillaryAccountsValues}
                  ref={formReferences.ancillaryAccounts}
                  handleAddRoleFormValid={handleAddRoleFormValid}
                />
              )}
              {currentStep === stepsAddRol.transactionTypes.id && (
                <InitializerForm
                  dataOptionsForms={transactionTypesValues}
                  handleSubmit={handleUpdateDataSwitchstep}
                />
              )}
              {currentStep === stepsAddRol.businessRules.id && (
                <InitializerForm
                  dataOptionsForms={businessRulesValues}
                  handleSubmit={handleUpdateDataSwitchstep}
                />
              )}
              {currentStep === stepsAddRol.crediboardTasks.id && (
                <InitializerForm
                  dataOptionsForms={crediboardTasksValues}
                  handleSubmit={handleUpdateDataSwitchstep}
                />
              )}
              {currentStep === stepsAddRol.useCases.id && (
                <InitializerForm
                  dataOptionsForms={useCasesValues}
                  handleSubmit={handleUpdateDataSwitchstep}
                />
              )}

              {currentStep === stepsAddRol.summary.id && (
                <VerificationAddRole
                  steps={addRoleFormValid}
                  setCurrentStep={setCurrentStep}
                />
              )}
            </>
            <Stack gap="16px" justifyContent="flex-end">
              <Button
                onClick={handlePreviousStep}
                type="button"
                disabled={currentStep === steps[0].id}
                spacing="wide"
                variant="none"
                appearance="gray"
              >
                Atrás
              </Button>

              <Button
                onClick={
                  currentStep === steps.length
                    ? handleToggleModal
                    : handleNextStep
                }
                spacing="wide"
                disabled={!isAddRoleFormValid}
              >
                {currentStep === steps.length ? "Enviar" : "Siguiente"}
              </Button>
              {showModal && (
                <DecisionModal
                  title={title}
                  description={description}
                  actionText={actionText}
                  appearance={appearance}
                  closeModal={handleToggleModal}
                  handleClick={() => handleAddRole(addRoleFormValid)}
                />
              )}

              {message.visible && (
                <RenderMessage
                  message={message}
                  handleCloseMessage={handleCloseSectionMessage}
                  onMessageClosed={handleCloseSectionMessage}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}
