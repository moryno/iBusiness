import React from "react";

import SideLinks from "./SideLinks";

const Sidebar = ({ isExpanded }) => {
  return (
    <main
      className={`
    md:sticky absolute top-15px z-20 md:top-0 left-0 bg-bg text-white h-[calc(100vh-70px)] w-3/4 md:w-2/12 duration-500 ${
      isExpanded ? "hidden" : "block"
    } lg:p-2 text-center border-r border-r-gray-200
    `}
    >
      <section className="flexflex-col">
        <section className="flex flex-col items-center ">
          <img
            className="w-20 h-20 bg-skill rounded-full object-cover cursor-pointer my-5"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="profile"
          />
          <h2 className="">Jane Doe</h2>
        </section>
        <hr className="text-gray-200 my-2" />
        <section className="text-gray-500">
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
