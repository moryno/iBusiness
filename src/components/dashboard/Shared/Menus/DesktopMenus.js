import DrillDownSwitch from "../NavBarFooter/DrillDownSwitch";
import CustomButtonComponent from "./CustomButtonComponent";

const DesktopMenus = ({ heading, menus, onMenuClick }) => {
  return (
    <main className="w-full py-0.5 px-3 md:px-5 bg-sidebarBg border-b border-gray-200 md:pr-5 flex">
      <section className="flex w-full items-center">
        <article className="flex items-center w-full md:w-3/12">
          <h1 className="text-menuHeading text-base w-full font-semibold">
            {heading}
          </h1>
        </article>
        <article className="md:flex items-center hidden justify-end py-1 gap-1 px-3 w-full md:w-9/12">
          {menus.map((menu) => (
            <CustomButtonComponent
              key={menu.id}
              onClick={() => onMenuClick(menu.title)}
              title={menu.title}
              icon={menu.icon}
            />
          ))}
          <DrillDownSwitch />
        </article>
      </section>
    </main>
  );
};

export default DesktopMenus;
