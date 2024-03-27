import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Textfield, useMediaQuery } from "@inube/design-system";

import { InteractiveModal } from "@components/feedback/InteractiveModal";

import { ILabel } from "./types";
import { StyledSearchUserCard } from "./styles";

interface SearchUserCardProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  idModal: string;
  nameModal: string;
  labelModal: string;
  placeholderModal: string;
  userData: { [key: string]: string | number }[] | Record<string, unknown>[];
  searchFieldData: Record<string, string | number>;
  title: string;
  infoTitle: string;
  labels?: ILabel[];
  onUserSelect: (data: { [key: string]: string | number }) => void;
  onReset: (field: () => void) => void;
  idLabel?: string;
  nameLabel?: string;
  selectedId?: string;
}

function SearchUserCard(props: SearchUserCardProps) {
  const {
    id,
    label,
    name,
    placeholder,
    idModal,
    nameModal,
    labelModal,
    placeholderModal,
    searchFieldData,
    userData,
    title,
    infoTitle,
    labels,
    onUserSelect,
    idLabel = "userID",
    nameLabel = "username",
    selectedId = "",
    onReset,
  } = props;
  const [showModal, setShowModal] = useState(false);

  const [selectedUsername, setSelectedUsername] = useState(selectedId);

  const smallScreen = useMediaQuery("(max-width: 970px)");

  useEffect(() => {
    if (selectedId.length > 0) {
      userData.forEach((data) => {
        if (data[idLabel] === selectedId) {
          setSelectedUsername(String(data[nameLabel]));
        }
      });
    }
  }, [idLabel, nameLabel, userData, selectedId]);

  const resetSelectedUser = () => {
    setSelectedUsername("");
  };

  useEffect(() => {
    if (onReset) {
      onReset(resetSelectedUser);
    }
  }, [onReset]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleUserSelect = (data: { [key: string]: string | number }) => {
    if (data && data[nameLabel]) {
      setSelectedUsername(String(data[nameLabel]));
    }
    onUserSelect(data);
    handleToggleModal();
  };

  return (
    <>
      <StyledSearchUserCard
        onClick={handleToggleModal}
        smallScreen={smallScreen}
        isActive={showModal}
      >
        <Textfield
          id={id}
          label={label}
          name={name}
          placeholder={placeholder}
          type="search"
          required={true}
          iconAfter={<MdSearch />}
          size="compact"
          fullwidth={true}
          readOnly
          value={selectedUsername}
        />
      </StyledSearchUserCard>
      {showModal && (
        <InteractiveModal
          title={title}
          infoTitle={infoTitle}
          closeModal={handleToggleModal}
          infoData={searchFieldData}
          labels={labels}
          portalId="portal"
          searchData={userData}
          id={idModal}
          name={nameModal}
          label={labelModal}
          placeholder={placeholderModal}
          divider
          type="search"
          onClick={handleUserSelect}
          idLabel={idLabel}
          nameLabel={nameLabel}
        />
      )}
    </>
  );
}

export { SearchUserCard };
export type { SearchUserCardProps };
