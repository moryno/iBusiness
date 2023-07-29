import InviteUserForm from "../../../../components/dashboard/SAD/Users/InviteUserForm";
import GroupPage from "../GroupPage";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { usersColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { userHeadingFooter } from "../../../../data/headingFooterTitle";
import { useEffect, useState } from "react";
import { getUsers } from "../../../../redux/actions/userManagementCall";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const dispatch = useDispatch();
  const [filteredMenus, setFilteredMenus] = useState([]);

  const users = useSelector((state) => state?.user?.users);
  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  useEffect(() => {
    getUsers(dispatch);

    const menuItem = homeMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "users"
      ]?.permissions.includes(item.title)
    );
    setFilteredMenus(menuItem);
  }, [dispatch, moduleMenus]);

  return (
    <GroupPage
      records={users}
      heading={userHeadingFooter.heading}
      title={userHeadingFooter.title}
      footer={userHeadingFooter.footer}
      company={userHeadingFooter.company}
      menus={filteredMenus}
      keyExpr={"userId"}
      columns={usersColumns}
      url={"Users"}
      redirectRoute={"SAD/users"}
      filterValues={bookingFilterValues}
      className={"security-admin"}
      FormComponent={InviteUserForm}
    />
  );
};

export default User;
