import { MdOutlineError, MdOutlineModeEdit } from "react-icons/md";
import { FormikValues } from "formik";

import {
  Stack,
  Textfield,
  Textarea,
  Icon,
  Select,
  Grid,
  useMediaQuery,
  inube,
} from "@inube/design-system";
import { Text } from "@inubekit/text";
import { FormButtons } from "@components/forms/submit/FormButtons";
import { RenderMessage } from "@components/feedback/RenderMessage";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { OptionSelect } from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case/config/selectLinixUseCase.config";
import { IGeneralInformation } from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case/types";
import { SearchUserCard } from "@components/cards/SearchUserCard";

import { StyledSelectContainer } from "./styles";

interface GeneralInformationFormUIProps {
  formik: FormikValues;
  loading: boolean;
  withSubmitButtons?: boolean;
  message: IMessageState;
  onCloseSectionMessage: () => void;
  handleCloseSectionMessage: () => void;
  hasChanges: (valueCompare: IGeneralInformation) => boolean;
  formInvalid: boolean;
  handleSubmitForm: () => void;
  handleChangeForm: (name: string, value: string) => void;
  readOnly?: boolean;
  csOptions: Record<string, unknown>[];
  handleReset: () => void;
  webOptions: Record<string, unknown>[];
}

const searchData = {
  "Digite el código o nombre de la aplicación:": "",
};

function RenderFormFields(
  formik: FormikValues,
  loading: boolean,
  formInvalid: boolean,
  handleChangeForm: (name: string, value: string) => void,
  csOptions: Record<string, unknown>[],
  webOptions: Record<string, unknown>[],
  readOnly?: boolean
) {
  const mediaQuery = "(max-width: 744px)";
  const matches = useMediaQuery(mediaQuery);
  const stateValue = (fieldName: string) => {
    if (!formik.touched[fieldName]) return "pending";
    if (formik.touched[fieldName] && formik.errors[fieldName]) return "invalid";
    return "valid";
  };

  return (
    <Grid
      templateColumns={matches ? "1fr" : "repeat(2, 1fr)"}
      gap="s200 s300"
      width="100%"
      autoRows="unset"
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        padding="s050 s0"
      >
        <Textfield
          label="Nombre del caso de uso "
          placeholder="Digite un nombre para el caso de uso."
          name="n_Usecase"
          id="n_Usecase"
          value={formik.values.n_Usecase}
          onBlur={formik.handleBlur}
          message={
            stateValue("n_Usecase") === "invalid" && formik.errors.n_Usecase
          }
          status={stateValue("n_Usecase")}
          type="text"
          size="compact"
          fullwidth
          required
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
          ) => handleChangeForm(event.target.name, event.target.value)}
        />
        <StyledSelectContainer>
          <Select
            label="Acción caso de uso"
            placeholder="Seleccione una opción"
            name="i_Tipusec"
            id="i_Tipusec"
            value={formik.values.i_Tipusec}
            onBlur={formik.handleBlur}
            message={
              stateValue("i_Tipusec") === "invalid" && formik.errors.i_Tipusec
            }
            status={stateValue("i_Tipusec")}
            iconAfter={<MdOutlineModeEdit size={18} />}
            size="compact"
            fullwidth
            required
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeForm("i_Tipusec", value.target.outerText)
            }
            options={OptionSelect}
          />
        </StyledSelectContainer>
      </Stack>

      <Textarea
        label="Descripción"
        placeholder="Ingrese la descripción del caso de uso."
        name="n_Descrip"
        id="n_Descrip"
        value={formik.values.n_Descrip}
        type="text"
        onBlur={formik.handleBlur}
        required
        message={
          stateValue("n_Descrip") === "invalid" && formik.errors.n_Descrip
        }
        status={stateValue("n_Descrip")}
        size="compact"
        maxLength={120}
        fullwidth
        onChange={(
          event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => handleChangeForm(event.target.name, event.target.value)}
      />

      <Stack direction="column" gap={inube.spacing.s100}>
        {formik.errors.position && formInvalid && (
          <Stack alignItems="center" margin="s0 s0 s0 s150">
            <Icon
              appearance={"error"}
              icon={<MdOutlineError />}
              spacing="wide"
              size="14px"
              shape="circle"
            />
            <Text size="small" margin="8px 0px 0px 4px" appearance="danger">
              ({formik.errors.position})
            </Text>
          </Stack>
        )}
        <SearchUserCard
          id="webSearch"
          label="Opción de menú web Linix"
          placeholder="Seleccione una opción"
          name="webSearch"
          title="Búsqueda"
          infoTitle="Opción de menú web Linix"
          idModal="searchField"
          nameModal="searchField"
          labelModal="Digite la opción a buscar."
          placeholderModal="Digite el código o nombre del caso de uso."
          userData={webOptions}
          searchFieldData={searchData}
          onReset={() => {}}
          idLabel="k_Funcio"
          nameLabel="n_Funcio"
          onUserSelect={(value: Record<string, unknown>) =>
            handleChangeForm("k_Funcio", value.k_Funcio as string)
          }
          selectedId={formik.values.k_Funcio}
        />
      </Stack>
      <SearchUserCard
        id="csSearch"
        label="Opción de menú cliente servidor Linix"
        placeholder="Seleccione una opción"
        name="csSearch"
        title="Búsqueda"
        infoTitle="Opción de menú cliente servidor Linix"
        idModal="searchField"
        nameModal="searchField"
        labelModal="Digite la opción a buscar."
        placeholderModal="Digite el código o nombre del caso de uso."
        onUserSelect={(option: Record<string, unknown>) =>
          handleChangeForm("k_Opcion", option.CODIGO_OPCION as string)
        }
        userData={csOptions}
        searchFieldData={searchData}
        idLabel="CODIGO_OPCION"
        nameLabel="DESCRIPCION"
        onReset={() => {}}
        selectedId={formik.values.k_Opcion}
      />
    </Grid>
  );
}

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const {
    formik,
    loading,
    withSubmitButtons,
    hasChanges,
    formInvalid,
    handleSubmitForm,
    handleChangeForm,
    onCloseSectionMessage,
    message,
    handleReset,
    readOnly,
    csOptions,
    webOptions,
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
          {RenderFormFields(
            formik,
            loading,
            formInvalid,
            handleChangeForm,
            csOptions,
            webOptions
          )}
        </FormButtons>
        {message.visible && (
          <RenderMessage
            message={message}
            handleCloseMessage={onCloseSectionMessage}
            onMessageClosed={handleReset}
          />
        )}
      </>
    );
  }

  return (
    <>
      {RenderFormFields(
        formik,
        loading,
        formInvalid,
        handleChangeForm,

        csOptions,
        webOptions,
        readOnly
      )}
    </>
  );
}

export { GeneralInformationFormUI };
