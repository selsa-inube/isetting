import styled from "styled-components";
import { colors } from "../../../../../../../styles/colors";
import { Link } from "react-router-dom";

interface IStyledLink {
  status?: string;
}

const StyledLink = styled(Link)`
  color: ${(props: IStyledLink) =>
    props.status === "Sent"
      ? colors.sys.actions.disabled.stroke
      : colors.sys.text.dark};
  & svg:hover {
    color: ${(props) =>
      props.status === "Sent"
        ? colors.sys.actions.disabled.stroke
        : colors.sys.actions.primary.filled};
    cursor: ${(props) => (props.status === "Sent" ? "not-allowed" : "pointer")};
  }
`;

export { StyledLink };