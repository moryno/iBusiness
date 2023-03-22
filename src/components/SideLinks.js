import React, { useState, useEffect } from "react";

import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { RxDot } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiToolsFill, RiSettings5Fill, RiFolder3Fill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import axios from "axios";
import { sideMenuRequest } from "../helpers/requestMethod";
import { AzureCosmos } from "../helpers/sideMenuRequest";

const SideLinks = () => {
  const [heading, setHeading] = useState("");
  const [moduleCategory, setModuleCategory] = useState([]);
  // const moduleCategory = useSelector((state) => state.moduleCategory?.category);

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
    AzureCosmos().then((response) => setModuleCategory(response));
  }, []);

  return (
    <>
      {moduleCategory?.map((link) => {
        const icon = getCategoryIcon(link.Title);

        return (
          <div key={link.id}>
            <div className="cursor-pointer px-1 overflow-y-auto w-full max-h-80 scrollbar-hide bg-blend-overlay">
              <div
                className="font-semibold text-xs sticky pl-2 py-0.5 bg-sidebarHeading text-heading top-0 flex justify-between  items-center w-full"
                onClick={() =>
                  heading !== link.Title
                    ? setHeading(link.Title)
                    : setHeading("")
                }
              >
                <div className="flex items-center gap-1">
                  {icon}
                  {link.Title}
                </div>
                <div className="flex items-center">
                  {heading !== link.Title ? (
                    <MdArrowDropUp fontSize={20} />
                  ) : (
                    <MdArrowDropDown fontSize={20} />
                  )}
                </div>
              </div>
              {link.SubMenu && (
                <div
                  className={`
              ${heading === link.Title && "hidden"}
              `}
                >
                  <div className="">
                    <div className="px-2">
                      {link.SubLinks.map((mysublinks) => (
                        <div
                          className="flex items-center gap-1 hover:bg-[#f5f5f5]"
                          key={mysublinks.Name}
                        >
                          <RxDot />
                          <li className="text-xs font-normal text-sideMenu py-1.5">
                            <Link to={mysublinks.Link}>{mysublinks.Name}</Link>
                          </li>
                        </div>
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
