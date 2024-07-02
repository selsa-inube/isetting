import { inube } from "@inubekit/foundations";
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  padding: 12px 16px;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  align-items: stretch;
  width: 100%;
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.gray?.regular || inube.palette.neutral.N200};
`;

export const StyledHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;
