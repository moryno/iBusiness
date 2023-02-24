import React from "react";
import CustomButtonComponent from "../components/CustomButtonComponent";

const MenuButtonsGroup = ({ heading, menus, onMenuClick }) => {
  return (
    <main className="w-full bg-light md:px-5 flex">
      <section className="flex w-full items-center">
        <article className="flex items-center w-full md:w-3/12">
          <h1 className="text-heading text-lg w-full font-semibold">
            {heading}
          </h1>
        </article>
        <article className="md:flex hidden justify-end py-1.5 gap-1 px-3 w-full md:w-9/12">
          {menus.map((menu) => (
            <CustomButtonComponent
              key={menu.id}
              onClick={() => onMenuClick(menu.title)}
              title={menu.title}
              icon={menu.icon}
            />
          ))}
        </article>
      </section>
    </main>
  );
};

export default MenuButtonsGroup;
