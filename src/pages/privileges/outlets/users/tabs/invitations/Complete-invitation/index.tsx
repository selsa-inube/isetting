import { useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import { getAll } from "@mocks/utils/dataMock.service";
import { EMessageType } from "@src/types/messages.types";
import { IInvitationsEntry } from "@services/users/invitation.types";
import { updateItemData } from "@mocks/utils/dataMock.service";
import { dataToAssignmentFormEntry } from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case";

import { stepsRegisterUserConfig } from "./config/completeInvitation.config";
import { CompleteInvitationUI } from "./interface";
import { completeInvitationData, completeInvitationStepsRules } from "./utils";
import { IFormCompleteInvitation, IFormCompleteInvitationRef } from "./types";
import { IAssignmentFormEntry } from "../../../types/forms.types";

function CompleteInvitation() {
  const { invitation_id } = useParams<{ invitation_id: string }>();

  const navigate = useNavigate();
  const [positionsOptions, setPositionsOptions] = useState<
    Record<string, unknown>[]
  >([]);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(
    stepsRegisterUserConfig.generalInformation.id
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [invitationData, setInvitationData] = useState<IFormCompleteInvitation>(
    {
      generalInformation: {
        isValid: false,
        values: {
          customerId: "",
          email: "",
          phoneNumber: "",
          status: "",
          userIdentification: "",
          userName: "",
          dateEnd: "",
          dateStart: "",
          invitationId: "",
          password: "",
          positionId: "",
          position: "",
          requestingUser: "",
          userAccountId: "",
        },
      },
      branches: { isValid: true, values: [] },
      projects: { isValid: true, values: [] },
      events: { isValid: true, values: [] },
      aidBudgetUnits: { isValid: true, values: [] },
      payrolls: { isValid: true, values: [] },
    }
  );

  const steps = Object.values(stepsRegisterUserConfig);

  useEffect(() => {
    setLoading(true);
    getAll("linix-invitations")
      .then((data) => {
        if (data !== null) {
          const invitationsLinix =
            data &&
            Object.values(data).find(
              (invitation) => invitation.invitationId === invitation_id
            );
          setInvitationData((prevFormData) => ({
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
  }, [invitation_id]);

  useEffect(() => {
    getAll("linix-invitation-branches")
      .then((data) => {
        if (data !== null) {
          setInvitationData((prevInvitationData) => ({
            ...prevInvitationData,
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
        console.error("Error fetching branches:", error.message);
      });

    getAll("linix-invitation-projects")
      .then((data) => {
        if (data !== null) {
          setInvitationData((prevInvitationData) => ({
            ...prevInvitationData,
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
        console.error("Error fetching projects:", error.message);
      });

    getAll("linix-invitation-events")
      .then((data) => {
        if (data !== null) {
          setInvitationData((prevInvitationData) => ({
            ...prevInvitationData,
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
        console.error("Error fetching events:", error.message);
      });

    getAll("linix-invitation-aidBudgetUnits")
      .then((data) => {
        if (data !== null) {
          setInvitationData((prevInvitationData) => ({
            ...prevInvitationData,
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
        console.error("Error fetching aidBudgetUnits:", error.message);
      });

    getAll("linix-invitation-payrolls")
      .then((data) => {
        if (data !== null) {
          setInvitationData((prevInvitationData) => ({
            ...prevInvitationData,
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
        console.error("Error fetching payrolls:", error.message);
      });
  }, []);

  const generalInformationRef = useRef<FormikProps<IInvitationsEntry>>(null);

  const formReferences: IFormCompleteInvitationRef = {
    generalInformation: generalInformationRef,
  };

  const handleStepChange = (stepId: number) => {
    const newCompleteInvitation = completeInvitationStepsRules(
      currentStep,
      invitationData,
      formReferences,
      isCurrentFormValid
    );

    setInvitationData(newCompleteInvitation);

    const changeStepKey = Object.entries(stepsRegisterUserConfig).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;

    setIsCurrentFormValid(
      changeIsVerification ||
        newCompleteInvitation[changeStepKey as keyof IFormCompleteInvitation]
          ?.isValid ||
        true
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleSubmit = (values: IInvitationsEntry | IAssignmentFormEntry[]) => {
    const stepKey = Object.entries(stepsRegisterUserConfig).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (stepKey) {
      setInvitationData({
        ...invitationData,
        [stepKey]: { values },
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep === steps.length) {
      handleToggleModal();
    }
    if (currentStep + 1 <= steps.length && isCurrentFormValid) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    handleStepChange(currentStep - 1);
  };

  const CompleteInvitation = async () => {
    await updateItemData({
      key: "customerId",
      nameDB: "linix-invitations",
      identifier: invitationData.generalInformation.values?.customerId!,
      editData: completeInvitationData(invitationData),
    });
  };

  const handleCompleteInvitation = () => {
    if (invitationData.generalInformation.values) {
      CompleteInvitation();
      navigate("/privileges/users", {
        state: {
          messageType: EMessageType.SUCCESS,
          username: invitationData.generalInformation.values.userName,
          tab: "privileges-invitations",
        },
      });
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <CompleteInvitationUI
      currentStep={currentStep}
      formReferences={formReferences}
      invitationData={invitationData}
      isCurrentFormValid={isCurrentFormValid}
      loading={loading}
      positionsOptions={positionsOptions}
      handleSubmit={handleSubmit}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      showModal={showModal}
      steps={steps}
      handleToggleModal={handleToggleModal}
      handleCompleteInvitation={handleCompleteInvitation}
      setIsCurrentFormValid={setIsCurrentFormValid}
      setCurrentStep={setCurrentStep}
    />
  );
}

export { CompleteInvitation };
