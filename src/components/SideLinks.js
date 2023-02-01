import { menus } from "../helpers/mySubLinks";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link } from "react-router-dom";
import { useState } from "react";

const SideLinks = () => {
  const [heading, setHeading] = useState("");

  return (
    <>
      {menus.map((link) => (
        <div key={link.title}>
          <div className="cursor-pointer overflow-y-auto w-full max-h-60 scrollbar-hide bg-blend-overlay">
            <h1
              className=" font-semibold sticky text-white bg-bg top-0 flex justify-between md:justify-start items-center"
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
                  <div className=" px-5">
                    {link.sublinks.map((mysublinks) => (
                      <div key={mysublinks.name}>
                        <li className="text-sm text-white py-3 pl-3">
                          <Link
                            to={mysublinks.link}
                            className="hover:text-gray-300"
                          >
                            {mysublinks.name}
                          </Link>
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
