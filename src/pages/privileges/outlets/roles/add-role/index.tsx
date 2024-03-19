import { useState } from "react";

import { stepsAddRol } from "./config/addRol.config";
import { IGeneralInformationForm } from "./forms/GeneralInformationForm";
import { AddRolUI } from "./interface";
import { IAncillaryAccountsForm } from "./forms/AncillaryAccounts";

export interface IFormAddRole {
  generalInformation: {
    isValid: boolean;
    values: IGeneralInformationForm;
  };
  ancillaryAccounts: {
    values: IAncillaryAccountsForm;
  };
}

export function AddRol() {
  const [currentStep, setCurrentStep] = useState<number>(
    stepsAddRol.generalInformation.id
  );
  const [showModal, setShowModal] = useState(false);

  const [generalInformationData, setGeneralInformationData] =
    useState<IFormAddRole>({
      generalInformation: {
        isValid: true,
        values: {
          roleName: "",
          description: "",
          aplication: "",
        },
      },
      ancillaryAccounts: {
        values: {
          officialSector: "",
          commercialSector: "",
          solidaritySector: "",
        },
      },
    });

  const handleUptdateForm = (values: IFormAddRole) => {
    console.log("values cuentas", values);
    const stepKey = Object.entries(stepsAddRol).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (stepKey) {
      setGeneralInformationData((prevFormData) => ({
        ...prevFormData,
        [stepKey]: { values: values },
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
    return;
  };

  const handleToggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <AddRolUI
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      currentStep={currentStep}
      handleToggleModal={handleToggleModal}
      handleCompleteInvitation={handleCompleteInvitation}
      showModal={showModal}
      dataForm={generalInformationData}
      handleUpdateGeneralInformation={handleUptdateForm}
    />
  );
}
