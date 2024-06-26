import { useContext, useEffect, useState } from "react";
import { RenderSurfaceContentFormUI } from "./interface";
import { IUsersMessage } from "@pages/privileges/outlets/users/types/users.types";
import {
  surfaceFormsConfig,
  surfaceMessagesConfig,
} from "@pages/people/outlets/color/surfaces/config/surface.config";
import { TokenContext } from "@context/TokenContext";
import { SurfaceAppearance } from "@pages/people/outlets/color/surfaces/types";
import { inube } from "@inube/design-system";
import { tokenCalculator } from "@src/utils/tokenCalculator";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";

interface RenderSurfaceContentFormProps {
  formType: SurfaceAppearance;
  surfaceConfig: typeof surfaceFormsConfig;
}

function RenderSurfaceContentForm(props: RenderSurfaceContentFormProps) {
  const { formType, surfaceConfig } = props;
  const { tokenWithRef, handleSubmit, loading } = useContext(TokenContext);
  const [surfaceToken, setSurfaceToken] = useState<typeof inube>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<IUsersMessage>({
    visible: false,
  });
  const [toggleActive, setToggleActive] = useState(false);
  const [navLinkIsSelected, setNavLinkIsSelected] = useState(false);

  useEffect(() => {
    if (!loading && tokenWithRef.color && tokenWithRef.color.surface) {
      setSurfaceToken(
        JSON.parse(JSON.stringify({ ...tokenWithRef.color.surface }))
      );
    }
  }, [loading, tokenWithRef]);

  if (
    Object.keys(surfaceToken).length === 0 &&
    surfaceToken.constructor === Object
  ) {
    return <LoadingAppUI />;
  }

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

  const updatedTokens = {
    ...tokenWithRef,
    color: {
      ...tokenWithRef.color,
      surface: surfaceToken,
    },
  };

  const updatedTheme = tokenCalculator(updatedTokens);
  return (
    <RenderSurfaceContentFormUI
      formType={formType}
      handleCloseMessage={handleCloseSectionMessage}
      handleReset={handleReset}
      handleSubmitForm={handleSubmitForm}
      handleTokenChange={handleTokenChange}
      hasChanges={hasChanges}
      isLoading={isLoading}
      message={message}
      surfaceConfig={surfaceConfig}
      updatedTheme={updatedTheme}
      toggleActive={toggleActive}
      setToggleActive={setToggleActive}
      navLinkIsSelected={navLinkIsSelected}
      setNavLinkIsSelected={setNavLinkIsSelected}
      surfaceToken={surfaceToken}
    />
  );
}

export { RenderSurfaceContentForm };
export type { RenderSurfaceContentFormProps };
