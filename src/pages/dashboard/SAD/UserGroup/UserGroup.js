import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";
import GroupPage from "../GroupPage";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { userGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { userGroupHeadingFooter } from "../../../../data/headingFooterTitle";

const UserGroup = () => {
  const url = "UserGroups";

  const redirectRoute = "users/user-groups";
  return (
    <GroupPage
      heading={userGroupHeadingFooter.heading}
      footer={userGroupHeadingFooter.footer}
      company={userGroupHeadingFooter.company}
      title={userGroupHeadingFooter.title}
      menus={homeMenuSource}
      columns={userGroupsColumns}
      url={url}
      redirectRoute={redirectRoute}
      filterValues={bookingFilterValues}
      FormComponent={UserGroupForm}
    />
  );
};

export default UserGroup;
