const mapClientServerMenuOptionFormatsApiToEntity = (
  clientServerMenuOptionFormat: Record<string, string | number | object>
): Record<string, unknown> => {
  const buildClientServerMenuOptionFormat: Record<string, unknown> = {
    k_Opcion: String(clientServerMenuOptionFormat.k_Opcion),
    DESCRIPCION: String(clientServerMenuOptionFormat.n_Opcion),
    CODIGO_OPCION: String(clientServerMenuOptionFormat.k_Nforma),
    isActive: Boolean(clientServerMenuOptionFormat.i_Privi),
  };
  return buildClientServerMenuOptionFormat;
};

const mapClientServerMenuOptionFormatsApiToEntities = (
  clientServerMenuOptionFormat: Record<string, string | number | object>[]
): Record<string, unknown>[] => {
  return clientServerMenuOptionFormat.map(
    mapClientServerMenuOptionFormatsApiToEntity
  );
};
export {
  mapClientServerMenuOptionFormatsApiToEntities,
  mapClientServerMenuOptionFormatsApiToEntity,
};
