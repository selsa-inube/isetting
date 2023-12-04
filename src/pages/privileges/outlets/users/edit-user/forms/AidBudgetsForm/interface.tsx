import { FormButtons } from "@components/forms/submit/FormButtons";
import { AssignmentForm } from "@components/forms/templates/AssignmentForm";
import { SectionMessage, Stack } from "@inube/design-system";
import {
  IAssignmentFormEntry,
  IMessageState,
} from "../../../types/forms.types";
import { assignmentFormMessages } from "../../config/messages.config";

const renderMessage = (
  message: IMessageState,
  onCloseSectionMessage: AidBudgetsFormUIProps["onCloseSectionMessage"]
) => {
  if (!message.visible || !message.type) {
    return null;
  }

  const { title, description, icon, appearance } =
    assignmentFormMessages[message.type as keyof typeof assignmentFormMessages];

  return (
    <Stack justifyContent="flex-end" width="100%">
      <SectionMessage
        title={title}
        description={description}
        icon={icon}
        appearance={appearance}
        duration={10000}
        closeSectionMessage={onCloseSectionMessage}
      />
    </Stack>
  );
};

interface AidBudgetsFormUIProps {
  aidBudgetUnits: IAssignmentFormEntry[];
  isLoading: boolean;
  handleSubmitForm: () => void;
  handleReset: () => void;
  handleChangeAidBudgets: (aidBudgetUnits: IAssignmentFormEntry[]) => void;
  withSubmitButtons?: boolean;
  message: IMessageState;
  onCloseSectionMessage: () => void;
  hasChanges: (valueCompare: IAssignmentFormEntry[]) => boolean;
  readOnly?: boolean;
}

function AidBudgetsFormUI(props: AidBudgetsFormUIProps) {
  const {
    aidBudgetUnits,
    isLoading,
    handleSubmitForm,
    handleReset,
    handleChangeAidBudgets,
    withSubmitButtons,
    message,
    onCloseSectionMessage,
    hasChanges,
    readOnly,
  } = props;

  if (withSubmitButtons) {
    return (
      <>
        <FormButtons
          disabledButtons={!hasChanges(aidBudgetUnits)}
          handleSubmit={handleSubmitForm}
          handleReset={handleReset}
          loading={isLoading}
        >
          <AssignmentForm
            handleChange={handleChangeAidBudgets}
            entries={aidBudgetUnits}
            title="Seleccione los presupuestos que desea asignar"
          />
        </FormButtons>
        {renderMessage(message, onCloseSectionMessage)}
      </>
    );
  }

  return (
    <AssignmentForm
      handleChange={handleChangeAidBudgets}
      entries={aidBudgetUnits}
      title="Seleccione los presupuestos que desea asignar"
      readOnly={readOnly}
    />
  );
}

export { AidBudgetsFormUI };
