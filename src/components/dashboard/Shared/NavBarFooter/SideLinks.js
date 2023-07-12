import React, { useState, useEffect } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { RxDot } from "react-icons/rx";
import { Link } from "react-router-dom";
import { RiSettings5Fill, RiFolder3Fill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getSideMenus } from "../../../../redux/api/sideMenusCall";

const SideLinks = () => {
  const dispatch = useDispatch();
  const [heading, setHeading] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const { sideMenus, partitionKey } = useSelector(
    (state) => state.moduleCategory
  );

  // Method to switch between each menu icons
  const getCategoryIcon = (title) => {
    switch (title) {
      case "Processess":
        return <RiSettings5Fill />;
      case "Inquiries":
        return <RiFolder3Fill />;
      case "Setups":
        return <FaTools />;
      case "Reports":
        return <TbReportSearch />;
      case "Member Services":
        return <RiSettings5Fill />;
      case "Other Services":
        return <RiFolder3Fill />;
      default:
        break;
    }
  };

  useEffect(() => {
    getSideMenus(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const newMenus = sideMenus?.filter((menu) => {
      if (partitionKey === "") {
        return menu?.partitionKey.toLowerCase().includes("procure2pay");
      } else {
        return menu?.partitionKey
          .toLowerCase()
          .includes(partitionKey.toLowerCase());
      }
    });

    setFilteredMenus(newMenus);
  }, [partitionKey, sideMenus]);

  return (
    <>
      {filteredMenus &&
        filteredMenus?.map((link) => {
          const icon = getCategoryIcon(link.title);

          return (
            <div key={link.id}>
              <div className="cursor-pointer px-1 overflow-y-auto w-full max-h-80 scrollbar-hide bg-blend-overlay">
                <div
                  className="linear-bg font-semibold border-b border-gray-300 text-[13px] sticky pl-2 py-0.5 text-statusBar top-0 flex justify-between  items-center w-full"
                  onClick={() =>
                    heading !== link.title
                      ? setHeading(link.title)
                      : setHeading("")
                  }
                >
                  <div className="flex items-center gap-1">
                    <span> {icon}</span>
                    {link.title}
                  </div>
                  <div className="flex items-center">
                    {heading !== link.title ? (
                      <MdArrowDropUp fontSize={20} />
                    ) : (
                      <MdArrowDropDown fontSize={20} />
                    )}
                  </div>
                </div>
                {link.subMenu && (
                  <div
                    className={`
              ${heading === link.title && "hidden"}
              `}
                  >
                    <div>
                      <div className="px-2">
                        {link.subLinks.map((mysublinks) => (
                          <Link to={mysublinks.link} key={mysublinks.name}>
                            <div className="flex items-center gap-1 hover:bg-white">
                              <RxDot />
                              <li className="text-xs font-normal text-sideColor py-1.5">
                                {mysublinks.name}
                              </li>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default SideLinks;
