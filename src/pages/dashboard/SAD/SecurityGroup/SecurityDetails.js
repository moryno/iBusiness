import { useCallback, useEffect, useState } from "react";
import GroupDetails from "../../../../components/dashboard/Shared/DetailsComponents/GroupDetails";
import { updateMenuSource } from "../../../../data/dashboard-page/menu";
import { securityDetail } from "../../../../data/headingFooterTitle";
import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import { deleteSecurityGroupSuccess } from "../../../../redux/reducers/securityGroupSlice";
import { useDispatch, useSelector } from "react-redux";
import DetailsPage from "../DetailsPage";
import { securityActions } from "../../../../data/dashboard-page/moduleSource";
import { useNavigate } from "react-router-dom";

const SecurityDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  useEffect(() => {
    const menuItem = updateMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "securitygroups"
      ]?.permissions.includes(item.title)
    );
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
  }, [dispatch, moduleMenus]);

  const onDelete = useCallback(
    (recordId) => {
      dispatch(deleteSecurityGroupSuccess(recordId));
    },
    [dispatch]
  );

  const onCustomActionClick = useCallback(
    (menu) => {
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
    <DetailsPage
      heading={securityDetail.heading}
      footer={securityDetail.footer}
      title={`${securityDetail.title}`}
      menus={filteredMenus}
      url={"SecurityGroups"}
      customAction={filteredActions}
      onActionClick={onCustomActionClick}
      company={securityDetail.company}
      deleteMsg={securityDetail.heading}
      onDelete={onDelete}
      DetailComponent={GroupDetails}
      FormComponent={SecurityGroupForm}
    />
  );
};

export default SecurityDetails;
