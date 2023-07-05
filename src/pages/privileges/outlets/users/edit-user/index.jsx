import { aidBudgetsFormEditUser } from "@src/mocks/apps/privileges/users/aidBudgetsForm.mock";
import { branchesFormEditUser } from "@mocks/apps/privileges/users/branchesForm.mock";
import { eventsFormEditUser } from "@mocks/apps/privileges/users/eventsForm.mock";
import { payrollsFormEditUser } from "@mocks/apps/privileges/users/payrollsForm.mock";
import { projectsFormEditUser } from "@mocks/apps/privileges/users/projectsForm.mock";
import { userEntriesDataMock } from "@mocks/apps/privileges/users/users.mock";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { editUserTabsConfig } from "./config/editUserTabs.config";
import { EditUserUI } from "./interface";

function EditUser() {
  const { user_id } = useParams();

  const [controlModal, setControlModal] = useState({
    show: false,
    continueTab: "",
  });

  const [currentFormHasChanges, setCurrentFormHasChanges] = useState(false);

  const [selectedTab, setSelectedTab] = useState(
    editUserTabsConfig.generalInformation.id
  );

  const [editData, setEditData] = useState({
    generalInformation: { entries: getUserInformation() },
    branches: { entries: branchesFormEditUser },
    projects: { entries: projectsFormEditUser },
    events: { entries: eventsFormEditUser },
    aidBudgetUnits: { entries: aidBudgetsFormEditUser },
    payrolls: { entries: payrollsFormEditUser },
  });

  function getUserInformation() {
    return userEntriesDataMock.find((user) => user.id === user_id);
  }

  const handleSubmit = (values) => {
    const editKey = Object.keys(editUserTabsConfig).find(
      (key) => editUserTabsConfig[key].id === selectedTab
    );

    setEditData((prevEditData) => ({
      ...prevEditData,
      [editKey]: { entries: values },
    }));
    setCurrentFormHasChanges(false);
  };

  const handleTabChange = (tabId) => {
    setControlModal(
      currentFormHasChanges ? { show: true, continueTab: tabId } : controlModal
    );
    setSelectedTab(currentFormHasChanges ? selectedTab : tabId);
  };

  const handleCloseModal = () => {
    setControlModal((prevControlModal) => ({
      ...prevControlModal,
      show: false,
    }));
  };

  const handleDataChange = (hasChanges) => {
    setCurrentFormHasChanges(hasChanges);
  };

  const handleContinueTab = () => {
    setCurrentFormHasChanges(false);
    setSelectedTab(controlModal.continueTab);
  };

  return (
    <EditUserUI
      selectedTab={selectedTab}
      handleTabChange={handleTabChange}
      editData={editData}
      handleSubmit={handleSubmit}
      controlModal={controlModal}
      handleDataChange={handleDataChange}
      handleCloseModal={handleCloseModal}
      handleContinueTab={handleContinueTab}
    />
  );
}

export { EditUser };
