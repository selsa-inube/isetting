import { FormButtons } from "@components/forms/submit/FormButtons";
import { inube, Stack, Text, Label } from "@inube/design-system";
import { inube as newInube } from "@inubekit/foundations";
import { StyledLinkContainer } from "./styles";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { FieldsetColorCard } from "@components/cards/FieldsetColorCard";
import { ThemeProvider } from "styled-components";
import { strokesFormsConfig } from "@pages/people/outlets/color/strokes/config/Strokes.config";
import { RenderMessage } from "@components/feedback/RenderMessage";
import { StrokeAppearance } from "@pages/people/outlets/color/strokes/types";

interface RenderStrokesWithLinkFormUIProps {
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

function RenderStrokesWithLinkFormUI(props: RenderStrokesWithLinkFormUIProps) {
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
            {strokesCards.map(([key, config]: any) => (
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
              >
                <Text size="medium" appearance="dark">
                  {config.example}
                  <StyledLinkContainer $appearance={formType} $category={key}>
                    <Label
                      size="medium"
                      appearance={formType}
                      parentHover={key === "hover"}
                      disabled={key === "disabled"}
                    >
                      {config.link}
                    </Label>
                  </StyledLinkContainer>
                </Text>
              </FieldsetColorCard>
            ))}
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

export { RenderStrokesWithLinkFormUI };
