import DataTable from "../components/DataTable";
import { useEffect, useState } from "react";
import Statusbar from "../components/Statusbar";
import CreateForm from "../components/CreateForm";
import MenuButtonsGroup from "../components/MenuButtonsGroup";
import { homeMenuSource } from "../data/menu";
import MobileMenus from "../components/MobileMenus";
import Portal from "../components/Portal";
import New from "./New";
import request from "../helpers/requestMethod";
import {
  createBookingFormInputs,
  editBookingFormInputs,
} from "../helpers/formSource";

const Home = () => {
  const [data, setData] = useState([]);
  const [singleBooking, setSingleBooking] = useState({});
  const [input, setInput] = useState(null);
  const [date, setDate] = useState("");
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  // Fuction to close the Create || update form
  const handleClose = () => {
    setStatusMode("");
    setOpen(false);
  };
  // Fuction to edit row
  const startEdit = (selectedRow) => {
    setStatusMode("EditBooking");
    setOpen((isOpen) => !isOpen);
    setSingleBooking(selectedRow.data);
  };

  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await request.get(
          date
            ? `Booking/GetbyDate?startdate=${date.startdate}&enddate=${date.enddate}`
            : "Booking"
        );
        setData(data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        input === null && date === ""
          ? setDate({ startdate: today, enddate: today })
          : setDate(input);
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
                    className="font-medium  text-gray-600"
                    htmlFor="fromDate"
                  >
                    From Date:
                  </label>
                  <input
                    className="border border-gray-300 w-1/2 outline-none rounded-sm"
                    type="date"
                    id="fromDate"
                    onChange={handleChange}
                    name="startdate"
                    defaultValue={today}
                  />
                </div>
                <div className="flex w-full justify-between md:justify-start md:w-1/2 items-center gap-5">
                  <label
                    className="font-medium  text-gray-600"
                    htmlFor="toDate"
                  >
                    To Date:
                  </label>
                  <input
                    className="border border-gray-300 w-1/2 outline-none rounded-sm"
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
          <DataTable data={data} startEdit={startEdit} />
        </section>
      </section>
      {statusMode === "CreateBooking" ? (
        <Portal isOpen={isOpen}>
          <CreateForm
            bookings={data}
            singleBooking={singleBooking}
            setBookings={setData}
            handleClose={handleClose}
            title={"Create New Booking"}
            statusBarText={"Add a booking"}
            statusMode={statusMode}
          />
        </Portal>
      ) : (
        statusMode === "EditBooking" && (
          <Portal isOpen={isOpen}>
            <CreateForm
              bookings={data}
              singleBooking={singleBooking}
              setBookings={setData}
              handleClose={handleClose}
              title={"Update A Booking"}
              statusBarText={"Updating a single booking"}
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
