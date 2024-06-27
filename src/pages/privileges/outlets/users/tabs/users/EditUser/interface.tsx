import { MdPersonOutline } from "react-icons/md";

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
import { LoadingApp } from "@pages/login/outlets/LoadingApp";
import { SubjectCard } from "@components/cards/SubjectCard";
import { IFormAddUsers } from "@services/users/users.types";

import { StyledContainer } from "./styles";
import { GeneralInformationForm } from "../GeneralInfoForm";
import { editLinixUserTabsConfig } from "./config/editUsersTabs.config";
import {
  editLinixUserSubjectCardLabels,
  editLinixUsersConfig,
} from "./config/editLinuxUsers.config";

interface IControlModal {
  show: boolean;
  continueTab: string;
}
interface EditUserUIProps {
  positionsOptions: Record<string, unknown>[];
  selectedTab: string;
  loading: boolean;
  formData: IFormAddUsers;
  id: string;
  handleTabChange: (tabId: string) => void;
  handleSubmit: (values: IAssignmentFormEntry[]) => void;
  controlModal: IControlModal;
  handleCloseModal: () => void;
  handleDataChange: (hasChanges: boolean) => void;
  handleContinueTab: () => void;
}

function continueModal(
  handleCloseModal: () => void,
  handleContinueTab: () => void
) {
  return (
    <DecisionModal
      loading={false}
      closeModal={handleCloseModal}
      handleClick={handleContinueTab}
      title="Continuar sin guardar"
      description="¿Seguro que desea salir? cualquier cambio no guardado se perderá"
      actionText="Continuar"
      appearance="error"
    />
  );
}

function EditUserUI(props: EditUserUIProps) {
  const {
    positionsOptions,
    selectedTab,
    loading,
    id,
    handleTabChange,
    handleSubmit,
    controlModal,
    handleCloseModal,
    handleDataChange,
    handleContinueTab,
    formData,
  } = props;

  const { "(max-width: 580px)": smallScreen, "(max-width: 1073px)": typeTabs } =
    useMediaQueries(["(max-width: 580px)", "(max-width: 1073px)"]);
  const {
    generalInformation: { values: currentInformation },
  } = formData;

  const userCardData = currentInformation && {
    username: (currentInformation as { n_Usuari: string }).n_Usuari,
    code: (currentInformation as { a_Numnit: string }).a_Numnit,
  };

  return loading ? (
    <LoadingApp />
  ) : (
    <StyledContainer smallScreen={smallScreen}>
      <Stack gap={inube.spacing.s600} direction="column">
        <Stack gap={inube.spacing.s200} direction="column">
          <Breadcrumbs crumbs={editLinixUsersConfig[0].crumbs} />
          <Stack
            justifyContent="space-between"
            alignItems="center"
            gap={inube.spacing.s400}
          >
            <PageTitle
              title="Edicion de usuario"
              navigatePage="/privileges/users"
              description="describir la nueva informacion de caso de uso"
            />

            {currentInformation && userCardData && (
              <SubjectCard
                subjectData={userCardData}
                title="Informacion del Usuario"
                icon={<MdPersonOutline size={24} />}
                labels={editLinixUserSubjectCardLabels}
              />
            )}
          </Stack>
        </Stack>
        <Stack gap={inube.spacing.s400} direction="column">
          <Tabs
            tabs={Object.values(editLinixUserTabsConfig)}
            selectedTab={selectedTab}
            type={typeTabs ? "select" : "tabs"}
            onChange={handleTabChange}
          />
          {selectedTab === editLinixUserTabsConfig.generalInformation.id && (
            <GeneralInformationForm
              initialValues={currentInformation}
              handleSubmit={handleSubmit as () => void}
              withSubmitButtons
              positionsOptions={positionsOptions}
              onHasChanges={handleDataChange}
              id={id}
            />
          )}
          {selectedTab === editLinixUserTabsConfig.branches.id && (
            <InitializerForm
              withSubmitButtons
              onHasChanges={handleDataChange}
              dataOptionsForms={formData.branches.values}
              handleSubmit={handleSubmit}
              id={id}
              keyData={"k_Usuari"}
              nameDB={"linix-users"}
              property={"sucursales"}
              propertyData={"id"}
            />
          )}
          {selectedTab === editLinixUserTabsConfig.projects.id && (
            <InitializerForm
              withSubmitButtons
              onHasChanges={handleDataChange}
              dataOptionsForms={formData.projects.values}
              handleSubmit={handleSubmit}
              id={id}
              keyData={"k_Usuari"}
              nameDB={"linix-users"}
              property={"proyectos"}
              propertyData={"id"}
            />
          )}
          {selectedTab === editLinixUserTabsConfig.event.id && (
            <InitializerForm
              withSubmitButtons
              onHasChanges={handleDataChange}
              dataOptionsForms={formData.events.values}
              handleSubmit={handleSubmit}
              id={id}
              keyData={"k_Usuari"}
              nameDB={"linix-users"}
              property={"eventos"}
              propertyData={"id"}
            />
          )}
          {selectedTab === editLinixUserTabsConfig.aidBudgetUnits.id && (
            <InitializerForm
              withSubmitButtons
              onHasChanges={handleDataChange}
              dataOptionsForms={formData.aidBudgetUnits.values}
              handleSubmit={handleSubmit}
              id={id}
              keyData={"k_Usuari"}
              nameDB={"linix-users"}
              property={"unidadesPresupuestales"}
              propertyData={"id"}
            />
          )}
          {selectedTab === editLinixUserTabsConfig.payrolls.id && (
            <InitializerForm
              withSubmitButtons
              onHasChanges={handleDataChange}
              dataOptionsForms={formData.payrolls.values}
              handleSubmit={handleSubmit}
              id={id}
              keyData={"k_Usuari"}
              nameDB={"linix-users"}
              property={"nomina"}
              propertyData={"id"}
            />
          )}
        </Stack>
      </Stack>

      {controlModal.show && continueModal(handleCloseModal, handleContinueTab)}
    </StyledContainer>
  );
}

export { EditUserUI };
