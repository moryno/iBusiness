import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { userGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { userGroupHeadingFooter } from "../../../../data/headingFooterTitle";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { getUserGroups } from "../../../../redux/actions/userManagementCall";
import { userGroupActions } from "../../../../data/dashboard-page/moduleSource";
import { useNavigate } from "react-router-dom";
import GroupPage from "../GroupPage";
import { deleteUserGroupSuccess } from "../../../../redux/reducers/userGroupSlice";

const UserGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userGroups = useSelector((state) => state?.userGroups?.groups);

  useEffect(() => {
    getUserGroups(dispatch);
  }, [dispatch]);

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
    <GroupPage
      records={userGroups}
      heading={userGroupHeadingFooter.heading}
      title={userGroupHeadingFooter.title}
      footer={userGroupHeadingFooter.footer}
      company={userGroupHeadingFooter.company}
      menus={homeMenuSource}
      customActions={userGroupActions}
      keyExpr={"userGroupID"}
      columns={userGroupsColumns}
      url={"UserGroups"}
      onActionClick={onCustomActionClick}
      redirectRoute={"SAD/user-groups"}
      filterValues={bookingFilterValues}
      className={"security-admin"}
      onDelete={onDelete}
      FormComponent={UserGroupForm}
    />
  );
};

export default UserGroup;
