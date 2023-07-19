import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderColumns } from "../../../../data/datagrid-json/datagridColumns";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { orderFilterValues } from "../../../../helpers/datatableSource";
import CategoryComponent from "../../../../components/dashboard/Shared/CategoryComponent";
import { toast } from "react-toastify";
import Constant from "../../../../utils/constant";
import FromToDateComponent from "../../../../components/dashboard/Shared/FromToDateComponent";
import DataTable from "../../../../components/dashboard/Shared/DataGrids/DataTable";
import Statusbar from "../../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import MenusGroupComponent from "../../../../components/dashboard/Shared/Menus/MenusGroupComponent";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseOrders } from "../../../../redux/actions/purchaseOrderCall";
import { deletePurchaseOrderSuccess } from "../../../../redux/reducers/purchaseOrderSlice";
import { deleteTitle, orderHeadingFooter } from "../../../../data/headingFooterTitle";
import OnboardingService from "../../../../ClientServices/onboardingRequest";
import Portal from "../../../../components/modals/Portal";
import ConfirmationPopupComponent from "../../../../components/dashboard/Shared/ConfirmationPopupComponent";

const Orders = () => {
  const [onEditRecordId, setEditRecordId] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [statusMode, setStatusMode] = useState("");
  const orders = useSelector((state) => state.purchase.orders);
  const route = Constant.ROUTE.ORDER;

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "KeyN" && e.shiftKey) {
        e.preventDefault();
        navigate("/dashboard/orders/new");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [])
  

  useEffect(() => {
    getPurchaseOrders(dispatch);
  
    // eslint-disable-next-line
  }, [dispatch]);

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

  useEffect(() => {
    if (onEditRecordId) {
      navigate(`/dashboard/orders/${onEditRecordId}/update`);
    }
  }, [onEditRecordId, navigate]);

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
      const action = `/PO/deleteOrder?orderNumber=${selectedRecordId}`;
      try {
        await OnboardingService.delete(action);
        dispatch(deletePurchaseOrderSuccess(selectedRecordId));
        toast.success("Order deleted successfully.");
        setConfirmDelete(false);
        setSelectedRecordId(null);
      } catch (Ex) {
        console.log(Ex)
        toast.error("Order deletion failed. Please try again.")
        setConfirmDelete(false);
        setSelectedRecordId(null);
      }
  };

  const handleClick = (menu) => {
      switch (menu) {
        case "Find":
          break;
        case "New":
          navigate("/dashboard/orders/new");
          break;
        case "Delete":
          openConfirmationPopup(selectedRecordId);
          break;
        case "Close":
          navigate("/dashboard");
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
      <section>
        <CategoryComponent>
          <MenusGroupComponent
            menus={homeMenuSource}
            heading={orderHeadingFooter.heading}
            onMenuClick={handleClick}
          />
          <FromToDateComponent />
          <DataTable
            data={orders}
            route={route}
            className={"purchase-order"}
            keyExpr={"orderNumber"}
            columns={orderColumns}
            startEdit={startEdit}
            selectRowItem={selectRowItem}
            openConfirmationPopup={openConfirmationPopup}
            filterValues={orderFilterValues}
          />
          <Statusbar
            footer={orderHeadingFooter.footer}
            company={orderHeadingFooter.company}
          />
        </CategoryComponent>
      </section>
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

export default Orders;
