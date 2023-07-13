import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import GroupPage from "../GroupPage";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { securityGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { securityHeadingFooter } from "../../../../data/headingFooterTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getFreshSecurityGroups,
  getSecurityGroups,
} from "../../../../redux/api/userManagementCall";

const SecurityGroup = () => {
  const dispatch = useDispatch();
  const url = "SecurityGroups";
  const redirectRoute = "users/security-groups";

  const securityGroups = useSelector((state) => state?.securityGroups?.groups);

  useEffect(() => {
    if (!securityGroups || securityGroups.length < 1) {
      getSecurityGroups(dispatch);
    } else {
      getFreshSecurityGroups(dispatch);
    }

    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <GroupPage
      records={securityGroups}
      heading={securityHeadingFooter.heading}
      title={securityHeadingFooter.title}
      footer={securityHeadingFooter.footer}
      company={securityHeadingFooter.company}
      menus={homeMenuSource}
      columns={securityGroupsColumns}
      url={url}
      redirectRoute={redirectRoute}
      filterValues={bookingFilterValues}
      FormComponent={SecurityGroupForm}
    />
  );
};

export default SecurityGroup;
