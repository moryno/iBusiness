import UserGroupForm from "../../../components/dashboard/GroupForms/UserGroupForm";
import GroupPage from "./GroupPage";
import { homeMenuSource } from "../../../data/menu";
import { securityGroupsColumns } from "../../../data/datagridColumns";
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
