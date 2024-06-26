import { useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";

import { getAll } from "@mocks/utils/dataMock.service";
import { dataToAssignmentFormEntry } from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case";

import { IFormAddRole, IFormAddRoleRef, IInitialiceFormRole } from "../types";
import { addRoleStepsRules } from "./utils";
import { stepsAddRol } from "./config/addRol.config";
import { IGeneralInformationForm } from "../components/GeneralInformationForm";
import { IAncillaryAccountsForm } from "../components/AncillaryAccountsForm";
import { AddRolUI } from "./interface";
import { initialValuesAddRol } from "./config/initialValues";

const steps = Object.values(stepsAddRol);

export function AddRol() {
  const [currentStep, setCurrentStep] = useState<number>(
    stepsAddRol.generalInformation.id
  );

  const [isAddRoleFormValid, setIsAddRoleFormValid] = useState(false);

  const handleAddRoleFormValid = (isValid: boolean) => {
    setIsAddRoleFormValid(isValid);
  };

  const [dataAddRoleLinixForm, setDataAddRoleLinixForm] =
    useState<IFormAddRole>({
      generalInformation: {
        isValid: true,
        values: {
          roleName:
            initialValuesAddRol.generalInformation.values.roleName.trim(),
          description:
            initialValuesAddRol.generalInformation.values.description.trim(),
          application:
            initialValuesAddRol.generalInformation.values.application.trim(),
          applicationId:
            initialValuesAddRol.generalInformation.values.applicationId.trim(),
        },
      },
      ancillaryAccounts: {
        isValid: false,
        values: {
          officialSector:
            initialValuesAddRol.ancillaryAccounts.values.officialSector.trim(),
          commercialSector:
            initialValuesAddRol.ancillaryAccounts.values.commercialSector.trim(),
          solidaritySector:
            initialValuesAddRol.ancillaryAccounts.values.solidaritySector.trim(),
        },
      },
      transactionTypes: {
        values: [],
      },
      businessRules: {
        values: [],
      },
      crediboardTasks: {
        values: [],
      },
      useCases: {
        values: [],
      },
    });

  useEffect(() => {
    Promise.all([
      getAll("documents"),
      getAll("linix-roles"),
      getAll("web-options"),
      getAll("linix-use-cases"),
    ]).then(
      ([
        documentsFetch,
        linixRolesFetch,
        webOptionsFetch,
        linixUseCasesFetch,
      ]) => {
        setDataAddRoleLinixForm((prevFormData) => ({
          ...prevFormData,
          transactionTypes: {
            values: dataToAssignmentFormEntry({
              dataOptions: documentsFetch as Record<string, unknown>[],
              idLabel: "CODIGO",
              valueLabel: "NOMBRE",
              isActiveLabel: "asignado",
            }),
          },
          businessRules: {
            values: dataToAssignmentFormEntry({
              dataOptions: linixRolesFetch as Record<string, unknown>[],
              idLabel: "k_Rol",
              valueLabel: "n_Rol",
              isActiveLabel: "asignado",
            }),
          },
          crediboardTasks: {
            values: dataToAssignmentFormEntry({
              dataOptions: webOptionsFetch as Record<string, unknown>[],
              idLabel: "K_opcion",
              valueLabel: "Nombre_opcion",
              isActiveLabel: "asignado",
            }),
          },
          useCases: {
            values: dataToAssignmentFormEntry({
              dataOptions: linixUseCasesFetch as Record<string, unknown>[],
              idLabel: "k_Usecase",
              valueLabel: "n_Usecase",
              isActiveLabel: "id",
            }),
          },
        }));
      }
    );
  }, []);

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationForm>>(null);
  const ancillaryAccountsRef =
    useRef<FormikProps<IAncillaryAccountsForm>>(null);

  const formReferences: IFormAddRoleRef = {
    generalInformation: generalInformationRef,
    ancillaryAccounts: ancillaryAccountsRef,
  };

  const handleStepChange = (stepId: number) => {
    const newCreditDestinationRequest = addRoleStepsRules(
      currentStep,
      dataAddRoleLinixForm,
      formReferences,
      isAddRoleFormValid
    );

    setDataAddRoleLinixForm(newCreditDestinationRequest);

    const changeStepKey = Object.entries(stepsAddRol).find(
      ([, config]) => config.id === stepId
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsAddRoleFormValid(
      changeIsVerification ||
        newCreditDestinationRequest[changeStepKey as keyof IFormAddRole]
          ?.isValid ||
        false
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);

    setIsAddRoleFormValid(stepId >= 2);
  };

  const handleNextStep = () => {
    if (currentStep + 1 <= steps.length && isAddRoleFormValid) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  const handleUpdateDataSwitchstep = (values: IInitialiceFormRole[]) => {
    const stepKey = Object.entries(stepsAddRol).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (stepKey) {
      setDataAddRoleLinixForm((prevFormData) => ({
        ...prevFormData,
        [stepKey]: { values: values },
      }));
    }
  };

  return (
    <AddRolUI
      steps={steps}
      addRoleFormValid={dataAddRoleLinixForm}
      currentStep={currentStep}
      isAddRoleFormValid={isAddRoleFormValid}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleAddRoleFormValid={handleAddRoleFormValid}
      formReferences={formReferences}
      handleUpdateDataSwitchstep={handleUpdateDataSwitchstep}
      setCurrentStep={setCurrentStep}
    />
  );
}
