import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SadService from "../../../../ClientServices/sadService";
import {
  userGroupActionsSource,
  updateMenuSource,
} from "../../../../data/dashboard-page/menu";
import CustomActionModal from "../../../../components/modals/CustomActionModal";
import {
  deleteTitle,
  userGroupDetail,
} from "../../../../data/headingFooterTitle";
import GroupDetails from "../../../../components/dashboard/Shared/DetailsComponents/GroupDetails";
import UserGroupRightBar from "../../../../components/dashboard/SAD/UserGroup/UserGroupRightBar";
import DetailsPage from "../../../../components/dashboard/Shared/DetailsComponents/DetailsPage";
import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import Portal from "../../../../components/modals/Portal";
import ConfirmationPopupComponent from "../../../../components/dashboard/Shared/ConfirmationPopupComponent";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteUserGroupSuccess } from "../../../../redux/reducers/userGroupSlice";
import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";

const UserGroupDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [statusMode, setStatusMode] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const url = "UserGroups";

  useEffect(() => {
    const getUserGroupByCode = async () => {
      const url = "/UserGroups/" + id;
      const response = await SadService.get(url);
      setData(response);
    };
    getUserGroupByCode();
  }, [id]);

  const handleClose = () => {
    setStatusMode("");
    setOpen(false);
  };

  const openConfirmationPopup = (rowItem) => {
    if (rowItem === null) {
      toast.warning(
        "You must select one or more records before you can perform this action."
      );
    } else {
      setStatusMode("DeleteMode");
      setConfirmDelete((confirmDelete) => !confirmDelete);
    }
  };

  const handleDelete = async () => {
    try {
      const action = `/${url}/${id}`;
      const response = await SadService.delete(action);

      if (response?.responseCode === "02") {
        dispatch(deleteUserGroupSuccess(id));
        setConfirmDelete(false);
        toast.success(response?.responseMsg);
        navigate(-1);
      } else {
        setConfirmDelete(false);
        toast.error("Cannot delete a group with assigned users.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Edit":
          setStatusMode("EditMode");
          setOpen(true);
          break;
        case "Delete":
          openConfirmationPopup(id);
          break;
        case "Close":
          navigate(-1);
          break;
        case "Help":
          console.log("Help was clicked");
          break;

        default:
          break;
      }
    },
    // eslint-disable-next-line
    [navigate]
  );

  return (
    <main className="w-full min-h-full relative">
      <DetailsPage
        data={data}
        heading={userGroupDetail.heading}
        footer={userGroupDetail.footer}
        title={`${userGroupDetail.title} ${data?.groupCode}`}
        menus={updateMenuSource}
        customAction={userGroupActionsSource}
        company={userGroupDetail.company}
        onMenuClick={handleClick}
        DetailComponent={GroupDetails}
        CustomActionComponent={UserGroupRightBar}
      />
      <CustomActionModal
        title={data?.groupCode}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        {statusMode === "EditMode" && (
          <UserGroupForm
            singleRecord={data}
            statusMode={statusMode}
            handleClose={handleClose}
          />
        )}
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

export default UserGroupDetails;
