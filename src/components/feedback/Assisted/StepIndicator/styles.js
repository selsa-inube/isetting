import styled from "styled-components";
import { colors } from "../../../../styles/colors";

const getSvgColor = (props) => {
  if (props.stepActual) {
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
  if (props.stepActual) {
    return colors.sys.text.primary;
  }
  if (props.isActive) {
    return "transparent";
  }
  return colors.sys.text.disabled;
};

const getLeftLineStyle = (props) => {
  if (props.isFirstStep) {
    return "transparent";
  }
  if (props.stepActual || props.isActive) {
    return colors.sys.status.inProgress;
  }
  return colors.sys.actions.disabled.stroke;
};

const getRightLineStyle = (props) => {
  if (props.isLastStep) {
    return "transparent";
  }
  if (props.isActive) {
    return colors.sys.status.inProgress;
  }
  return colors.sys.actions.disabled.stroke;
};

const StyledStep = styled.li`
  list-style: none;
  width: 100%;

  & div > svg {
    color: ${getSvgColor};
  }
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

const StyledLeftLine = styled.div`
  background-color: ${getLeftLineStyle};
  width: 100%;
  height: 3px;
`;

const StyledRightLine = styled.div`
  background-color: ${getRightLineStyle};
  width: 100%;
  height: 3px;
`;

export { StyledStep, StyledStepNumber, StyledLeftLine, StyledRightLine };
