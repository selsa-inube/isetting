import {
  Stack,
  Tabs,
  useMediaQueries,
  inube,
  Breadcrumbs,
} from "@inube/design-system";

import { DecisionModal } from "@components/feedback/DecisionModal";
import { InitializerForm } from "@pages/privileges/outlets/forms/InitializerForm";
import { PageTitle } from "@components/PageTitle";
import { IAssignmentFormEntry } from "@pages/privileges/outlets/users/types/forms.types";
import { StyledContainer } from "./styles";
import {
  editPositionConfig,
  editPositionTabsConfig,
} from "./config/editPosition.config";
import { IControlModal } from "./types";
import {
  GeneralInformationForm,
  IGeneralInformationEntry,
} from "../components/GeneralInformationForm";

interface EditPositionUIProps {
  selectedTab: string;
  editData: { [key: string]: { [key: string]: unknown } };
  controlModal: IControlModal;
  id: string;
  handleTabChange: (tabId: string) => void;
  handleSubmit: (values: IAssignmentFormEntry[]) => void;
  handleCloseModal: () => void;
  handleDataChange: (hasChanges: boolean) => void;
  handleContinueTab: () => void;
}

export function EditPositionUI(props: EditPositionUIProps) {
  const {
    selectedTab,
    controlModal,
    editData,
    id,
    handleTabChange,
    handleSubmit,
    handleCloseModal,
    handleDataChange,
    handleContinueTab,
  } = props;

  const { "(max-width: 580px)": smallScreen, "(max-width: 1073px)": typeTabs } =
    useMediaQueries(["(max-width: 580px)", "(max-width: 1073px)"]);

  const {
    generalInformation: { entries: currentGeneralInformation },
    roles: { entries: currentRoles },
  } = editData;

  return (
    <StyledContainer $smallScreen={smallScreen}>
      <Stack gap={inube.spacing.s600} direction="column">
        <Stack gap={inube.spacing.s200} direction="column">
          <Breadcrumbs crumbs={editPositionConfig[0].crumbs} />
          <Stack
            justifyContent="space-between"
            alignItems="center"
            gap={inube.spacing.s400}
          >
            <PageTitle
              title="Editar un cargo"
              navigatePage="/privileges/positions"
              description="Describir la nueva información de cargo"
            />
          </Stack>
        </Stack>
        <Stack gap={inube.spacing.s400} direction="column">
          <Tabs
            tabs={Object.values(editPositionTabsConfig)}
            selectedTab={selectedTab}
            type={typeTabs ? "select" : "tabs"}
            onChange={handleTabChange}
          />
          {selectedTab === editPositionTabsConfig.generalInformation.id && (
            <GeneralInformationForm
              initialValues={
                currentGeneralInformation as IGeneralInformationEntry
              }
              handleSubmit={handleSubmit as () => void}
              withSubmitButtons
              onHasChanges={handleDataChange}
              id={id}
            />
          )}
          {selectedTab === editPositionTabsConfig.roles.id && (
            <InitializerForm
              withSubmitButtons
              onHasChanges={handleDataChange}
              dataOptionsForms={currentRoles as IAssignmentFormEntry[]}
              handleSubmit={handleSubmit}
              id={id}
              keyData={"k_Grupo"}
              nameDB={"linix-positions"}
              property={"rolesPorCargo"}
              propertyData={"k_Rol"}
            />
          )}
        </Stack>
      </Stack>

      {controlModal.show && (
        <DecisionModal
          loading={false}
          closeModal={handleCloseModal}
          handleClick={handleContinueTab}
          title="Continuar sin guardar"
          description="¿Seguro que desea salir? cualquier cambio no guardado se perderá"
          actionText="Continuar"
          appearance="error"
        />
      )}
    </StyledContainer>
  );
}
