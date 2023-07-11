import UserGroupForm from "../../../components/dashboard/SAD/UserGroupForm";
import GroupPage from "./GroupPage";
import { homeMenuSource } from "../../../data/dashboard-page/menu";
import { securityGroupsColumns } from "../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../helpers/datatableSource";
import { userGroupHeadingFooter } from "../../../data/headingFooterTitle";

const UserGroup = () => {
  return (
    <GroupPage
      heading={userGroupHeadingFooter.heading}
      footer={userGroupHeadingFooter.footer}
      company={userGroupHeadingFooter.company}
      title={userGroupHeadingFooter.title}
      menus={homeMenuSource}
      columns={securityGroupsColumns}
      filterValues={bookingFilterValues}
      FormComponent={UserGroupForm}
    />
  );
};

export default UserGroup;
