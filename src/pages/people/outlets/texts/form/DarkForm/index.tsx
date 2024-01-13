import { useState } from "react";
import { DarkFormUI } from "./interface";
import { inube } from "@inube/design-system";
import { IUsersMessage } from "@src/pages/privileges/outlets/users/types/users.types";
import { textMessagesConfig } from "../../config/text.config";
import { useNavigate } from "react-router-dom";

interface DarkFormProps {
  textConfig: any;
  originalTextConfig: typeof inube;
  textTokens: typeof inube;
  palette: typeof inube;
  onChange: (event: any) => void;
}

function DarkForm(props: DarkFormProps) {
  const { textTokens, originalTextConfig, textConfig, palette, onChange } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<IUsersMessage>({
    visible: false,
  });

  const navigate = useNavigate();

  const hasChanges = (): boolean => {
    return (
      JSON.stringify(originalTextConfig.text) !==
      JSON.stringify(textTokens.text)
    );
  };

  const onMessageClosed = () => {
    navigate(-1);
  };

  const handleSubmitForm = () => {
    setIsLoading(true);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = true;
        if (isSuccess) {
          originalTextConfig.text = textTokens.text;
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
            data: textMessagesConfig.success,
          });
        }
      })
      .catch(() => {
        setMessage({
          visible: true,
          data: textMessagesConfig.failed,
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

  return (
    <DarkFormUI
      handleChangeDark={onChange}
      handleSubmitForm={handleSubmitForm}
      handleReset={onMessageClosed}
      isLoading={isLoading}
      palette={palette}
      textConfig={textConfig}
      message={message}
      hasChanges={hasChanges}
      handleCloseMessage={handleCloseSectionMessage}
      onMessageClosed={onMessageClosed}
    />
  );
}

export type { DarkFormProps };
export { DarkForm };
