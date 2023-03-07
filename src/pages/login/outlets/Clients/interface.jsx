import { Form } from "react-router-dom";

import { RadioClient } from "../../../../components/cards/RadioClient";
import { Text } from "../../../../components/data/Text";
import { Button } from "../../../../components/inputs/Button";
import { Input } from "../../../../components/inputs/Input";
import { MdSearch } from "react-icons/md";

import {
  StyledClients,
  StyledClientsList,
  StyledNoResults,
  StyledClientsItem,
} from "./styles";

function ClientsUI(props) {
  const {
    clients,
    search,
    client,
    handleSearchChange,
    handleClientChange,
    filterClients,
  } = props;

  return (
    <StyledClients>
      <Text as="h2" align="center" typoToken="titleLarge">
        Clientes
      </Text>
      <Text align="center">
        Selecciona la empresa a la que vas a representar
      </Text>
      <Form>
        {clients.length > 10 && (
          <Input
            placeholder="Search"
            type="search"
            value={search}
            handleChange={handleSearchChange}
            iconBefore={<MdSearch size={22} />}
          />
        )}
        {!filterClients().length && (
          <StyledNoResults>
            <Text>{`No se encontraron resultados para "${search}".`}</Text>
            <Text>{`Por favor, intenta modificando los parámetros de búsqueda.`}</Text>
          </StyledNoResults>
        )}
        <StyledClientsList scroll={clients.length > 5}>
          {filterClients().map((client) => (
            <StyledClientsItem key={client.id}>
              <RadioClient
                name="client"
                label={client.name}
                id={client.id}
                value={client.name}
                logo={client.logo}
                handleChange={handleClientChange}
              />
            </StyledClientsItem>
          ))}
        </StyledClientsList>
        <Button type="submit" disabled={client.value ? false : true}>
          Continuar
        </Button>
      </Form>
    </StyledClients>
  );
}

export { ClientsUI };
