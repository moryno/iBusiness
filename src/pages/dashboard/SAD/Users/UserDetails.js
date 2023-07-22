import { useNavigate, useParams } from "react-router-dom";
import DetailsPage from "../../../../components/dashboard/Shared/DetailsComponents/DetailsPage";
import GroupDetails from "../../../../components/dashboard/Shared/DetailsComponents/GroupDetails";
import { userDetailHeadActions } from "../../../../data/dashboard-page/menu";
import { deleteTitle, userDetails } from "../../../../data/headingFooterTitle";
import { useEffect, useState } from "react";
import SadService from "../../../../ClientServices/sadService";
import SecurityRightBar from "../../../../components/dashboard/SAD/SecurityGroup/SecurityRightBar";
import Portal from "../../../../components/modals/Portal";
import ConfirmationPopupComponent from "../../../../components/dashboard/Shared/ConfirmationPopupComponent";
import { toast } from "react-toastify";
import { userDetailActions } from "../../../../data/dashboard-page/moduleSource";

const UserDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [isOpen, setOpen] = useState(false);
  const [statusMode, setStatusMode] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const url = "/";

  useEffect(() => {
    const getSingleUser = async () => {
      const url = "/TenantUser/GetTenantUserAsync?userID=" + id;
      const response = await SadService.get(url);
      setData(response);
    };
    getSingleUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      const action = `/${url}/${id}`;
      const response = await SadService.delete(action);

      if (response?.responseCode === "02") {
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

  const handleClick = (menu) => {
    switch (menu) {
      case "Edit":
        setStatusMode("EditMode");
        setOpen(true);
        break;
      case "Delete":
        // openConfirmationPopup(id);
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
        heading={userDetails.heading}
        footer={userDetails.footer}
        title={`${userDetails.title} ${data?.email}`}
        menus={userDetailHeadActions}
        customAction={userDetailActions}
        company={userDetails.company}
        onMenuClick={handleClick}
        DetailComponent={GroupDetails}
        CustomActionComponent={SecurityRightBar}
      />

      {statusMode === "DeleteMode" && (
        <Portal isOpen={confirmDelete} setOpen={setConfirmDelete}>
          <ConfirmationPopupComponent
            handleClose={handleClose}
            title={deleteTitle.heading}
            body={userDetails.heading}
            code={id}
            text={deleteTitle.text}
            statusBarText={userDetails.footer}
            statusMode={statusMode}
            onDelete={handleDelete}
          />
        </Portal>
      )}
    </main>
  );
};

export default UserDetails;
