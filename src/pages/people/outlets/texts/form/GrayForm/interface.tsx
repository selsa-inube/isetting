import { FormButtons } from "@components/forms/submit/FormButtons";
import { SectionMessage, Stack, Text, inube } from "@inube/design-system";

import { StyledMessageContainer } from "./styles";
import { FieldsetColorCard } from "@src/components/cards/FieldsetColorCard";
import { IMessageState } from "@src/pages/privileges/outlets/users/types/forms.types";
import { IUsersMessage } from "@src/pages/privileges/outlets/users/types/users.types";

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

interface GrayFormUIProps {
  textConfig: any;
  isLoading: boolean;
  palette: typeof inube;
  handleSubmitForm: () => void;
  handleReset: () => void;
  handleChangeGray: any;
  message: IMessageState;
  hasChanges: () => boolean;
  handleCloseMessage: () => void;
  onMessageClosed: () => void;
}

function GrayFormUI(props: GrayFormUIProps) {
  const {
    textConfig,
    isLoading,
    palette,
    handleSubmitForm,
    handleReset,
    handleChangeGray,
    message,
    handleCloseMessage,
    onMessageClosed,
    hasChanges,
  } = props;

  const colorCards = Object.entries(textConfig.status);

  return (
    <>
      <Text size="medium" padding="0px 0px 0px 0px" appearance="gray">
        {textConfig.description}
      </Text>
      <FormButtons
        disabledButtons={!hasChanges()}
        handleSubmit={handleSubmitForm}
        handleReset={handleReset}
        loading={isLoading}
      >
        <Stack direction="column" gap={inube.spacing.s350}>
          {colorCards.map(([key, config]: any) => (
            <FieldsetColorCard
              key={key}
              optionsMenu={palette}
              title={config.title}
              description={config.description}
              appearance={"gray"}
              category={key}
              textWithColorToken={config.example}
              onChange={(newTokenName) =>
                handleChangeGray("gray", key, newTokenName)
              }
            />
          ))}
        </Stack>
      </FormButtons>
      {renderMessage(message, handleCloseMessage, onMessageClosed)}
    </>
  );
}

export { GrayFormUI };
