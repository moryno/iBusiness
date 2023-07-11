import React, { useState } from "react";
import RightBarHeader from "../../Shared/DetailsComponents/RightBarHeader";
import CustomActionModal from "../../../modals/CustomActionModal";
import SalesApprovalComponent from "../../Shared/SalesApprovalComponent";

const SecurityRightBar = ({ customAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (action) => {
    switch (action) {
      case "Approve":
        setIsOpen(true);
        break;

      default:
        break;
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex flex-col gap-4 box-border">
      <RightBarHeader customAction={customAction} handleClick={handleClick} />
      <CustomActionModal
        title={"Security"}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <SalesApprovalComponent handleClose={handleClose} />
      </CustomActionModal>
    </main>
  );
};

export default SecurityRightBar;
