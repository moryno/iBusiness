import SingleComponent from "../../components/dashboard/SingleComponent";
import { updateMenuSource } from "../../data/menu";

const BookingDetail = () => {
  return (
    <main className="w-full min-h-full relative  px-3 md:px-5 py-1.5">
      <section>
        <SingleComponent
          menus={updateMenuSource}
          heading={"Booking Detail"}
          company={"ARBS Customer Portal"}
        >
          <section className="flex flex-wrap gap-4 justify-evenly py-5 rounded-md shadow-xl">
            <article className="w-[40%] flex justify-between gap-1 items-center border-b border-gray-300">
              <h3 className=" font-light text-xs">Full Name:</h3>
              <h5 className="font-medium text-sm">James Maina</h5>
            </article>
          </section>
        </SingleComponent>
      </section>
    </main>
  );
};

export default BookingDetail;
