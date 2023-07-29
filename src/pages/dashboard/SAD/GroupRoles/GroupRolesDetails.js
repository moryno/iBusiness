import { updateMenuSource } from "../../../../data/dashboard-page/menu";
import { groupRolesDetails } from "../../../../data/headingFooterTitle";
import { groupRolesActions } from "../../../../data/dashboard-page/moduleSource";
import GridItemContent from "../../../../components/dashboard/Shared/DetailsComponents/GridItemContent";
import { deleteGroupRolesuccess } from "../../../../redux/reducers/groupRoleSlice";
import DetailsPage from "../DetailsPage";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupRolesForm from "../../../../components/dashboard/SAD/GroupRoles/GroupRolesForm";
import { useNavigate } from "react-router-dom";

const GroupRolesDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  useEffect(() => {
    const menuItem = updateMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "grouproles"
      ]?.permissions.includes(item.title)
    );
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
    <DetailsPage
      heading={groupRolesDetails.heading}
      footer={groupRolesDetails.footer}
      title={`${groupRolesDetails.title}`}
      menus={filteredMenus}
      url={"GroupRoles"}
      customAction={filteredActions}
      onActionClick={onCustomActionClick}
      company={groupRolesDetails.company}
      deleteMsg={groupRolesDetails.heading}
      onDelete={onDelete}
      DetailComponent={GridItemContent}
      FormComponent={GroupRolesForm}
    />
  );
};

export default GroupRolesDetails;
