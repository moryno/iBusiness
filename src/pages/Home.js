import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";
import BackupIcon from "@mui/icons-material/Backup";
import DataTable from "../components/DataTable";

import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ onShow }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/bookings");
      setData(data);
    };
    getData();
  }, []);
  return (
    <main className="w-full min-h-screen px-2 md:px-5 py-1">
      <section>
        <section>
          <article className="w-full">
            <div className="flex items-center bg-bgxLight py-2 px-3 w-full">
              <div
                onClick={onShow}
                className="flex gap-1 border-r border-r-gray-300 py-1 px-2 items-center text-yellow font-medium  cursor-pointer text-sm"
              >
                <AddIcon />
                New
              </div>

              <div className="flex gap-1 border-r border-r-gray-300 py-1 px-2 items-center  text-gn font-medium cursor-pointer text-sm">
                <BackupIcon />
                Submit
              </div>
              <div className="flex gap-1 border-r border-r-gray-300  py-1 px-2 items-center  text-red-400 font-medium cursor-pointer text-sm">
                <DeleteIcon />
                Delete
              </div>
              <div className="flex gap-1 border-r border-r-gray-300  py-1 px-2 items-center text-blue-400 font-medium cursor-pointer text-sm">
                <HelpIcon />
                Help
              </div>
            </div>
            <article className="shadow-md p-2 md:px-5 flex flex-col gap-4 items-center">
              <h1 className="md:text-xl text-xl w-full font-semibold">
                Booking List
              </h1>
              <div className="flex w-full md:py-5">
                <div className="flex w-1/2 items-center gap-5">
                  <label
                    className="font-semibold  text-gray-600"
                    htmlFor="fromDate"
                  >
                    From Date:
                  </label>
                  <input
                    className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                    type="date"
                    id="fromDate"
                    name="fromDate"
                  />
                </div>
                <div className="flex w-1/2 items-center gap-5">
                  <label
                    className="font-semibold  text-gray-600"
                    htmlFor="toDate"
                  >
                    To Date:
                  </label>
                  <input
                    className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                    type="date"
                    id="toDate"
                    name="toDate"
                  />
                </div>
              </div>
            </article>
          </article>
        </section>
        <hr className="text-gray-200 my-2" />

        <section className="mt-5">
          <DataTable data={data} />
        </section>
      </section>
    </main>
  );
};

export default Home;
