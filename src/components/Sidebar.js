import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";

import SideLinks from "./SideLinks";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const currentUser = useSelector((state) => state.user?.currentUser?.user);

  return (
    <main
      className={classNames({
        "flex flex-col": true, // layout
        "bg-bg text-sideMenu": true, // colors
        "md:w-full md:sticky md:top-[50px] md:z-0 top-0 z-20 fixed": true, // positioning
        "md:h-[calc(100vh_-_50px)] h-full w-[300px]": true, // for height and width
        "transition-transform .3s ease-in-out md:translate-x-0": true, //animations
        "-translate-x-full ": !showSidebar, //hide sidebar to the left when closed
      })}
    >
      <section className="flex flex-col h-full justify-between">
        <section>
          <article className="w-full font-medium">
            <ul className="flex flex-col gap-2 text-left">
              <SideLinks />
            </ul>
          </article>
        </section>
        <section className="flex pl-3 border-t border-b-gray-200 py-1 gap-4 items-center ">
          <img
            className="bg-skill h-10 w-10 rounded-full object-cover cursor-pointer "
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            alt="profile"
          />
          <article className="flex flex-col gap1">
            <h2 className="text-sm hover:text-gray-200 cursor-pointer">
              {currentUser.fullName}
            </h2>
            <Link to="/profile">
              <span className="text-sm hover:text-gray-200">View profile</span>
            </Link>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Sidebar;
