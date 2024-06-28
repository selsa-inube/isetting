import { enviroment } from "@src/config/environment";
import { mapBusinessRulesByRoleFormatsApiToEntities } from "./mappers";

const getBusinessRulesByRoleFormats = async (
  k_Rol: string
): Promise<Record<string, unknown>[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY_PROCESS}/roles/${k_Rol}`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      Realm: enviroment.REALM,
      "X-Action": "QueryReglasDeNegocioPorRolFull",
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

      const normalizedRolFormats = Array.isArray(data)
        ? mapBusinessRulesByRoleFormatsApiToEntities(data)
        : [];

      return normalizedRolFormats;
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

export { getBusinessRulesByRoleFormats };
