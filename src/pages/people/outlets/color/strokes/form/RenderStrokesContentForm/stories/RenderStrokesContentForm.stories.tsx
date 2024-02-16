import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Stack, inube } from "@inube/design-system";
import { RenderStrokesContentForm, RenderStrokesContentFormProps } from "..";
import { TokenContext } from "@src/context/TokenContext";
import { strokesFormsConfig } from "../../../config/Strokes.config";
import { props } from "./props";
import { presente } from "@src/mocks/design/tokensWithReference/presente";

const story = {
  components: [RenderStrokesContentForm],
  title: "layouts/people/outlets/color/strokes/form/RenderStrokesContentForm",
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
            handleSubmit: () => {},
          }}
        >
          <Story />
        </TokenContext.Provider>
      </BrowserRouter>
    ),
  ],
};

const Default = (args: RenderStrokesContentFormProps) => {
  return (
    <Stack padding="s300" direction="column" gap={inube.spacing.s400}>
      <RenderStrokesContentForm {...args} />
    </Stack>
  );
};

Default.args = {
  strokesConfig: { ...strokesFormsConfig },
  formType: "primary",
};

export default story;

export { Default };