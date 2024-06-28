const mapCreditboardTasksByRoleFormatsApiToEntity = (
  reportsClientServerFormat: Record<string, string | number | object>
): Record<string, unknown> => {
  const buildreportsClientServerFormat: Record<string, unknown> = {
    k_Rol: String(reportsClientServerFormat.k_Rol),
    id: String(reportsClientServerFormat.id),
    value: String(reportsClientServerFormat.value),
    isActive: Boolean(reportsClientServerFormat.isActive),
  };
  return buildreportsClientServerFormat;
};

const mapCreditboardTasksByRoleFormatsApiToEntities = (
  reportsClientServerFormat: Record<string, string | number | object>[]
): Record<string, unknown>[] => {
  return reportsClientServerFormat.map(
    mapCreditboardTasksByRoleFormatsApiToEntity
  );
};
export {
  mapCreditboardTasksByRoleFormatsApiToEntities,
  mapCreditboardTasksByRoleFormatsApiToEntity,
};
