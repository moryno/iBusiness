import React from "react";
import { FaToolbox } from "react-icons/fa";
import CustomActionsComponent from "./CustomActionsComponent";

const RightBarComponent = ({ customAction }) => {
  return (
    <main className="flex flex-col gap-4 box-border">
      <section className="flex flex-col gap-y-0.5 md:gap-1.5">
        <article className="p-2 flex flex-col gap-2.5">
          <div className="flex items-center gap-x-2 font-semibold text-sm">
            <FaToolbox className="text-menuText text-sm md:text-lg" /> Custom
            Actions
          </div>
        </article>
        <hr className="border h-0 border-gray-200" />
        <article className="flex flex-wrap items-center">
          {customAction.map((action) => (
            <CustomActionsComponent key={action.id} title={action.title} />
          ))}
        </article>
      </section>
    </main>
  );
};

export default RightBarComponent;
