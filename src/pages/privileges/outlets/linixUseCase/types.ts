import { IAssignmentFormEntry } from "../users/types/forms.types";

interface OpcionesCsPorCasoDeUso {
  k_Opcion: string;
}

interface OpcionesPortalWebPorCasoDeUso {
  k_Funcio: string;
}

interface ReportesCsPorCasoDeUso {
  k_Nforma: string;
}

interface ReportesWebPorCasoDeUso {
  k_Report: string;
}

interface TiposDeDocumentoPorCasoDeUso {
  k_Docume: string;
}

export interface IInitialiceFormLinixUseCase {
  id: string;
  value: string;
  isActive: boolean;
}

interface UseCase {
  id: string;
  k_Usecase: string;
  n_Usecase: string;
  n_Descrip: string;
  a_Publicc: string;
  i_Tipusec: string;
  k_Ncampo: string;
  k_Nforma: string;
  k_Opcion?: string;
  opcionesCsPorCasoDeUso?: OpcionesCsPorCasoDeUso[];
  opcionesPortalWebPorCasoDeUso?: OpcionesPortalWebPorCasoDeUso[];
  reportesCsPorCasoDeUso?: ReportesCsPorCasoDeUso[];
  reportesWebPorCasoDeUso?: IAssignmentFormEntry[];
  tiposDeDocumentoPorCasoDeUso?: TiposDeDocumentoPorCasoDeUso[];
}

export type {
  UseCase,
  OpcionesCsPorCasoDeUso,
  OpcionesPortalWebPorCasoDeUso,
  ReportesCsPorCasoDeUso,
  ReportesWebPorCasoDeUso,
  TiposDeDocumentoPorCasoDeUso,
};

export interface IActions {
  k_action: number;
  n_action: string;
  i_active: "Y" | "N";
}
