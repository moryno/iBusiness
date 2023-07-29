import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { securityGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { securityHeadingFooter } from "../../../../data/headingFooterTitle";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getSecurityGroups } from "../../../../redux/actions/userManagementCall";
import { securityActions } from "../../../../data/dashboard-page/moduleSource";
import { useNavigate } from "react-router-dom";
import GroupPage from "../GroupPage";
import { deleteSecurityGroupSuccess } from "../../../../redux/reducers/securityGroupSlice";

const SecurityGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [page, setPage] = useState("");

  const securityGroups = useSelector((state) => state?.securityGroups?.groups);
  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  useEffect(() => {
    getSecurityGroups(dispatch);
    const menuItem = homeMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "securitygroups"
      ]?.permissions.includes(item.title)
    );

    const page =
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems["securitygroups"]?.name;

    const groupRolesAction = securityActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["grouproles"]
          ?.name === item.title
    );
    const userGroupsAction = securityActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["usergroups"]
          ?.name === item.title
    );
    const actionArray = groupRolesAction.concat(userGroupsAction);

    setFilteredActions(actionArray);
    setFilteredMenus(menuItem);
    setPage(page);
  }, [dispatch, moduleMenus]);

  const onDelete = useCallback(
    (recordId) => {
      dispatch(deleteSecurityGroupSuccess(recordId));
    },
    [dispatch]
  );

  const onCustomActionClick = useCallback(
    async (menu) => {
      switch (menu) {
        case "User Groups":
          navigate("/dashboard/SAD/user-groups");
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
      records={securityGroups}
      heading={securityHeadingFooter.heading}
      title={securityHeadingFooter.title}
      footer={securityHeadingFooter.footer}
      company={securityHeadingFooter.company}
      menus={filteredMenus}
      roles={page}
      customActions={filteredActions}
      keyExpr={"groupCode"}
      columns={securityGroupsColumns}
      url={"SecurityGroups"}
      onActionClick={onCustomActionClick}
      redirectRoute={"SAD/security-groups"}
      className={"security-admin"}
      filterValues={bookingFilterValues}
      onDelete={onDelete}
      FormComponent={SecurityGroupForm}
    />
  );
};

export default SecurityGroup;
