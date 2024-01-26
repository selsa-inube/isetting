import styled from "styled-components";
import { inube } from "@inube/design-system";

interface StyledPaletteUI {
  theme?: typeof inube;
  hasBackground: boolean;
}

const StyledMessageContainer = styled.div`
  position: fixed;
  bottom: 18px;
  right: 75px;
  z-index: 2;
`;

const StyledGridContainer = styled.div<StyledPaletteUI>`
  background-color: ${({ theme, hasBackground }) =>
    hasBackground
      ? theme?.color?.surface?.dark?.clear || inube.color.surface.dark.clear
      : "unset"};
  border-radius: ${inube.spacing.s100};
  padding: ${({ hasBackground }) =>
    hasBackground ? inube.spacing.s150 : inube.spacing.s0};
  & div {
    place-content: unset;
  }
`;

export { StyledGridContainer, StyledMessageContainer };
