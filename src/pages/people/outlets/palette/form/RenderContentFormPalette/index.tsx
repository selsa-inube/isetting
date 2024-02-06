import { useState } from "react";
import { IUsersMessage } from "@src/pages/privileges/outlets/users/types/users.types";
import { inube } from "@inube/design-system";
import { IHandleSubmitProps } from "@src/routes/people";
import { paletteMessagesConfig } from "../../config/palette.config";
import { RenderContentFormPaletteUI } from "./interface";

interface RenderContentFormPaletteProps {
  formType: string;
  handleSubmit: (props: IHandleSubmitProps) => void;
  token: typeof inube;
}

function RenderContentFormPalette(props: RenderContentFormPaletteProps) {
  const { formType, handleSubmit, token } = props;
  const [paletteToken, setPaletteToken] = useState(
    JSON.parse(JSON.stringify({ ...token.color.palette }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<IUsersMessage>({
    visible: false,
  });

  const hasChanges = (): boolean => {
    return JSON.stringify(token.color.palette) !== JSON.stringify(paletteToken);
  };

  const handleColorChange = (
    tokenName: string,
    newColor: string | undefined
  ) => {
    setPaletteToken((prevTokens: typeof inube) => {
      const newTokens = { ...prevTokens };
      for (const category in newTokens) {
        if (newTokens[category][tokenName]) {
          newTokens[category][tokenName] = newColor;
          break;
        }
      }
      return newTokens;
    });
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
            data: paletteMessagesConfig.success,
          });
          handleSubmit({
            domain: "color",
            block: "palette",
            tokenUpdate: paletteToken,
          });
        }
      })
      .catch(() => {
        setMessage({
          visible: true,
          data: paletteMessagesConfig.failed,
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
    setPaletteToken(JSON.parse(JSON.stringify({ ...token.color.palette })));
  };
  const updatedTheme = {
    ...token,
    color: {
      ...token.color,
      palette: paletteToken,
    },
  };

  return (
    <RenderContentFormPaletteUI
      categories={paletteToken}
      formType={formType}
      handleCloseMessage={handleCloseSectionMessage}
      handleColorChange={handleColorChange}
      handleReset={handleReset}
      handleSubmitForm={handleSubmitForm}
      hasChanges={hasChanges}
      isLoading={isLoading}
      message={message}
      updatedTheme={updatedTheme}
    />
  );
}

export { RenderContentFormPalette };
export type { RenderContentFormPaletteProps };