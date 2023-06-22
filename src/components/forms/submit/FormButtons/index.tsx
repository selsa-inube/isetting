import { Button, Stack } from "@inube/design-system";
import { StyledSubmitContainer } from "./styles";

interface FormButtonsProps {
  children: React.ReactNode;
  handleSubmit: () => void;
  handleReset: () => void;
  disabledButtons?: boolean;
  isLoading?: boolean;
}

function FormButtons(props: FormButtonsProps) {
  const { children, handleSubmit, handleReset, disabledButtons, isLoading } =
    props;

  return (
    <Stack direction="column">
      <Stack>{children}</Stack>
      <StyledSubmitContainer>
        <Button
          appearance="secondary"
          isDisabled={disabledButtons}
          handleClick={handleReset}
          type="reset"
        >
          Cancelar
        </Button>
        <Button
          appearance="confirm"
          handleClick={handleSubmit}
          isLoading={isLoading}
          isDisabled={disabledButtons}
          type="button"
        >
          Guardar
        </Button>
      </StyledSubmitContainer>
    </Stack>
  );
}

export { FormButtons };
export type { FormButtonsProps };