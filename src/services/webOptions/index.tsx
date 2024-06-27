import { enviroment } from "@src/config/environment";
import { mapWebOptionsFormatsApiToEntities } from "./mappers";

const getWebOptionsFormats = async (
  k_Usecase: string
): Promise<Record<string, unknown>[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY_PROCESS}/casos-de-uso/${k_Usecase}`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      Realm: enviroment.REALM,
      "X-Action": "SearchOpcionesWebPorCasoDeUsoFull",
      "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

    const optionsWithSignal: RequestInit = {
      ...options,
      signal: controller.signal,
    };

    try {
      const res = await fetch(requestUrl, optionsWithSignal);

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      if (!res.ok) {
        throw new Error(`Error al obtener los casos de uso: ${res.status}`);
      }

      const data = await res.json();

      const normalizedWebOptionsFormats = Array.isArray(data)
        ? mapWebOptionsFormatsApiToEntities(data)
        : [];

      return normalizedWebOptionsFormats;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (attempt === maxRetries) {
        throw new Error(
          `Todos los intentos fallaron. No se pudieron obtener los créditos del usuario. Último error: ${error.message}`
        );
      }
    }
  }

  return [];
};

export { getWebOptionsFormats };
