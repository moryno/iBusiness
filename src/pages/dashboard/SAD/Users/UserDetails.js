import { useNavigate, useParams } from "react-router-dom";
import DetailsPage from "../../../../components/dashboard/Shared/DetailsComponents/DetailsPage";
import GroupDetails from "../../../../components/dashboard/Shared/DetailsComponents/GroupDetails";
import {
  updateMenuSource,
  userDetailHeadActions,
} from "../../../../data/dashboard-page/menu";
import { deleteTitle, userDetails } from "../../../../data/headingFooterTitle";
import { useEffect, useState } from "react";
import SadService from "../../../../ClientServices/sadService";
import SecurityRightBar from "../../../../components/dashboard/SAD/SecurityGroup/SecurityRightBar";
import Portal from "../../../../components/modals/Portal";
import ConfirmationPopupComponent from "../../../../components/dashboard/Shared/ConfirmationPopupComponent";
import { toast } from "react-toastify";
import { userDetailActions } from "../../../../data/dashboard-page/moduleSource";
import { useSelector } from "react-redux";
import { Loader } from "../../loader/Loader";

const UserDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMode, setStatusMode] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  // eslint-disable-next-line
  const [filteredMenus, setFilteredMenus] = useState([]);
  const { moduleMenus } = useSelector((state) => state.moduleCategory);

  const url = "/";

  useEffect(() => {
    setLoading(true);
    const getSingleUser = async () => {
      try {
        const url = "/TenantUser/GetTenantUserAsync?userID=" + id;
        const response = await SadService.get(url);
        setData(response);
        setLoading(false);
      } catch (ex) {
        console.log(ex);
        setLoading(false);
        toast.error("Oops. Something went wrong.");
      }
    };
    getSingleUser();
  }, [id]);

  useEffect(() => {
    const menuItem = updateMenuSource?.filter((item) =>
      moduleMenus["sad"]?.subMenus["setups"]?.menuItems[
        "usergroups"
      ]?.permissions.includes(item.title)
    );
    setFilteredMenus(menuItem);

    // eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const action = `/${url}/${id}`;
      const response = await SadService.delete(action);

      if (response?.responseCode === "02") {
        setConfirmDelete(false);
        setLoading(false);
        navigate(-1);
        toast.success(response?.responseMsg);
      } else {
        setConfirmDelete(false);
        setLoading(false);
        toast.error("Cannot delete a group with assigned users.");
      }
    } catch (error) {
      setLoading(false);
      setConfirmDelete(false);
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
      {loading && <Loader />}
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
            loading={loading}
          />
        </Portal>
      )}
    </main>
  );
};

export default UserDetails;
