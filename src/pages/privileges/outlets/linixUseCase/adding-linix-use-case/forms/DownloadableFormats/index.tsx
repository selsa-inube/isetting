import { useState } from "react";

import {
  IAssignmentFormEntry,
  IMessageState,
} from "@pages/privileges/outlets/users/types/forms.types";
import { EMessageType } from "@src/types/messages.types";
import { InitializerFormUI } from "./interface";
import { IFormAddLinixUseCase } from "../..";

const LOADING_TIMEOUT = 1500;

interface InitializerFormProps {
  dataOptionsForms: IAssignmentFormEntry[];
  handleSubmit: (renderForm: IAssignmentFormEntry[]) => void;
  withSubmitButtons?: boolean;
  onHasChanges?: (hasChanges: boolean) => void;
  initialValues?: IFormAddLinixUseCase;
  readOnly?: boolean;
}

export function InitializerForm(props: InitializerFormProps) {
  const {
    dataOptionsForms,
    handleSubmit,
    withSubmitButtons = false,
    onHasChanges,
    readOnly = false,
  } = props;

  const [formDataOptions, setFormDataOptions] = useState(dataOptionsForms);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<IMessageState>({
    visible: false,
  });

  const hasChanges = (valueCompare: IAssignmentFormEntry[]) =>
    JSON.stringify(dataOptionsForms) !== JSON.stringify(valueCompare);

  const handleChangeInitializerForm = (renderForm: IAssignmentFormEntry[]) => {
    setFormDataOptions(renderForm);
    if (onHasChanges) onHasChanges(hasChanges(renderForm));
    if (!withSubmitButtons) handleSubmit(renderForm);
  };

  const handleSubmitForm = () => {
    setIsLoading(true);

    setTimeout(() => {
      handleSubmit(formDataOptions);
      setIsLoading(false);
      setMessage({
        visible: true,
        type: EMessageType.SUCCESS,
      });
    }, LOADING_TIMEOUT);
  };

  const handleReset = () => {
    setFormDataOptions(dataOptionsForms);
    if (onHasChanges) onHasChanges(false);
  };

  const handleCloseSectionMessage = () => {
    setMessage({
      visible: false,
    });
  };

  return (
    <InitializerFormUI
      handleChangeInitializerForm={handleChangeInitializerForm}
      handleSubmitForm={handleSubmitForm}
      handleReset={handleReset}
      isLoading={isLoading}
      dataOptionsForms={formDataOptions}
      withSubmitButtons={withSubmitButtons}
      message={message}
      onCloseSectionMessage={handleCloseSectionMessage}
      hasChanges={hasChanges}
      readOnly={readOnly}
    />
  );
}
