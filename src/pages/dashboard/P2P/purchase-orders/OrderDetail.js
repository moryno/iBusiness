import React, { useEffect, useState, useCallback } from "react";
import DetailsPage from "../../../../components/dashboard/Shared/DetailsComponents/DetailsPage";
import OnboardingService from "../../../../ClientServices/onboardingRequest";
import { useNavigate, useParams } from "react-router-dom";
import {
  userGroupActionsSource,
  updateMenuSource,
} from "../../../../data/dashboard-page/menu";
import { deleteTitle, orderDetailTitle } from "../../../../data/headingFooterTitle";
import GridItemContent from "../../../../components/dashboard/Shared/DetailsComponents/GridItemContent";
import DetailsRightBar from "../../../../components/dashboard/Shared/DetailsComponents/DetailsRightBar";
import { toast } from "react-toastify";
import { deletePurchaseOrderSuccess } from "../../../../redux/reducers/purchaseOrderSlice";
import ConfirmationPopupComponent from "../../../../components/dashboard/Shared/ConfirmationPopupComponent";
import Portal from "../../../../components/modals/Portal";
import { useDispatch } from "react-redux";

const OrderDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [statusMode, setStatusMode] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getSingleBooking = async () => {
      const url = "/PO/getOrderInfoById?id=" + id;
      const response = await OnboardingService.get(url);
      setData(response);
    };
    getSingleBooking();
  }, [id]);


  const openConfirmationPopup = useCallback(async (rowItem) => {
    if (rowItem === null) {
      toast.warning(
        "You must select one or more records before you can perform this action."
      );
    } else {
      setStatusMode("DeleteMode");
      setConfirmDelete((confirmDelete) => !confirmDelete);
    }
  }, []);

  const handleClose = () => {
    setStatusMode("");
    setConfirmDelete(false);
  };

  const handleDelete = async () => {
      const action = `/PO/deleteOrder?orderNumber=${id}`;
      try {
        await OnboardingService.delete(action);
        dispatch(deletePurchaseOrderSuccess(id));
        toast.success("Order deleted successfully.");
        setConfirmDelete(false);
        navigate(-1)
      } catch (Ex) {
        console.log(Ex)
        toast.error("Order deletion failed. Please try again.")
        setConfirmDelete(false);
      }
  };

  const handleClick = (menu) => {
    switch (menu) {
      case "Edit":
        navigate(`/dashboard/orders/${id}/update`);
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

  return (
    <main className="w-full min-h-full relative">
      <DetailsPage
        data={data}
        heading={orderDetailTitle.heading}
        footer={orderDetailTitle.footer}
        title={`${orderDetailTitle.title} ${data?.orderNumber}`}
        menus={updateMenuSource}
        customAction={userGroupActionsSource}
        company={orderDetailTitle.company}
        onMenuClick={handleClick}
        DetailComponent={GridItemContent}
        CustomActionComponent={DetailsRightBar}
      />
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

export default OrderDetail;
