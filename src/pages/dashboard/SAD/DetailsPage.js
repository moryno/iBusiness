import { useEffect, useState } from "react";
import SadService from "../../../ClientServices/sadService";
import ConfirmationPopupComponent from "../../../components/dashboard/Shared/ConfirmationPopupComponent";
import MenusGroupComponent from "../../../components/dashboard/Shared/Menus/MenusGroupComponent";
import Statusbar from "../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import SkeletonDetail from "../../../components/dashboard/Shared/Skeletons/SkeletonDetail";
import CustomActionModal from "../../../components/modals/CustomActionModal";
import Portal from "../../../components/modals/Portal";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteTitle,
  groupRolesDetails,
} from "../../../data/headingFooterTitle";
import DetailsRightBar from "../../../components/dashboard/Shared/DetailsComponents/DetailsRightBar";

const DetailsPage = ({
  heading,
  footer,
  menus,
  url,
  title,
  company,
  customAction,
  onActionClick,
  onDelete,
  deleteMsg,
  DetailComponent,
  FormComponent,
}) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [statusMode, setStatusMode] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const getSingleBooking = async () => {
      const action = `/${url}/${id}`;
      const response = await SadService.get(action);
      setData(response);
    };
    getSingleBooking();
  }, [id, url]);

  const handleDelete = async () => {
    try {
      const action = `/${url}/${id}`;
      const response = await SadService.delete(action);

      if (response?.responseCode === "02") {
        onDelete(id);
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
      <MenusGroupComponent
        menus={menus}
        heading={heading}
        onMenuClick={handleClick}
      />
      <section className="mt-5 w-full gap-2 md:gap-0 flex flex-col-reverse md:flex-row">
        <article className="w-full px-2 md:w-9/12 lg:px-5 box-border">
          {Object.keys(data).length ? (
            <DetailComponent data={data} title={`${title} code(${id})`} />
          ) : (
            <SkeletonDetail />
          )}
        </article>
        <article className="w-full px-2 md:w-3/12 lg:px-5 ">
          <DetailsRightBar
            customAction={customAction}
            onActionClick={onActionClick}
            FormComponent={FormComponent}
          />
        </article>
      </section>
      <Statusbar footer={footer} company={company} />
      <CustomActionModal
        title={`${title} code(${id})`}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        {statusMode === "EditMode" && (
          <FormComponent
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
            body={deleteMsg}
            code={id}
            text={deleteTitle.text}
            statusBarText={groupRolesDetails.footer}
            statusMode={statusMode}
            onDelete={handleDelete}
          />
        </Portal>
      )}
    </main>
  );
};

export default DetailsPage;
