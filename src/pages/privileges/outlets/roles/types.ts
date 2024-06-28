import { FormikProps } from "formik";

import { IAncillaryAccountsForm } from "./components/AncillaryAccountsForm";
import { IGeneralInformationForm } from "./components/GeneralInformationForm";

interface ICasosDeUsoPorRol {
  k_Rol: number;
  k_Usecase: string;
}
interface ICuentasAuxiliaresPorRol {
  i_Tipent: string;
  k_Codcta: string;
  k_Rol: number | string;
}

interface IReglasDeNegocioPorRol {
  k_Regla: string;
  k_Rol: number;
}

interface ITareasCrediboardPorRol {
  k_Rol: number;
  tarea: string;
}

interface ITiposDeMovimientoContablePorRol {
  k_Rol: number;
  k_Tipmov: string;
  n_Tipmov: string;
  i_Privi: boolean;
}

export interface IRol {
  i_Activo: "Y" | "N";
  k_Rol: string;
  k_Tipcon: string;
  n_Rol: string;
  n_Uso: string;
  k_Aplica: string;
  casosDeUsoPorRol?: ICasosDeUsoPorRol[];
  cuentasAuxiliaresPorRol?: ICuentasAuxiliaresPorRol[];
  reglasDeNegocioPorRol?: IReglasDeNegocioPorRol[];
  tareasCrediboardPorRol?: ITareasCrediboardPorRol[];
  tiposDeMovimientoContablePorRol?: ITiposDeMovimientoContablePorRol[];
}

export interface IFormAddRoleRef {
  generalInformation: React.RefObject<FormikProps<IGeneralInformationForm>>;
  ancillaryAccounts: React.RefObject<FormikProps<IAncillaryAccountsForm>>;
}

export interface IStep {
  id: number;
  label: string;
  description: string;
}

interface IGeneralInformation {
  isValid: boolean;
  values: IGeneralInformationForm;
}

interface IAncillaryAccounts {
  isValid: boolean;
  values: IAncillaryAccountsForm;
}

export interface IInitialiceFormRole {
  id: string;
  value: string;
  isActive: boolean;
}

export interface IOptionInitialiceForm {
  isValid?: boolean;
  values: IInitialiceFormRole[];
}

export interface IFormAddRole {
  generalInformation: IGeneralInformation;
  ancillaryAccounts: IAncillaryAccounts;
  transactionTypes: IOptionInitialiceForm;
  businessRules: IOptionInitialiceForm;
  crediboardTasks: IOptionInitialiceForm;
  useCases: IOptionInitialiceForm;
}
