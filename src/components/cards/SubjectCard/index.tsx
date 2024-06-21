import { useState } from "react";

import { InteractiveModal } from "@components/feedback/InteractiveModal";
import { useMediaQuery } from "@inubekit/hooks";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inube/design-system";

import { StyledSubjectCard } from "./styles";
import { ILabel } from "./types";

interface SubjectCardProps {
  subjectData: Record<string, string | number> | any;
  title: string;
  labels?: ILabel[];
  icon?: JSX.Element;
}

function SubjectCard(props: SubjectCardProps) {
  const { subjectData, title, labels, icon } = props;
  const [showModal, setShowModal] = useState(false);

  const smallScreen = useMediaQuery("(max-width: 970px)");

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <StyledSubjectCard
        onClick={handleToggleModal}
        $smallScreen={smallScreen}
        $isActive={showModal}
      >
        <Stack
          justifyContent={smallScreen ? "center" : "flex-end"}
          gap={smallScreen ? "0px" : "8px"}
          padding={smallScreen ? "0px" : "8px"}
        >
          {!smallScreen && (
            <Stack direction="column">
              <Text type="label" size="medium" textAlign="end">
                {Object.values(subjectData)[0]}
              </Text>
              <Text size="small" textAlign="end">
                {Object.values(subjectData)[1]}
              </Text>
            </Stack>
          )}
          <Stack
            width={smallScreen ? "56px" : "260"}
            height={smallScreen ? "56px" : "auto"}
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              appearance={showModal ? "primary" : "dark"}
              icon={icon}
              size="24px"
              shape="circle"
              spacing="none"
            />
          </Stack>
        </Stack>
      </StyledSubjectCard>
      {showModal && (
        <InteractiveModal
          title={title}
          closeModal={handleToggleModal}
          infoData={subjectData}
          labels={labels}
          portalId="portal"
        />
      )}
    </>
  );
}

export { SubjectCard };
export type { SubjectCardProps };
