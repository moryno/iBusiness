import React from "react";
import classNames from "classnames";
import SideLinks from "./SideLinks";

const Sidebar = ({ showSidebar, openSidebar }) => {
  return (
    <main
      className={classNames({
        "flex flex-col": true, // layout
        "bg-bg text-sideMenu": true, // colors
        "left-0 w-[300px] md:sticky md:top-[50px] md:z-0 top-0 z-20 fixed": true, // positioning
        "md:h-[calc(100vh_-_50px)] h-full md:w-2/12": true, // for height and width
        "transition-transform .3s ease-in-out md:translate-x-0": true, //animations
        "-translate-x-full": !showSidebar, //hide sidebar to the left when in small screen
        "md:hidden": !openSidebar, //hide sidebar to the left when in small screen
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
      </section>
    </main>
  );
};

export default Sidebar;
