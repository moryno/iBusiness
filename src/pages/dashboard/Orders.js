import { useEffect, useState, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { orderColumns } from "../../data/PurchaseOrderData";
import DataTable from "../../components/dashboard/DataTable";
import { homeMenuSource } from "../../data/menu";
import request from "../../helpers/tempRequest";
import { orderFilterValues } from "../../helpers/datatableSource";
import CategoryComponent from "../../components/dashboard/CategoryComponent";

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
        const response = await request.get("PurchaseOrder/orders");
        setData(response.data);
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
      navigate(`/dashboard/updateorder/${onRowDblClickBookingId}`);
    }
  }, [onRowDblClickBookingId, navigate]);

  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        break;
      case "New":
        navigate("/dashboard/purchase-order");
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
        >
          <DataTable
            data={data}
            columns={orderColumns}
            keyExpr="orderNumber"
            startEdit={startEdit}
            loading={loadingRef.current}
            setRowClickItem={setRowClickItem}
            filterValues={orderFilterValues}
          />
        </CategoryComponent>
      </section>
    </main>
  );
};

export default memo(Orders);
