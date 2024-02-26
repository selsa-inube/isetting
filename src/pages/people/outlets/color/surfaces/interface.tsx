import {
  Breadcrumbs,
  Stack,
  Tabs,
  useMediaQueries,
  inube,
} from "@inube/design-system";

import { PageTitle } from "@components/PageTitle";
import { StyledContainer, StyledTabsContainer } from "./styles";

import { surfaceTabsConfig } from "./config/surfaceTabs.config";
import {
  RenderSurfaceContentForm,
  RenderSurfaceContentFormProps,
} from "./form/RenderContentFormSurface";
import { surfaceFormsConfig } from "./config/surface.config";
import { RenderContentFormSurfaceBlanket } from "./form/RenderContentFormSurfaceBlanket";
import { peopleOptionsConfig } from "@pages/people/outlets/options/config/people.config";
import { RenderContentFormSurfaceNav } from "./form/RenderContentFormNav";
import { SurfaceAppearance } from "./types";
import { useLocation } from "react-router-dom";

interface SurfaceUIProps {
  handleTabChange: (id: string) => void;
  selectedTab: SurfaceAppearance;
  surfaceConfig: typeof surfaceFormsConfig;
}

interface IRenderForm {
  formType: SurfaceAppearance;
  selectedTab: SurfaceAppearance;
  surfaceConfig: typeof surfaceFormsConfig;
}

function renderForm(props: IRenderForm) {
  const { formType, selectedTab, surfaceConfig } = props;
  if (selectedTab !== formType) return null;

  const formTypeToComponentMap: {
    [key: string]: React.ComponentType<RenderSurfaceContentFormProps>;
  } = {
    blanket: RenderContentFormSurfaceBlanket,
    nav: RenderContentFormSurfaceNav,
  };

  const Component =
    formTypeToComponentMap[formType as keyof typeof formTypeToComponentMap] ||
    RenderSurfaceContentForm;

  return (
    <Component
      key={String(formType)}
      formType={formType}
      surfaceConfig={surfaceConfig}
    />
  );
}

export function SurfacesUI(props: SurfaceUIProps) {
  const { surfaceConfig, selectedTab, handleTabChange } = props;

  const { "(max-width: 580px)": smallScreen, "(max-width: 1073px)": typeTabs } =
    useMediaQueries(["(max-width: 580px)", "(max-width: 1073px)"]);
  const colorTabs = Object.keys(surfaceTabsConfig);
  const location = useLocation();
  const label = peopleOptionsConfig.find(
    (item) => item.url === location.pathname
  );

  return (
    <>
      <Stack
        direction="column"
        width="-webkit-fill-available"
        padding={smallScreen ? "s300" : "s400 s800"}
        gap={inube.spacing.s600}
      >
        <Stack gap="48px" direction="column">
          <Stack gap="24px" direction="column">
            <Breadcrumbs crumbs={label!.crumbs} />
            <PageTitle
              title={label!.label}
              description={label!.description}
              navigatePage="/people"
            />
          </Stack>
        </Stack>

        <StyledContainer>
          <StyledTabsContainer typeTabs={typeTabs}>
            <Stack direction="column" gap={inube.spacing.s400}>
              <Tabs
                onChange={handleTabChange}
                selectedTab={selectedTab}
                tabs={Object.values(surfaceTabsConfig)}
                type={typeTabs ? "select" : "tabs"}
              />
              {colorTabs.map((formType) => {
                return renderForm({
                  formType,
                  selectedTab,
                  surfaceConfig,
                });
              })}
            </Stack>
          </StyledTabsContainer>
        </StyledContainer>
      </Stack>
    </>
  );
}
