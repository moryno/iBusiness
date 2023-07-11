import React from "react";

const CustomActionsComponent = ({ customAction, handleClick }) => {
  return customAction.map((action) => (
    <article
      key={action.id}
      onClick={() => handleClick(action.title)}
      className="flex gap-1 hover:bg-gray-200 first:border-l border-t border-r border-b border-gray-200 py-1 px-1.5 w-fit bg-menuBg text-menuText items-center font-medium  cursor-pointer text-sm"
    >
      {action.title}
    </article>
  ));
};

export default CustomActionsComponent;
