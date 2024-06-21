import { MdOutlineHouse } from "react-icons/md";
import {
  Stack,
  Text,
  inube,
  Grid,
  useMediaQuery,
  NavLink,
} from "@inube/design-system";
import { inube as newInube } from "@inubekit/foundations";
import { ThemeProvider } from "styled-components";

import { IMessageState } from "@pages/privileges/outlets/users/types/forms.types";
import { FieldsetColorCard } from "@components/cards/FieldsetColorCard";
import { SendInformationMessage } from "@components/feedback/SendingInformation";
import { surfaceFormsConfig } from "@pages/people/outlets/color/surfaces/config/surface.config";
import { RenderMessage } from "@components/feedback/RenderMessage";
import { SurfaceAppearance } from "@pages/people/outlets/color/surfaces/types";
import { TextAppearance } from "@pages/people/outlets/color/texts/types";
import { FormButtons } from "@components/forms/submit/FormButtons";

import { StyledNavLinkContainer } from "./styles";
interface ISurfaceCardConfig {
  title: string;
  description: string;
}

interface RenderSurfaceContentFormUIProps {
  formType: SurfaceAppearance;
  handleCloseMessage: () => void;
  handleReset: () => void;
  handleSubmitForm: () => void;
  handleTokenChange: (
    appearance: SurfaceAppearance,
    category: string,
    updatedTokenName: string
  ) => void;
  hasChanges: () => boolean;
  isLoading: boolean;
  message: IMessageState;
  surfaceConfig: typeof surfaceFormsConfig;
  updatedTheme: typeof inube;
  toggleActive: boolean;
  setToggleActive: (props: boolean) => void;
  navLinkIsSelected: boolean;
  setNavLinkIsSelected: (props: boolean) => void;
  surfaceToken: typeof inube;
}

function RenderSurfaceContentFormUI(props: RenderSurfaceContentFormUIProps) {
  const {
    formType,
    handleCloseMessage,
    handleReset,
    handleSubmitForm,
    handleTokenChange,
    hasChanges,
    isLoading,
    message,
    surfaceConfig,
    updatedTheme,
    toggleActive,
    setToggleActive,
    navLinkIsSelected,
    setNavLinkIsSelected,
    surfaceToken,
  } = props;

  const surfaceCards = Object.entries(
    surfaceConfig[formType as keyof typeof surfaceConfig].status
  );

  const isSmallScreen = useMediaQuery("(max-width: 743px)");
  const templateColumns = isSmallScreen ? "repeat(1, 1fr)" : "repeat(2, 1fr)";

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
          <Stack direction="column" gap={inube.spacing.s350}>
            {formType === "navLink" && (
              <StyledNavLinkContainer>
                <NavLink
                  icon={<MdOutlineHouse />}
                  label="Text"
                  onClick={() => setNavLinkIsSelected(!navLinkIsSelected)}
                  selected={navLinkIsSelected}
                />
              </StyledNavLinkContainer>
            )}

            {formType !== "navLink" && (
              <SendInformationMessage
                appearance={formType as TextAppearance}
                buttonType="filled"
              />
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

export { RenderSurfaceContentFormUI };
