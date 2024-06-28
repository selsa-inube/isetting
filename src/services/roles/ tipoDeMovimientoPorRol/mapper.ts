const mapTipoDeMovimientoPorRolFormatsApiToEntity = (
  reportsClientServerFormat: Record<string, string | number | object>
): Record<string, unknown> => {
  const buildreportsClientServerFormat: Record<string, unknown> = {
    k_Rol: String(reportsClientServerFormat.k_Rol),
    CODIGO: String(reportsClientServerFormat.k_Tipmov),
    NOMBRE: String(reportsClientServerFormat.n_Tipmov),
    asignado: Boolean(reportsClientServerFormat.i_Privi),
  };
  return buildreportsClientServerFormat;
};

const mapTipoDeMovimientoPorRolFormatsApiToEntities = (
  reportsClientServerFormat: Record<string, string | number | object>[]
): Record<string, unknown>[] => {
  return reportsClientServerFormat.map(
    mapTipoDeMovimientoPorRolFormatsApiToEntity
  );
};
export {
  mapTipoDeMovimientoPorRolFormatsApiToEntities,
  mapTipoDeMovimientoPorRolFormatsApiToEntity,
};
