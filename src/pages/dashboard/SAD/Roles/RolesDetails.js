import { updateMenuSource } from "../../../../data/dashboard-page/menu";
import { rolesDetails } from "../../../../data/headingFooterTitle";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rolesActions } from "../../../../data/dashboard-page/moduleSource";
import { deleteRoleSuccess } from "../../../../redux/reducers/rolesSlice";
import GridItemContent from "../../../../components/dashboard/Shared/DetailsComponents/GridItemContent";
import RolesForm from "../../../../components/dashboard/SAD/Roles/RolesForm";
import DetailsPage from "../DetailsPage";
import { useNavigate } from "react-router-dom";

const RolesDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  useEffect(() => {
    const menuItem = updateMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "roles"
      ]?.permissions.includes(item.title)
    );
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
  }, [dispatch, moduleMenus]);

  const onDelete = useCallback(
    (recordId) => {
      dispatch(deleteRoleSuccess(recordId));
    },
    [dispatch]
  );

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

  return (
    <DetailsPage
      heading={rolesDetails.heading}
      footer={rolesDetails.footer}
      title={rolesDetails.title}
      menus={filteredMenus}
      url={"Roles"}
      customAction={filteredActions}
      onActionClick={onCustomActionClick}
      company={rolesDetails.company}
      deleteMsg={rolesDetails.heading}
      onDelete={onDelete}
      DetailComponent={GridItemContent}
      FormComponent={RolesForm}
    />
  );
};

export default RolesDetails;
