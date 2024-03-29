import { StoryFn, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Stack, inube } from "@inube/design-system";
import { RenderContentFormPalette, RenderContentFormPaletteProps } from "..";
import { TokenContext } from "@src/context/TokenContext";
import { paletteTabsConfig } from "@pages/people/outlets/color/palette/config/paletteTabs.config";
import { props } from "./props";
import { presente } from "@src/mocks/design/tokensWithReference/presente";
import { action } from "@storybook/addon-actions";

const story: Meta<typeof RenderContentFormPalette> = {
  component: RenderContentFormPalette,
  title: "layouts/people/outlets/color/palette/form/RenderContentFormPalette",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: props,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <TokenContext.Provider
          value={{
            tokenWithRef: presente,
            loading: false,
            handleSubmit: action("handleSubmit"),
          }}
        >
          <Story />
        </TokenContext.Provider>
      </BrowserRouter>
    ),
  ],
};

const Default = (args: RenderContentFormPaletteProps) => {
  return (
    <Stack padding="s300" direction="column" gap={inube.spacing.s400}>
      <RenderContentFormPalette {...args} />
    </Stack>
  );
};

Default.args = {
  paletteTabsConfig: { neutral: paletteTabsConfig.neutral },
  formType: "neutral",
};

export default story;

export { Default };
