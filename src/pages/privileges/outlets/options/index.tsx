import { PrivilegesOptionsUI } from "./interface";
import { privilegeOptionsConfig } from "./config/privileges.config";
import { appsConfig } from "../../../home/config/apps.config";

function PrivilegesOptions() {
  return (
    <PrivilegesOptionsUI
      appName={appsConfig[0].label}
      appDescription={appsConfig[0].description}
      appOptions={privilegeOptionsConfig}
      appRoute={appsConfig[0].crumbs}
    />
  );
}

export { PrivilegesOptions };
