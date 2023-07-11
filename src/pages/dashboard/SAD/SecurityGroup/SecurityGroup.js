import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import GroupPage from "../GroupPage";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { securityGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { securityHeadingFooter } from "../../../../data/headingFooterTitle";

const SecurityGroup = () => {
  const url = "/SecurityGroups/GetAll";
  const redirectRoute = "users/security-groups";
  return (
    <GroupPage
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
