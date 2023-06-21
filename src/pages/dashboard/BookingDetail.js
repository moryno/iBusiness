import { useLocation } from "react-router";
import SingleComponent from "../../components/dashboard/SingleComponent";
import { updateMenuSource } from "../../data/menu";

const BookingDetail = () => {
  const location = useLocation();
  const { data } = location.state;

  return (
    <main className="w-full min-h-full relative  px-3 md:px-5 py-1.5">
      <section>
        <SingleComponent
          menus={updateMenuSource}
          heading={"Booking Detail"}
          company={"ARBS Customer Portal"}
        >
          <section className="flex flex-wrap gap-4 justify-evenly py-5 rounded-md shadow-xl">
            {Object.keys(data).map((key) => (
              <article
                key={key}
                className="w-[40%] flex justify-between gap-1 items-center border-b border-gray-300"
              >
                <h3 className=" font-light text-xs">{key}:</h3>
                <h5 className="font-medium text-sm">{data[key]}</h5>
              </article>
            ))}
          </section>
        </SingleComponent>
      </section>
    </main>
  );
};

export default BookingDetail;
