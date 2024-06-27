import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { validationMessages } from "@validations/validationMessages";
import { validationRules } from "@validations/validationRules";
import { IInvitationsEntry } from "@services/users/invitation.types";
import { GeneralInformationFormUI } from "./interface";

const LOADING_TIMEOUT = 1500;

const validationSchema = Yup.object({
  email: validationRules.email.required(validationMessages.required),
  phoneNumber: validationRules.phone.required(validationMessages.required),
  position: Yup.string().required(validationMessages.required),
});

interface IGeneralInformationFormProps {
  initialValues: IInvitationsEntry;
  positionsOptions: Record<string, unknown>[];
  handleSubmit?: (values: IInvitationsEntry) => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onHasChanges?: (hasChanges: boolean) => void;
}

export const GeneralInformationForm = forwardRef(
  function GeneralInformationForm(
    props: IGeneralInformationFormProps,
    ref: React.Ref<FormikProps<IInvitationsEntry>>
  ) {
    const {
      initialValues,
      positionsOptions,
      handleSubmit,
      onFormValid,
      onHasChanges,
    } = props;

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
      initialValues,
      validationSchema,
      validateOnChange: false,

      onReset: () => {
        if (onHasChanges) onHasChanges(false);
      },
      onSubmit: () => {
        setLoading(true);
        setTimeout(() => {
          handleSubmit && handleSubmit(formik.values);
          setLoading(false);
        }, LOADING_TIMEOUT);
      },
    });
    useImperativeHandle(ref, () => formik);

    const hasChanges = (valueCompare: IInvitationsEntry) =>
      JSON.stringify(initialValues) !== JSON.stringify(valueCompare);

    const handleChangeForm = (name: string, value: string) => {
      const formikValues = {
        ...formik.values,
        [name]: value,
      };

      if (onHasChanges) onHasChanges(hasChanges(formikValues));
      formik.setFieldValue(name, value).then(() => {
        formik.validateForm().then((errors) => {
          if (!errors || Object.keys(errors).length === 0) {
            handleSubmit && handleSubmit(formikValues);
          }
        });
      });
    };

    useEffect(() => {
      if (formik.values) {
        formik.validateForm().then((errors) => {
          onFormValid && onFormValid(Object.keys(errors).length === 0);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values, onFormValid]);

    return (
      <GeneralInformationFormUI
        loading={loading}
        formik={formik}
        handleChangeForm={handleChangeForm}
        positionsOptions={positionsOptions}
      />
    );
  }
);
