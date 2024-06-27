const mapClientServerButtonDataFormatsApiToEntity = (
  clientServerButtonDataFormat: Record<string, string | number | object>
): Record<string, unknown> => {
  const buildClientServerButtonDataFormat: Record<string, unknown> = {
    OPCION_CLIENTE_SERVIDOR: String(clientServerButtonDataFormat.k_Nforma),
    CODIGO_BOTON: String(clientServerButtonDataFormat.n_Descri),
    DESCRIPCION_BOTON: String(clientServerButtonDataFormat.k_Ncampo),
  };
  return buildClientServerButtonDataFormat;
};

const mapClientServerButtonDataFormatsApiToEntities = (
  clientServerButtonDataFormat: Record<string, string | number | object>[]
): Record<string, unknown>[] => {
  return clientServerButtonDataFormat.map(
    mapClientServerButtonDataFormatsApiToEntity
  );
};
export {
  mapClientServerButtonDataFormatsApiToEntities,
  mapClientServerButtonDataFormatsApiToEntity,
};
