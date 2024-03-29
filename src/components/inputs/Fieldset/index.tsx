import { Stack, Text, Icon } from "@inube/design-system";
import { StyledFieldset } from "./styles";
import React from "react";

export interface FieldsetProps {
  title: string;
  children: JSX.Element;
  icon?: JSX.Element;
  fieldsetRef?: React.MutableRefObject<HTMLFieldSetElement>;
}

function Fieldset(props: FieldsetProps) {
  const { title, children, icon, fieldsetRef } = props;

  return (
    <StyledFieldset ref={fieldsetRef}>
      <legend>
        <Stack padding="s050" alignItems="center">
          <Icon icon={icon} appearance="gray" />
          <Text type="title" size="small" appearance="gray">
            {title}
          </Text>
        </Stack>
      </legend>
      {children}
    </StyledFieldset>
  );
}

export { Fieldset };
