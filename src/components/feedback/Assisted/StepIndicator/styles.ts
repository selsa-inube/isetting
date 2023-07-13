import styled from "styled-components";
import { colors } from "@styles/colors";

interface IStyledStep {
  marginToRight?: boolean;
  marginToLeft?: boolean;
}

interface IStyledArrowDown {
  isActualStep?: boolean;
}

interface IStyledLeftLine {
  isFirstStep?: boolean;
  isActualStep?: boolean;
  isPreviousStep?: boolean;
}

interface IStyledRightLine {
  isLastStep?: boolean;
  isPreviousStep?: boolean;
}

interface IStyledStepCircle {
  isPreviousStep?: boolean;
  isActualStep?: boolean;
}

const getIconColor = (props: IStyledArrowDown): string => {
  if (props.isActualStep) {
    return colors.sys.status.inProgress;
  }
  return "transparent";
};

const getStepNumberBackgroundColor = (props: IStyledStepCircle): string => {
  if (props.isPreviousStep) {
    return colors.sys.status.inProgress;
  }
  return "transparent";
};

const getStepNumberBorderColor = (props: IStyledStepCircle): string => {
  if (props.isActualStep) {
    return colors.sys.text.primary;
  }
  if (props.isPreviousStep) {
    return "transparent";
  }
  return colors.sys.text.disabled;
};

const getStepVerificationColor = (props: IStyledStepCircle): string => {
  if (props.isActualStep || props.isPreviousStep) {
    return colors.sys.text.light;
  }

  return colors.sys.text.disabled;
};

const getLeftLineStyle = (props: IStyledLeftLine): string => {
  if (props.isFirstStep) {
    return "transparent";
  }
  if (props.isActualStep || props.isPreviousStep) {
    return colors.sys.status.inProgress;
  }
  return colors.sys.actions.disabled.stroke;
};

const getRightLineStyle = (props: IStyledRightLine): string => {
  if (props.isLastStep) {
    return "transparent";
  }
  if (props.isPreviousStep) {
    return colors.sys.status.inProgress;
  }
  return colors.sys.actions.disabled.stroke;
};

const StyledStep = styled.li<IStyledStep>`
  list-style: none;
  width: 100%;
  margin: 0 ${(props) => (props.marginToRight ? "30px" : "0")} 0
    ${(props) => (props.marginToLeft ? "30px" : "0")};
`;

const StyledArrowDown = styled.div<IStyledArrowDown>`
  color: ${getIconColor};
`;

const StyledStepNumber = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledStepCircle = styled.button<IStyledStepCircle>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  min-width: 30px;
  height: 30px;
  cursor: pointer;
  padding: 0;
  background-color: ${getStepNumberBackgroundColor};
  border-color: ${getStepNumberBorderColor};
  & svg {
    color: ${getStepVerificationColor};
  }
`;

const StyledLeftLine = styled.div<IStyledLeftLine>`
  background-color: ${getLeftLineStyle};
  width: 100%;
  height: 3px;
`;

const StyledRightLine = styled.div<IStyledRightLine>`
  background-color: ${getRightLineStyle};
  width: 100%;
  height: 3px;
`;

export {
  StyledStep,
  StyledStepNumber,
  StyledLeftLine,
  StyledRightLine,
  StyledArrowDown,
  StyledStepCircle,
};