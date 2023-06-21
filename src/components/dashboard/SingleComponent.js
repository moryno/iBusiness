import Statusbar from "../../components/dashboard/Statusbar";
import MenuButtonsGroup from "../../components/dashboard/MenuButtonsGroup";
import MobileMenus from "../../components/dashboard/MobileMenus";
import RightBarComponent from "./RightBarComponent";

const SingleComponent = ({
  heading,
  menus,
  company,
  children,
  onMenuClick,
}) => {
  return (
    <main className="w-full">
      <section>
        <section>
          <MenuButtonsGroup
            heading={heading}
            menus={menus}
            onMenuClick={onMenuClick}
          />
          <article className="relative">
            <MobileMenus menus={menus} onMenuClick={onMenuClick} />
          </article>
        </section>
        <section className="mt-5 w-full flex">
          <article className="w-9/12 px-5 box-border">{children}</article>
          <article className="w-3/12 px-5 ">
            <RightBarComponent />
          </article>
        </section>
      </section>
      <Statusbar heading={heading} company={company} />
    </main>
  );
};

export default SingleComponent;
