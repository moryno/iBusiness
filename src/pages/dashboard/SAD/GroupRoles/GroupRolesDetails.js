import { updateMenuSource } from "../../../../data/dashboard-page/menu";
import { groupRolesDetails } from "../../../../data/headingFooterTitle";
import { groupRolesActions } from "../../../../data/dashboard-page/moduleSource";
import GridItemContent from "../../../../components/dashboard/Shared/DetailsComponents/GridItemContent";
import { deleteGroupRolesuccess } from "../../../../redux/reducers/groupRoleSlice";
import DetailsPage from "../DetailsPage";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import GroupRolesForm from "../../../../components/dashboard/SAD/GroupRoles/GroupRolesForm";
import { useNavigate } from "react-router-dom";

const GroupRolesDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = useCallback(
    (recordId) => {
      dispatch(deleteGroupRolesuccess(recordId));
    },
    [dispatch]
  );

  const onCustomActionClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Security Groups":
          navigate("/dashboard/SAD/security-groups");
          break;
        case "Roles":
          navigate("/dashboard/SAD/roles");
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
    <DetailsPage
      heading={groupRolesDetails.heading}
      footer={groupRolesDetails.footer}
      title={`${groupRolesDetails.title}`}
      menus={updateMenuSource}
      url={"GroupRoles"}
      customAction={groupRolesActions}
      onActionClick={onCustomActionClick}
      company={groupRolesDetails.company}
      deleteMsg={groupRolesDetails.heading}
      onDelete={onDelete}
      DetailComponent={GridItemContent}
      FormComponent={GroupRolesForm}
    />
  );
};

export default GroupRolesDetails;
