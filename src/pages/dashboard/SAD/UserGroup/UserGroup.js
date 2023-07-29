import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { userGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { userGroupHeadingFooter } from "../../../../data/headingFooterTitle";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getUserGroups } from "../../../../redux/actions/userManagementCall";
import { userGroupActions } from "../../../../data/dashboard-page/moduleSource";
import { useNavigate } from "react-router-dom";
import GroupPage from "../GroupPage";
import { deleteUserGroupSuccess } from "../../../../redux/reducers/userGroupSlice";

const UserGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [page, setPage] = useState("");

  const userGroups = useSelector((state) => state?.userGroups?.groups);
  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  useEffect(() => {
    getUserGroups(dispatch);
    const menuItem = homeMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "usergroups"
      ]?.permissions.includes(item.title)
    );

    const page =
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems["usergroups"]?.name;

    const usersAction = userGroupActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["users"]?.name ===
        item.title
    );
    const securityGroupAction = userGroupActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["securitygroups"]
          ?.name === item.title
    );
    const rolesAction = userGroupActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["roles"]?.name ===
        item.title
    );
    const groupRolesAction = userGroupActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["grouproles"]
          ?.name === item.title
    );
    const actionArray = usersAction.concat(
      securityGroupAction,
      rolesAction,
      groupRolesAction
    );

    setFilteredActions(actionArray);
    setFilteredMenus(menuItem);
    setPage(page);
  }, [dispatch, moduleMenus]);

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
        case "Group Roles":
          navigate("/dashboard/SAD/group-roles");
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
      menus={filteredMenus}
      roles={page}
      customActions={filteredActions}
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
