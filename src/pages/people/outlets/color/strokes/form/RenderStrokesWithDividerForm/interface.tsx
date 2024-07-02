import { FormButtons } from "@components/forms/submit/FormButtons";
import { Accordion } from "@components/data/Accordion";
import { Grid, inube, Stack, Text, useMediaQuery } from "@inube/design-system";
import { inube as newInube } from "@inubekit/foundations";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { FieldsetColorCard } from "@components/cards/FieldsetColorCard";
import { ThemeProvider } from "styled-components";
import {
  strokesFormsConfig,
  mockDivider,
} from "@pages/people/outlets/color/strokes/config/Strokes.config";
import { RenderMessage } from "@components/feedback/RenderMessage";
import { StrokeAppearance } from "@pages/people/outlets/color/strokes/types";
interface RenderStrokesWithDividerFormUIProps {
  formType: StrokeAppearance;
  handleReset: () => void;
  handleCloseMessage: () => void;
  handleSubmitForm: () => void;
  handleTokenChange: (
    appearance: StrokeAppearance,
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

function RenderStrokesWithDividerFormUI(
  props: RenderStrokesWithDividerFormUIProps
) {
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

  const isSmallScreen = useMediaQuery("(max-width: 743px)");

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
        <ThemeProvider theme={{ ...newInube.text, ...newInube.typography }}>
          <Stack direction="column" gap={inube.spacing.s350}>
            <Grid
              templateColumns={templateColumns}
              gap="s350"
              autoColumns="unset"
              autoRows="unset"
            >
              {strokesCards.map(([key, config]) => (
                <Stack key={key} direction="column" alignItems="center">
                  {Object.entries(mockDivider).map(([key, value]) => (
                    <Accordion
                      key={key}
                      title={value.title}
                      children={<div>{value.content}</div>}
                      dashed={false}
                    />
                  ))}

                  <FieldsetColorCard
                    appearance={formType}
                    category={key}
                    description={config.description}
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
                </Stack>
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

export { RenderStrokesWithDividerFormUI };
