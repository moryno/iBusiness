import { updateMenuSource } from "../../../../data/dashboard-page/menu";
import { rolesDetails } from "../../../../data/headingFooterTitle";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { rolesActions } from "../../../../data/dashboard-page/moduleSource";
import { deleteRoleSuccess } from "../../../../redux/reducers/rolesSlice";
import GridItemContent from "../../../../components/dashboard/Shared/DetailsComponents/GridItemContent";
import RolesForm from "../../../../components/dashboard/SAD/Roles/RolesForm";
import DetailsPage from "../DetailsPage";
import { useNavigate } from "react-router-dom";

const RolesDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = useCallback(
    (recordId) => {
      dispatch(deleteRoleSuccess(recordId));
    },
    [dispatch]
  );

  const onCustomActionClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Group Roles":
          navigate("/dashboard/SAD/group-roles");
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
    <DetailsPage
      heading={rolesDetails.heading}
      footer={rolesDetails.footer}
      title={rolesDetails.title}
      menus={updateMenuSource}
      url={"Roles"}
      customAction={rolesActions}
      onActionClick={onCustomActionClick}
      company={rolesDetails.company}
      deleteMsg={rolesDetails.heading}
      onDelete={onDelete}
      DetailComponent={GridItemContent}
      FormComponent={RolesForm}
    />
  );
};

export default RolesDetails;
