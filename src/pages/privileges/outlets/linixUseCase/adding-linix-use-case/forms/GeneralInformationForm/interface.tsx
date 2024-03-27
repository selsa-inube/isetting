import { MdOutlineError, MdOutlineModeEdit } from "react-icons/md";
import { FormikValues } from "formik";
import {
  Stack,
  Text,
  Textfield,
  Textarea,
  Icon,
  Select,
  Grid,
  useMediaQuery,
  inube,
} from "@inube/design-system";

import { FormButtons } from "@components/forms/submit/FormButtons";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { SearchUserCard } from "@src/components/cards/SearchUserCard";
import { OptionSelect } from "@src/pages/privileges/outlets/linixUseCase/adding-linix-use-case/config/selectLinixUseCase.config";
import { IGeneralInformation } from "@pages/privileges/outlets/linixUseCase/adding-linix-use-case/index";
import { StyledSelectContainer } from "./styles";
import { RenderMessage } from "@src/components/feedback/RenderMessage";

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
          id="Caso de Uso Linix Name"
          value={formik.values.n_Usecase}
          type="text"
          size="compact"
          fullwidth
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
          ) => handleChangeForm(event.target.name, event.target.value)}
        />
        <StyledSelectContainer>
          <Select
            label="Acción caso de uso"
            placeholder="Seleccione una opción"
            name="i_Tipusec"
            id="Acción Caso de Uso"
            value={formik.values.i_Tipusec}
            type="i_Tipusec"
            iconAfter={<MdOutlineModeEdit size={18} />}
            size="compact"
            fullwidth
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeForm("i_Tipusec", value.target.outerText)
            }
            onBlur={formik.handleBlur}
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
            <Text size="small" margin="8px 0px 0px 4px" appearance="error">
              ({formik.errors.position})
            </Text>
          </Stack>
        )}
        <SearchUserCard
          id="Opción  Web"
          label="Opción  web"
          placeholder="Seleccione una opción"
          name="WebSearch"
          title="Búsqueda"
          infoTitle="Opciones web"
          idModal="searchField"
          nameModal="searchField"
          labelModal="Digite la opción a buscar."
          placeholderModal="Digite el código o nombre del caso de uso."
          userData={webOptions}
          searchFieldData={searchData}
          onReset={() => {}}
          idLabel="K_opcion"
          nameLabel="Nombre_opcion"
          onUserSelect={(value: Record<string, unknown>) =>
            handleChangeForm("k_Funcio", value.K_opcion as string)
          }
          selectedId={formik.values.k_Funcio}
        />
      </Stack>
      <SearchUserCard
        id="Opción cliente servidor"
        label="Opción cliente servidor"
        placeholder="Seleccione una opción"
        name="csSearch"
        title="Búsqueda"
        infoTitle="Opción cliente servidor"
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
