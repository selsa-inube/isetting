import { inube } from "@inubekit/foundations";
import styled from "styled-components";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  background-color: ${inube.palette.neutral.N0};
  min-width: ${(props) => (props.$smallScreen ? "300px" : "400px")};
  max-width: ${(props) => (props.$smallScreen ? "328px" : "500px")};
  height: auto;
  border-radius: 8px;
  margin: 16px;
`;

export { StyledModal };
