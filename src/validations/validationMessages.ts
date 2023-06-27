const validationMessages = {
  maxCharacters: (count: number) => `Debe tener máximo ${count} caracteres`,
  minCharacters: (count: number) => `Debe tener al menos ${count} caracteres`,
  maxNumbers: (count: number) => `Debe tener máximo ${count} números`,
  minNumbers: (count: number) => `Debe tener al menos ${count} números`,
  required: "Este campo no puede estar vacío",
  validUsername: "Este campo debe contener solo letras",
  validChars: "Este campo debe contener un número de identificación válido",
  validEmail:
    "Este campo debe tener una dirección de correo electrónico válida",
  validPhone: "Este campo debe tener un número de teléfono válido",
};

export { validationMessages };
