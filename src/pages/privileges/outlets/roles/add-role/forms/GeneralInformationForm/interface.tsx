import { FormikValues } from "formik";
import {
  Stack,
  Textfield,
  Textarea,
  Grid,
  useMediaQuery,
} from "@inube/design-system";

import { SearchUserCard } from "@src/components/cards/SearchUserCard";

interface GeneralInformationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  handleSubmit: (dataSelect: { [key: string]: string | number }) => void;
  linixUseCases: Record<string, unknown>[];
}

const searchData = {
  "Digite el código o nombre de la aplicación.": "",
};

export function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const { formik, handleSubmit, linixUseCases } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Grid
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        gap="s0 s300"
        width={"100%"}
        autoRows="unset"
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          padding="s050 s0"
        >
          <Textfield
            label="Nombre Rol"
            placeholder="Nombe del rol"
            name="roleName"
            id="roleName"
            value={formik.values.roleName}
            type="text"
            size="compact"
            fullwidth
            onChange={formik.handleChange}
          />

          <SearchUserCard
            id="aplication"
            label="Aplicación"
            placeholder="Seleccione una opción"
            name="aplication"
            title="Búsqueda de aplicación"
            infoTitle="Buscar la aplicación para asignar el rol."
            idModal="searchField"
            nameModal="searchField"
            labelModal="Digite el código o nombre de la aplicación."
            placeholderModal="Digite el código o nombre de la aplicación."
            onUserSelect={handleSubmit}
            userData={linixUseCases}
            searchFieldData={searchData}
            onReset={() => {}}
            idLabel="k_Usecase"
            nameLabel="n_Usecase"
            selectedId={formik.values.aplication}
          />
        </Stack>

        <Textarea
          label="Descripción"
          placeholder="Ingresar descripción del rol."
          name="description"
          id="description"
          value={formik.values.description}
          type="text"
          size="compact"
          fullwidth
          maxLength={20}
          onChange={formik.handleChange}
        />
      </Grid>
    </form>
  );
}
