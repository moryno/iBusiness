import React, { useCallback, useState } from "react";
import RightBarHeader from "../../Shared/DetailsComponents/RightBarHeader";
import CustomActionModal from "../../../modals/CustomActionModal";
import UserGroupForm from "../UserGroup/UserGroupForm";
import { useNavigate } from "react-router-dom";

const SecurityRightBar = ({ customAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onCustomActionClick = useCallback(
    (menu) => {
      switch (menu) {
        case "User Groups":
          navigate("/dashboard/SAD/user-groups");
          break;
        case "Group Roles":
          navigate("/dashboard/SAD/group-roles");
          break;
        case "Delete":
          break;
        case "Close":
          console.log("Close was clicked");
          break;
        case "Help":
          console.log("Help was clicked");
          break;

        default:
          break;
      }
    },
    [navigate]
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex bg-white flex-col gap-4 box-border">
      <RightBarHeader
        customAction={customAction}
        handleClick={onCustomActionClick}
      />
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
