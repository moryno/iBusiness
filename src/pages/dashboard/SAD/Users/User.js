import InviteUserForm from "../../../../components/dashboard/SAD/Users/InviteUserForm";
import GroupPage from "../GroupPage";
import { usersMenuSource } from "../../../../data/dashboard-page/menu";
import { usersColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { userHeadingFooter } from "../../../../data/headingFooterTitle";
import { useEffect } from "react";
import {
  getFreshUsers,
  getUsers,
} from "../../../../redux/actions/userManagementCall";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const dispatch = useDispatch();
  const url = "users";
  const redirectRoute = "SAD/users";

  const users = useSelector((state) => state?.user?.users);

  useEffect(() => {
    if (!users || users.length < 1) {
      getUsers(dispatch);
    } else {
      getFreshUsers(dispatch);
    }

    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <GroupPage
      records={users}
      heading={userHeadingFooter.heading}
      title={userHeadingFooter.title}
      footer={userHeadingFooter.footer}
      company={userHeadingFooter.company}
      menus={usersMenuSource}
      keyExpr={"userId"}
      columns={usersColumns}
      url={url}
      redirectRoute={redirectRoute}
      filterValues={bookingFilterValues}
      className={"security-admin"}
      FormComponent={InviteUserForm}
    />
  );
};

export default User;
