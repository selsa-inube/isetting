import { SectionMessage } from "@components/feedback/SectionMessage";
import { FormButtons } from "@components/forms/submit/FormButtons";
import { Stack, Text, Textfield } from "@inube/design-system";
import { positions } from "@mocks/apps/privileges/users/users.mock";
import { EMessageType } from "@src/types/messages.types";
import { FormikValues } from "formik";
import { MdOutlineError, MdOutlineModeEdit } from "react-icons/md";
import {
  IGeneralInformationEntry,
  IMessageState,
} from "../../../types/forms.types";
import { generalInfoMessages } from "./config/messages.config";
import {
  StyledErrorMessageContainer,
  StyledFormContainer,
  StyledSelect,
} from "./styles";

function renderMessages(
  showMessage: IMessageState,
  formInvalid: boolean,
  handleCloseSectionMessage: GeneralInformationFormUIProps["handleCloseSectionMessage"]
) {
  if (!showMessage.visible) {
    return null;
  }
  let messageType = EMessageType.SUCCESS;
  if (formInvalid) {
    messageType = EMessageType.FAILED;
  }

  const { title, description, icon, appearance } =
    generalInfoMessages[messageType];

  return (
    <SectionMessage
      title={title}
      description={description}
      icon={icon}
      appearance={appearance}
      duration={10000}
      closeSectionMessage={handleCloseSectionMessage}
    />
  );
}

function renderFormFields(
  formik: FormikValues,
  loading: boolean,
  formInvalid: boolean,
  handleChangeForm: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void,
  readOnly?: boolean
) {
  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  return (
    <StyledFormContainer>
      <Textfield
        label="Nombre"
        placeholder="Ingresa su nombre completo"
        name="username"
        id="username"
        value={formik.values.username}
        type="text"
        disabled
        size="compact"
        fullwidth
        readOnly
      />

      <Textfield
        label="Identificación"
        placeholder="Ingrese su número de identificación"
        name="userID"
        id="userID"
        value={formik.values.userID}
        type="number"
        disabled
        size="compact"
        fullwidth
        readOnly
      />

      <Textfield
        label="Correo"
        placeholder="Ingrese su dirección de correo electrónico"
        name="email"
        id="email"
        value={formik.values.email}
        type="email"
        iconAfter={<MdOutlineModeEdit size={18} />}
        // isInvalid={formik.errors.email && formInvalid}
        // errorMessage={formik.errors.email}
        // validMessage="El correo electrónico ingresado es válido"
        disabled={readOnly || loading}
        readOnly={readOnly}
        size="compact"
        fullwidth
        state={stateValue("email")}
        onChange={handleChangeForm}
        onBlur={formik.handleBlur}
      />

      <Textfield
        label="Número de teléfono"
        placeholder="Ingrese su número telefónico"
        name="phone"
        id="phone"
        value={formik.values.phone}
        type="tel"
        iconAfter={<MdOutlineModeEdit size={18} />}
        // isInvalid={formik.errors.phone && formInvalid}
        // errorMessage={formik.errors.phone}
        // validMessage="El número de teléfono ingresado es válido"
        disabled={readOnly || loading}
        readOnly={readOnly}
        size="compact"
        fullwidth
        state={stateValue("phone")}
        onChange={handleChangeForm}
        onBlur={formik.handleBlur}
      />

      <Stack direction="column" gap="8px">
        <Text
          typo="labelMedium"
          appearance={readOnly ? "disabled" : "dark"}
          padding="0px 0px 0px 16px"
        >
          Cargo
        </Text>
        <StyledSelect
          value={formik.values.position}
          name="position"
          id="position"
          onChange={handleChangeForm}
          required
          disabled={readOnly || loading}
        >
          {positions.map((position) => (
            <option key={position.value} value={position.value}>
              {position.label}
            </option>
          ))}
        </StyledSelect>
        {formik.errors.position && formInvalid && (
          <StyledErrorMessageContainer>
            <MdOutlineError />
            <Text typo="bodySmall" margin="8px 0px 0px 4px" appearance="error">
              ({formik.errors.position})
            </Text>
          </StyledErrorMessageContainer>
        )}
      </Stack>
    </StyledFormContainer>
  );
}

interface GeneralInformationFormUIProps {
  formik: FormikValues;
  loading: boolean;
  withSubmitButtons?: boolean;
  showMessage: IMessageState;
  handleCloseSectionMessage: () => void;
  hasChanges: (valueCompare: IGeneralInformationEntry) => boolean;
  formInvalid: boolean;
  handleSubmitForm: () => void;
  handleChangeForm: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  readOnly?: boolean;
}

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const {
    formik,
    loading,
    withSubmitButtons,
    showMessage,
    handleCloseSectionMessage,
    hasChanges,
    formInvalid,
    handleSubmitForm,
    handleChangeForm,
    readOnly,
  } = props;

  if (withSubmitButtons) {
    return (
      <>
        <FormButtons
          handleSubmit={handleSubmitForm}
          handleReset={formik.resetForm}
          disabledButtons={!hasChanges(formik.values)}
          loading={loading}
        >
          {renderFormFields(formik, loading, formInvalid, handleChangeForm)}
        </FormButtons>
        {renderMessages(showMessage, formInvalid, handleCloseSectionMessage)}
      </>
    );
  }

  return (
    <>
      {renderFormFields(
        formik,
        loading,
        formInvalid,
        handleChangeForm,
        readOnly
      )}
    </>
  );
}

export { GeneralInformationFormUI };
