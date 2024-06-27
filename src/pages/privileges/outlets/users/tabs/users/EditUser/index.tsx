import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { editUserTabsConfig } from "@pages/privileges/outlets/users/edit-user/config/editUserTabs.config";
import { IAssignmentFormEntry } from "@pages/privileges/outlets/users/types/forms.types";
import { dataToAssignmentFormEntry } from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case";
import { getAll } from "@mocks/utils/dataMock.service";
import { IFormAddUsers } from "@services/users/users.types";

import { EditUserUI } from "./interface";

function EditUsers() {
  const [controlModal, setControlModal] = useState({
    show: false,
    continueTab: "",
  });

  const { user_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<IFormAddUsers>({
    generalInformation: {
      isValid: false,
      values: {
        k_Usuari: "",
        n_Usuari: "",
        k_Grupo: "",
        n_Grupo: "",
        a_Numnit: "",
        i_Activo: "",
      },
    },

    branches: {
      isValid: false,
      values: [],
    },
    projects: {
      isValid: false,
      values: [],
    },
    events: {
      isValid: false,
      values: [],
    },
    aidBudgetUnits: {
      isValid: false,
      values: [],
    },
    payrolls: {
      isValid: false,
      values: [],
    },
  });

  const [currentFormHasChanges, setCurrentFormHasChanges] = useState(false);

  const [positionsOptions, setPositionsOptions] = useState<
    Record<string, unknown>[]
  >([]);

  const [selectedTab, setSelectedTab] = useState(
    editUserTabsConfig.generalInformation.id
  );

  useEffect(() => {
    setLoading(true);
    getAll("linix-users")
      .then((data) => {
        if (data !== null) {
          const invitationsLinix =
            data &&
            Object.values(data).find(
              (invitation) => invitation.k_Usuari === user_id
            );
          setFormData((prevFormData) => ({
            ...prevFormData,
            generalInformation: {
              isValid: false,
              values: invitationsLinix,
            },
          }));
        }
      })
      .catch((error) => {
        console.info(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
    getAll("linix-positions")
      .then((data) => {
        if (data !== null) {
          setPositionsOptions(data as Record<string, unknown>[]);
        }
      })
      .catch((error) => {
        console.error("Error fetching web-options:", error.message);
      });
  }, [user_id]);
  useEffect(() => {
    getAll("linix-users-branches")
      .then((data) => {
        if (data !== null) {
          setFormData((prevDataEditPositionForm) => ({
            ...prevDataEditPositionForm,
            branches: {
              isValid: true,
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "id",
                valueLabel: "value",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error.message);
      });
    getAll("linix-users-projects")
      .then((data) => {
        if (data !== null) {
          setFormData((prevDataEditPositionForm) => ({
            ...prevDataEditPositionForm,
            projects: {
              isValid: true,
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "id",
                valueLabel: "value",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error.message);
      });
    getAll("linix-users-events")
      .then((data) => {
        if (data !== null) {
          setFormData((prevDataEditPositionForm) => ({
            ...prevDataEditPositionForm,
            events: {
              isValid: true,
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "id",
                valueLabel: "value",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error.message);
      });
    getAll("linix-users-aidBudgetUnits")
      .then((data) => {
        if (data !== null) {
          setFormData((prevDataEditPositionForm) => ({
            ...prevDataEditPositionForm,
            aidBudgetUnits: {
              isValid: true,
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "id",
                valueLabel: "value",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error.message);
      });
    getAll("linix-users-payrolls")
      .then((data) => {
        if (data !== null) {
          setFormData((prevDataEditPositionForm) => ({
            ...prevDataEditPositionForm,
            payrolls: {
              isValid: true,
              values: dataToAssignmentFormEntry({
                dataOptions: data as Record<string, unknown>[],
                idLabel: "id",
                valueLabel: "value",
                isActiveLabel: "asignado",
              }),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error.message);
      });
  }, []);

  const handleSubmit = (values: IAssignmentFormEntry[]) => {
    const editKey = Object.entries(editUserTabsConfig).find(
      ([, config]) => config.id === selectedTab
    )?.[0];

    if (editKey) {
      setFormData({
        ...formData,
        [editKey]: { values },
      });
    }

    setCurrentFormHasChanges(false);
  };

  const handleTabChange = (tabId: string) => {
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

  const handleDataChange = (hasChanges: boolean) => {
    setCurrentFormHasChanges(hasChanges);
  };

  const handleContinueTab = () => {
    setCurrentFormHasChanges(false);
    setSelectedTab(controlModal.continueTab);
  };

  return (
    <EditUserUI
      selectedTab={selectedTab}
      formData={formData}
      handleTabChange={handleTabChange}
      handleSubmit={handleSubmit}
      controlModal={controlModal}
      handleDataChange={handleDataChange}
      handleCloseModal={handleCloseModal}
      handleContinueTab={handleContinueTab}
      id={user_id || ""}
      positionsOptions={positionsOptions}
      loading={loading}
    />
  );
}

export { EditUsers };
