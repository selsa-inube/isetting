import {
  Assisted,
  Breadcrumbs,
  Button,
  Stack,
  useMediaQuery,
  inube,
} from "@inube/design-system";

import { PageTitle } from "@components/PageTitle";
import { InitializerForm } from "@pages/privileges/outlets/forms/InitializerForm";

import {
  IFormAddRole,
  IFormAddRoleRef,
  IInitialiceFormRole,
  IStep,
} from "../types";
import { createRolConfig, stepsAddRol } from "./config/addRol.config";
import { GeneralInformationForm } from "./forms/GeneralInformationForm";
import { AncillaryAccountsForm } from "./forms/AncillaryAccounts";
import { VerificationAddRole } from "./forms/Verification";

interface AddRolUIProps {
  addRoleFormValid: IFormAddRole;
  currentStep: number;
  formReferences: IFormAddRoleRef;
  steps: IStep[];
  isAddRoleFormValid: boolean;
  setAddRoleFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted?: () => void;
  handleUpdateDataSwitchstep: (values: IInitialiceFormRole[]) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export function AddRolUI(props: AddRolUIProps) {
  const {
    addRoleFormValid,
    currentStep,
    formReferences,
    steps,
    isAddRoleFormValid,
    handleNextStep,
    handlePreviousStep,

    handleUpdateDataSwitchstep,
    setCurrentStep,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");

  const {
    generalInformation: { values: generalInformationValues },
    ancillaryAccounts: { values: ancillaryAccountsValues },
    transactionTypes: { values: transactionTypesValues },
    businessRules: { values: businessRulesValues },
    crediboardTasks: { values: crediboardTasksValues },
    useCases: { values: useCasesValues },
  } = addRoleFormValid;

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
            steps={steps}
            currentStepId={currentStep}
            handlePrev={handlePreviousStep}
            handleNext={handleNextStep}
          />

          {currentStep === stepsAddRol.generalInformation.id && (
            <GeneralInformationForm
              initialValues={generalInformationValues}
              ref={formReferences.generalInformation}
            />
          )}

          {currentStep === stepsAddRol.auxiliaryAccounts.id && (
            <AncillaryAccountsForm
              initialValues={ancillaryAccountsValues}
              ref={formReferences.ancillaryAccounts}
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
            spacing="compact"
            variant="none"
            appearance="gray"
          >
            Atrás
          </Button>

          <Button
            onClick={handleNextStep}
            spacing="compact"
            disabled={!isAddRoleFormValid}
          >
            {currentStep === steps.length ? "Enviar" : "Siguiente"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
