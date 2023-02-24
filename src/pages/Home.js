import DataTable from "../components/DataTable";
import { useEffect, useState } from "react";
import Statusbar from "../components/Statusbar";
import MenuButtonsGroup from "../components/MenuButtonsGroup";
import { homeMenuSource } from "../data/menu";
import MobileMenus from "../components/MobileMenus";
import Portal from "../components/Portal";
import New from "./New";
import request from "../helpers/requestMethod";

const Home = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState(null);
  const [date, setDate] = useState("");
  const [isOpen, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
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
        setDate(input);
        break;
      case "New":
        setOpen((isOpen) => !isOpen);
        break;
      case "Print Report":
        console.log("Print Report was clicked");
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
        <section className="shadow-md ">
          <MenuButtonsGroup
            heading="Booking List"
            menus={homeMenuSource}
            onMenuClick={handleClick}
          />

          <article className="relative">
            <MobileMenus menus={homeMenuSource} onMenuClick={handleClick} />

            <article className=" md:px-5 flex gap-4 items-center">
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
                  />
                </div>
              </div>
            </article>
          </article>
        </section>

        <section className="mt-5">
          <DataTable data={data} />
        </section>
      </section>
      <Portal isOpen={isOpen}>
        <New
          bookings={data}
          setBookings={setData}
          handleClose={() => setOpen(false)}
        />
      </Portal>
      <Statusbar heading="Booking List" company="ARBS Customer Portal" />
    </main>
  );
};

export default Home;
