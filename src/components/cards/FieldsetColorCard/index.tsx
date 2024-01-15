import { Stack, Text, inube } from "@inube/design-system";
import { ThemeContext } from "styled-components";

import {
  StyledTokenColorCardContainer,
  StyledPopupContainer,
  StyledTextWithTokenContainer,
  getTokenColor,
} from "./styles";
import { Fieldset } from "@src/components/inputs/Fieldset";
import { TokenColorCard } from "../TokenColorCard";
import { Appearance } from "./types";
import tinycolor from "tinycolor2";
import { useContext } from "react";

interface FieldsetColorCardProps {
  title: string;
  description: string;
  appearance: Appearance;
  category: string;
  textWithColorToken?: string;
  typeToken?: string;
  optionsMenu: typeof inube;
  onChange: (tokenName: string) => void;
}

const getTokenReferenceFromAppearanceAndCategory = (
  appearance: Appearance,
  typeToken: string,
  category: string,
  tokens: typeof inube
): string | null => {
  const tokenReference = tokens[typeToken]?.[appearance]?.[category];
  if (!tokenReference) return null;
  const castedPalette = inube.color.palette as Record<
    string,
    Record<string, string>
  >;
  for (const [, colorValues] of Object.entries(castedPalette)) {
    for (const [colorKey, colorValue] of Object.entries(colorValues)) {
      if (colorValue === tokenReference) {
        return colorKey;
      }
    }
  }
  return null;
};

function FieldsetColorCard(props: FieldsetColorCardProps) {
  const {
    title,
    description,
    appearance,
    category,
    textWithColorToken,
    typeToken = "text",
    optionsMenu,
    onChange,
  } = props;

  const tokens = useContext(ThemeContext).color || inube.color;

  const tokenName = getTokenReferenceFromAppearanceAndCategory(
    appearance,
    typeToken,
    category,
    tokens
  );

  const handleColorChange = (updatedTokenName: string) => {
    onChange(updatedTokenName);
  };

  const requireBackground =
    (tokenName === "N10" || tokenName === "N0") &&
    tinycolor(getTokenColor(tokenName!)).isLight();

  return (
    <Fieldset title={title}>
      <>
        <Stack direction="column" gap={inube.spacing.s200}>
          <Text size="medium" appearance="gray">
            {description}
          </Text>
          <Stack gap={inube.spacing.s200} alignItems="center">
            <StyledTokenColorCardContainer
              requireBackground={requireBackground}
            >
              <TokenColorCard
                tokenName={tokenName!}
                type="tokenPicker"
                palette={optionsMenu}
                onColorChange={handleColorChange}
              />
            </StyledTokenColorCardContainer>
            {textWithColorToken && (
              <StyledTextWithTokenContainer
                requireBackground={requireBackground}
              >
                <Stack padding="s100">
                  <Text
                    size="medium"
                    appearance={appearance}
                    parentHover={category === "hover"}
                    disabled={category === "disabled"}
                  >
                    {textWithColorToken}
                  </Text>
                </Stack>
              </StyledTextWithTokenContainer>
            )}
          </Stack>
        </Stack>
        <StyledPopupContainer id="palette"></StyledPopupContainer>
      </>
    </Fieldset>
  );
}

export { FieldsetColorCard };
export type { FieldsetColorCardProps };
