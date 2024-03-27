import { useState } from "react";
import { Icon } from "@inube/design-system";
import { InteractiveModal } from "@components/feedback/InteractiveModal";
import { UseCase } from "@pages/privileges/outlets/linixUseCase/types";

interface IDetailsModalProps {
  icon: JSX.Element;
  useCase: UseCase;
}

export function DetailsModal(props: IDetailsModalProps) {
  const { icon, useCase } = props;
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(false);
  };
  return (
    <>
      <Icon
        icon={icon}
        size="16px"
        appearance="dark"
        onClick={() => setShowModal(true)}
        cursorHover
      />
      {showModal && (
        <InteractiveModal
          portalId="portal"
          title="Detalles caso de uso"
          infoData={{
            Codigo: useCase?.k_Usecase || "",
            Nombre: useCase?.n_Usecase || "",
            Tipo: useCase?.i_Tipusec || "",
            Descripicion: useCase?.n_Descrip || "",
            "Opción botón cliente servidor":
              useCase?.k_Nforma + "-" + useCase?.k_Ncampo || "",
          }}
          infoTitle="Información"
          closeModal={handleClick}
        />
      )}
    </>
  );
}
