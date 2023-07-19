import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { userGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import {
  deleteTitle,
  userGroupHeadingFooter,
} from "../../../../data/headingFooterTitle";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getUserGroups } from "../../../../redux/actions/userManagementCall";
import SadService from "../../../../ClientServices/sadService";
import CustomActionModal from "../../../../components/modals/CustomActionModal";
import CategoryComponent from "../../../../components/dashboard/Shared/CategoryComponent";
import MenusGroupComponent from "../../../../components/dashboard/Shared/Menus/MenusGroupComponent";
import DataTable from "../../../../components/dashboard/Shared/DataGrids/DataTable";
import Statusbar from "../../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import { userGroupActions } from "../../../../data/dashboard-page/moduleSource";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationPopupComponent from "../../../../components/dashboard/Shared/ConfirmationPopupComponent";
import Portal from "../../../../components/modals/Portal";
import { deleteUserGroupSuccess } from "../../../../redux/reducers/userGroupSlice";

const UserGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [singleRecord, setSingleRecord] = useState({});
  const [onEditRecordId, setEditRecordId] = useState(null);
  // eslint-disable-next-line
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  // eslint-disable-next-line
  const [statusMode, setStatusMode] = useState("");

  const [isOpen, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const url = "UserGroups";
  const redirectRoute = "users/user-groups";

  const userGroups = useSelector((state) => state?.userGroups?.groups);

  useEffect(() => {
    getUserGroups(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getSingleRecord = async () => {
      const action = `/${url}/${onEditRecordId}`;
      const response = await SadService.get(action);
      setSingleRecord(response);
      setStatusMode("EditMode");
      setOpen((isOpen) => !isOpen);
    };
    if (onEditRecordId) getSingleRecord();
    // eslint-disable-next-line
  }, [onEditRecordId]);

  const startEdit = useCallback(({ key }) => {
    if (key) {
      setEditRecordId(key);
    } else {
      setEditRecordId(null);
    }
  }, []);

  const selectRowItem = useCallback(({ key }) => {
    if (key) {
      setSelectedRecordId(key);
    }
  }, []);

  const handleClose = () => {
    setEditRecordId(null);
    setSingleRecord({});
    setStatusMode("");
    setOpen(false);
    setConfirmDelete(false);
  };

  const openConfirmationPopup = useCallback((rowItem) => {
    if (rowItem === null) {
      toast.warning(
        "You must select one or more records before you can perform this action."
      );
    } else {
      setStatusMode("DeleteMode");
      setConfirmDelete((confirmDelete) => !confirmDelete);
    }
  }, []);

  const handleDelete = async () => {
    try {
      const action = `/${url}/${selectedRecordId}`;
      const response = await SadService.delete(action);

      if (response?.responseCode === "02") {
        dispatch(deleteUserGroupSuccess(selectedRecordId));
        setConfirmDelete(false);
        setSelectedRecordId(null);
        toast.success(response?.responseMsg);
      } else {
        setConfirmDelete(false);
        setSelectedRecordId(null);
        toast.error("Cannot delete a group with assigned users.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Find":
          break;
        case "New":
          setStatusMode("CreateMode");
          setOpen(true);
          break;

        case "Delete":
          openConfirmationPopup(selectedRecordId);
          break;
        case "Close":
          console.log("Close was clicked");
          break;
        case "Help":
          console.log("Help was clicked");
          break;

        default:
          break;
      }
    },
    [selectedRecordId, openConfirmationPopup]
  );

  const onCustomActionClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Users":
          navigate("/dashboard/users");
          break;
        case "Security Groups":
          navigate("/dashboard/users/security-groups");
          break;

        case "Delete":
          break;
        case "Close":
          console.log("Close was clicked");
          break;
        case "Help":
          console.log("Help was clicked");
          break;

        default:
          break;
      }
    },
    [navigate]
  );

  return (
    <main className="w-full min-h-full relative">
      <section>
        <CategoryComponent>
          <MenusGroupComponent
            menus={homeMenuSource}
            customActions={userGroupActions}
            heading={userGroupHeadingFooter.heading}
            onMenuClick={handleClick}
            onActionClick={onCustomActionClick}
          />
          <DataTable
            data={userGroups}
            route={redirectRoute}
            className={"security-admin"}
            keyExpr={"userGroupID"}
            columns={userGroupsColumns}
            startEdit={startEdit}
            selectRowItem={selectRowItem}
            filterValues={bookingFilterValues}
          />

          <Statusbar
            footer={userGroupHeadingFooter.footer}
            company={userGroupHeadingFooter.company}
          />
        </CategoryComponent>
      </section>
      <CustomActionModal
        title={
          statusMode === "CreateMode"
            ? userGroupHeadingFooter.create
            : userGroupHeadingFooter.edit
        }
        isOpen={isOpen}
        handleClose={handleClose}
      >
        {statusMode === "CreateMode" || statusMode === "EditMode" ? (
          <UserGroupForm
            singleRecord={singleRecord}
            statusMode={statusMode}
            handleClose={handleClose}
          />
        ) : null}
      </CustomActionModal>
      {statusMode === "DeleteMode" && (
        <Portal isOpen={confirmDelete} setOpen={setConfirmDelete}>
          <ConfirmationPopupComponent
            handleClose={handleClose}
            title={deleteTitle.heading}
            text={deleteTitle.text}
            statusBarText={deleteTitle.footer}
            statusMode={statusMode}
            onDelete={handleDelete}
          />
        </Portal>
      )}
    </main>
  );
};

export default UserGroup;
