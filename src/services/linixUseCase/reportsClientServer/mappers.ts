const mapReportsClientServerFormatsApiToEntity = (
  reportsClientServerFormat: Record<string, string | number | object>
): Record<string, unknown> => {
  const buildreportsClientServerFormat: Record<string, unknown> = {
    k_Nforma: String(reportsClientServerFormat.k_Nforma),
    n_Descri: String(reportsClientServerFormat.n_Descri),
    isActive: Boolean(reportsClientServerFormat.i_Privi),
  };
  return buildreportsClientServerFormat;
};

const mapReportsClientServerFormatsApiToEntities = (
  reportsClientServerFormat: Record<string, string | number | object>[]
): Record<string, unknown>[] => {
  return reportsClientServerFormat.map(
    mapReportsClientServerFormatsApiToEntity
  );
};
export {
  mapReportsClientServerFormatsApiToEntities,
  mapReportsClientServerFormatsApiToEntity,
};
