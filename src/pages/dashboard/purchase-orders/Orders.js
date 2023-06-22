import { useEffect, useState, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { orderColumns } from "../../../data/PurchaseOrderData";
import { homeMenuSource } from "../../../data/menu";
import { orderFilterValues } from "../../../helpers/datatableSource";
import CategoryComponent from "../../../components/dashboard/CategoryComponent";
import { toast } from "react-toastify";
import OnboardingService from "../../../axios/onboardingRequest";

const Orders = () => {
  const [data, setData] = useState([]);
  const loadingRef = useRef(false);
  // eslint-disable-next-line
  const [onRowClickItem, setRowClickItem] = useState(null);
  const [onRowDblClickBookingId, setRowDblClickBookingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await request.get("PurchaseOrder/orders");
        // setData(response.data);
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

  const startEdit = ({ data }) => {
    if (data) {
      setRowDblClickBookingId(data.orderNumber);
    } else {
      setRowDblClickBookingId(null);
    }
  };

  useEffect(() => {
    if (onRowDblClickBookingId) {
      navigate(`/dashboard/orders/${onRowDblClickBookingId}/view`);
    }
  }, [onRowDblClickBookingId, navigate]);

  const openConfirmationPopup = async (rowItem) => {
    if (rowItem === null) {
      toast.warning("Please select a booking to delete");
    }
  };

  const handleRedirect = (id) => {
    navigate(`/dashboard/orders/${id}/view`)
  }

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
    <main className="w-full min-h-full relative  px-3 md:px-5 py-1.5">
      <section>
        <CategoryComponent
          menus={homeMenuSource}
          heading={"Purchase Orders"}
          company={"ARBS Customer Portal"}
          onMenuClick={handleClick}
          data={data}
          keyExpr={"orderNumber"}
          columns={orderColumns}
          handleRedirect={handleRedirect}
          startEdit={startEdit}
          setRowClickItem={setRowClickItem}
          openConfirmationPopup={openConfirmationPopup}
          filterValues={orderFilterValues}
        />
      </section>
    </main>
  );
};

export default Orders;

