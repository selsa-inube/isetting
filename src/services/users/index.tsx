import { enviroment } from "@src/config/environment";

import { IGeneralInformationUsersForm } from "./users.types";
import { mapUserApiToEntities } from "./mappers";

const getUsers = async (): Promise<IGeneralInformationUsersForm[]> => {
  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/usuario-full`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(requestUrl, options);

    if (res.status === 204) {
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error al obtener los casos de uso: ${res.status}`);
    }

    const normalizedUser = Array.isArray(data)
      ? mapUserApiToEntities(data)
      : [];

    return normalizedUser;
  } catch (error) {
    console.error(error);
  }

  return [];
};

export { getUsers };
