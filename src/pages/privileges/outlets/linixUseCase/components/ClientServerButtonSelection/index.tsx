import { useEffect, useState } from "react";
import { useFormik } from "formik";

import { EMessageType } from "@src/types/messages.types";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { getAll } from "@mocks/utils/dataMock.service";
import {
  IHandleChangeFormData,
  IClientServerButton,
} from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case/types";

import { ClientServerButtonSelectionUI } from "./interface";

const LOADING_TIMEOUT = 1500;

interface ClientServerButtonSelectionProps {
  handleSubmit: (values: IHandleChangeFormData) => void;
  csSelected: string;
  onHasChanges?: (hasChanges: boolean) => void;
  initialValues?: IClientServerButton;
  withSubmitButtons?: boolean;
}

function ClientServerButtonSelection(props: ClientServerButtonSelectionProps) {
  const {
    handleSubmit,
    onHasChanges,
    csSelected,
    initialValues = { csButtonOption: "" },
    withSubmitButtons = false,
  } = props;

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState<IMessageState>({
    visible: false,
  });
  const [buttonOptions, setButtonOptions] = useState<Record<string, unknown>[]>(
    []
  );

  useEffect(() => {
    getAll("button-options")
      .then((data) => {
        if (data !== null) {
          setButtonOptions(data as Record<string, unknown>[]);
        }
      })
      .catch((error) => {
        console.error("Error fetching button-options:", error.message);
      });
  }, []);

  const filteredButtonOptions = buttonOptions.filter(
    (buttonOption) => buttonOption.OPCION_CLIENTE_SERVIDOR === csSelected
  );

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      handleSubmit(formik.values);
      setLoading(false);
      setShowMessage({
        visible: true,
        type: EMessageType.SUCCESS,
      });
    }, LOADING_TIMEOUT);
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onReset: () => {
      if (onHasChanges) onHasChanges(false);
    },
    onSubmit,
  });

  const handleSubmitForm = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        setShowMessage({
          visible: true,
          type: EMessageType.FAILED,
        });
      }
      formik.handleSubmit();
    });
  };

  const hasChanges = (valueCompare: IClientServerButton) =>
    JSON.stringify(initialValues) !== JSON.stringify(valueCompare);

  const handleCloseSectionMessage = () => {
    setShowMessage({
      visible: false,
    });
  };

  const handleChangeForm = (name: string, value: string) => {
    const formikValues = {
      ...formik.values,
      [name]: value,
    };
    if (onHasChanges) onHasChanges(hasChanges(formikValues));
    formik.setFieldValue(name, value).then(() => {
      if (withSubmitButtons) return;
      formik.validateForm().then((errors) => {
        if (!errors || Object.keys(errors).length === 0) {
          handleSubmit(formikValues);
        }
      });
    });
  };

  return (
    <ClientServerButtonSelectionUI
      loading={loading}
      formik={formik}
      showMessage={showMessage}
      handleCloseSectionMessage={handleCloseSectionMessage}
      formInvalid={formik.isValidating || formik.isValid}
      handleSubmitForm={handleSubmitForm}
      handleChangeForm={handleChangeForm}
      buttonOptions={filteredButtonOptions}
    />
  );
}

export { ClientServerButtonSelection };
export type { ClientServerButtonSelectionProps };
