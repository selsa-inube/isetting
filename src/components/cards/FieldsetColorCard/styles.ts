import { inube } from "@inubekit/foundations";
import styled from "styled-components";

interface IStyledFieldsetColorCard {
  $requireBackground: boolean;
}

const StyledTokenColorCardContainer = styled.div<IStyledFieldsetColorCard>`
  width: 100%;
  max-width: 64px;
  & > div {
    width: 100%;
    height: 24px;
    max-width: 80px;

    border: 1px solid
      ${({ theme, $requireBackground }) =>
        $requireBackground
          ? theme?.color?.stroke?.divider?.regular || inube.palette.neutral.N40
          : "unset"};
    & > div {
      justify-content: center;
      padding: 4px;
    }
  }
`;

const StyledTextWithTokenContainer = styled.div<IStyledFieldsetColorCard>`
  & > div {
    border-radius: 8px;
    background-color: ${({ theme, $requireBackground }) =>
      $requireBackground
        ? theme?.color?.text?.dark?.regular || inube.palette.neutral.N900
        : "unset"};
  }
`;
export { StyledTokenColorCardContainer, StyledTextWithTokenContainer };
