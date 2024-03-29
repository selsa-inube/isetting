import { MdPersonOutline } from "react-icons/md";
import {
  Breadcrumbs,
  Stack,
  Tabs,
  useMediaQueries,
} from "@inube/design-system";

import { DecisionModal } from "@components/feedback/DecisionModal";
import { editUserContinueModalConfig } from "./config/editUser.config";
import { GeneralInformationForm } from "@pages/privileges/outlets/forms/GeneralInfoForm";
import { InitializerForm } from "@pages/privileges/outlets/forms/InitializerForm";
import { PageTitle } from "@components/PageTitle";
import { SubjectCard } from "@components/cards/SubjectCard";
import { ItemNotFound } from "@components/layout/ItemNotFound";

import { userNotFoundConfig } from "./config/itemNotFound.config";
import { editUserTabsConfig } from "./config/editUserTabs.config";

import {
  IFormsInvitation,
  IAssignmentFormEntry,
  IGeneralInformationEntry,
} from "../types/forms.types";

import {
  editUserOptionsConfig,
  editUserSubjectCardLabels,
} from "./config/editUser.config";
import { StyledContainer, StyledTabsContainer } from "./styles";

interface EditUserUIProps {
  selectedTab: string;
  handleTabChange: (tabId: string) => void;
  editData: IFormsInvitation;
  handleSubmit: (
    values: IGeneralInformationEntry | IAssignmentFormEntry[]
  ) => void;
  controlModal: {
    show: boolean;
    continueTab: string;
  };
  handleCloseModal: () => void;
  handleDataChange: (hasChanges: boolean) => void;
  handleContinueTab: () => void;
}

function continueModal(
  handleCloseModal: () => void,
  handleContinueTab: () => void
) {
  const { title, description, actionText, appearance } =
    editUserContinueModalConfig;
  return (
    <DecisionModal
      title={title}
      description={description}
      actionText={actionText}
      loading={false}
      appearance={appearance}
      closeModal={handleCloseModal}
      handleClick={handleContinueTab}
    />
  );
}

function EditUserUI(props: EditUserUIProps) {
  const {
    selectedTab,
    handleTabChange,
    editData,
    handleSubmit,
    controlModal,
    handleCloseModal,
    handleDataChange,
    handleContinueTab,
  } = props;

  const { "(max-width: 580px)": smallScreen, "(max-width: 1073px)": typeTabs } =
    useMediaQueries(["(max-width: 580px)", "(max-width: 1073px)"]);

  const {
    generalInformation: { entries: currentInformation },
  } = editData;

  const userCardData = currentInformation && {
    username: currentInformation.username,
    userID: currentInformation.userID,
    code: currentInformation.code || "",
    position: currentInformation.position || "",
  };

  return (
    <StyledContainer smallScreen={smallScreen}>
      <Stack gap="48px" direction="column">
        <Stack gap="32px" direction="column">
          <Breadcrumbs crumbs={editUserOptionsConfig.editUserPage.crumbs} />
          <Stack justifyContent="space-between" alignItems="center" gap="49px">
            <PageTitle
              title={editUserOptionsConfig.editUserPage.label}
              description={editUserOptionsConfig.editUserPage.description}
              navigatePage="/privileges/users"
            />
            {userCardData && (
              <SubjectCard
                subjectData={userCardData}
                title="Informacion del usuario"
                icon={<MdPersonOutline size={24} />}
                labels={editUserSubjectCardLabels}
              />
            )}
          </Stack>
        </Stack>
        {currentInformation ? (
          <Stack gap="32px" direction="column">
            <StyledTabsContainer typeTabs={typeTabs}>
              <Tabs
                tabs={Object.values(editUserTabsConfig)}
                selectedTab={selectedTab}
                type={typeTabs ? "select" : "tabs"}
                onChange={handleTabChange}
              />
            </StyledTabsContainer>
            {selectedTab === editUserTabsConfig.generalInformation.id && (
              <GeneralInformationForm
                currentInformation={currentInformation}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.branches.id && (
              <InitializerForm
                dataOptionsForms={editData.branches.entries}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.events.id && (
              <InitializerForm
                dataOptionsForms={editData.events.entries}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.projects.id && (
              <InitializerForm
                dataOptionsForms={editData.projects.entries}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.aidBudgetUnits.id && (
              <InitializerForm
                dataOptionsForms={editData.aidBudgetUnits.entries}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.payrolls.id && (
              <InitializerForm
                dataOptionsForms={editData.payrolls.entries}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
          </Stack>
        ) : (
          <ItemNotFound
            image={userNotFoundConfig.image}
            title={userNotFoundConfig.title}
            description={userNotFoundConfig.description}
            buttonDescription={userNotFoundConfig.buttonDescription}
            route={userNotFoundConfig.route}
          />
        )}
      </Stack>
      {controlModal.show && continueModal(handleCloseModal, handleContinueTab)}
    </StyledContainer>
  );
}

export { EditUserUI };
