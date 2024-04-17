import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Divider } from "@src/components/layout/Divider";
import { Icon, Text, useMediaQuery } from "@inube/design-system";
import { StyledContainer, StyledHead } from "./styles";

export interface IAccordionProps {
  title: string;
  defaultOpen?: boolean;
  children?: JSX.Element | JSX.Element[];
  dashed?: boolean;
}
export const Accordion = (props: IAccordionProps) => {
  const { title, defaultOpen = true, children, dashed } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggleOpen = () => setIsOpen(!isOpen);

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <StyledContainer>
      <StyledHead onClick={handleToggleOpen}>
        <Text type="label" size={isMobile ? "medium" : "large"}>
          {title}
        </Text>

        <Icon
          icon={isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          appearance="dark"
          spacing="compact"
          cursorHover={true}
          size="24px"
        />
      </StyledHead>

      {isOpen && (
        <>
          <Divider dashed={dashed} />
          {children}
        </>
      )}
    </StyledContainer>
  );
};
