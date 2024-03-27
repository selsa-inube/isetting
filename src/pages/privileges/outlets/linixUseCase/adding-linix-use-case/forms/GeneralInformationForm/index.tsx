import { useState } from "react";
import { useFormik } from "formik";

import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import {
  IGeneralInformation,
  IHandleChangeFormData,
} from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case/index";

import { GeneralInformationFormUI } from "./interface";
import { generalMessage } from "../../config/messages.config";

const LOADING_TIMEOUT = 1500;

interface GeneralInformationFormProps {
  handleSubmit: (values: IHandleChangeFormData) => void;
  csOptions: Record<string, unknown>[];
  webOptions: Record<string, unknown>[];
  withSubmitButtons?: boolean;
  initialValues?: IGeneralInformation;
  onHasChanges?: (hasChanges: boolean) => void;
  readOnly?: boolean;
}

function GeneralInformationForm(props: GeneralInformationFormProps) {
  const {
    initialValues = {
      n_Usecase: "",
      n_Descrip: "",
      i_Tipusec: "",
      k_Funcio: "",
      k_Opcion: "",
    },
    withSubmitButtons,
    handleSubmit,
    onHasChanges,
    readOnly,
    csOptions,
    webOptions,
  } = props;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<IMessageState>({
    visible: false,
  });

  function onSubmit() {
    setLoading(true);
    setTimeout(() => {
      handleSubmit(formik.values);
      setLoading(false);
      setMessage({
        visible: true,
        data: generalMessage.success,
      });
    }, LOADING_TIMEOUT);
  }

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onReset: () => {
      if (onHasChanges) onHasChanges(false);
    },
    onSubmit,
  });
  const handleReset = () => {
    if (onHasChanges) onHasChanges(false);
  };

  const handleSubmitForm = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        setMessage({
          visible: true,
          data: generalMessage.failed,
        });
      }
      formik.handleSubmit();
    });
  };

  const hasChanges = (valueCompare: IGeneralInformation) =>
    JSON.stringify(initialValues) !== JSON.stringify(valueCompare);

  const handleCloseSectionMessage = () => {
    setMessage({
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
          setMessage({
            visible: true,
            data: generalMessage.success,
          });
        }
      });
    });
  };

  return (
    <GeneralInformationFormUI
      loading={loading}
      handleReset={handleReset}
      formik={formik}
      message={message}
      withSubmitButtons={withSubmitButtons}
      handleCloseSectionMessage={handleCloseSectionMessage}
      hasChanges={hasChanges}
      onCloseSectionMessage={handleCloseSectionMessage}
      formInvalid={formik.isValidating || formik.isValid}
      handleSubmitForm={handleSubmitForm}
      handleChangeForm={handleChangeForm}
      readOnly={readOnly}
      csOptions={csOptions}
      webOptions={webOptions}
    />
  );
}

export { GeneralInformationForm };
