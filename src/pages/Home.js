import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import BackupIcon from "@mui/icons-material/Backup";
import DataTable from "../components/DataTable";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="w-full min-h-screen px-2 md:px-5 py-1">
      <section>
        <section>
          <article className="w-full">
            <article className=" shadow-md p-2 md:p-5 flex items-center  bg-bgxLight">
              <div className="flex gap-2 flex-col md:flex-row md:items-center items-start justify-between w-full mt-2">
                <h1 className="md:text-2xl text-xl w-full font-semibold">
                  Booking List
                </h1>
              </div>
            </article>
            <div className="bg-bgLight py-2 px-3 mt-2 font-medium  text-heading">
              Online Course Booking-Enter the course Details, save, attach
              Document and Submit
            </div>

            <div className="flex items-center bg-bgxLight py-2 px-3 w-full mt-2">
              <Link to="/new">
                <div className="flex gap-1 border-r border-r-gray-300 py-1 px-2 items-center text-yellow font-medium  cursor-pointer text-sm">
                  <CreateIcon />
                  Create
                </div>
              </Link>
              <div className="flex gap-1 border-r border-r-gray-300 py-1 px-2 items-center  text-gn font-medium cursor-pointer text-sm">
                <BackupIcon />
                Submit
              </div>
              <div className="flex gap-1 border-r border-r-gray-300  py-1 px-2 items-center  text-red-500 font-medium cursor-pointer text-sm">
                <CloseIcon />
                Close
              </div>
            </div>
          </article>
        </section>
        <hr className="text-gray-200 my-2" />

        <section className="mt-5">
          <DataTable />
        </section>
      </section>
    </main>
  );
};

export default Home;
