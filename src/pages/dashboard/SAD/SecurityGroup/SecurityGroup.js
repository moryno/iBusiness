import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { securityGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { securityHeadingFooter } from "../../../../data/headingFooterTitle";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { getSecurityGroups } from "../../../../redux/actions/userManagementCall";
import { securityActions } from "../../../../data/dashboard-page/moduleSource";
import { useNavigate } from "react-router-dom";

import GroupPage from "../GroupPage";
import { deleteSecurityGroupSuccess } from "../../../../redux/reducers/securityGroupSlice";

const SecurityGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const securityGroups = useSelector((state) => state?.securityGroups?.groups);

  useEffect(() => {
    getSecurityGroups(dispatch);
  }, [dispatch]);

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
      records={securityGroups}
      heading={securityHeadingFooter.heading}
      title={securityHeadingFooter.title}
      footer={securityHeadingFooter.footer}
      company={securityHeadingFooter.company}
      menus={homeMenuSource}
      customActions={securityActions}
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
