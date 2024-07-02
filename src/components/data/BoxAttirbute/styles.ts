import styled from "styled-components";
import { inube } from "@inubekit/foundations";

export const StyledBoxAttribute = styled.div`
  display: flex;
  height: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 6px 16px;
  background-color: ${({ theme }) =>
    theme?.color?.surface?.gray?.clear || inube.palette.neutral.N10};
`;
