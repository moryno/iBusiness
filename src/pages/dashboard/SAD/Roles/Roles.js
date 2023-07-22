import React, { useCallback, useEffect } from "react";
import GroupPage from "../GroupPage";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { rolesHeadingFooter } from "../../../../data/headingFooterTitle";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { rolesColumns } from "../../../../data/datagrid-json/datagridColumns";
import { rolesActions } from "../../../../data/dashboard-page/moduleSource";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RolesForm from "../../../../components/dashboard/SAD/Roles/RolesForm";
import { getRoles } from "../../../../redux/actions/roleUserRolesCall";
import { deleteRoleSuccess } from "../../../../redux/reducers/rolesSlice";

const Roles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = useSelector((state) => state?.roles.roles);

  useEffect(() => {
    getRoles(dispatch);
  }, [dispatch]);

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

  const onDelete = useCallback(
    (recordId) => {
      dispatch(deleteRoleSuccess(recordId));
    },
    [dispatch]
  );

  return (
    <GroupPage
      records={roles}
      heading={rolesHeadingFooter.heading}
      title={rolesHeadingFooter.title}
      footer={rolesHeadingFooter.footer}
      company={rolesHeadingFooter.company}
      menus={homeMenuSource}
      customActions={rolesActions}
      keyExpr={"roleName"}
      columns={rolesColumns}
      url={"roles"}
      onActionClick={onCustomActionClick}
      redirectRoute={"SAD/roles"}
      className={"security-admin"}
      filterValues={bookingFilterValues}
      onDelete={onDelete}
      FormComponent={RolesForm}
    />
  );
};

export default Roles;
