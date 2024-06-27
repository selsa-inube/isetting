import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";

import { Icon } from "@inube/design-system";
import { deleteItemData } from "@mocks/utils/dataMock.service";

import { deleteLinixUseCaseModal } from "../delete-linix-use-case/config/deleteLinixUseCase.config";
import { DetailsModal } from "../components/DetailsModal";
import { UseCase } from "../types";
import { DeleteLinixUseCase } from "../delete-linix-use-case";
import { OptionSelect } from "../adding-linix-use-case/config/selectLinixUseCase.config";

export const formSelectLabel = (value: string) => {
  return OptionSelect.find((option: any) => value === option.label)?.id;
};
export const formSelectOptionId = (value: string) => {
  return OptionSelect.find((option: any) => value === option.id)?.label;
};

const titlesOptions = [
  {
    id: "k_Usecase",
    titleName: "Código",
    priority: 0,
  },

  {
    id: "n_Usecase",
    titleName: "Nombre",
    priority: 1,
  },

  {
    id: "i_Tipusec",
    titleName: "Tipo",
    priority: 2,
  },
];

const useCasesBreakPointsConfig = [
  { breakpoint: "(min-width: 1091px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1090px)", totalColumns: 3 },
  { breakpoint: "(max-width: 1002px)", totalColumns: 2 },
  { breakpoint: "(max-width: 837px)", totalColumns: 3 },
  { breakpoint: "(max-width: 550px)", totalColumns: 2 },
  { breakpoint: "(max-width: 360px)", totalColumns: 1 },
];

export const actionsConfigLinixUseCase = (
  linixUseCases: UseCase[],
  setIdDeleted: (show: string) => void
) => {
  const dataDetailsLinixUseCase = (k_Usecase: string) => {
    const data = [
      linixUseCases.find(
        (linixUseCases) => linixUseCases.k_Usecase === k_Usecase
      )!,
    ].map((linixUseCasesSelected) => ({
      Código: linixUseCasesSelected?.k_Usecase,
      Nombre: linixUseCasesSelected?.n_Usecase,
      Tipo: linixUseCasesSelected?.i_Tipusec,
      Descripcion: linixUseCasesSelected?.n_Descrip,
      "Opción botón cliente servidor": linixUseCasesSelected?.k_Ncampo,
    }));
    return [...data].shift();
  };

  const actionsConfig = [
    {
      id: "Details",
      actionName: "Detalles",
      content: ({ k_Usecase }: { k_Usecase: string }) => (
        <DetailsModal data={dataDetailsLinixUseCase(k_Usecase)} />
      ),
      type: "secondary",
    },
    {
      id: "Edit",
      actionName: "Editar",
      content: ({ k_Usecase }: { k_Usecase: string }) => (
        <Link to={`edit/${k_Usecase}`}>
          <Icon appearance="dark" cursorHover icon={<MdModeEdit />} />
        </Link>
      ),
      type: "primary",
    },
    {
      id: "Delete",
      actionName: "Eliminar",
      content: ({
        k_Usecase,
        n_Usecase,
      }: {
        k_Usecase: string;
        n_Usecase: string;
      }) => (
        <DeleteLinixUseCase
          linixUseCase={k_Usecase}
          deleteLinixUseCaseModal={deleteLinixUseCaseModal}
          handleDeleteLinixUseCase={deleteItemData}
          setIdDeleted={setIdDeleted}
          nameLinixuseCase={n_Usecase}
        />
      ),
      type: "remove",
    },
  ];
  return actionsConfig;
};

export { useCasesBreakPointsConfig, titlesOptions };
