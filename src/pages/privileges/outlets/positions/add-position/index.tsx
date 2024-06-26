import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import { getAll } from "@mocks/utils/dataMock.service";
import { IGeneralInformationEntry } from "../components/GeneralInformationForm";
import { stepsAddPosition } from "./config/addPosition.config";
import {
  IFormAddPosition,
  IFormAddPositionRef,
  IHandleUpdateDataSwitchstep,
} from "./types";
import { initalValuesPositions } from "./config/initialValues";
import { addPositionStepsRules, saveLinixPositions } from "./utils";
import { AddPositionUI } from "./interface";
import { dataToAssignmentFormEntry } from "../../linixUseCase/adding-linix-use-case";

import { IMessageState } from "../../users/types/forms.types";
import { generalMessage } from "./config/messages.config";

export function AddPosition() {
  const [currentStep, setCurrentStep] = useState<number>(
    stepsAddPosition.generalInformation.id
  );

  const steps = Object.values(stepsAddPosition);
  const [loading, setLoading] = useState(false);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<IMessageState>({
    visible: false,
  });

  const navigate = useNavigate();

  const [dataAddPositionLinixForm, setDataAddPositionLinixForm] =
    useState<IFormAddPosition>({
      generalInformation: {
        isValid: false,
        values: initalValuesPositions.generalInformation,
      },
      roles: {
        isValid: false,
        values: [],
      },
    });

  useEffect(() => {
    getAll("linix-roles")
      .then((data) => {
        if (data !== null) {
          setDataAddPositionLinixForm((prevFormData) => ({
            ...prevFormData,
            roles: {
              isValid: true,
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "k_Rol",
                valueLabel: "n_Rol",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error.message);
      });
  }, []);

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const formReferences: IFormAddPositionRef = {
    generalInformation: generalInformationRef,
  };

  const validateActiveRoles = () => {
    const validateAct = dataAddPositionLinixForm.roles.values.some(
      (x) => x.isActive === true
    );
    return currentStep === 2 && !validateAct;
  };

  const handleStepChange = (stepId: number) => {
    const newAddPosition = addPositionStepsRules(
      currentStep,
      dataAddPositionLinixForm,
      formReferences,
      isCurrentFormValid
    );

    setDataAddPositionLinixForm(newAddPosition);

    const changeStepKey = Object.entries(stepsAddPosition).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;

    setIsCurrentFormValid(
      changeIsVerification ||
        newAddPosition[changeStepKey as keyof IFormAddPosition]?.isValid ||
        currentStep === 3 ||
        false
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleNextStep = () => {
    if (currentStep === steps.length) {
      handleToggleModal();
    }
    if (currentStep + 1 <= steps.length && isCurrentFormValid) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  function handleUpdateDataSwitchstep(values: IHandleUpdateDataSwitchstep) {
    const stepKey = Object.entries(stepsAddPosition).find(
      ([, config]) => config.id === currentStep
    )?.[0];
    if (stepKey) {
      setDataAddPositionLinixForm({
        ...dataAddPositionLinixForm,
        [stepKey]: { values },
      });
    }
  }

  const handleToggleModal = () => {
    setShowModal(!showModal);
    setLoading(true);
  };

  const handleCloseSectionMessage = () => {
    setMessage({
      visible: false,
    });
    navigate("/privileges/positions");
  };

  const handleFinishForm = () => {
    saveLinixPositions(dataAddPositionLinixForm);
    handleToggleModal();
    setMessage({
      visible: true,
      data: generalMessage.success,
    });
  };

  return (
    <AddPositionUI
      steps={steps}
      currentStep={currentStep}
      isCurrentFormValid={isCurrentFormValid}
      dataAddPositionLinixForm={dataAddPositionLinixForm}
      formReferences={formReferences}
      showModal={showModal}
      loading={loading}
      message={message}
      setIsCurrentFormValid={setIsCurrentFormValid}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleUpdateDataSwitchstep={handleUpdateDataSwitchstep}
      setCurrentStep={setCurrentStep}
      handleToggleModal={handleToggleModal}
      handleFinishForm={handleFinishForm}
      handleCloseSectionMessage={handleCloseSectionMessage}
      validateActiveRoles={validateActiveRoles}
    />
  );
}
