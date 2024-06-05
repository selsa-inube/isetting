const IS_PRODUCTION = import.meta.env.PROD;
const AUTH_REDIRECT_URI = import.meta.env.VITE_AUTH_REDIRECT_URI;

const enviroment = {
  CLIENT_ID: import.meta.env.VITE_AUTH_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_AUTH_CLIENT_SECRET,
  REALM: import.meta.env.VITE_AUTH_REALM,
  PROVIDER: import.meta.env.VITE_AUTH_PROVIDER,
  REDIRECT_URI: IS_PRODUCTION ? window.location.origin : AUTH_REDIRECT_URI,
  ICLIENT_API_URL_QUERY: import.meta.env.VITE_ICLIENT_API_URL_QUERY,
  TEMP_BUSINESS_UNIT: "LINIX",
};

export { enviroment };
