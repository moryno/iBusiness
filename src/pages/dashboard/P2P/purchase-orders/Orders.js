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
import {
  deleteOrderTitle,
  orderHeadingFooter,
} from "../../../../data/headingFooterTitle";
import OnboardingService from "../../../../ClientServices/onboardingRequest";
import Portal from "../../../../components/modals/Portal";
import ConfirmationPopupComponent from "../../../../components/dashboard/Shared/ConfirmationPopupComponent";

const Orders = () => {
  const [onEditRecordId, setEditRecordId] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMode, setStatusMode] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);

  const orders = useSelector((state) => state.purchase.orders);
  const { sideMenus } = useSelector((state) => state.moduleCategory);
  const route = Constant.ROUTE.ORDER;

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "KeyN" && e.shiftKey) {
        e.preventDefault();
        navigate("/dashboard/o2c/orders/new");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);

  useEffect(() => {
    getPurchaseOrders(dispatch);
    const menus = sideMenus.filter((item) => item.partitionKey === "p2p");
    const subMenus = menus[0].subMenus[0].subLinks[0].permissions;
    const menuItem = homeMenuSource?.filter((item) =>
      subMenus.includes(item.title)
    );

    // console.log(menuItem)
    // console.log(sideMenus.filter((item) => item.partitionKey === "p2p"))
    setFilteredMenus(menuItem);

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
      navigate(`/dashboard/P2P/orders/${onEditRecordId}/update`);
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
    setLoading(true);
    const action = `/PO/deleteOrder?orderNumber=${selectedRecordId}`;
    try {
      await OnboardingService.delete(action);
      dispatch(deletePurchaseOrderSuccess(selectedRecordId));
      toast.success("Order deleted successfully.");
      setConfirmDelete(false);
      setLoading(false);
      setSelectedRecordId(null);
    } catch (Ex) {
      console.log(Ex);
      toast.error("Order deletion failed. Please try again.");
      setConfirmDelete(false);
      setLoading(false);
      setSelectedRecordId(null);
    }
  };

  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        break;
      case "Add":
        navigate("/dashboard/P2P/orders/new");
        break;
      case "Delete":
        openConfirmationPopup(selectedRecordId);
        break;
      case "Close":
        navigate(-1);
        break;
      case "Help":
        window.open("", "_blank", "");
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
            menus={filteredMenus}
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
            title={deleteOrderTitle.heading}
            text={deleteOrderTitle.text + selectedRecordId + "?"}
            statusBarText={deleteOrderTitle.footer}
            statusMode={statusMode}
            onDelete={handleDelete}
            loading={loading}
          />
        </Portal>
      )}
    </main>
  );
};

export default Orders;
