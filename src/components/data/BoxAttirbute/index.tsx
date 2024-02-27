import { Text } from "@inube/design-system";
import { StyledBoxAttribute } from "./styles";

interface IBoxAttributeProps {
  attribute: string;
  value: string | number;
  titleButton?: string;
  pathStep?: string;
  icon?: JSX.Element;
}

export function BoxAttribute(props: IBoxAttributeProps) {
  const { attribute, value } = props;

  return (
    <StyledBoxAttribute>
      <Text type="label" size="medium">
        {attribute}
      </Text>
      <Text appearance="gray" size="medium">
        {value}
      </Text>
    </StyledBoxAttribute>
  );
}
