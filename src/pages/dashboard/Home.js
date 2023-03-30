import { useEffect, useState } from "react";
import DateBox from "devextreme-react/date-box";

import DataTable from "../../components/dashboard/DataTable";
import Statusbar from "../../components/dashboard/Statusbar";
import MenuButtonsGroup from "../../components/dashboard/MenuButtonsGroup";
import { homeMenuSource } from "../../data/menu";
import MobileMenus from "../../components/dashboard/MobileMenus";
import Portal from "../../components/dashboard/Portal";
import request from "../../helpers/requestMethod";
import New from "./New";
import { bookingColumns } from "../../data/PurchaseOrderData";

// Get todays day to use in the filter date fields of the datagrid
const today = new Date().toISOString().slice(0, 10);

const Home = () => {
  const [data, setData] = useState([]);
  const [singleBooking, setSingleBooking] = useState({});
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [date, setDate] = useState("");
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fuction to close the Create || update form
  const handleClose = () => {
    setStatusMode("");
    setOpen(false);
  };
  // Fuction to edit row
  const startEdit = (selectedRow) => {
    setStatusMode("EditBooking");
    setOpen((isOpen) => !isOpen);
    setSelectedBookingId(selectedRow.data.bookingId);
  };

  // This Hook is to fetch all bookings when a page renders or when date is passed as parameter in the datagrid
  useEffect(() => {
    try {
      const getData = async () => {
        setLoading(true);
        const { data } = await request.get(
          date
            ? `Booking/GetbyDate?startdate=${date.startdate}&enddate=${date.enddate}`
            : "Booking"
        );
        setLoading(false);
        setData(data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  // This Hook is to fetch single booking when a row in the datagrid is double clicked
  useEffect(() => {
    const getSingleBooking = async () => {
      const { data } = await request.get(
        `Booking?bookingID=${selectedBookingId}`
      );
      setSingleBooking(data);
    };
    if (selectedBookingId) getSingleBooking();
  }, [selectedBookingId]);

  // This function is used to toggle between each menu botton clicks
  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        fromDate === null && toDate && date === ""
          ? setDate({ startdate: fromDate, enddate: toDate })
          : setDate({ startdate: fromDate, enddate: toDate });
        break;
      case "New":
        setStatusMode("CreateBooking");
        setOpen((isOpen) => !isOpen);
        break;
      case "Delete":
        console.log("Delete was clicked");
        break;
      case "Close":
        console.log("Close was clicked");
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
            heading="Booking List"
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

                  <DateBox
                    id="courseDate"
                    name="courseDate"
                    onValueChanged={(e) => setFromDate(e.value)}
                    value={fromDate}
                    height={26}
                    className=" border  text-xs pl-1 w-full md:w-1/2  outline-none"
                  />
                </div>
                <div className="flex w-full justify-between md:justify-start md:w-1/2 items-center gap-5">
                  <label
                    className="font-semibold text-xs  text-gray-600"
                    htmlFor="toDate"
                  >
                    To Date:
                  </label>
                  <DateBox
                    id="courseDate"
                    name="courseDate"
                    onValueChanged={(e) => setToDate(e.value)}
                    value={toDate}
                    height={26}
                    className=" border  text-xs pl-1 w-full md:w-1/2  outline-none"
                  />
                </div>
              </div>
            </article>
          </article>
        </section>
        <section className="mt-5">
          <DataTable
            data={data}
            columns={bookingColumns}
            keyExpr="bookingId"
            startEdit={(e) => startEdit(e)}
            loading={loading}
          />
        </section>
      </section>

      {statusMode === "CreateBooking" ? (
        <Portal isOpen={isOpen} setOpen={setOpen}>
          <New
            bookings={data}
            singleBooking={singleBooking}
            setBookings={setData}
            handleClose={handleClose}
            title={"Create New Booking"}
            heading={"Booking Item Management"}
            statusBarText={"New Booking Item"}
            statusMode={statusMode}
          />
        </Portal>
      ) : (
        statusMode === "EditBooking" && (
          <Portal isOpen={isOpen} setOpen={setOpen}>
            <New
              bookings={data}
              singleBooking={singleBooking}
              setBookings={setData}
              handleClose={handleClose}
              title={"Update A Booking Item"}
              heading={"Booking Item Management"}
              statusBarText={"Updating Booking Item"}
              statusMode={statusMode}
            />
          </Portal>
        )
      )}

      <Statusbar heading="Booking List" company="ARBS Customer Portal" />
    </main>
  );
};

export default Home;
