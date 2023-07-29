import { useDispatch, useSelector } from "react-redux";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { groupRolesColumns } from "../../../../data/datagrid-json/datagridColumns";
import { groupRoleHeadingFooter } from "../../../../data/headingFooterTitle";
import GroupPage from "../GroupPage";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { groupRolesActions } from "../../../../data/dashboard-page/moduleSource";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import GroupRolesForm from "../../../../components/dashboard/SAD/GroupRoles/GroupRolesForm";
import { getGroupRoles } from "../../../../redux/actions/roleUserRolesCall";
import { deleteGroupRolesuccess } from "../../../../redux/reducers/groupRoleSlice";

const GroupRoles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [page, setPage] = useState("");

  const groupRoles = useSelector((state) => state?.groupRoles?.groups);
  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  useEffect(() => {
    getGroupRoles(dispatch);
    const menuItem = homeMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "grouproles"
      ]?.permissions.includes(item.title)
    );

    const page =
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems["grouproles"]?.name;

    const rolesAction = groupRolesActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["roles"]?.name ===
        item.title
    );
    const userGroupsAction = groupRolesActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["usergroups"]
          ?.name === item.title
    );
    const actionArray = rolesAction.concat(userGroupsAction);

    setFilteredActions(actionArray);
    setFilteredMenus(menuItem);
    setPage(page);
  }, [dispatch, moduleMenus]);

  const onDelete = useCallback(
    (recordId) => {
      dispatch(deleteGroupRolesuccess(recordId));
    },
    [dispatch]
  );

  const onCustomActionClick = useCallback(
    (menu) => {
      switch (menu) {
        case "User Groups":
          navigate("/dashboard/SAD/user-groups");
          break;
        case "Roles":
          navigate("/dashboard/SAD/user-roles");
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
      menus={filteredMenus}
      roles={page}
      customActions={filteredActions}
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
