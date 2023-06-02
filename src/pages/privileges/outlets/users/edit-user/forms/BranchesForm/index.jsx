import { useState } from "react";
import { BranchesFormUI } from "./interface";

function BranchesForm(props) {
  const { currentBranches, handleSubmit } = props;
  const [branches, setBranches] = useState(currentBranches);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeBranches = (branches) => {
    setBranches(branches);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If this function is async, the form will be submitted before the state is updated
    handleSubmit(branches);
    setIsLoading(false);
  };

  const handleReset = () => {
    setBranches(currentBranches);
  };

  return (
    <BranchesFormUI
      handleChangeBranches={handleChangeBranches}
      handleSubmitForm={handleSubmitForm}
      handleReset={handleReset}
      isLoading={isLoading}
      currentBranches={currentBranches}
      branches={branches}
    />
  );
}

export { BranchesForm };
