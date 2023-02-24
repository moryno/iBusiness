import { menus } from "../helpers/mySubLinks";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { RxDot } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState } from "react";

const SideLinks = () => {
  const [heading, setHeading] = useState("");

  return (
    <>
      {menus.map((link) => (
        <div key={link.title}>
          <div className="cursor-pointer px-1 overflow-y-auto w-full max-h-80 scrollbar-hide bg-blend-overlay">
            <h1
              className=" font-bold text-sm sticky pl-2 bg-sidebarHeading text-heading top-0 flex justify-between md:justify-start items-center"
              onClick={() =>
                heading !== link.title ? setHeading(link.title) : setHeading("")
              }
            >
              {link.title}
              {heading !== link.title ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
            </h1>
            {link.submenu && (
              <div
                className={`
              ${heading === link.title && "hidden"}
              `}
              >
                <div className="">
                  <div className="px-5">
                    {link.sublinks.map((mysublinks) => (
                      <div
                        className="flex items-center gap-1 hover:bg-white"
                        key={mysublinks.name}
                      >
                        <RxDot />
                        <li className="text-sm font-medium text-sideMenu py-1.5">
                          <Link to={mysublinks.link}>{mysublinks.name}</Link>
                        </li>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default SideLinks;
