import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { presente, inube, Stack } from "@inube/design-system";

import {
  RenderStrokesWithSpinnerForm,
  RenderStrokesWithSpinnerFormProps,
} from ".";
import { strokesFormsConfig } from "../../config/Strokes.config";
import { TokenContext } from "@src/context/TokenContext";

const story = {
  components: [RenderStrokesWithSpinnerForm],
  title:
    "layouts/people/outlets/color/strokes/form/RenderStrokesWithSpinnerForm",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <TokenContext.Provider
          value={{ token: presente, handleSubmit: () => {} }}
        >
          <Story />
        </TokenContext.Provider>
      </BrowserRouter>
    ),
  ],
};

const Default = (args: RenderStrokesWithSpinnerFormProps) => {
  return (
    <Stack padding="s300" direction="column" gap={inube.spacing.s400}>
      <RenderStrokesWithSpinnerForm {...args} formType="spinner" />
    </Stack>
  );
};

Default.args = {
  strokesConfig: { spinner: strokesFormsConfig.spinner },
};

export default story;

export { Default };
