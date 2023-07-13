import { GoKebabVertical } from "react-icons/go";
import { useDispatch } from "react-redux";
import { moduleCategories } from "../../../../helpers/moduleSource";
import { getModule } from "../../../../redux/moduleSlice";

const DrillDownSwitch = () => {
  const dispatch = useDispatch();

  const handleClick = (partitionKey) => {
    dispatch(getModule(partitionKey));
  };

  return (
    <main className="flex flex-col py-0.5 hover:bg-gray-200">
      <section className="cursor-pointer group">
        <article className="md:flex opacity-70 hidden ">
          <GoKebabVertical fontSize={20} />
        </article>
        <section className="absolute md:top-8 top-6 right-1 md:right-5  z-50 hidden  group-hover:block hover:block">
          <article className="bg-bgDropDown rounded-sm px-2 py-1 shadow-xl">
            <div className="flex flex-col mt-2 justify-between">
              {moduleCategories.map((category) => (
                <li
                  key={category.id}
                  className="text-xs flex gap-1 items-center text-dropDown py-2.5 hover:bg-bgxxLight"
                  onClick={() => handleClick(category.partitionKey)}
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
