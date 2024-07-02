import { FormButtons } from "@components/forms/submit/FormButtons";
import {
  Nav,
  Stack,
  Text,
  inube,
  Grid,
  useMediaQueries,
} from "@inube/design-system";
import { inube as newInube } from "@inubekit/foundations";
import { StyledContainerNav, StyledNav } from "./styles";
import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { FieldsetColorCard } from "@components/cards/FieldsetColorCard";
import { ThemeProvider } from "styled-components";
import {
  mockNav,
  surfaceFormsConfig,
} from "@pages/people/outlets/color/surfaces/config/surface.config";
import { SurfaceAppearance } from "@pages/people/outlets/color/surfaces/types";
import { RenderMessage } from "@components/feedback/RenderMessage";

interface ISurfaceCardConfig {
  title: string;
  description: string;
}

interface RenderContentFormSurfaceNavUIProps {
  formType: SurfaceAppearance;
  handleCloseMessage: () => void;
  handleReset: () => void;
  handleSubmitForm: () => void;
  handleShowNav: () => void;
  handleTokenChange: (
    appearance: SurfaceAppearance,
    category: string,
    updatedTokenName: string
  ) => void;
  hasChanges: () => boolean;
  isLoading: boolean;
  message: IMessageState;
  showNav: boolean;
  surfaceConfig: typeof surfaceFormsConfig;
  updatedTheme: typeof inube;
  toggleActive: boolean;
  setToggleActive: (props: boolean) => void;
  surfaceToken: typeof inube;
}

function RenderContentFormSurfaceNavUI(
  props: RenderContentFormSurfaceNavUIProps
) {
  const {
    formType,
    handleCloseMessage,
    handleReset,
    handleSubmitForm,
    handleTokenChange,
    hasChanges,
    isLoading,
    toggleActive,
    setToggleActive,
    message,
    surfaceConfig,
    updatedTheme,
    surfaceToken,
  } = props;

  const surfaceCards = Object.entries(
    surfaceConfig[formType as keyof typeof surfaceConfig].status
  );

  const { "(max-width: 743px)": isSmallScreen } = useMediaQueries([
    "(max-width: 743px)",
  ]);

  const flexDirection = isSmallScreen ? "column" : "row";
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
        <ThemeProvider theme={{ ...newInube.text, ...newInube.typography }}>
          <Stack gap={inube.spacing.s350} direction={flexDirection}>
            <StyledNav $smallScreen={isSmallScreen}>
              <Nav navigation={mockNav} logoutTitle="Logout" />
            </StyledNav>

            <Grid>
              {surfaceCards.map(
                ([key, config]: [string, ISurfaceCardConfig]) => (
                  <StyledContainerNav key={key}>
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
                  </StyledContainerNav>
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

export { RenderContentFormSurfaceNavUI };
