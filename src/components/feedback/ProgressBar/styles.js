import styled from "styled-components";
import { colors } from "../../../styles/colors";

const getBarColor = ({ colorToken }) => {
  const actions = {
    primary: colors.sys.actions.primary.filled,
    confirm: colors.sys.actions.confirm.filled,
    warning: colors.sys.actions.warning.filled,
    remove: colors.sys.actions.remove.filled,
    help: colors.sys.actions.help.filled,
  };
  return actions[colorToken] || actions.primary;
};

const StyledProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${getBarColor};
  transform-origin: left;
  transition: transform;
  animation: progressBarAnimation ${(props) => props.duration}s linear;
  animation-play-state: ${(props) => (props.isPaused ? "paused" : "running")};

  @keyframes progressBarAnimation {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  } ;
`;

export { StyledProgressBar };
