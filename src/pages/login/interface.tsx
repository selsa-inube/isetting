import { Outlet } from "react-router-dom";
import { Stack, Text } from "@inube/design-system";
import selsaLogo from "../../assets/images/selsa.png";

import {
  StyledLoginContainer,
  StyledWelcomeContainer,
  StyledOutletContainer,
  StyledImage,
} from "./styles";

function LoginUI() {
  return (
    <StyledLoginContainer>
      <StyledWelcomeContainer>
        <Stack direction="column">
          <Text type="headline" size="small" textAlign="center">
            Bienvenido
          </Text>
          <Text as="h1" type="headline" size="large">
            Portal de clientes
          </Text>
        </Stack>
        <StyledImage src={selsaLogo} alt="Sistemas Enlinea" />
      </StyledWelcomeContainer>
      <StyledOutletContainer>
        <Outlet />
      </StyledOutletContainer>
    </StyledLoginContainer>
  );
}

export { LoginUI };
