import { UseCase } from "@src/pages/privileges/outlets/linixUseCase/types";

const mapLinixUseCaseEntityToApi = (
  linixUseCase: UseCase
): Record<string, string | number | object> => {
  return {
    i_Tipusec: String(linixUseCase.i_Tipusec),
    k_Ncampo: String(linixUseCase.k_Ncampo),
    k_Nforma: String(linixUseCase.k_Nforma),
    k_Usecase: "4",
    n_Descrip: String(linixUseCase.n_Descrip),
    n_Usecase: String(linixUseCase.n_Usecase),
    a_Publicc: "4",
    opcionesCsPorCasoDeUso: Object(linixUseCase.opcionesCsPorCasoDeUso),
    opcionesPortalWebPorCasoDeUso: Object(
      linixUseCase.opcionesPortalWebPorCasoDeUso
    ),
    reportesCsPorCasoDeUso: Object(linixUseCase.reportesCsPorCasoDeUso),
    reportesWebPorCasoDeUso: Object(linixUseCase.reportesWebPorCasoDeUso),
  };
};

export { mapLinixUseCaseEntityToApi };
