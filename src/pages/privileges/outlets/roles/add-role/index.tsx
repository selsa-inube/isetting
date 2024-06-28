import { useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";

import { dataToAssignmentFormEntry } from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case";

import { IFormAddRole, IFormAddRoleRef, IInitialiceFormRole } from "../types";
import { addRoleStepsRules } from "./utils";
import { stepsAddRol } from "./config/addRol.config";
import { IGeneralInformationForm } from "../components/GeneralInformationForm";
import { IAncillaryAccountsForm } from "../components/AncillaryAccountsForm";
import { AddRolUI } from "./interface";
import { initialValuesAddRol } from "./config/initialValues";
import { getRolFormats } from "@src/services/roles/ tipoDeMovimientoPorRol";
import { useAuth0 } from "@auth0/auth0-react";
import { getBusinessRulesByRoleFormats } from "@src/services/roles/businessRulesByRole";
import { getCreditboardTasksByRole } from "@src/services/roles/creditboardTasksByRole";
import { getUseCaseByRole } from "@src/services/roles/useCasesByRole";

const steps = Object.values(stepsAddRol);

export function AddRol() {
  const [currentStep, setCurrentStep] = useState<number>(
    stepsAddRol.generalInformation.id
  );

  const [isAddRoleFormValid, setIsAddRoleFormValid] = useState(false);

  const handleAddRoleFormValid = (isValid: boolean) => {
    setIsAddRoleFormValid(isValid);
  };
  const [loading, setLoading] = useState(false);
  const [transactionTypes, setTypesOfmovement] = useState<
    Record<string, unknown>[]
  >([]);
  const [businessRules, setBusinessRules] = useState<Record<string, unknown>[]>(
    []
  );

  const [crediboardTasks, setCrediboardTask] = useState<
    Record<string, unknown>[]
  >([]);

  const [useCases, setUseCases] = useState<Record<string, unknown>[]>([]);

  const { user } = useAuth0();

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
      typesOfMovements(),
      businessRulesFull(),
      crediboardsTasks(),
      rolesuseCases(),
    ]).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   Promise.all([
  //     typesOfMovements(),
  //     // getAll("linix-roles"),
  //     // getAll("web-options"),
  //     // getAll("linix-use-cases"),
  //   ]).then(([]) => {
  //     setLoading(true);
  //     // setDataAddRoleLinixForm((prevFormData: IFormAddRole) => ({
  //     //   ...prevFormData,
  //     //   // transactionTypes: {
  //     //   //   values: dataToAssignmentFormEntry({
  //     //   //     dataOptions: documentsFetch as Record<string, unknown>[],
  //     //   //     idLabel: "CODIGO",
  //     //   //     valueLabel: "NOMBRE",
  //     //   //     isActiveLabel: "asignado",
  //     //   //   }),
  //     //   // },
  //     //   // businessRules: {
  //     //   //   values: dataToAssignmentFormEntry({
  //     //   //     dataOptions: linixRolesFetch as unknown as Record<
  //     //   //       string,
  //     //   //       unknown
  //     //   //     >[],
  //     //   //     idLabel: "k_Rol",
  //     //   //     valueLabel: "n_Rol",
  //     //   //     isActiveLabel: "asignado",
  //     //   //   }),
  //     //   // },
  //     //   // crediboardTasks: {
  //     //   //   values: dataToAssignmentFormEntry({
  //     //   //     dataOptions: webOptionsFetch as Record<string, unknown>[],
  //     //   //     idLabel: "K_opcion",
  //     //   //     valueLabel: "Nombre_opcion",
  //     //   //     isActiveLabel: "asignado",
  //     //   //   }),
  //     //   // },
  //     //   // useCases: {
  //     //   //   values: dataToAssignmentFormEntry({
  //     //   //     dataOptions: linixUseCasesFetch as Record<string, unknown>[],
  //     //   //     idLabel: "k_Usecase",
  //     //   //     valueLabel: "n_Usecase",
  //     //   //     isActiveLabel: "id",
  //     //   //   }),
  //     //   // },
  //     // }));
  //     setLoading(false);
  //   });
  // }, []);

  // const webOptionsData = () => {
  //   if (!user) return;
  //   if (webOptions.length === 0) {
  //     setLoading(true);
  //     getWebOptionsFormats("1")
  //       .then((data) => {
  //         if (data !== null) {
  //           setWebOptions(data as Record<string, unknown>[]);
  //           setFormData((prevFormData: IFormAddLinixUseCase) => ({
  //             ...prevFormData,
  //             webOptions: {
  //               isValid: true,
  //               values: dataToAssignmentFormEntry({
  //                 dataOptions: data as Record<string, unknown>[],
  //                 idLabel: "k_Funcio",
  //                 valueLabel: "n_Funcio",
  //                 isActiveLabel: "isActive",
  //               }),
  //             },
  //           }));
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching web options:", error.message);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // };
  const typesOfMovements = () => {
    if (!user) return;
    if (transactionTypes.length === 0) {
      getRolFormats("1")
        .then((data) => {
          if (data !== null) {
            setTypesOfmovement(data as Record<string, unknown>[]);
            setDataAddRoleLinixForm((prevFormData: IFormAddRole) => ({
              ...prevFormData,
              transactionTypes: {
                isValid: true,
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
          console.error("Error fetching web options:", error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const businessRulesFull = () => {
    if (!user) return;
    if (businessRules.length === 0) {
      getBusinessRulesByRoleFormats("1")
        .then((data) => {
          if (data !== null) {
            setBusinessRules(data as Record<string, unknown>[]);
            setDataAddRoleLinixForm((prevFormData: IFormAddRole) => ({
              ...prevFormData,
              businessRules: {
                isValid: true,
                values: dataToAssignmentFormEntry({
                  dataOptions: data as Record<string, unknown>[],
                  idLabel: "k_Regla",
                  valueLabel: "n_Regla",
                  isActiveLabel: "asignado",
                }),
              },
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching web options:", error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const crediboardsTasks = () => {
    if (!user) return;
    if (crediboardTasks.length === 0) {
      getCreditboardTasksByRole("1")
        .then((data) => {
          if (data !== null) {
            setCrediboardTask(data as Record<string, unknown>[]);
            setDataAddRoleLinixForm((prevFormData: IFormAddRole) => ({
              ...prevFormData,
              crediboardTasks: {
                isValid: true,
                values: dataToAssignmentFormEntry({
                  dataOptions: data as Record<string, unknown>[],
                  idLabel: "id",
                  valueLabel: "value",
                  isActiveLabel: "isActive",
                }),
              },
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching web options:", error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const rolesuseCases = () => {
    if (!user) return;
    if (useCases.length === 0) {
      getUseCaseByRole("1")
        .then((data) => {
          if (data !== null) {
            setUseCases(data as Record<string, unknown>[]);
            setDataAddRoleLinixForm((prevFormData: IFormAddRole) => ({
              ...prevFormData,
              useCases: {
                isValid: true,
                values: dataToAssignmentFormEntry({
                  dataOptions: data as Record<string, unknown>[],
                  idLabel: "k_Usecase",
                  valueLabel: "n_Usecase",
                  isActiveLabel: "i_Privi",
                }),
              },
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching web options:", error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
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
      loading={loading}
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
