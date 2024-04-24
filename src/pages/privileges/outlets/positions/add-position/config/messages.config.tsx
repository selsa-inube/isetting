import { MdOutlineSentimentNeutral, MdThumbUpOffAlt } from "react-icons/md";
import { EAppearance } from "@src/types/colors.types";

export const generalMessage = {
  success: {
    id: 1,
    icon: <MdThumbUpOffAlt size={18} />,
    title: "Cambios guardados con éxito!",
    description: "Hemos guardado los cambios correctamente ",
    appearance: EAppearance.SUCCESS,
  },
  failed: {
    id: 2,
    icon: <MdOutlineSentimentNeutral size={18} />,
    title: "Oops, something has gone wrong!",
    description: "We had trouble saving changes for the user LGARZON",
    appearance: EAppearance.ERROR,
  },
};
