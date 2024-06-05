import { IAssignmentFormEntry } from "@pages/privileges/outlets/users/types/forms.types";

export interface IGeneralInformationUsersForm {
  k_Usuari: string;
  n_Usuari: string;
  k_Grupo: string;
  n_Grupo?: string;
  a_Numnit?: string;
  i_Activo: string;
}

export interface IFormAddUsers {
  generalInformation: {
    isValid: boolean;
    values: IGeneralInformationUsersForm;
  };
  branches: {
    isValid: boolean;
    values: IAssignmentFormEntry[];
  };
  projects: {
    isValid: boolean;
    values: IAssignmentFormEntry[];
  };
  events: {
    isValid: boolean;
    values: IAssignmentFormEntry[];
  };
  aidBudgetUnits: {
    isValid: boolean;
    values: IAssignmentFormEntry[];
  };
  payrolls: {
    isValid: boolean;
    values: IAssignmentFormEntry[];
  };
}

export interface IFormsUsers {
  generalInformation: { entries?: IGeneralInformationUsersForm };
  branches: { entries: IAssignmentFormEntry[] };
  projects: { entries: IAssignmentFormEntry[] };
  events: { entries: IAssignmentFormEntry[] };
  aidBudgetUnits: { entries: IAssignmentFormEntry[] };
  payrolls: { entries: IAssignmentFormEntry[] };
}
