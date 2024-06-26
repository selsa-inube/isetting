import { useState, useEffect, useRef } from "react";
import { FormikProps } from "formik";
import { useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { getAll } from "@mocks/utils/dataMock.service";
import {
  IAssignmentFormEntry,
  IMessageState,
} from "@pages/privileges/outlets/users/types/forms.types";
import { getDownloadableFormats } from "@src/services/linixUseCase/downloadableFormats";

import { stepsAddingLinixUseCase } from "./config/addingLinixUseCase.config";
import { AddingLinixUseCaseUI } from "./interface";
import {
  DataToAssignmentFormEntryProps,
  IGeneralInformation,
  IFormAddLinixUseCase,
  IHandleChangeFormData,
  IFormAddLinixUseCaseRef,
  IClientServerButton,
} from "./types";
import { addLinixUseCaseStepsRules, saveLinixUseCase } from "./utils";
import { generalMessage } from "./config/messages.config";
import { getWebOptionsFormats } from "@src/services/webOptions";

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

  const [selectOptions, setSelectOptions] = useState(false);
  const steps = Object.values(stepsAddingLinixUseCase);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
      isValid: false,
      values: [],
    },
    webReports: {
      isValid: false,
      values: [],
    },
    webOptions: {
      isValid: false,
      values: [],
    },
    clientServerReports: {
      isValid: false,
      values: [],
    },
    clientServerOptions: {
      isValid: false,
      values: [],
    },
  });

  const [csOptions, setCsOptions] = useState<Record<string, unknown>[]>([]);
  const [webOptions, setWebOptions] = useState<Record<string, unknown>[]>([]);
  const [downloadableDocuments, setDownloadableDocuments] = useState<
    Record<string, unknown>[]
  >([]);
  const { user } = useAuth0();

  useEffect(() => {
    setSelectOptions(webOptions.length === 0 && csOptions.length === 0);
  }, [webOptions, csOptions]);

  useEffect(() => {
    Promise.all([
      getAll("clients-server"),
      getAll("clients-server"),
      getAll("web-options"),
      webOptionsData(),
      usersData(),
    ]).then(([clientServerOptions, clientServerReports, webOptions]) => {
      setLoading(true);
      setCsOptions(clientServerOptions as Record<string, unknown>[]);
      setFormData((prevFormData: IFormAddLinixUseCase) => ({
        ...prevFormData,
        clientServerOptions: {
          isValid: true,
          values: dataToAssignmentFormEntry({
            dataOptions: clientServerOptions as unknown as Record<
              string,
              unknown
            >[],
            idLabel: "CODIGO_OPCION",
            valueLabel: "DESCRIPCION",
            isActiveLabel: "asignado",
          }),
        },
        clientServerReports: {
          isValid: true,
          values: dataToAssignmentFormEntry({
            dataOptions: clientServerReports as unknown as Record<
              string,
              unknown
            >[],
            idLabel: "CODIGO_OPCION",
            valueLabel: "DESCRIPCION",
            isActiveLabel: "asignado",
          }),
        },
        webReports: {
          isValid: true,
          values: dataToAssignmentFormEntry({
            dataOptions: webOptions as unknown as Record<string, unknown>[],
            idLabel: "K_opcion",
            valueLabel: "Nombre_opcion",
            isActiveLabel: "asignado",
          }),
        },
      }));
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usersData = () => {
    if (!user) return;
    if (downloadableDocuments.length === 0) {
      setLoading(true);
      getDownloadableFormats("1")
        .then((data) => {
          if (data !== null) {
            setDownloadableDocuments(
              data as unknown as Record<string, unknown>[]
            );
            setFormData((prevFormData: IFormAddLinixUseCase) => ({
              ...prevFormData,
              downloadableDocuments: {
                isValid: true,
                values: dataToAssignmentFormEntry({
                  dataOptions: data as unknown as Record<string, unknown>[],
                  idLabel: "id",
                  valueLabel: "value",
                  isActiveLabel: "isActive",
                }),
              },
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching:", error.message);
        });
    }
  };

  const webOptionsData = () => {
    if (!user) return;
    if (webOptions.length === 0) {
      getWebOptionsFormats("1")
        .then((data) => {
          if (data !== null) {
            setWebOptions(data as Record<string, unknown>[]);
            setFormData((prevFormData: IFormAddLinixUseCase) => ({
              ...prevFormData,
              webOptions: {
                isValid: true,
                values: dataToAssignmentFormEntry({
                  dataOptions: data as Record<string, unknown>[],
                  idLabel: "k_Funcio",
                  valueLabel: "n_Funcio",
                  isActiveLabel: "isActive",
                }),
              },
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching web options:", error.message);
        });
    }
  };

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
  const clientServerButtonRef = useRef<FormikProps<IClientServerButton>>(null);
  const downloadableDocumentsRef =
    useRef<FormikProps<IAssignmentFormEntry>>(null);
  const webReportsRef = useRef<FormikProps<IAssignmentFormEntry>>(null);
  const webOptionsRef = useRef<FormikProps<IAssignmentFormEntry>>(null);
  const clientServerReportsRef =
    useRef<FormikProps<IAssignmentFormEntry>>(null);
  const clientServerOptionsRef =
    useRef<FormikProps<IAssignmentFormEntry>>(null);

  const formReferences: IFormAddLinixUseCaseRef = {
    generalInformation: generalInformationRef,
    clientServerButton: clientServerButtonRef,
    downloadableDocuments: downloadableDocumentsRef,
    webReports: webReportsRef,
    webOptions: webOptionsRef,
    clientServerReports: clientServerReportsRef,
    clientServerOptions: clientServerOptionsRef,
  };
  const handleStepChange = (stepId: number) => {
    const newAddLinixUseCase = addLinixUseCaseStepsRules(
      currentStep,
      formData,
      formReferences,
      isCurrentFormValid
    );
    setFormData(newAddLinixUseCase);

    const changeStepKey = Object.entries(stepsAddingLinixUseCase).find(
      ([, config]) => config.id === stepId
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;

    setIsCurrentFormValid(
      changeIsVerification ||
        newAddLinixUseCase[changeStepKey as keyof IFormAddLinixUseCase]
          ?.isValid ||
        false
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };
  const handleNextStep = (step?: number) => {
    if (isCurrentFormValid) {
      const nextStep = typeof step === "number" ? step : currentStep + 1;
      setCurrentStep(nextStep);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
    setLoading(true);
  };
  const [message, setMessage] = useState<IMessageState>({
    visible: false,
  });
  const navigate = useNavigate();
  const handleFinishForm = () => {
    saveLinixUseCase(formData);
    handleToggleModal();
    setMessage({
      visible: true,
      data: generalMessage.success,
    });
  };

  const handleCloseSectionMessage = () => {
    setMessage({
      visible: false,
    });
    navigate("/privileges/linixUseCase");
  };

  return (
    <AddingLinixUseCaseUI
      loading={loading}
      onCloseSectionMessage={handleCloseSectionMessage}
      message={message}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      currentStep={currentStep}
      handleToggleModal={handleToggleModal}
      showModal={showModal}
      handleUpdateFormData={handleUpdateFormData}
      csOptions={csOptions}
      webOptions={webOptions}
      formReferences={formReferences}
      isCurrentFormValid={isCurrentFormValid}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
      formData={formData}
      selectOptions={selectOptions}
      handleFinishForm={handleFinishForm}
      setCurrentStep={setCurrentStep}
    />
  );
}

export { AddingLinixUseCase };
