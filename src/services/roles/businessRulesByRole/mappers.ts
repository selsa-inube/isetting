const mapBusinessRulesByRoleFormatsApiToEntity = (
  reportsClientServerFormat: Record<string, string | number | object>
): Record<string, unknown> => {
  const buildreportsClientServerFormat: Record<string, unknown> = {
    k_Rol: String(reportsClientServerFormat.k_Rol),
    k_Regla: String(reportsClientServerFormat.k_Regla),
    n_Regla: String(reportsClientServerFormat.n_Regla),
    asignado: Boolean(reportsClientServerFormat.i_Privi),
  };
  return buildreportsClientServerFormat;
};

const mapBusinessRulesByRoleFormatsApiToEntities = (
  reportsClientServerFormat: Record<string, string | number | object>[]
): Record<string, unknown>[] => {
  return reportsClientServerFormat.map(
    mapBusinessRulesByRoleFormatsApiToEntity
  );
};
export {
  mapBusinessRulesByRoleFormatsApiToEntities,
  mapBusinessRulesByRoleFormatsApiToEntity,
};
