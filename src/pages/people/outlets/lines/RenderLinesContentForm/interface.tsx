import { FormButtons } from "@components/forms/submit/FormButtons";
import {
  SectionMessage,
  Stack,
  Grid,
  Text,
  inube,
  useMediaQuery,
} from "@inube/design-system";
import { StyledMessageContainer } from "./styles";
import { IMessageState } from "@src/pages/privileges/outlets/users/types/forms.types";
import { FieldsetColorCard } from "@src/components/cards/FieldsetColorCard";
import { IUsersMessage } from "@src/pages/privileges/outlets/users/types/users.types";
import { ThemeProvider } from "styled-components";

const renderMessage = (
  message: IUsersMessage,
  handleCloseMessage: () => void,
  onMessageClosed: () => void
) => {
  if (!message.data) return null;

  const closeMessageAndExecuteCallback = () => {
    handleCloseMessage();
    onMessageClosed();
  };

  return (
    <StyledMessageContainer>
      <Stack justifyContent="flex-end" width="100%">
        <SectionMessage
          title={message.data.title}
          description={message.data.description}
          icon={message.data.icon}
          appearance={message.data.appearance}
          duration={4000}
          closeSectionMessage={closeMessageAndExecuteCallback}
        />
      </Stack>
    </StyledMessageContainer>
  );
};

interface RenderLinesContentFormUIProps {
  formType: string;
  hasChanges: () => boolean;
  handleCloseMessage: () => void;
  handleReset: () => void;
  handleSubmitForm: () => void;
  handleTokenChange: any;
  linesConfig: any;
  isLoading: boolean;
  updatedTheme: typeof inube;
  message: IMessageState;
}

function RenderLinesContentFormUI(props: RenderLinesContentFormUIProps) {
  const {
    formType,
    updatedTheme,
    linesConfig,
    isLoading,
    handleSubmitForm,
    handleReset,
    handleTokenChange,
    message,
    handleCloseMessage,
    hasChanges,
  } = props;

  const linesCards = Object.entries(linesConfig[formType].status);

  const isSmallScreen = useMediaQuery(
    "(max-width: 744px) and (min-width: 580px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width: 745px) and (max-width: 1000px)"
  );
  const isLargeScreen = useMediaQuery("(min-width: 1001px)");
  const templateColumns = isSmallScreen
    ? "repeat(2, 1fr)"
    : isMediumScreen
    ? "repeat(3, 1fr)"
    : isLargeScreen
    ? "repeat(3, 1fr)"
    : "auto";
  console.log("formType: ", formType);
  return (
    <>
      <Text size="medium" appearance="gray">
        {linesConfig[formType].description}
      </Text>
      <FormButtons
        disabledButtons={!hasChanges()}
        handleSubmit={handleSubmitForm}
        handleReset={handleReset}
        loading={isLoading}
      >
        <Stack direction="column" gap={inube.spacing.s350}>
          <ThemeProvider theme={updatedTheme}>
            <Grid
              templateColumns={templateColumns}
              gap="s350"
              autoColumns="unset"
              autoRows="unset"
            >
              {linesCards.map(([key, config]: any) => (
                <FieldsetColorCard
                  key={key}
                  optionsMenu={updatedTheme.color.palette}
                  title={config.title}
                  description={config.description}
                  appearance={formType}
                  typeToken="stroke"
                  category={key}
                  textWithColorToken={config.example}
                  onChange={(newTokenName) =>
                    handleTokenChange(formType, key, newTokenName)
                  }
                />
              ))}
            </Grid>
          </ThemeProvider>
        </Stack>
      </FormButtons>
      {renderMessage(message, handleCloseMessage, handleReset)}
    </>
  );
}

export { RenderLinesContentFormUI };
