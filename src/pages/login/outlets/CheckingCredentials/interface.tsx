import { Stack, Text, Spinner } from "@inube/design-system";

function CheckingCredentialsUI() {
  return (
    <Stack gap="16px" direction="column">
      <Stack direction="column">
        <Text type="title" size="large" align="center">
          Validando credenciales
        </Text>
        <Text type="title" size="small" align="center">
          Espere un momento, por favor.
        </Text>
      </Stack>
      <Stack alignItems="center" direction="column">
        <Spinner size="large" />
      </Stack>
    </Stack>
  );
}

export { CheckingCredentialsUI };
