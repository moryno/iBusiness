import { useEffect, useState, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { orderColumns } from "../../data/PurchaseOrderData";
import DataTable from "../../components/dashboard/DataTable";
import Statusbar from "../../components/dashboard/Statusbar";
import MenuButtonsGroup from "../../components/dashboard/MenuButtonsGroup";
import { homeMenuSource } from "../../data/menu";
import MobileMenus from "../../components/dashboard/MobileMenus";
import { LoadPanel } from "devextreme-react/load-panel";
import request from "../../helpers/tempRequest";

const Orders = () => {
  const [data, setData] = useState([]);
  const loadingRef = useRef(true);
  const [input, setInput] = useState(null);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const today = new Date().toISOString().slice(0, 10);

  // Fuction to get date change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  // // Fuction to close the Create || update form
  // const handleClose = () => {
  //   setStatusMode("");
  //   setOpen(false);
  // };

  // Fuction to edit row

  // This Hook is to fetch all orders
  useEffect(() => {
    const getData = async () => {
      try {
          
          const response = await request.get("PurchaseOrder/orders");
          // response.data.map(order => {
          //   console.log(order);
          //   return data.store().insert(order);

          // })
          console.log(response.data);
          setData(response.data);
          loadingRef.current = false;
        }
      catch (error) {
        console.log(error);
        getData();
      }

    }

    getData();
  }, []);

  const startEdit = (e) => {
    navigate(`/dashboard/updateorder/${e.data.orderNumber}`);
  };

  // // This Hook is to fetch single booking when a row in the datagrid is double clicked
  // useEffect(() => {
  //   const getSingleBooking = async () => {
  //     const { data } = await request.get(
  //       `Booking?bookingID=${selectedBookingId}`
  //     );
  //     setSingleBooking(data);
  //   };
  //   if (selectedBookingId) getSingleBooking();
  // }, [selectedBookingId]);

  // This fucntion is used to toggle between each menu botton clicks
  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        input === null && date === ""
          ? setDate({ startdate: today, enddate: today })
          : setDate(input);
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
        <section>
          <MenuButtonsGroup
            heading="Purchase Orders"
            menus={homeMenuSource}
            onMenuClick={handleClick}
          />

          <article className="relative">
            <MobileMenus menus={homeMenuSource} onMenuClick={handleClick} />

            <article className=" md:pr-5 flex gap-4 items-center">
              <div className="flex flex-col gap-2 md:flex-row w-full md:py-2">
                <div className="flex w-full justify-between md:justify-start md:w-1/2 items-center gap-5">
                  <label
                    className="font-semibold text-xs  text-gray-600"
                    htmlFor="fromDate"
                  >
                    From Date:
                  </label>
                  <input
                    className="border text-sm border-gray-300 w-1/2 outline-none rounded-sm"
                    type="date"
                    id="fromDate"
                    onChange={handleChange}
                    name="startdate"
                    defaultValue={today}
                  />
                </div>
                <div className="flex w-full justify-between md:justify-start md:w-1/2 items-center gap-5">
                  <label
                    className="font-semibold text-xs  text-gray-600"
                    htmlFor="toDate"
                  >
                    To Date:
                  </label>
                  <input
                    className="border text-sm border-gray-300 w-1/2 outline-none rounded-sm"
                    type="date"
                    id="toDate"
                    onChange={handleChange}
                    name="enddate"
                    defaultValue={today}
                  />
                </div>
              </div>
            </article>
          </article>
        </section>

        <section className="mt-5">
          <DataTable
            data={data}
            columns={orderColumns}
            keyExpr="orderNumber"
            startEdit={startEdit}
            loading={loadingRef.current}
          />
        </section>
        
      </section>
      <Statusbar heading="Purchase Orders" company="iBusiness" />
    </main>
  );
};

export default memo(Orders);
