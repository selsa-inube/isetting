import { useContext, useState } from "react";
import { RenderContentFormSurfaceBlanketUI } from "./interface";
import { IUsersMessage } from "@pages/privileges/outlets/users/types/users.types";
import {
  surfaceFormsConfig,
  surfaceMessagesConfig,
} from "../../config/surface.config";
import { TokenContext } from "@context/TokenContext";
import { SurfaceAppearance } from "../../types";
import { tokenCalculator } from "@src/utilities/tokenCalculator";

interface RenderContentFormSurfaceBlanketProps {
  formType: SurfaceAppearance;
  surfaceConfig: typeof surfaceFormsConfig;
}

function RenderContentFormSurfaceBlanket(
  props: RenderContentFormSurfaceBlanketProps
) {
  const { formType, surfaceConfig } = props;
  const { tokenWithRef, handleSubmit } = useContext(TokenContext);
  const [surfaceToken, setSurfaceToken] = useState(
    JSON.parse(JSON.stringify({ ...tokenWithRef.color.surface }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showBlanket, setShowBlanket] = useState(false);
  const [toggleActive, setToggleActive] = useState(false);
  const [message, setMessage] = useState<IUsersMessage>({
    visible: false,
  });

  const hasChanges = (): boolean => {
    return (
      JSON.stringify(tokenWithRef.color.surface) !==
      JSON.stringify(surfaceToken)
    );
  };

  const handleTokenChange = (
    appearance: SurfaceAppearance,
    category: string,
    updatedTokenName: string
  ) => {
    let updatedSurfaceTokens = { ...surfaceToken };
    updatedSurfaceTokens[appearance][category] = updatedTokenName;
    setSurfaceToken(updatedSurfaceTokens);
  };

  const handleSubmitForm = () => {
    setIsLoading(true);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = true;
        if (isSuccess) {
          resolve("success");
        } else {
          reject("failed");
        }
      }, 2000);
    })
      .then((result) => {
        if (result === "success") {
          setMessage({
            visible: true,
            data: surfaceMessagesConfig.success,
          });
          handleSubmit({
            domain: "color",
            block: "surface",
            tokenUpdate: surfaceToken,
          });
        }
      })
      .catch(() => {
        setMessage({
          visible: true,
          data: surfaceMessagesConfig.failed,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloseSectionMessage = () => {
    setMessage({
      visible: false,
    });
  };

  const handleReset = () => {
    setSurfaceToken(
      JSON.parse(JSON.stringify({ ...tokenWithRef.color.surface }))
    );
  };

  const handleShowBlanket = () => {
    setShowBlanket(!showBlanket);
    setToggleActive(!toggleActive);
  };

  const updatedTokens = {
    ...tokenWithRef,
    color: {
      ...tokenWithRef.color,
      surface: surfaceToken,
    },
  };
  const updatedTheme = tokenCalculator(updatedTokens);

  return (
    <RenderContentFormSurfaceBlanketUI
      formType={formType}
      handleCloseMessage={handleCloseSectionMessage}
      handleReset={handleReset}
      handleSubmitForm={handleSubmitForm}
      handleShowBlanket={handleShowBlanket}
      handleTokenChange={handleTokenChange}
      hasChanges={hasChanges}
      isLoading={isLoading}
      message={message}
      showBlanket={showBlanket}
      surfaceConfig={surfaceConfig}
      toggleActive={toggleActive}
      setToggleActive={setToggleActive}
      updatedTheme={updatedTheme}
      surfaceToken={surfaceToken}
    />
  );
}

export { RenderContentFormSurfaceBlanket };
export type { RenderContentFormSurfaceBlanketProps };
