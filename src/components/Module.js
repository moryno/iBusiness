import { CgMenuGridO } from "react-icons/cg";

import { GoKebabVertical } from "react-icons/go";
import { useDispatch } from "react-redux";
import { moduleCategories } from "../helpers/moduleSource";
import { getSelectedModule } from "../helpers/mySubLinks";

const Module = () => {
  const dispatch = useDispatch();

  const handleClick = (category) => {
    getSelectedModule(dispatch, category);
  };

  return (
    <main className="flex flex-col">
      <section className="cursor-pointer group">
        <article className="md:flex opacity-70 hidden  items-center font-medium">
          <CgMenuGridO fontSize={28} />
        </article>
        <article className="flex md:hidden opacity-70 items-center font-medium">
          <GoKebabVertical fontSize={16} />
        </article>

        <section className="absolute md:top-10 top-8 right-1 md:right-5  z-50 hidden  group-hover:block hover:block">
          <article className="bg-bgDropDown rounded-sm px-2 py-1 shadow-xl">
            <div className="flex flex-col mt-2 justify-between">
              {moduleCategories.map((category) => (
                <li
                  key={category.id}
                  className="text-sm flex gap-1 items-center text-dropDown py-2.5 hover:bg-bgxxLight"
                  onClick={() => handleClick(category.title)}
                >
                  {category.title}
                </li>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Module;
