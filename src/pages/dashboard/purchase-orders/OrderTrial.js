// OrderTrial.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { orderColumns } from "../../../data/PurchaseOrderData";
import { homeMenuSource } from "../../../data/menu";
import { orderFilterValues } from "../../../helpers/datatableSource";
import CategoryComponent from "../../../components/dashboard/CategoryComponent";
import { toast } from "react-toastify";
import OnboardingService from "../../../axios/onboardingRequest";
import Constant from "../../../utils/constant";
import FromToDateComponent from "../../../components/dashboard/FromToDateComponent";
import DataTable from "../../../components/dashboard/DataTable";
import Statusbar from "../../../components/dashboard/Statusbar";
import MenusGroupComponent from "../../../components/dashboard/Menus/MenusGroupComponent";
import OrderDetailTrial from "./OrderDetailTrial";

const OrderTrial = () => {
  const [data, setData] = useState([]);
  const loadingRef = useRef(true);
  // eslint-disable-next-line
  const [onRowClickItem, setRowClickItem] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [onRowDblClickBookingId, setRowDblClickBookingId] = useState(null)
  const navigate = useNavigate();
  const route = Constant.ROUTE.ORDER;

  useEffect(() => {
    const getData = async () => {
      try {
        const url = "/test2";
        const response = await OnboardingService.get(url);
        setData(response);
        loadingRef.current = false;
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const startEdit = useCallback(({ data }) => {
    if (data) {
      setOrderId(data.orderNumber);
      setModalActive(true)
    } else {
      setRowDblClickBookingId(null);
    }
  }, []);

  const toggleModalActive = useCallback(
    () => setModalActive(!modalActive),
    [modalActive]
  );

  useEffect(() => {
    if (onRowDblClickBookingId) {
      //   navigate(`/dashboard/orders/${onRowDblClickBookingId}/view`);
      setOrderId(onRowDblClickBookingId);
    }
  }, [onRowDblClickBookingId, navigate]);

  const openConfirmationPopup = useCallback(async (rowItem) => {
    if (rowItem === null) {
      toast.warning("Please select a booking to delete");
    }
  }, []);

  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        break;
      case "New":
        navigate("/dashboard/orders/new");
        break;
      case "Delete":
        console.log("Delete was clicked");
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
    <main className="w-full min-h-full relative px-3 md:px-5 py-1.5">
      <section>
        <CategoryComponent>
          <MenusGroupComponent
            menus={homeMenuSource}
            heading={"Purchase Orders"}
            onMenuClick={handleClick}
          />
          <FromToDateComponent />
          <DataTable
            data={data}
            route={route}
            keyExpr={"orderNumber"}
            columns={orderColumns}
            startEdit={(e) => startEdit(e)}
            setRowClickItem={setRowClickItem}
            openConfirmationPopup={openConfirmationPopup}
            filterValues={orderFilterValues}
          />
          <Statusbar
            heading={"Purchase Orders"}
            company={"ARBS Customer Portal"}
          />
        </CategoryComponent>
      </section>
      {modalActive && (
        <div className="absolute top-0 right-0 z-50 w-full bg-[#FFFFFF] b-red-700 min-h-full px-3 md:px-5 py-1.5">
          <OrderDetailTrial id={orderId} modalActive={modalActive} togglemodalActive={toggleModalActive} />
        </div>
      )}
    </main>
  );
};

export default OrderTrial;
