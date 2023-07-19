import { useNavigate, useParams } from "react-router-dom";
import DetailsPage from "../../../../components/dashboard/Shared/DetailsComponents/DetailsPage";
import GroupDetails from "../../../../components/dashboard/Shared/DetailsComponents/GroupDetails";
import {
  securityActionsSource,
  updateMenuSource,
} from "../../../../data/dashboard-page/menu";
import {
  deleteTitle,
  securityDetail,
} from "../../../../data/headingFooterTitle";
import { useEffect, useState } from "react";
import SadService from "../../../../ClientServices/sadService";
import SecurityRightBar from "../../../../components/dashboard/SAD/SecurityGroup/SecurityRightBar";
import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import CustomActionModal from "../../../../components/modals/CustomActionModal";
import Portal from "../../../../components/modals/Portal";
import ConfirmationPopupComponent from "../../../../components/dashboard/Shared/ConfirmationPopupComponent";
import { deleteSecurityGroupSuccess } from "../../../../redux/reducers/securityGroupSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SecurityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [statusMode, setStatusMode] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const url = "SecurityGroups";

  useEffect(() => {
    const getSingleBooking = async () => {
      const url = "/SecurityGroups/" + id;
      const response = await SadService.get(url);
      setData(response);
    };
    getSingleBooking();
  }, [id]);

  const handleDelete = async () => {
    try {
      const action = `/${url}/${id}`;
      const response = await SadService.delete(action);

      if (response?.responseCode === "02") {
        dispatch(deleteSecurityGroupSuccess(id));
        setConfirmDelete(false);
        navigate(-1);
        toast.success(response?.responseMsg);
      } else {
        setConfirmDelete(false);
        toast.error("Cannot delete a group with assigned users.");
      }
    } catch (error) {
      console.log(error);
    }
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

  const handleClick = (menu) => {
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
  };

  const handleClose = () => {
    setStatusMode("");
    setOpen(false);
  };

  return (
    <main className="w-full min-h-full relative">
      <DetailsPage
        data={data}
        heading={securityDetail.heading}
        footer={securityDetail.footer}
        title={`${securityDetail.title} ${data?.groupCode}`}
        menus={updateMenuSource}
        customAction={securityActionsSource}
        company={securityDetail.company}
        onMenuClick={handleClick}
        DetailComponent={GroupDetails}
        CustomActionComponent={SecurityRightBar}
      />
      <CustomActionModal
        title={data?.groupCode}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        {statusMode === "EditMode" && (
          <SecurityGroupForm
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

export default SecurityDetails;
