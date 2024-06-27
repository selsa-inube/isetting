import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Stack,
  Text,
  Blanket,
  useMediaQuery,
  Textfield,
  Icon,
} from "@inube/design-system";
import { StyledModal, StyledDivider } from "./styles";
import { InteractiveModalProps } from "./types";
import { SetStateAction, useState } from "react";
import { SubjectSearchCard } from "@components/cards/SubjectSearchCard";

const InteractiveModal = ({
  actions = [],
  actionsTitle,
  closeModal,
  divider,
  id,
  infoData,
  idLabel = "userID",
  infoTitle,
  labels = [],
  label,
  name,
  nameLabel = "username",
  onClick,
  placeholder,
  portalId,
  searchData,
  selectedItem,
  setValidateCardRemoved,
  title,
  type = "fields",
}: InteractiveModalProps) => {
  const smallScreen = useMediaQuery("(max-width: 580px)");
  const hasActions = actions.length > 0;
  const hasLabels = labels.length > 0;
  const node = document.getElementById(portalId);
  const [filterText, setFilterText] = useState("");
  const [closeCard, setCloseCard] = useState(false);

  const removeCard = () => {
    const dataEmpty = {
      id: "",
      name: "",
    };
    onClick(dataEmpty);
    setCloseCard(true);
    setValidateCardRemoved && setValidateCardRemoved(true);
  };

  const renderCard = (data: { [key: string]: string }) => {
    if (data[idLabel] !== selectedItem) return null;

    return (
      <SubjectSearchCard
        key={data[idLabel]}
        subjectSearchData={{
          id: data[idLabel],
          name: data[nameLabel],
        }}
        onClick={() => onClick(data)}
        closeIcon
        closeSearchCard={removeCard}
      />
    );
  };

  const handleFilterChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setFilterText(e.target.value);
  };

  const filteredSearchData =
    filterText && searchData
      ? Object.values(searchData).filter(
          (data: { [key: string]: string }) =>
            data[nameLabel].toLowerCase().includes(filterText.toLowerCase()) ||
            data[idLabel].toLowerCase().includes(filterText.toLowerCase())
        )
      : searchData;

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={smallScreen} type={type}>
        <Stack direction="column" gap="24px">
          <Stack direction="column" gap="20px">
            <Stack alignItems="center" justifyContent="space-between">
              <Text type="headline" size="small" appearance="dark">
                {title}
              </Text>
              <Icon
                appearance={"dark"}
                icon={<MdClear />}
                spacing="wide"
                size="24px"
                cursorHover
                onClick={closeModal}
              />
            </Stack>
            {infoTitle && (
              <Text type="body" size="medium" appearance="gray">
                {infoTitle}
              </Text>
            )}
            {!closeCard &&
              searchData &&
              Object.values(searchData).map(renderCard)}

            {divider && <StyledDivider $smallScreen={smallScreen} />}
            {type === "fields" ? (
              hasLabels ? (
                labels.map(
                  (field) =>
                    infoData[field.id] && (
                      <Textfield
                        key={field.id}
                        label={field.titleName}
                        name={field.id}
                        id={field.id}
                        placeholder={field.titleName}
                        value={infoData[field.id]}
                        fullwidth={true}
                        type="text"
                        size="compact"
                      />
                    )
                )
              ) : (
                Object.keys(infoData).map((index) => (
                  <Textfield
                    key={index}
                    label={index}
                    name={index}
                    id={index}
                    placeholder={index}
                    value={infoData[index]}
                    fullwidth={true}
                    type="text"
                    size="compact"
                    readOnly
                  />
                ))
              )
            ) : (
              <>
                <Textfield
                  key="searchField"
                  id={id}
                  label={label}
                  name={name}
                  placeholder={placeholder}
                  value={filterText}
                  onChange={handleFilterChange}
                  fullwidth={true}
                  type="text"
                  size="compact"
                />
                {filterText &&
                  filteredSearchData &&
                  Object.values(filteredSearchData).map(
                    (data: { [key: string]: string }) => (
                      <SubjectSearchCard
                        key={data[idLabel]}
                        subjectSearchData={{
                          id: data[idLabel],
                          name: data[nameLabel],
                        }}
                        onClick={() => onClick(data)}
                      />
                    )
                  )}
              </>
            )}
          </Stack>
          {hasActions && (
            <Stack direction="column" gap="16px">
              <Text type="title" size="medium" appearance="dark">
                {actionsTitle}
              </Text>
              {actions.map((action) => (
                <Stack key={action.id} gap="10px">
                  {typeof action.content === "function"
                    ? action.content(infoData)
                    : action.content}
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};

export { InteractiveModal };
