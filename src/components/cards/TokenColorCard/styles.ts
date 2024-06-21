import styled from "styled-components";

import { getTokenColor } from "@src/utils/getTokenColor";
import { inube } from "@inubekit/foundations";

interface IStyledColorTokenCard {
  $tokenName: string;
  $isActive: boolean;
  type: "colorPicker" | "tokenPicker";
  $smallScreen: boolean;
  width: string;
}

interface StyledPaletteUI {
  $hasBackground: boolean;
}

const HiddenColorPicker = styled.input.attrs({ type: "color" })`
  display: flow;
  width: 0;
  height: 0;
  opacity: 0;
`;

const StyledHoverPopup = styled.div`
  position: absolute;
  height: calc(auto+24px);
`;
const StyledHoverIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: none;
`;

const StyledColorTokenCard = styled.div<IStyledColorTokenCard>`
  display: ${({ $smallScreen }) => ($smallScreen ? "flex" : "inherit")};
  align-items: ${({ $smallScreen }) => ($smallScreen ? "center" : "unset")};
  justify-content: ${({ $smallScreen }) => ($smallScreen ? "center" : "unset")};
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ $smallScreen }) => ($smallScreen ? "36px" : "auto")};
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  min-width: max-content;
  background-color: ${({ $tokenName, theme }) =>
    getTokenColor($tokenName, theme)};
  position: relative;

  &:hover ${StyledHoverIcon} {
    display: block;
  }
`;

const StyledGridContainer = styled.div<StyledPaletteUI>`
  background-color: ${({ theme, $hasBackground }) =>
    $hasBackground
      ? theme?.color?.surface?.dark?.clear || inube.palette.neutral.N30
      : "unset"};
  border-radius: 8px;
  padding: ${({ $hasBackground }) => ($hasBackground ? "12px" : "0px")};
  width: 100%;
  & div {
    place-content: unset;
  }
`;

const StyledGridColorsContainer = styled.div`
  overflow: auto;
  width: 100%;
`;

const StyledDivText = styled.div`
  width: 51px;
`;

export {
  StyledColorTokenCard,
  HiddenColorPicker,
  StyledGridContainer,
  StyledGridColorsContainer,
  StyledDivText,
  StyledHoverPopup,
  StyledHoverIcon,
};
