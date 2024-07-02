import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledContainer {
  $smallScreen?: boolean;
  typeTabs?: boolean;
}

const StyledContainer = styled.div<IStyledContainer>`
  padding: ${(props) =>
    props.$smallScreen
      ? inube.spacing.s200
      : `${inube.spacing.s400} ${inube.spacing.s800}`};
`;

const StyledTabsContainer = styled.div<IStyledContainer>`
  position: ${(props) => (props.typeTabs ? "relative" : "unset")};
`;

export { StyledContainer, StyledTabsContainer };
