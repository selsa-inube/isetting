import { FormButtons } from "@components/forms/submit/FormButtons";
import {
  Button,
  Blanket,
  Stack,
  Text,
  inube,
  Grid,
  useMediaQueries,
} from "@inube/design-system";
import { StyledBackdropBlanket, StyledModal } from "./styles";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { FieldsetColorCard } from "@components/cards/FieldsetColorCard";
import { ThemeProvider } from "styled-components";
import { surfaceFormsConfig } from "../../config/surface.config";
import { SurfaceAppearance } from "../../types";
import { RenderMessage } from "@components/feedback/RenderMessage";

interface ISurfaceCardConfig {
  title: string;
  description: string;
}

interface RenderContentFormSurfaceBlanketUIProps {
  formType: SurfaceAppearance;
  handleCloseMessage: () => void;
  handleReset: () => void;
  handleSubmitForm: () => void;
  handleShowBlanket: () => void;
  handleTokenChange: (
    appearance: SurfaceAppearance,
    category: string,
    updatedTokenName: string
  ) => void;
  hasChanges: () => boolean;
  isLoading: boolean;
  message: IMessageState;
  showBlanket: boolean;
  surfaceConfig: typeof surfaceFormsConfig;
  toggleActive: boolean;
  setToggleActive: (props: boolean) => void;
  updatedTheme: typeof inube;
  surfaceToken: typeof inube;
}

function RenderContentFormSurfaceBlanketUI(
  props: RenderContentFormSurfaceBlanketUIProps
) {
  const {
    formType,
    handleCloseMessage,
    handleReset,
    handleSubmitForm,
    handleShowBlanket,
    handleTokenChange,
    hasChanges,
    isLoading,
    message,
    showBlanket,
    surfaceConfig,
    toggleActive,
    setToggleActive,
    updatedTheme,
    surfaceToken,
  } = props;

  const surfaceCards = Object.entries(
    surfaceConfig[formType as keyof typeof surfaceConfig].status
  );

  const {
    "(max-width: 744px)": isSmallScreen,
    "(min-width: 745px) and (max-width: 1000px)": isMediumScreen,
  } = useMediaQueries([
    "(max-width: 744px)",
    "(min-width: 745px) and (max-width: 1000px)",
  ]);

  const templateColumns = isSmallScreen
    ? "repeat(1, 1fr)"
    : isMediumScreen
    ? "repeat(2, 1fr)"
    : "repeat(3, 1fr)";

  return (
    <>
      <Text size="medium" padding="0px" appearance="gray">
        {surfaceConfig[formType as keyof typeof surfaceConfig].description}
      </Text>

      <FormButtons
        disabledButtons={!hasChanges()}
        handleSubmit={handleSubmitForm}
        handleReset={handleReset}
        loading={isLoading}
      >
        <ThemeProvider theme={updatedTheme}>
          <Stack direction="column" gap={inube.spacing.s350}>
            <Button
              appearance="dark"
              variant="outlined"
              spacing={isSmallScreen ? "compact" : "wide"}
              onClick={handleShowBlanket}
            >
              Mostrar Blanket
            </Button>
            {showBlanket && (
              <StyledBackdropBlanket
                onClick={() => {
                  handleShowBlanket();
                }}
              >
                <Blanket>
                  <StyledModal isSmallScreen={isSmallScreen}>
                    <Stack
                      direction="column"
                      gap={inube.spacing.s300}
                      padding="s300"
                    >
                      <Stack>
                        <Text
                          type="title"
                          size={isSmallScreen ? "small" : "medium"}
                          appearance={"dark"}
                        >
                          Ventana modal
                        </Text>
                      </Stack>
                      <Stack justifyContent="flex-end" gap="8px">
                        <Button
                          appearance={"dark"}
                          variant="outlined"
                          spacing={isSmallScreen ? "compact" : "wide"}
                          onClick={handleShowBlanket}
                        >
                          Ocultar modal
                        </Button>
                      </Stack>
                    </Stack>
                  </StyledModal>
                </Blanket>
              </StyledBackdropBlanket>
            )}
            <Grid
              templateColumns={templateColumns}
              gap="s350"
              autoColumns="unset"
              autoRows="unset"
            >
              {surfaceCards.map(
                ([key, config]: [string, ISurfaceCardConfig]) => (
                  <FieldsetColorCard
                    key={key}
                    optionsMenu={updatedTheme.color.palette}
                    title={config.title}
                    description={config.description}
                    appearance={formType}
                    category={key}
                    typeToken="surface"
                    onChange={(newTokenName) =>
                      handleTokenChange(formType, key, newTokenName)
                    }
                    toggleActive={toggleActive}
                    setToggleActive={setToggleActive}
                    tokenName={surfaceToken[formType][key]}
                  />
                )
              )}
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

export { RenderContentFormSurfaceBlanketUI };
