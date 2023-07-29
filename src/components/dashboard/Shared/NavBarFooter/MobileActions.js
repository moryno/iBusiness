import { FaToolbox } from "react-icons/fa";

const MobileActions = ({ customActions, onActionClick }) => {
  return (
    <main className="flex flex-col text-menu  hover:bg-bgLight group relative">
      <section className="cursor-pointer ">
        <article className="flex gap-1 transition-all duration-100  hover:bg-gray-200 py-[3px] px-4 w-fit  items-center cursor-pointer text-xs">
          <FaToolbox fontSize={18} />
          Actions
        </article>
        <section className="absolute top-0 -right-24 z-50 hidden  group-hover:block hover:block">
          <article className="bg-bgDropDown rounded-sm px-2 py-1 shadow-xl">
            <div className="flex flex-col mt-2 justify-between">
              {customActions.map((category) => (
                <li
                  key={category.id}
                  className="text-xs flex gap-1 items-center text-dropDown py-2.5 hover:bg-bgLight"
                  onClick={() => onActionClick(category.title)}
                >
                  {category.icon} {category.title}
                </li>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
};

export default MobileActions;
