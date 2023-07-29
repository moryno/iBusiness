import { useCallback, useEffect, useState } from "react";
import { updateMenuSource } from "../../../../data/dashboard-page/menu";
import { userGroupDetail } from "../../../../data/headingFooterTitle";
import GroupDetails from "../../../../components/dashboard/Shared/DetailsComponents/GroupDetails";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserGroupSuccess } from "../../../../redux/reducers/userGroupSlice";
import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";
import DetailsPage from "../DetailsPage";
import { useNavigate } from "react-router-dom";
import { userGroupActions } from "../../../../data/dashboard-page/moduleSource";

const UserGroupDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);

  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  useEffect(() => {
    const menuItem = updateMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "usergroups"
      ]?.permissions.includes(item.title)
    );
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
    <DetailsPage
      heading={userGroupDetail.heading}
      footer={userGroupDetail.footer}
      title={`${userGroupDetail.title}`}
      menus={filteredMenus}
      url={"UserGroups"}
      customAction={filteredActions}
      onActionClick={onCustomActionClick}
      company={userGroupDetail.company}
      deleteMsg={userGroupDetail.heading}
      onDelete={onDelete}
      DetailComponent={GroupDetails}
      FormComponent={UserGroupForm}
    />
  );
};

export default UserGroupDetails;
