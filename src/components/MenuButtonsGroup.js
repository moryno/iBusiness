import React from "react";
import CustomButtonComponent from "../components/CustomButtonComponent";
import { menuSource } from "../data/menu";
import { handleClick } from "../data/menu";

const MenuButtonsGroup = () => {
  return (
    <main className="w-full bg-bgxLight md:px-5 flex">
      <section className="flex w-full items-center">
        <article className="flex items-center w-full md:w-3/12">
          <h1 className=" text-menu text-lg w-full font-semibold">
            Booking List
          </h1>
        </article>
        <article className="md:flex hidden justify-end  px-3 w-full md:w-9/12">
          {menuSource.map((menu) => (
            <CustomButtonComponent
              key={menu.id}
              onClick={() => handleClick(menu.title)}
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
