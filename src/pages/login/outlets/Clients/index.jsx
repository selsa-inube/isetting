import { useState } from "react";
import { clientsDataMock } from "@mocks/login/clients.mock";
import { ClientsUI } from "./interface";

function Clients() {
  const [search, setSearch] = useState("");
  const [client, setClient] = useState({
    ref: undefined,
    value: undefined,
  });

  function clientReset() {
    return {
      ref: undefined,
      value: undefined,
    };
  }

  function handleSearchChange({ target }) {
    if (client.ref) {
      client.ref.checked = false;
    }
    setClient(clientReset());
    setSearch(target.value);
  }

  function filterClients() {
    return clientsDataMock.filter((client) => {
      return (
        client.name.toUpperCase().includes(search.toUpperCase()) ||
        client.sigla.toUpperCase().includes(search.toUpperCase())
      );
    });
  }

  function handleClientChange({ target }) {
    setClient({
      ref: target,
      value: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <ClientsUI
      clients={clientsDataMock}
      search={search}
      client={client}
      handleSearchChange={handleSearchChange}
      handleClientChange={handleClientChange}
      filterClients={filterClients}
      handleSubmit={handleSubmit}
    />
  );
}

export { Clients };
