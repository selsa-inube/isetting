import {
  Assisted,
  Breadcrumbs,
  Stack,
  useMediaQuery,
  inube,
} from "@inube/design-system";

import itemNotFound from "@assets/images/ItemNotFound.png";
import { DecisionModal } from "@components/feedback/DecisionModal";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { PageTitle } from "@components/PageTitle";

import {
  createRolConfig,
  finishAssistedRolModalConfig,
  stepsAddRol,
} from "./config/addRol.config";
import { GeneralInformationForm } from "./forms/GeneralInformationForm";

interface AddRolUIProps {
  handleNextStep: (step: number) => void;
  handlePrevStep: (step: number) => void;
  currentStep: number;
  handleCompleteInvitation: () => void;
  handleToggleModal: () => void;
  showModal: boolean;
}

function finishModal(
  handleCloseModal: () => void,
  handleCompleteInvitation: () => void
) {
  const { title, description, actionText, appearance } =
    finishAssistedRolModalConfig;

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

export function AddRolUI(props: AddRolUIProps) {
  const {
    currentStep,
    handleCompleteInvitation,
    handleToggleModal,
    showModal,
    handlePrevStep,
    handleNextStep,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");

  return (
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
          <Assisted
            steps={Object.values(stepsAddRol)}
            currentStepId={currentStep}
            handlePrev={handlePrevStep}
            handleNext={
              currentStep === Object.values(stepsAddRol).length
                ? handleToggleModal
                : handleNextStep
            }
          />

          {currentStep === stepsAddRol.generalInformation.id && (
            <GeneralInformationForm
              handleSubmit={() => handleNextStep(currentStep)}
              withSubmitButtons
            />
          )}

          {currentStep === stepsAddRol.auxiliaryAccounts.id && (
            <ItemNotFound
              image={itemNotFound}
              title={"Opciones de cuentas auxiliares"}
              description={"Esta sección está en construcción."}
              buttonDescription={"Retorna a la página de inicio"}
              route={"/privileges/roles"}
            />
          )}
          {currentStep === stepsAddRol.transactionTypes.id && (
            <ItemNotFound
              image={itemNotFound}
              title={"Tipos de movimiento"}
              description={"Esta sección está en construcción."}
              buttonDescription={"Retorna a la página de inicio"}
              route={"/privileges/roles"}
            />
          )}
          {currentStep === stepsAddRol.businessRules.id && (
            <ItemNotFound
              image={itemNotFound}
              title={"Reglas de negocio"}
              description={"Esta sección está en construcción."}
              buttonDescription={"Retorna a la página de inicio"}
              route={"/privileges/roles"}
            />
          )}
          {currentStep === stepsAddRol.crediboardTasks.id && (
            <ItemNotFound
              image={itemNotFound}
              title={"Tareas Crediboard"}
              description={"Esta sección está en construcción."}
              buttonDescription={"Retorna a la página de inicio"}
              route={"/privileges/roles"}
            />
          )}
          {currentStep === stepsAddRol.useCases.id && (
            <ItemNotFound
              image={itemNotFound}
              title={"Casos de uso"}
              description={"Esta sección está en construcción."}
              buttonDescription={"Retorna a la página de inicio"}
              route={"/privileges/roles"}
            />
          )}

          {currentStep === stepsAddRol.summary.id && (
            <ItemNotFound
              image={itemNotFound}
              title={"Página de resumen"}
              description={"Esta sección está en construcción."}
              buttonDescription={"Retorna a la página de inicio"}
              route={"/privileges/roles"}
            />
          )}
        </>
      </Stack>

      {showModal && finishModal(handleToggleModal, handleCompleteInvitation)}
    </Stack>
  );
}