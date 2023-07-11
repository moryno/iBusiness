import Statusbar from "../../components/dashboard/Shared/NavBarFooter/Statusbar";
import { homeMenuSource } from "../../data/dashboard-page/menu";
import MenusGroupComponent from "../../components/dashboard/Shared/Menus/MenusGroupComponent";
import FromToDateComponent from "../../components/dashboard/Shared/FromToDateComponent";
import { homeHeadingFooter } from "../../data/headingFooterTitle";

const Home = () => {
  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        // fromDate === null && toDate && date === ""
        //   ? setDate({ startdate: fromDate, enddate: toDate })
        //   : setDate({ startdate: fromDate, enddate: toDate });
        break;
      case "New":
        break;
      case "Delete":
        break;
      case "Close":
        console.log("Close was clicked");
        break;
      case "Help":
        console.log("Help was clicked");
        break;

      default:
        break;
    }
  };

  return (
    <main className="w-full min-h-full relative px-3 md:px-5 py-1.5">
      <section>
        <section>
          <MenusGroupComponent
            heading={homeHeadingFooter.heading}
            menus={homeMenuSource}
            onMenuClick={handleClick}
          />
          <FromToDateComponent />
        </section>
        <section className="mt-5">
          <h1 className="font-bold text-2xl md:text-3xl  text-headingBlue">
            Home page
          </h1>
        </section>
      </section>

      <Statusbar
        footer={homeHeadingFooter.footer}
        company={homeHeadingFooter.company}
      />
    </main>
  );
};

export default Home;
