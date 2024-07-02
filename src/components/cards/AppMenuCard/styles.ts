import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@inubekit/foundations";

const StyledAppMenuCard = styled(Link)`
  box-sizing: border-box;
  padding: 16px 12px;
  width: 191px;
  height: 140px;
  text-decoration: none;
  color: ${({ theme }) =>
    theme?.color?.stroke.dark.regular || inube.palette.neutral.N900};
  :hover {
    & svg {
      color: ${({ theme }) =>
        theme?.color?.stroke.primary.regular || inube.palette.blue.B400};
    }
    & picture {
      background-color: ${({ theme }) =>
        theme?.color?.surface.gray.regular || inube.palette.neutral.N30};
    }
  }

  @media (max-width: 580px) {
    display: flex;
    width: 100%;
    height: 72px;
    padding: 12px 8px;
    & div:first-child {
      flex-direction: row;
      gap: 8px;
    }
    & p {
      text-align: left;
    }
  }
`;

export { StyledAppMenuCard };
