import { useSelector } from "react-redux";
import { dropDownMenuSource } from "../../../../data/dashboard-page/menu";
import { handleExporting } from "../../../../helpers/datagridFunctions";

const ExportingMenu = () => {
  const { menuItem } = useSelector((state) => state.moduleCategory);

  return (
    <>
      {dropDownMenuSource.map((link) => (
        <main key={link.id} className="flex flex-col">
          <section className="cursor-pointer group">
            <h1 className="flex items-center gap-1 font-semibold">
              {link?.icon} {link?.title} {link?.dropArrow}
            </h1>
            {link.submenu && (
              <section>
                <section className="absolute top-7 z-50 hidden group-hover:block hover:block">
                  <article className="bg-bgDropDown rounded-md w-[130px] shadow-xl">
                    {link.sublinks.map((mysublinks) => (
                      <div
                        key={mysublinks.Head}
                        className="flex w-full flex-col mt-2 justify-between"
                      >
                        {mysublinks.sublink.map((slink) => (
                          <li
                            key={slink.name}
                            className="text-xs w-full flex justify-center gap-1 items-center text-dropDown py-2.5 hover:bg-bgxxLight"
                            onClick={() =>
                              handleExporting(slink.name, menuItem)
                            }
                          >
                            {slink.icon} {slink.name}
                          </li>
                        ))}
                      </div>
                    ))}
                  </article>
                </section>
              </section>
            )}
          </section>
        </main>
      ))}
    </>
  );
};

export default ExportingMenu;
