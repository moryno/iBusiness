import InviteUserForm from "../../../components/dashboard/GroupForms/InviteUserForm";
import GroupPage from "./GroupPage";
import { usersMenuSource } from "../../../data/menu";
import { securityGroupsColumns } from "../../../data/datagridColumns";
import { bookingFilterValues } from "../../../helpers/datatableSource";
import { userHeadingFooter } from "../../../data/headingFooterTitle";

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
