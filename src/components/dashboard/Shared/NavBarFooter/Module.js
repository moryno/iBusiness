import { CgMenuGridO } from "react-icons/cg";

import { FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { moduleCategories } from "../../../../data/dashboard-page/moduleSource";
import {
  getMenuItem,
  getModuleName,
  getPartitionKey,
} from "../../../../redux/reducers/moduleSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Module = () => {
  const dispatch = useDispatch();
  const { sideMenus, partitionKey } = useSelector(
    (state) => state.moduleCategory
  );
  //This user component
  const [userModules, setUserModules] = useState([]);
  const [currentModule, setCurrentModule] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const partionKeys = sideMenus?.map((item) => item.partitionKey);
    const filtered = moduleCategories?.filter((item) =>
      partionKeys?.includes(item.partitionKey)
    );
    setUserModules(filtered);
  }, [sideMenus]);

  useEffect(() => {
    setCurrentModule(partitionKey);
  }, [partitionKey]);

  const handleClick = (category) => {
    //Before switching check if not in current route
    if (currentModule !== category.partitionKey) {
      dispatch(getPartitionKey(category.partitionKey));
      dispatch(getModuleName(category.title));
      //Reset menu
      dispatch(getMenuItem(""));

      //May want to navigate to category home, through it's provided link
      //i.e category.link
      navigate(category.link);
    }
  };

  return (
    <main className="flex flex-col">
      <section className="cursor-pointer group">
        <article className="md:flex opacity-70 hidden  items-center font-medium">
          <CgMenuGridO fontSize={24} />
        </article>
        <article className="flex md:hidden opacity-70 items-center font-medium">
          <FaEllipsisV fontSize={16} />
        </article>

        <section className="absolute md:top-8 top-6 right-1 md:right-5  z-50 hidden  group-hover:block hover:block">
          <article className="bg-bgDropDown rounded-sm px-2 py-1 shadow-xl">
            <div className="flex flex-col mt-2 justify-between">
              {userModules.map((category) => (
                <li
                  key={category.partitionKey}
                  className="text-xs flex gap-1 items-center text-dropDown py-2.5 hover:bg-bgxxLight"
                  onClick={() => handleClick(category)}
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

export default Module;
