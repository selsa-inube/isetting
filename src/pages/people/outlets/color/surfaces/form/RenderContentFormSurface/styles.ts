import styled from "styled-components";
import { inube } from "@inube/design-system";

const StyledNavLinkContainer = styled.div`
  width: auto;
  margin: 0px ${inube.spacing.s200};
  width: calc(216px + 2 * ${inube.spacing.s200});
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  border-radius: 2px;
  & div {
    gap: ${inube.spacing.s300};
  }
  & figure {
    height: 29px;
  }
`;

export { StyledNavLinkContainer };
