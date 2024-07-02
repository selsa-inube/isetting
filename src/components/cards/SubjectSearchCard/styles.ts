import { inube } from "@inubekit/foundations";
import styled from "styled-components";

interface IStyledSubjectSearchCard {
  $isActive: boolean;
  $smallScreen: boolean;
}

const StyledSubjectSearchCardText = styled.div`
  padding: 8px 16px;
`;

const StyledSubjectSearchCard = styled.div<IStyledSubjectSearchCard>`
  width: 100%;
  height: ${({ $smallScreen }) => ($smallScreen ? "56px" : "auto")};
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.surface?.gray?.regular || inube.palette.neutral.N30};
  cursor: pointer;
  background-color: ${({ theme, $isActive }) =>
    $isActive
      ? theme?.color?.surface?.gray?.regular || inube.palette.neutral.N30
      : theme?.color?.surface?.light?.clear || inube.palette.neutral.N0};

  box-shadow: ${({ theme }) =>
    `0px 1px 3px 1px ${
      theme?.color?.palette?.neutralAlpha?.N40A ||
      inube.palette.neutralAlpha.N40A
    }, 0px 1px 2px 0px ${
      theme?.color?.palette?.neutralAlpha?.N60A ||
      inube.palette.neutralAlpha.N60A
    }`};
`;

export { StyledSubjectSearchCard, StyledSubjectSearchCardText };
