import { stepsAddRol } from "./config/addRol.config";
import { initialValuesAddRol } from "./config/initialValues";
import { IFormAddRole, IFormAddRoleRef, IRol } from "../types";
import localforage from "localforage";

export const addRoleStepsRules = (
  currentStep: number,
  addLinixRole: IFormAddRole,
  formReferences: IFormAddRoleRef,
  isCurrentFormValid: boolean
) => {
  let newAddLinixRole = { ...addLinixRole };

  switch (currentStep) {
    case stepsAddRol.generalInformation.id: {
      const values = formReferences.generalInformation.current?.values;

      if (!values) return addLinixRole;

      newAddLinixRole.generalInformation = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(addLinixRole.generalInformation.values)
      ) {
        newAddLinixRole.generalInformation = {
          isValid: false,
          values: {
            ...initialValuesAddRol.generalInformation,
            roleName: values.roleName,
            description: values.description,
            application: values.application,
            applicationId: values.applicationId,
          },
        };
      }

      return newAddLinixRole;
    }
    case stepsAddRol.auxiliaryAccounts.id: {
      const values = formReferences.ancillaryAccounts.current?.values;

      if (!values) return addLinixRole;

      newAddLinixRole.ancillaryAccounts = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(addLinixRole.generalInformation.values)
      ) {
        newAddLinixRole.ancillaryAccounts = {
          isValid: false,
          values: {
            ...initialValuesAddRol.ancillaryAccounts,
            officialSector: values.officialSector,
            commercialSector: values.commercialSector,
            solidaritySector: values.solidaritySector,
          },
        };
      }

      return newAddLinixRole;
    }
  }

  const stepKey = Object.entries(stepsAddRol).find(
    ([, config]) => config.id === currentStep
  )?.[0];

  if (!stepKey) return addLinixRole;

  if (stepKey !== "generalInformation" && stepKey !== "ancillaryAccounts")
    return addLinixRole;

  const values = formReferences[stepKey]?.current?.values;

  return (newAddLinixRole = {
    ...newAddLinixRole,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

export const saveRole = async (addRoleFormValid: IFormAddRole) => {
  return new Promise<string>((resolve, reject) => {
    const {
      ancillaryAccounts: { values: ancillaryAccountsValues },
      crediboardTasks: { values: crediboardTasksValues },
      transactionTypes: { values: transactionTypesValues },
      useCases: { values: useCasesValues },
    } = addRoleFormValid;

    const normalizeAncillaryAccounts = [
      {
        k_Rol: addRoleFormValid.generalInformation.values.roleName,
        i_Tipent: ancillaryAccountsValues.commercialSector,
        k_Codcta: ancillaryAccountsValues.commercialSector,
      },
      {
        k_Rol: addRoleFormValid.generalInformation.values.roleName,
        i_Tipent: ancillaryAccountsValues.officialSector,
        k_Codcta: ancillaryAccountsValues.officialSector,
      },
      {
        k_Rol: addRoleFormValid.generalInformation.values.roleName,
        i_Tipent: ancillaryAccountsValues.solidaritySector,
        k_Codcta: ancillaryAccountsValues.solidaritySector,
      },
    ];

    const normalizeCrediboardTasks = crediboardTasksValues
      .filter((crediboardTasksValue) => crediboardTasksValue.isActive === true)
      .map((mapNewCrediboardTask) => ({
        k_Rol: +addRoleFormValid.generalInformation.values.roleName,
        tarea: mapNewCrediboardTask.value,
      }));

    const normalizeTransactionTypes = transactionTypesValues
      .filter(
        (transactionTypesValue) => transactionTypesValue.isActive === true
      )
      .map((mapNewTransactionType) => ({
        k_Rol: +addRoleFormValid.generalInformation.values.roleName,
        k_Tipmov: mapNewTransactionType.id,
        n_Tipmov: mapNewTransactionType.value,
        i_Privi: true,
      }));

    const normalizeUseCases = useCasesValues
      .filter((useCasesValue) => useCasesValue.isActive === true)
      .map((mapNewUseCases) => ({
        k_Rol: +addRoleFormValid.generalInformation.values.roleName,
        k_Usecase: mapNewUseCases.value,
      }));

    const newRole: IRol = {
      i_Activo: "Y",
      k_Rol: addRoleFormValid.generalInformation.values.roleName,
      k_Tipcon: addRoleFormValid.generalInformation.values.applicationId,
      n_Rol: addRoleFormValid.generalInformation.values.roleName,
      n_Uso: addRoleFormValid.generalInformation.values.application,
      k_Aplica: addRoleFormValid.generalInformation.values.applicationId,
      cuentasAuxiliaresPorRol: normalizeAncillaryAccounts,
      tiposDeMovimientoContablePorRol: normalizeTransactionTypes,
      tareasCrediboardPorRol: normalizeCrediboardTasks,
      casosDeUsoPorRol: normalizeUseCases,
    };

    localforage
      .getItem("linix-roles")
      .then((data) => {
        const rolesArray = data ? (data as IRol[]) : [];
        rolesArray.push(newRole);
        return localforage.setItem("linix-roles", rolesArray);
      })
      .then(() => resolve(newRole.k_Rol))
      .catch((error) => reject(error));
  });
};
