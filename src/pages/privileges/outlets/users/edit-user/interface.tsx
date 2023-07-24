import { PageTitle } from "@components/PageTitle";
import { SubjectCard } from "@components/cards/SubjectCard";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { Breadcrumbs, Stack, Tabs, useMediaQuery } from "@inube/design-system";
import { DecisionModal } from "@components/feedback/DecisionModal";
import { EditUserContinueModalConfig } from "./config/editUser.config";
import {
  editUserOptionsConfig,
  editUserSubjectCardLabels,
} from "./config/editUser.config";
import { editUserTabsConfig } from "./config/editUserTabs.config";
import { userNotFoundConfig } from "./config/itemNotFound.config";
import { GeneralInformationForm } from "./forms/GeneralInfoForm";
import { AidBudgetsForm } from "./forms/AidBudgetsForm";
import { EventsForm } from "./forms/EventsForm";
import { PayrollsForm } from "./forms/PayrollsForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { BranchesForm } from "./forms/BranchesForm";
import { StyledContainer } from "./styles";
import { MdPersonOutline } from "react-icons/md";
import {
  IFormsInvitation,
  IAssignmentFormEntry,
  IGeneralInformationEntry,
} from "../types/forms.types";

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
    EditUserContinueModalConfig;
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

  const smallScreen = useMediaQuery("(max-width: 580px)");

  const emptyUserData = {
    id: "",
    userID: "",
    username: "",
    email: "",
    phone: "",
  };

  const {
    generalInformation: { entries: currentInformation },
  } = editData || { generalInformation: { entries: emptyUserData } };

  const userCardData = currentInformation
    ? {
        username: currentInformation.username,
        userID: currentInformation.userID,
        code: currentInformation.code || "",
        position: currentInformation.position || "",
      }
    : {
        username: "",
        userID: "",
        code: "",
        position: "",
      };

  return (
    <StyledContainer smallScreen={smallScreen}>
      <Stack gap="48px" direction="column">
        <Stack gap="32px" direction="column">
          <Breadcrumbs route={editUserOptionsConfig.editUserPage.url} />
          <Stack justifyContent="space-between" alignItems="center" gap="49px">
            <PageTitle
              title={editUserOptionsConfig.editUserPage.label}
              description={editUserOptionsConfig.editUserPage.description}
              navigatePage="/privileges/users"
            />
            {currentInformation && (
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
            <Tabs
              tabs={Object.values(editUserTabsConfig)}
              selectedTab={selectedTab}
              handleSelectedTab={handleTabChange}
            />
            {selectedTab === editUserTabsConfig.generalInformation.id && (
              <GeneralInformationForm
                currentInformation={
                  editData.generalInformation.entries || emptyUserData
                }
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.branches.id && (
              <BranchesForm
                currentBranches={editData.branches.entries}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.events.id && (
              <EventsForm
                currentEvents={editData.events.entries}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.projects.id && (
              <ProjectsForm
                currentProjects={editData.projects.entries}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.aidBudgetUnits.id && (
              <AidBudgetsForm
                currentAidBudgetUnits={editData.aidBudgetUnits.entries}
                handleSubmit={handleSubmit}
                withSubmitButtons
                onHasChanges={handleDataChange}
              />
            )}
            {selectedTab === editUserTabsConfig.payrolls.id && (
              <PayrollsForm
                currentPayrolls={editData.payrolls.entries}
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