import { AppMenu } from "@components/layout/AppMenu";
import { IAppOption, IRoute } from "@components/layout/AppMenu/types";
import { Stack, inube, Text } from "@inube/design-system";
import { StyledDomainContainer } from "./styles";
import { AppMenuGrid } from "@src/components/layout/AppMenuGrid";

interface PeopleOptionsUIProps {
  appName: string;
  appDescription: string;
  appOptions: IAppOption[];
  appRoute: IRoute[];
}

function PeopleOptionsUI(props: PeopleOptionsUIProps) {
  const { appName, appDescription, appOptions, appRoute } = props;

  return (
    <AppMenu
      appName={appName}
      appDescription={appDescription}
      appRoute={appRoute}
    >
      <Stack direction="column" gap={inube.spacing.s600}>
        <StyledDomainContainer>
          <Text type="title" size={"medium"}>
            Colores
          </Text>
          <AppMenuGrid
            appOptions={appOptions.filter((item) => item.domain === "color")}
          />
        </StyledDomainContainer>
        <StyledDomainContainer>
          <Text type="title" size={"medium"}>
            Tipografía
          </Text>
          <AppMenuGrid
            appOptions={appOptions.filter(
              (item) => item.domain === "typography"
            )}
          />
        </StyledDomainContainer>
      </Stack>
    </AppMenu>
  );
}

export { PeopleOptionsUI };
