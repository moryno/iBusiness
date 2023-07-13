import { GoKebabVertical } from "react-icons/go";
import { useDispatch } from "react-redux";

import { getModule } from "../../../../redux/moduleSlice";

const DrillDownSwitch = ({ customActions, onActionClick }) => {
  const dispatch = useDispatch();

  const handleClick = (partitionKey) => {
    dispatch(getModule(partitionKey));
  };
  console.log(customActions);
  return (
    <main className="flex flex-col py-0.5 hover:bg-gray-200 group">
      <section className="cursor-pointer ">
        <article className="md:flex opacity-70 hidden ">
          <GoKebabVertical fontSize={20} />
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
