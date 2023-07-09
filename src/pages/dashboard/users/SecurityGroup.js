import SecurityGroupForm from "../../../components/dashboard/GroupForms/SecurityGroupForm";
import GroupPage from "./GroupPage";
import { homeMenuSource } from "../../../data/menu";
import { securityGroupsColumns } from "../../../data/datagridColumns";
import { bookingFilterValues } from "../../../helpers/datatableSource";
import { securityHeadingFooter } from "../../../data/headingFooterTitle";

const SecurityGroup = () => {
  return (
    <GroupPage
      heading={securityHeadingFooter.heading}
      title={securityHeadingFooter.title}
      footer={securityHeadingFooter.footer}
      company={securityHeadingFooter.company}
      menus={homeMenuSource}
      columns={securityGroupsColumns}
      filterValues={bookingFilterValues}
      FormComponent={SecurityGroupForm}
    />
  );
};

export default SecurityGroup;
