import React from "react";
import { Link, useMatch } from "react-router-dom";
import { NavlinkIcons } from "./NavlinksIcons";

const NavLink = ({ to, name }) => {
  const isActive = useMatch(to);
  return (
    <Link className={isActive ? "active-link" : ""} to={to} key={name}>
      <div
        className={`flex px-2 items-center gap-1 hover:shadow-xl  ${
          isActive
            ? "bg-orang hover:bg-orange-400 font-semibold"
            : " hover:bg-white "
        }`}
      >
        {NavlinkIcons.hasOwnProperty(name) ? NavlinkIcons[name] : <></>}
        <li className="text-[13px] font-normal text-sideColor py-1.5">
          {name}
        </li>
      </div>
    </Link>
  );
};

export default NavLink;
