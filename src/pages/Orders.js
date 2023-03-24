import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { orderColumns } from "../data/PurchaseOrderData";
import DataTable from "../components/DataTable";
import Statusbar from "../components/Statusbar";
import MenuButtonsGroup from "../components/MenuButtonsGroup";
import { homeMenuSource } from "../data/menu";
import MobileMenus from "../components/MobileMenus";
import Portal from "../components/Portal";
import request from "../helpers/tempRequest";
import New from "./New";

import { setupLogin } from "../helpers/auth";
import { loginSuccess } from "../redux/userSlice";
import DataSource from "devextreme/data/data_source";

const Orders = () => {
  const [data, setData] = useState([]);
  const [singleBooking, setSingleBooking] = useState({});
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [input, setInput] = useState(null);
  const [date, setDate] = useState("");
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const { hash } = useLocation();
  const dispatch = useDispatch();
  const token = hash.split("=")[1];

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
    try {
      const getData = async () => {
        const response = await request.get('PurchaseOrder/orders');
        // response.data.map(order => {
        //   return data.store().insert(order);
          
        // })

        setData(response.data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

    const startEdit = (e) => {
    navigate(`/updateorder/${e.data.orderNumber}`);
  }


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
        navigate('/purchase-order');
      case "Delete":
        console.log("Delete was clicked");
        break;
      case "Close":
        navigate('/')
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
          <DataTable data={data} columns={orderColumns} keyExpr="orderNumber" startEdit={startEdit} />
        </section>
      </section>
      <Statusbar heading="Purchase Orders" company="iBusiness" />
    </main>
  );
};

export default Orders;
