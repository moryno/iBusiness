import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";
import GroupPage from "../GroupPage";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { userGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { userGroupHeadingFooter } from "../../../../data/headingFooterTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getFreshUserGroups,
  getUserGroups,
} from "../../../../redux/api/userManagementCall";

const UserGroup = () => {
  const dispatch = useDispatch();
  const url = "UserGroups";
  const redirectRoute = "users/user-groups";

  const userGroups = useSelector((state) => state?.userGroups?.groups);

  useEffect(() => {
    if (!userGroups || userGroups.length < 1) {
      getUserGroups(dispatch);
    } else {
      getFreshUserGroups(dispatch);
    }

    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <GroupPage
      records={userGroups}
      heading={userGroupHeadingFooter.heading}
      footer={userGroupHeadingFooter.footer}
      company={userGroupHeadingFooter.company}
      title={userGroupHeadingFooter.title}
      menus={homeMenuSource}
      keyExpr={"groupCode"}
      columns={userGroupsColumns}
      url={url}
      redirectRoute={redirectRoute}
      filterValues={bookingFilterValues}
      FormComponent={UserGroupForm}
    />
  );
};

export default UserGroup;
