import { UseCase } from "@src/pages/privileges/outlets/linixUseCase/types";

const mapLinixUseCaseEntityToApi = (
  linixUseCase: UseCase
): Record<string, string | number | object> => {
  return {
    i_Tipusec: String(linixUseCase.i_Tipusec),
    k_Ncampo: String(linixUseCase.k_Ncampo), //CD387MCERTIDEP.I_CONTIT
    k_Nforma: String(linixUseCase.k_Nforma), //121
    k_Usecase: "401", //no echo la 7
    n_Descrip: String(linixUseCase.n_Descrip),
    n_Usecase: String(linixUseCase.n_Usecase),
    a_Publicc: "a",
    opcionesCsPorCasoDeUso: Object(linixUseCase.opcionesCsPorCasoDeUso), //ACFACMAESTRA_0
    opcionesPortalWebPorCasoDeUso: Object(
      linixUseCase.opcionesPortalWebPorCasoDeUso //[{ k_Funcio: "241" }]
    ),
    reportesCsPorCasoDeUso: Object(linixUseCase.reportesCsPorCasoDeUso), // {"k_Nforma": "3528"}
    reportesWebPorCasoDeUso: Object(linixUseCase.reportesWebPorCasoDeUso), // k_Report: "10006",
  };

  //10006
  // a_Publicc: String(linixUseCase.a_Publicc),
  // i_Tipusec: String(linixUseCase.i_Tipusec),
  // k_Ncampo: String(linixUseCase.k_Ncampo),
  // k_Nforma: String(linixUseCase.k_Nforma),
  // k_Usecase: String(linixUseCase.k_Usecase),
  // n_Descrip: String(linixUseCase.n_Descrip),
  // n_Usecase: String(linixUseCase.n_Usecase),
  // opcionesPortalWebPorCasoDeUso: Object(
  //   filterOptions(linixUseCase.opcionesPortalWebPorCasoDeUso)
  // ),
  // reportesWebPorCasoDeUso: Object(
  //   filterOptions(linixUseCase.reportesWebPorCasoDeUso)
  // ),
  // reportesCsPorCasoDeUso: Object(
  //   filterOptions(linixUseCase.reportesCsPorCasoDeUso)
  // ),
  // opcionesCsPorCasoDeUso: Object(
  //   filterOptions(linixUseCase.opcionesCsPorCasoDeUso)
  // ),
  // tiposDeDocumentoPorCasoDeUso: Object(
  //   filterOptions(linixUseCase.tiposDeDocumentoPorCasoDeUso)
  // ),
};

export { mapLinixUseCaseEntityToApi };
