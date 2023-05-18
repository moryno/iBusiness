import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const PricingItem = ({ pricing }) => {
  return (
    <main className="w-full px-5 box-border md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 md:hover:-translate-y-1">
      <section>
        <article className="py-3 px-5  bg-white rounded-lg shadow-2xl hover:shadow-3xl box-border">
          <h4 className="font-semibold capitalize text-gray-400 text-center text-xl m-3">
            {pricing.title}
          </h4>
          <h6 className="text-center text-2xl md:text-4xl font-bold">
            {pricing.currency}
            {pricing.price}
            <span className="font-medium text-sm">/{pricing.period}</span>
          </h6>
          <hr className="h-[1px] text-gray-200 my-5" />
          <ul className="flex flex-col gap-3">
            {pricing?.items.map((item) => (
              <li key={item?.id} className="flex gap-1 items-center">
                {item?.check === true ? (
                  <>
                    <span>
                      <FaCheck />
                    </span>
                    <strong>{item?.name}</strong>
                  </>
                ) : (
                  <>
                    <span className="text-gray-300">
                      <RxCross2 />
                    </span>
                    <span className="text-gray-300">{item?.name}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
          <button className="w-full my-3 rounded-3xl px-3 py-2 cursor-pointer border-none bg-buttonBg text-white capitalize">
            {pricing?.button}
          </button>
        </article>
      </section>
    </main>
  );
};

export default PricingItem;