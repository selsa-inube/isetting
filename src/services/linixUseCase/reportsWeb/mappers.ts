const mapwebReportsFormatsApiToEntity = (
  webReportsFormat: Record<string, string | number | object>
): Record<string, unknown> => {
  const buildwebReportsFormat: Record<string, unknown> = {
    k_Report: String(webReportsFormat.k_Report),
    n_Report: String(webReportsFormat.n_Report),
    isActive: Boolean(webReportsFormat.i_Privi),
  };
  return buildwebReportsFormat;
};

const mapWebReportsFormatsApiToEntities = (
  webReportsFormat: Record<string, string | number | object>[]
): Record<string, unknown>[] => {
  return webReportsFormat.map(mapwebReportsFormatsApiToEntity);
};
export { mapWebReportsFormatsApiToEntities, mapwebReportsFormatsApiToEntity };
