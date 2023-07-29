import React, { useCallback, useEffect, useState } from "react";
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
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [page, setPage] = useState("");

  const roles = useSelector((state) => state?.roles.roles);
  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  useEffect(() => {
    getRoles(dispatch);
    const menuItem = homeMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "roles"
      ]?.permissions.includes(item.title)
    );

    const page =
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems["roles"]?.name;

    const groupRolesAction = rolesActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["grouproles"]
          ?.name === item.title
    );
    const securityGroupsAction = rolesActions?.filter(
      (item) =>
        moduleMenus["sad"]?.subMenus["setups"]?.menuItems["securitygroups"]
          ?.name === item.title
    );
    const actionArray = groupRolesAction.concat(securityGroupsAction);

    setFilteredActions(actionArray);
    setFilteredMenus(menuItem);
    setPage(page);
  }, [dispatch, moduleMenus]);

  const onCustomActionClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Group Roles":
          navigate("/dashboard/SAD/group-roles");
          break;
        case "Security Groups":
          navigate("/dashboard/SAD/security-groups");
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
      menus={filteredMenus}
      roles={page}
      customActions={filteredActions}
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
