import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import React from "react";

import { StoryFn } from "@storybook/react";
import { inube } from "@inubekit/foundations";

import { Appearance } from "./types";
import { FieldsetColorCard, FieldsetColorCardProps } from ".";

const story = {
  component: [FieldsetColorCard],
  title: "components/cards/FieldsetColorCard",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const FieldsetColorCardWrapper = ({
  children,
  appearance,
  category,
  initialPalette,
}: {
  children: React.ReactNode;
  appearance: Appearance;
  category: string;
  initialPalette: typeof inube.palette;
}) => {
  const [textConfig, setTextConfig] = useState(inube.text);
  const [toggleActive, setToggleActive] = useState(false);
  const handleTokenChange = () => {
    const updatedTextConfig = { ...textConfig };
    setTextConfig(updatedTextConfig);
  };

  return React.cloneElement(children as React.ReactElement<any>, {
    appearance,
    category,
    initialPalette,
    onChange: handleTokenChange,
    toggleActive: toggleActive,
    setToggleActive: setToggleActive,
  });
};

const Template: StoryFn<FieldsetColorCardProps> = (args) => (
  <FieldsetColorCardWrapper
    appearance={args.appearance}
    category={args.category}
    initialPalette={inube.palette}
  >
    <FieldsetColorCard {...args} />
  </FieldsetColorCardWrapper>
);

export const Default = Template.bind({});
Default.args = {
  title: "Regular",
  description:
    "El texto tendrá este color cuando no tenga cambios por comportamiento o interacción con el usuario.",
  typeToken: "text",
  appearance: "primary",
  category: "hover",
  optionsMenu: inube,
};

export default story;
