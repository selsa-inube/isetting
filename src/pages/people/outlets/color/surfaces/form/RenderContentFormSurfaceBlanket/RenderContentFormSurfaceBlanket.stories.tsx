import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Stack, inube } from "@inube/design-system";
import {
  RenderContentFormSurfaceBlanket,
  RenderContentFormSurfaceBlanketProps,
} from ".";
import { surfaceFormsConfig } from "../../config/surface.config";
import { TokenContext } from "@context/TokenContext";
import { presente } from "@src/mocks/design/tokensWithReference/presente";

const story = {
  components: [RenderContentFormSurfaceBlanket],
  title:
    "layouts/people/outlets/color/surfaces/form/RenderContentFormSurfaceBlanket",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <TokenContext.Provider
          value={{
            tokenWithRef: presente,
            loading: false,
            handleSubmit: () => {},
          }}
        >
          <Story />
        </TokenContext.Provider>
      </BrowserRouter>
    ),
  ],
};

const Default = (args: RenderContentFormSurfaceBlanketProps) => {
  return (
    <Stack padding="s300" direction="column" gap={inube.spacing.s400}>
      <RenderContentFormSurfaceBlanket {...args} formType="blanket" />
    </Stack>
  );
};

Default.args = {
  surfaceConfig: { blanket: surfaceFormsConfig.blanket },
};
export default story;

export { Default };
