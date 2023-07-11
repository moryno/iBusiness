import InviteUserForm from "../../../../components/dashboard/SAD/Users/InviteUserForm";
import GroupPage from "../GroupPage";
import { usersMenuSource } from "../../../../data/dashboard-page/menu";
import { securityGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { userHeadingFooter } from "../../../../data/headingFooterTitle";

const User = () => {
  return (
    <GroupPage
      heading={userHeadingFooter.heading}
      title={userHeadingFooter.title}
      footer={userHeadingFooter.footer}
      company={userHeadingFooter.company}
      menus={usersMenuSource}
      columns={securityGroupsColumns}
      filterValues={bookingFilterValues}
      FormComponent={InviteUserForm}
    />
  );
};

export default User;
