import { useCallback } from "react";
import GroupDetails from "../../../../components/dashboard/Shared/DetailsComponents/GroupDetails";
import { updateMenuSource } from "../../../../data/dashboard-page/menu";
import { securityDetail } from "../../../../data/headingFooterTitle";
import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import { deleteSecurityGroupSuccess } from "../../../../redux/reducers/securityGroupSlice";
import { useDispatch } from "react-redux";
import DetailsPage from "../DetailsPage";
import { securityActions } from "../../../../data/dashboard-page/moduleSource";
import { useNavigate } from "react-router-dom";

const SecurityDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = useCallback(
    (recordId) => {
      dispatch(deleteSecurityGroupSuccess(recordId));
    },
    [dispatch]
  );

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

  return (
    <DetailsPage
      heading={securityDetail.heading}
      footer={securityDetail.footer}
      title={`${securityDetail.title}`}
      menus={updateMenuSource}
      url={"SecurityGroups"}
      customAction={securityActions}
      onActionClick={onCustomActionClick}
      company={securityDetail.company}
      deleteMsg={securityDetail.heading}
      onDelete={onDelete}
      DetailComponent={GroupDetails}
      FormComponent={SecurityGroupForm}
    />
  );
};

export default SecurityDetails;
