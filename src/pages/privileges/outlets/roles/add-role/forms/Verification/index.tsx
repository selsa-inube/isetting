import { useMediaQuery } from "@inube/design-system";

import {
  IFormAddRole,
  IInitialiceFormRole,
} from "@pages/privileges/outlets/roles/types";
import { VerificationAddRoleUI } from "./interface";

export interface IControllerAccordionProps {
  steps: IFormAddRole;
  setCurrentStep: (step: number) => void;
}

interface IAttributes {
  attribute: string;
  value: string;
}

interface IOptionsSections {
  title: string;
  attributes: IAttributes[];
}

interface ISections {
  [key: string]: IOptionsSections;
}

export interface IDataVerificationStep {
  sections: ISections;
}

function createAttribute(
  attributeName: string,
  attributeValue: string
): IAttributes {
  return { attribute: attributeName, value: attributeValue };
}

function filterAndMapData(
  data: IInitialiceFormRole[] | [],
  isActiveKey: string
): IAttributes[] {
  return data
    .filter(
      (item: IInitialiceFormRole) =>
        item[isActiveKey as string as keyof IInitialiceFormRole] === true
    )
    .map((item: IInitialiceFormRole) =>
      createAttribute(item.value, item.value)
    );
}

export const VerificationAddRole = (props: IControllerAccordionProps) => {
  const { steps, setCurrentStep } = props;

  const isMobile = useMediaQuery("(max-width: 740px)");

  const dataVerificationStep: IDataVerificationStep[] = [steps].map((data) => ({
    sections: {
      generalInformation: {
        title: "Información general",
        attributes: [
          createAttribute(
            "Nombre del rol",
            data.generalInformation.values.roleName
          ),
          createAttribute(
            "Descripción",
            data.generalInformation.values.description
          ),
          createAttribute(
            "Aplicación",
            data.generalInformation.values.aplication
          ),
        ],
      },
      ancillaryAccounts: {
        title: "Cuentas auxiliares",
        attributes: [
          createAttribute(
            "Sector oficial",
            data.ancillaryAccounts.values.officialSector
          ),
          createAttribute(
            "Sector comercial",
            data.ancillaryAccounts.values.commercialSector
          ),
          createAttribute(
            "Sector solidario",
            data.ancillaryAccounts.values.solidaritySector
          ),
        ],
      },
      transactionTypes: {
        title: "Tipos de transacción",
        attributes: filterAndMapData(
          data.transactionTypes?.values || [],
          "isActive"
        ),
      },
      businessRules: {
        title: "Reglas de negocio",
        attributes: filterAndMapData(
          data.businessRules?.values || [],
          "isActive"
        ),
      },
      crediboardTasks: {
        title: "Tareas de crediboard",
        attributes: filterAndMapData(
          data.crediboardTasks?.values || [],
          "isActive"
        ),
      },
      useCases: {
        title: "Casos de uso",
        attributes: filterAndMapData(data.useCases?.values || [], "isActive"),
      },
    },
  }));

  const keySections = dataVerificationStep.flatMap((step) =>
    Object.keys(step.sections)
  );

  return (
    <VerificationAddRoleUI
      dataVerificationStep={dataVerificationStep}
      keySections={keySections}
      isMobile={isMobile}
      setCurrentStep={setCurrentStep}
    />
  );
};
