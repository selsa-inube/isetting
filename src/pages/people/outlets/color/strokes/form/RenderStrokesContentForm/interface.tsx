import { FormButtons } from "@components/forms/submit/FormButtons";
import { Grid, inube, Stack, Text, useMediaQuery } from "@inube/design-system";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { FieldsetColorCard } from "@components/cards/FieldsetColorCard";
import { ThemeProvider } from "styled-components";
import { Appearance } from "@components/feedback/SendingInformation/types";
import { SendInformationMessage } from "@components/feedback/SendingInformation";
import { strokesFormsConfig } from "../../config/Strokes.config";
import { RenderMessage } from "@components/feedback/RenderMessage";

interface RenderStrokesContentFormUIProps {
  formType: Appearance | string;
  handleReset: () => void;
  handleCloseMessage: () => void;
  handleSubmitForm: () => void;
  handleTokenChange: (
    appearance: Appearance | string,
    category: string,
    updatedTokenName: string
  ) => void;
  hasChanges: () => boolean;
  isLoading: boolean;
  strokesConfig: typeof strokesFormsConfig;
  message: IMessageState;
  updatedTheme: typeof inube;
  toggleActive: boolean;
  setToggleActive: (props: boolean) => void;
  strokesToken: typeof inube;
}

function RenderStrokesContentFormUI(props: RenderStrokesContentFormUIProps) {
  const {
    formType,
    handleReset,
    handleCloseMessage,
    handleSubmitForm,
    handleTokenChange,
    hasChanges,
    isLoading,
    strokesConfig,
    message,
    updatedTheme,
    toggleActive,
    setToggleActive,
    strokesToken,
  } = props;

  const strokesCards = Object.entries(
    strokesConfig[formType as keyof typeof strokesConfig].status
  );

  const isSmallScreen = useMediaQuery("(max-width: 744px)");
  const templateColumns = isSmallScreen ? "repeat(1, 1fr)" : "repeat(2, 1fr)";
  return (
    <>
      <Text size="medium" appearance="gray">
        {strokesConfig[formType as keyof typeof strokesConfig].description}
      </Text>
      <FormButtons
        disabledButtons={!hasChanges()}
        handleSubmit={handleSubmitForm}
        handleReset={handleReset}
        loading={isLoading}
      >
        <ThemeProvider theme={updatedTheme}>
          <Stack direction="column" gap={inube.spacing.s350}>
            <SendInformationMessage
              appearance={formType as Appearance}
              buttonType="outlined"
            />
            <Grid
              templateColumns={templateColumns}
              gap="s350"
              autoColumns="unset"
              autoRows="unset"
            >
              {strokesCards.map(([key, config]) => (
                <FieldsetColorCard
                  appearance={formType}
                  category={key}
                  description={config.description}
                  key={key}
                  onChange={(newTokenName) =>
                    handleTokenChange(formType, key, newTokenName)
                  }
                  optionsMenu={updatedTheme.color.palette}
                  title={config.title}
                  typeToken="stroke"
                  toggleActive={toggleActive}
                  setToggleActive={setToggleActive}
                  tokenName={strokesToken[formType][key]}
                />
              ))}
            </Grid>
          </Stack>
        </ThemeProvider>
      </FormButtons>
      {message.visible && (
        <RenderMessage
          message={message}
          handleCloseMessage={handleCloseMessage}
          onMessageClosed={handleReset}
        />
      )}
    </>
  );
}

export { RenderStrokesContentFormUI };
