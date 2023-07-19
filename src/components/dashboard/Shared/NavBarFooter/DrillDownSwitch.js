import { FaToolbox } from "react-icons/fa";

const DrillDownSwitch = ({ customActions, onActionClick }) => {
  return (
    <main className="flex flex-col  hover:bg-gray-200 group">
      <section className="cursor-pointer ">
        <article className="flex gap-1 transition-all duration-100 hover:bg-gray-200 py-[3px] px-4 w-fit bg-menuBg text-menuText items-center font-medium  cursor-pointer text-xs">
          <FaToolbox fontSize={20} />
          Actions
        </article>
        <section className="absolute md:top-8 top-6 right-1 md:right-8  z-50 hidden  group-hover:block hover:block">
          <article className="bg-bgDropDown rounded-sm px-2 py-1 shadow-xl">
            <div className="flex flex-col mt-2 justify-between">
              {customActions.map((category) => (
                <li
                  key={category.id}
                  className="text-xs flex gap-1 items-center text-dropDown py-2.5 hover:bg-bgxxLight"
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

export default DrillDownSwitch;
