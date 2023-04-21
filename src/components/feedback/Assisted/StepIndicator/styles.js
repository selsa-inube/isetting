import styled from "styled-components";
import { colors } from "../../../../styles/colors";

const getIconColor = (props) => {
  if (props.isActualStep) {
    return colors.sys.status.inProgress;
  }

  return "transparent";
};

const getStepNumberBackgroundColor = (props) => {
  if (props.isActive) {
    return colors.sys.status.inProgress;
  }
};

const getStepNumberBorderColor = (props) => {
  if (props.isActualStep) {
    return colors.sys.text.primary;
  }
  if (props.isActive) {
    return "transparent";
  }
  return colors.sys.text.disabled;
};

const getStyledLine = (props) => {
  if (props.isFirstStep) {
    return "transparent";
  }
  if (props.isActualStep || props.isActive) {
    return colors.sys.status.inProgress;
  }
  return colors.sys.actions.disabled.stroke;
};

const StyledStep = styled.li`
  list-style: none;
  width: 100%;
`;

const StyledArrowDown = styled.div`
  color: ${getIconColor};
`;

const StyledStepNumber = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & p {
    background-color: ${getStepNumberBackgroundColor};
    border-color: ${getStepNumberBorderColor};
    border-width: 2px;
    border-style: solid;
    border-radius: 50%;
    min-width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledLine = styled.div`
  background-color: ${getStyledLine};
  width: 100%;
  height: 3px;
`;

export { StyledStep, StyledStepNumber, StyledLine, StyledArrowDown };
