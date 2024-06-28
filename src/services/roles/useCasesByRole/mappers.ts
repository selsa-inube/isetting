const mapUseCasesByRoleByRoleFormatsApiToEntity = (
  reportsClientServerFormat: Record<string, string | number | object>
): Record<string, unknown> => {
  const buildreportsClientServerFormat: Record<string, unknown> = {
    k_Rol: String(reportsClientServerFormat.k_Rol),
    k_Usecase: String(reportsClientServerFormat.k_Usecase),
    n_Usecase: String(reportsClientServerFormat.n_Usecase),
    i_Privi: Boolean(reportsClientServerFormat.i_Privi),
  };
  return buildreportsClientServerFormat;
};

const mapUseCasesByRoleByRoleFormatsApiToEntities = (
  reportsClientServerFormat: Record<string, string | number | object>[]
): Record<string, unknown>[] => {
  return reportsClientServerFormat.map(
    mapUseCasesByRoleByRoleFormatsApiToEntity
  );
};
export {
  mapUseCasesByRoleByRoleFormatsApiToEntities,
  mapUseCasesByRoleByRoleFormatsApiToEntity,
};
