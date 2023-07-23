import { HiCheck } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const GroupDetails = ({ data, title }) => {
  const handleDataValue = (e) => {
    if (e === true) {
      return <HiCheck fontSize={20} />;
    } else if (e === false) {
      return <IoMdClose fontSize={20} />;
    } else {
      return e;
    }
  };

  return (
    <main className="lg:rounded-md h-screen md:h-full flex flex-col gap-3 p-0 lg:px-5 lg:py-2">
      <section>
        <h2 className="font-semibold">{title}</h2>
      </section>
      <hr className="border h-0 border-gray-200" />
      <section className="flex flex-col gap-4 justify-between">
        {Object.keys(data).map((key) => (
          <article
            key={key}
            className="w-full md:w-[70%] flex justify-between gap-1 items-center border-b border-gray-300"
          >
            <h3 className="capitalize font-light text-xs">{key}:</h3>
            <h5 className="font-medium text-sm">
              {handleDataValue(data[key])}
            </h5>
          </article>
        ))}
      </section>
    </main>
  );
};

export default GroupDetails;
