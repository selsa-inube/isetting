import { formSelectOptionId } from "@src/pages/privileges/outlets/linixUseCase/config/dataUseCases.config";
import { UseCase } from "@src/pages/privileges/outlets/linixUseCase/types";

const mapLinixUseCaseApiToEntity = (
  linixUseCase: Record<string, string | number | object>
): UseCase => {
  const buildLinixUseCase: UseCase = {
    id: String(linixUseCase.k_Usecase),
    k_Usecase: String(linixUseCase.k_Usecase),
    n_Usecase: String(linixUseCase.n_Usecase),
    n_Descrip: String(linixUseCase.n_Descrip),
    a_Publicc: String(linixUseCase.a_Publicc),
    i_Tipusec: formSelectOptionId(String(linixUseCase?.i_Tipusec)) || "",
    k_Ncampo: String(linixUseCase.k_Ncampo),
    k_Nforma: String(linixUseCase.k_Nforma),
  };
  return buildLinixUseCase;
};

const mapLinixUseCaseApiToEntities = (
  users: Record<string, string | number | object>[]
): UseCase[] => {
  return users.map(mapLinixUseCaseApiToEntity);
};
export { mapLinixUseCaseApiToEntities, mapLinixUseCaseApiToEntity };
