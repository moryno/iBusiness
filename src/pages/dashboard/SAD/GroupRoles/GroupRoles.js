import { useDispatch, useSelector } from "react-redux";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { groupRolesColumns } from "../../../../data/datagrid-json/datagridColumns";
import { groupRoleHeadingFooter } from "../../../../data/headingFooterTitle";
import GroupPage from "../GroupPage";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { groupRolesActions } from "../../../../data/dashboard-page/moduleSource";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import GroupRolesForm from "../../../../components/dashboard/SAD/GroupRoles/GroupRolesForm";
import { getGroupRoles } from "../../../../redux/actions/roleUserRolesCall";
import { deleteGroupRolesuccess } from "../../../../redux/reducers/groupRoleSlice";

const GroupRoles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groupRoles = useSelector((state) => state?.groupRoles?.groups);

  useEffect(() => {
    getGroupRoles(dispatch);
  }, [dispatch]);

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
    <GroupPage
      records={groupRoles}
      heading={groupRoleHeadingFooter.heading}
      title={groupRoleHeadingFooter.title}
      footer={groupRoleHeadingFooter.footer}
      company={groupRoleHeadingFooter.company}
      menus={homeMenuSource}
      customActions={groupRolesActions}
      keyExpr={"groupRoleID"}
      columns={groupRolesColumns}
      url={"GroupRoles"}
      onActionClick={onCustomActionClick}
      redirectRoute={"SAD/group-roles"}
      className={"security-admin"}
      filterValues={bookingFilterValues}
      onDelete={onDelete}
      FormComponent={GroupRolesForm}
    />
  );
};

export default GroupRoles;
