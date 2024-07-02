import { Text } from "@inubekit/text";
import { StyledBoxAttribute } from "./styles";

export interface IBoxAttributeProps {
  attribute: string;
  value: string | number;
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
