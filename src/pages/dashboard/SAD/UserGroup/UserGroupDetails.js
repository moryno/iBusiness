import { useCallback } from "react";
import {
  userGroupActionsSource,
  updateMenuSource,
} from "../../../../data/dashboard-page/menu";
import { userGroupDetail } from "../../../../data/headingFooterTitle";
import GroupDetails from "../../../../components/dashboard/Shared/DetailsComponents/GroupDetails";
import { useDispatch } from "react-redux";
import { deleteUserGroupSuccess } from "../../../../redux/reducers/userGroupSlice";
import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";
import DetailsPage from "../DetailsPage";
import { useNavigate } from "react-router-dom";

const UserGroupDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = useCallback(
    (recordId) => {
      dispatch(deleteUserGroupSuccess(recordId));
    },
    [dispatch]
  );

  const onCustomActionClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Users":
          navigate("/dashboard/SAD/users");
          break;
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
      heading={userGroupDetail.heading}
      footer={userGroupDetail.footer}
      title={`${userGroupDetail.title}`}
      menus={updateMenuSource}
      url={"UserGroups"}
      customAction={userGroupActionsSource}
      onActionClick={onCustomActionClick}
      company={userGroupDetail.company}
      deleteMsg={userGroupDetail.heading}
      onDelete={onDelete}
      DetailComponent={GroupDetails}
      FormComponent={UserGroupForm}
    />
  );
};

export default UserGroupDetails;
