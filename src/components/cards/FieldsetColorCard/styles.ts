import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledFieldsetColorCard {
  $requireBackground: boolean;
}

const StyledTokenColorCardContainer = styled.div<IStyledFieldsetColorCard>`
  width: 100%;
  max-width: ${inube.spacing.s1000};
  & > div {
    width: 100%;
    height: 24px;
    max-width: 80px;

    border: 1px solid
      ${({ theme, $requireBackground }) =>
        $requireBackground
          ? theme?.color?.stroke?.divider?.regular ||
            inube.color.stroke.divider.regular
          : "unset"};
    & > div {
      justify-content: center;
      padding: 4px;
    }
  }
`;

const StyledTextWithTokenContainer = styled.div<IStyledFieldsetColorCard>`
  & > div {
    border-radius: ${inube.spacing.s100};
    background-color: ${({ theme, $requireBackground }) =>
      $requireBackground
        ? theme?.color?.text?.dark?.regular || inube.color.text.dark.regular
        : "unset"};
  }
`;
export { StyledTokenColorCardContainer, StyledTextWithTokenContainer };
