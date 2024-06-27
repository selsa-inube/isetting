interface Option {
  id: string;
  label: string;
  disabled: boolean;
}

export const OptionSelect: Option[] = [
  {
    id: "I",
    label: "Insertar",
    disabled: false,
  },
  {
    id: "M",
    label: "Modificar",
    disabled: false,
  },
  {
    id: "E",
    label: "Eliminar",
    disabled: false,
  },
];
