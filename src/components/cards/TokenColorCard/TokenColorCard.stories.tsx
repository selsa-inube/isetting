import { StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { TokenColorCard, ITokenColorCardProps } from ".";
import { inube } from "@inube/design-system";
import { inube as newInube } from "@inubekit/foundations";
import React, { useState } from "react";

const story = {
  component: [TokenColorCard],
  title: "components/cards/TokenColorCard",
  decorators: [(Story: StoryFn) => <Story />],
  argTypes: {
    type: {
      options: ["colorPicker", "tokenPicker"],
      control: { type: "select" },
      description:
        "It is the type of TokenColorCard be operate if a colorPicker or as a tokenPicker",
      table: {
        defaultValue: { summary: "colorPicker" },
      },
    },
  },
};

const DynamicThemeWrapper = ({ children }: any) => {
  const [setTheme] = useState({ ...inube.color.palette }); //theme
  const [selectedTokenName, setSelectedTokenName] = useState("N900");
  const [toggleActive, setToggleActive] = useState(false);

  const handleColorChange = (tokenName: string, newColor: string) => {
    if (newColor) {
      setTheme((prevTheme: typeof inube) => {
        const newPalette = { ...prevTheme };
        for (const category in newPalette) {
          if (newPalette[category][tokenName]) {
            newPalette[category][tokenName] = newColor;
            break;
          }
        }
        return newPalette;
      });
    } else {
      setSelectedTokenName(tokenName);
    }
  };

  return (
    <ThemeProvider theme={{ ...newInube.text, ...newInube.typography }}>
      {React.cloneElement(children, {
        onColorChange: handleColorChange,
        tokenName: selectedTokenName,
        toggleActive: toggleActive,
        setToggleActive: setToggleActive,
      })}
    </ThemeProvider>
  );
};

export const Default = (args: ITokenColorCardProps) => (
  <DynamicThemeWrapper>
    <TokenColorCard {...args} />
  </DynamicThemeWrapper>
);

Default.args = {
  tokenName: "N900",
  tokenDescription: "Color token",
  type: "tokenPicker",
  palette: inube.color.palette,
  toggleActive: false,
  setToggleActive: (props: boolean) => {},
};
export default story;
