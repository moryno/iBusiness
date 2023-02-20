import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";
import BackupIcon from "@mui/icons-material/Backup";
import DataTable from "../components/DataTable";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import { Close, Print } from "@material-ui/icons";
import { MdFreeCancellation } from "react-icons/md";
import Statusbar from "../components/Statusbar";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState(null);
  const [date, setDate] = useState("");

  const expand = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <main className="w-full relative  px-3 md:px-5 py-1.5">
      <section>
        <section>
          <article className="w-full bg-bgxLight md:px-5 flex">
            <div className="flex items-center gap-1 w-full md:w-3/12">
              <h1 className=" text-menu text-lg w-full font-semibold">
                Booking List
              </h1>
            </div>
            <div className="md:flex hidden justify-end  px-3 w-full md:w-9/12">
              <div
                onClick={() => setDate(input)}
                className="flex gap-1 border-l border-l-gray-300 hover:bg-bgLight  px-2 text-menu items-center font-medium  cursor-pointer text-sm"
              >
                <SearchOutlined />
                Find
              </div>
              <div className="flex gap-1 border-l border-l-gray-300 hover:bg-bgLight  px-2 text-menu items-center  font-medium  cursor-pointer text-sm">
                <Link to="/new">
                  <AddIcon />
                  New
                </Link>
              </div>

              <div className="flex gap-1 border-l border-l-gray-300 hover:bg-bgLight   px-2 text-menu items-center   font-medium cursor-pointer text-sm">
                <Print />
                Print Report
              </div>

              <div className="flex gap-1 border-l border-l-gray-300 hover:bg-bgLight   px-2 text-menu items-center  font-medium cursor-pointer text-sm">
                <DeleteIcon />
                Delete
              </div>
              <div className="flex gap-1 border-l border-l-gray-300 hover:bg-bgLight   px-2 text-menu items-center  font-medium cursor-pointer text-sm">
                <MdFreeCancellation fontSize={"18px"} />
                Close
              </div>
              <div className="flex gap-1 border-l border-l-gray-300 hover:bg-bgLight   px-2 text-menu items-center  font-medium cursor-pointer text-sm">
                <HelpIcon />
                Help
              </div>
            </div>
          </article>
          <div
            onClick={expand}
            className="space-y-1 p-1.5 md:hidden cursor-pointer z-40"
          >
            <MenuIcon className=" opacity-50 cursor-pointer" />
          </div>
          <article className="relative">
            {isExpanded && (
              <div className="md:hidden">
                <ul className="top-0 left-0 bg-bgxLight font-medium w-fit  z-20">
                  <li
                    className="flex items-center gap-1  text-sm text-menu px-5 py-1.5 cursor-pointer hover:bg-bgLight"
                    onClick={() => setDate(input)}
                  >
                    <SearchOutlined fontSize="small" />
                    Find
                  </li>
                  <li
                    className="flex items-center gap-1  text-sm text-menu px-5 py-1.5 cursor-pointer hover:bg-bgLight"
                    onClick={expand}
                  >
                    <Link to="/new">
                      {" "}
                      <AddIcon fontSize="small" />
                      New
                    </Link>
                  </li>
                  <li
                    className="flex items-center gap-1 text-sm text-menu px-5 py-1.5  cursor-pointer hover:bg-bgLight"
                    onClick={expand}
                  >
                    <Print fontSize="small" />
                    Print Report
                  </li>
                  <li
                    className="flex items-center gap-1 text-sm text-menu px-5 py-1.5  cursor-pointer hover:bg-bgLight"
                    onClick={expand}
                  >
                    <DeleteIcon fontSize="small" />
                    Delete
                  </li>
                  <li
                    className="flex items-center gap-1 text-sm text-menu px-5 py-1.5  cursor-pointer hover:bg-bgLight"
                    onClick={expand}
                  >
                    <MdFreeCancellation />
                    Close
                  </li>
                  <li
                    className="flex items-center gap-1 text-sm text-menu px-5 py-1.5  cursor-pointer hover:bg-bgLight"
                    onClick={expand}
                  >
                    <HelpIcon />
                    Help
                  </li>
                </ul>
              </div>
            )}
            <article className="shadow-md  md:px-5 flex gap-4 items-center">
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
          <DataTable date={date} />
        </section>
      </section>
      <Statusbar />
    </main>
  );
};

export default Home;
