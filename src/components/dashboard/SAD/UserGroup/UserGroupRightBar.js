import React, { useCallback } from "react";
import RightBarHeader from "../../Shared/DetailsComponents/RightBarHeader";

import { useNavigate } from "react-router-dom";

const UserGroupRightBar = ({ customAction }) => {
  const navigate = useNavigate();

  const onCustomActionClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Users":
          navigate("/dashboard/SAD/users");
          break;
        case "Security Groups":
          navigate("/dashboard/SAD/security-groups");
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

  return (
    <main className="flex bg-white flex-col gap-4 box-border">
      <RightBarHeader
        customAction={customAction}
        handleClick={onCustomActionClick}
      />
    </main>
  );
};

export default UserGroupRightBar;
