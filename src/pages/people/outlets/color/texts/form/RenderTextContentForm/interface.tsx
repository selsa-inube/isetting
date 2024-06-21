import { FormButtons } from "@components/forms/submit/FormButtons";
import { Stack, Text, inube } from "@inube/design-system";
import { inube as newInube } from "@inubekit/foundations";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { FieldsetColorCard } from "@components/cards/FieldsetColorCard";
import { ThemeProvider } from "styled-components";
import { textFormsConfig } from "@pages/people/outlets/color/texts/config/text.config";
import { RenderMessage } from "@components/feedback/RenderMessage";
import { TextAppearance } from "@pages/people/outlets/color/texts/types";

interface ITextCardConfig {
  title: string;
  description: string;
  example: string;
}

interface RenderTextContentFormUIProps {
  formType: TextAppearance;
  handleCloseMessage: () => void;
  handleReset: () => void;
  handleSubmitForm: () => void;
  handleTokenChange: (
    appearance: TextAppearance,
    category: string,
    updatedTokenName: string
  ) => void;
  hasChanges: () => boolean;
  isLoading: boolean;
  message: IMessageState;
  textConfig: typeof textFormsConfig;
  updatedTheme: typeof inube;
  toggleActive: boolean;
  setToggleActive: (props: boolean) => void;
  textToken: typeof inube;
}

function RenderTextContentFormUI(props: RenderTextContentFormUIProps) {
  const {
    formType,
    handleCloseMessage,
    handleReset,
    handleSubmitForm,
    handleTokenChange,
    hasChanges,
    isLoading,
    message,
    textConfig,
    updatedTheme,
    toggleActive,
    setToggleActive,
    textToken,
  } = props;

  const textCards = Object.entries(
    textConfig[formType as keyof typeof textConfig].status
  );
  return (
    <>
      <Text size="medium" padding="s0" appearance="gray">
        {textConfig[formType as keyof typeof textConfig].description}
      </Text>
      <FormButtons
        disabledButtons={!hasChanges()}
        handleSubmit={handleSubmitForm}
        handleReset={handleReset}
        loading={isLoading}
      >
        <ThemeProvider theme={newInube.text}>
          <Stack direction="column" gap={inube.spacing.s350}>
            {textCards.map(([key, config]: [string, ITextCardConfig]) => (
              <FieldsetColorCard
                key={key}
                optionsMenu={updatedTheme.color.palette}
                title={config.title}
                description={config.description}
                appearance={formType}
                category={key}
                typeToken="text"
                onChange={(newTokenName) =>
                  handleTokenChange(formType, key, newTokenName)
                }
                toggleActive={toggleActive}
                setToggleActive={setToggleActive}
                tokenName={textToken[formType][key]}
              >
                <Text
                  size="medium"
                  appearance={formType}
                  parentHover={key === "hover"}
                  disabled={key === "disabled"}
                >
                  {config.example}
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

export { RenderTextContentFormUI };
