import React from "react";
import { RiSettings5Fill, RiFolder3Fill } from "react-icons/ri";
import { FaTools } from "react-icons/fa";

const RightBarComponent = () => {
  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-5">
        <article className="p-2 flex flex-col gap-2.5 rounded-md">
          <div className="flex items-center">
            <div className="font-semibold flex gap-2 items-center text-xs">
              <FaTools className="text-menuText" /> Actions
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-semibold flex gap-2 items-center text-xs">
              <RiSettings5Fill className="text-menuText" /> Actions
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-semibold flex gap-2 items-center text-xs">
              <RiFolder3Fill className="text-menuText" /> Actions
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-semibold flex gap-2 items-center text-xs">
              <RiSettings5Fill className="text-menuText" /> Actions
            </div>
          </div>
        </article>
        <section className="flex flex-col gap-5">
          <article className="p-2 rounded-md bg-card">
            <div className="py-0.5">
              <div className="font-semibold flex gap-2 items-center text-sm">
                <FaTools className="text-menuText" /> Actions
              </div>
            </div>
          </article>
          <article className="p-2 rounded-md bg-card">
            <div className="py-0.5">
              <div className="font-semibold flex gap-2 items-center text-sm">
                <FaTools className="text-menuText" /> Actions
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
};

export default RightBarComponent;
