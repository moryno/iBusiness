import React, { useState } from "react";
import RightBarHeader from "../../Shared/DetailsComponents/RightBarHeader";
import CustomActionModal from "../../../modals/CustomActionModal";
import SalesApprovalComponent from "../../Shared/SalesApprovalComponent";
import UserGroupForm from "../UserGroup/UserGroupForm";

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
    <main className="flex bg-white flex-col gap-4 box-border">
      <RightBarHeader customAction={customAction} handleClick={handleClick} />
      <CustomActionModal
        title={"Security"}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <UserGroupForm handleClose={handleClose} />
      </CustomActionModal>
    </main>
  );
};

export default SecurityRightBar;
