import React, { useState, useEffect } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { RiSettings5Fill, RiFolder3Fill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { useSelector } from "react-redux";

import NavLink from "./NavLink";
import { Loading } from "../../../frontend/landing-page/Loading";

const SideLinks = () => {
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
    const newMenus = sideMenus?.find((menu) => {
      if (partitionKey === "") {
        return menu?.partitionKey === "sad";
      } else {
        return menu?.partitionKey.toLowerCase() === partitionKey.toLowerCase();
      }
    });

    setFilteredMenus(newMenus?.subMenus);
  }, [partitionKey, sideMenus]);

  return (
    <>
      {filteredMenus ? (
        filteredMenus?.map((link) => {
          const icon = getCategoryIcon(link.title);

          return (
            <div key={link.id}>
              <div className="cursor-pointer overflow-y-auto w-full max-h-80 scrollbar-hide bg-blend-overlay">
                <div
                  className="linear-bg font-semibold border-b border-gray-300 text-[13px] sticky pl-2 py-0.5 text-statusBar top-0 flex justify-between  items-center w-full"
                  onClick={() =>
                    heading !== link.title
                      ? setHeading(link.title)
                      : setHeading("")
                  }
                >
                  <div className="flex items-center gap-2">
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
                      <div>
                        {link.subLinks.map((mysublinks) => (
                          <NavLink
                            key={mysublinks.name}
                            to={mysublinks.link}
                            name={mysublinks.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SideLinks;
