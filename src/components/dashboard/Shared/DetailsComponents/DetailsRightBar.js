import React, { useState } from "react";
import CustomActionModal from "../../../modals/CustomActionModal";
import RightBarHeader from "./RightBarHeader";

const DetailsRightBar = ({ customAction, onActionClick, FormComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex h-full bg-white flex-col gap-4 box-border">
      <RightBarHeader customAction={customAction} handleClick={onActionClick} />
      <CustomActionModal
        title={"Orders Approval"}
        isOpen={isOpen}
        handleClose={handleClose}
        FormComponent
      >
        <FormComponent handleClose={handleClose} />
      </CustomActionModal>
    </main>
  );
};

export default DetailsRightBar;
