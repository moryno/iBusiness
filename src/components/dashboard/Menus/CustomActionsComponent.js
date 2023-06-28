import React from "react";

const CustomActionsComponent = ({ onClick, title, icon }) => {
  return (
    <article
      onClick={onClick}
      className="flex transition-all duration-100 transform active:scale-95 gap-1 justify-center rounded-sm hover:bg-gray-200 border-l border-t border-r border-b border-gray-200 py-1 w-1/2 bg-menuBg text-menuText items-center font-medium  cursor-pointer text-sm"
    >
      <span className="blue-icon">{icon}</span>
      {title}
    </article>
  );
};

export default CustomActionsComponent;
