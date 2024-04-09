import { useState, useEffect, useRef } from "react";
import { FormikProps } from "formik";

import { getAll } from "@mocks/utils/dataMock.service";

import { stepsAddingLinixUseCase } from "./config/addingLinixUseCase.config";
import { AddingLinixUseCaseUI } from "./interface";
import {
  DataToAssignmentFormEntryProps,
  IGeneralInformation,
  IFormAddLinixUseCase,
  IHandleChangeFormData,
  IFormAddLinixUseCaseRef,
} from "./types";

export function dataToAssignmentFormEntry(
  props: DataToAssignmentFormEntryProps
) {
  const { dataOptions, idLabel, valueLabel, isActiveLabel } = props;
  return dataOptions.map((dataOption) => ({
    value: String(dataOption[valueLabel]),
    isActive: Boolean(dataOption[isActiveLabel] === "Y"),
    id: String(dataOption[idLabel]),
  }));
}

function AddingLinixUseCase() {
  const [currentStep, setCurrentStep] = useState<number>(
    stepsAddingLinixUseCase.generalInformation.id
  );
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<IFormAddLinixUseCase>({
    generalInformation: {
      isValid: false,
      values: {
        n_Usecase: "",
        n_Descrip: "",
        i_Tipusec: "",
        k_Funcio: "",
        k_Opcion: "",
      },
    },
    clientServerButton: {
      isValid: false,
      values: {
        csButtonOption: "",
      },
    },
    downloadableDocuments: {
      values: [],
    },
    webReports: {
      values: [],
    },
    webOptions: {
      values: [],
    },
    clientServerReports: {
      values: [],
    },
    clientServerOptions: {
      values: [],
    },
  });

  const [csOptions, setCsOptions] = useState<Record<string, unknown>[]>([]);
  const [webOptions, setWebOptions] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    getAll("clients-server")
      .then((data) => {
        if (data !== null) {
          setCsOptions(data as Record<string, unknown>[]);
          setFormData((prevFormData: IFormAddLinixUseCase) => ({
            ...prevFormData,
            clientServerOptions: {
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "CODIGO_OPCION",
                valueLabel: "DESCRIPCION",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching linix-use-cases:", error.message);
      });

    getAll("clients-server")
      .then((data) => {
        if (data !== null) {
          setFormData((prevFormData: IFormAddLinixUseCase) => ({
            ...prevFormData,
            clientServerReports: {
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "CODIGO_OPCION",
                valueLabel: "DESCRIPCION",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching linix-use-cases:", error.message);
      });

    getAll("web-options")
      .then((data) => {
        if (data !== null) {
          setWebOptions(data as Record<string, unknown>[]);
          setFormData((prevFormData: IFormAddLinixUseCase) => ({
            ...prevFormData,
            webOptions: {
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "K_opcion",
                valueLabel: "Nombre_opcion",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching web-options:", error.message);
      });
    getAll("documents")
      .then((data) => {
        if (data !== null) {
          setFormData((prevFormData: IFormAddLinixUseCase) => ({
            ...prevFormData,
            downloadableDocuments: {
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "CODIGO",
                valueLabel: "NOMBRE",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching linix-use-cases:", error.message);
      });
    getAll("web-options")
      .then((data) => {
        if (data !== null) {
          setFormData((prevFormData: IFormAddLinixUseCase) => ({
            ...prevFormData,
            webReports: {
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "K_opcion",
                valueLabel: "Nombre_opcion",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching web-options:", error.message);
      });
  }, []);

  const handleUpdateFormData = (values: IHandleChangeFormData) => {
    const stepKey = Object.entries(stepsAddingLinixUseCase).find(
      ([, config]) => config.id === currentStep
    )?.[0];
    if (stepKey) {
      if (stepKey === "generalInformation") {
        const updatedData: IFormAddLinixUseCase = {
          ...formData,
        };
        Object.assign(updatedData[stepKey].values, values);
        Object.assign(
          updatedData.webOptions.values,
          formData.webOptions.values.map((option) =>
            option.id === (values as IGeneralInformation).k_Funcio
              ? { ...option, isActive: true }
              : option
          )
        );
        Object.assign(
          updatedData.clientServerOptions.values,
          formData.clientServerOptions.values.map((option) =>
            option.id === (values as IGeneralInformation).k_Opcion
              ? { ...option, isActive: true }
              : option
          )
        );
      } else {
        setFormData((prevFormData: IFormAddLinixUseCase) => ({
          ...prevFormData,
          [stepKey]: { values: values },
        }));
      }
    }
  };

  const generalInformationRef = useRef<FormikProps<IGeneralInformation>>(null);

  const formReferences: IFormAddLinixUseCaseRef = {
    generalInformation: generalInformationRef,
  };

  const handleNextStep = () => {
    setCurrentStep((step) => step + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleCompleteInvitation = () => {
    return;
  };

  const handleToggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <AddingLinixUseCaseUI
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      currentStep={currentStep}
      handleToggleModal={handleToggleModal}
      handleCompleteInvitation={handleCompleteInvitation}
      showModal={showModal}
      formData={formData}
      handleUpdateFormData={handleUpdateFormData}
      csOptions={csOptions}
      webOptions={webOptions}
      formReferences={formReferences}
    />
  );
}

export { AddingLinixUseCase };
