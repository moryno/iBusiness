import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Search } from "@material-ui/icons";
import NavMenus from "./NavMenus";

const Navbar = ({ onMenuButtonClick }) => {
  return (
    <main className="w-full p-1 md:p-4 bg-bg flex sticky top-0 z-10 items-center h-[50px] box-border text-white">
      <section className=" w-full flex items-center justify-between">
        <article className="hidden md:flex items-center gap-2">
          <MenuIcon
            onClick={onMenuButtonClick}
            className=" opacity-50 cursor-pointer"
            fontSize="large"
          />
          <h1 className="font-semibold text-xl cursor-pointer">
            ARBS Customer Portal
          </h1>
        </article>

        <article className="hidden md:flex gap-4 ">
          <div className="flex items-center rounded-r-sm overflow-hidden bg-white justify-between">
            <div className="">
              <input
                type="text"
                className="py-1 px-2 outline-none placeholder:text-gray-400 placeholder:text-sm"
                placeholder="Search for..."
                name="search"
              />
            </div>
            <div className="bg-button p-2">
              <Search />
            </div>
          </div>
          <div className=" flex items-center font-medium">
            <ul className="flex items-center gap-1">
              <li className="">
                <PersonIcon className="text-[16px] opacity-70 cursor-pointer" />
              </li>
              <NavMenus />
            </ul>
          </div>
        </article>
        <article className="md:hidden flex items-center w-full justify-between">
          <article className="items-center gap-2">
            <h1 className="font-semibold text-lg cursor-pointer">
              ARBS Customer Portal
            </h1>
          </article>
          <article className="flex items-center md:hidden gap-2 ">
            <div className=" flex items-center font-medium">
              <ul className="flex items-center gap-1">
                <li className="">
                  <PersonIcon className="text-[16px] opacity-70 cursor-pointer" />
                </li>
                <NavMenus />
              </ul>
            </div>
            <div
              onClick={onMenuButtonClick}
              className="space-y-1 p-1.5 md:hidden cursor-pointer z-40"
            >
              <MenuIcon
                className=" opacity-50 cursor-pointer "
                fontSize="large"
              />
            </div>
          </article>
        </article>
      </section>
    </main>
  );
};

export default Navbar;
