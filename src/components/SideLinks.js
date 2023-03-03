import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { RxDot } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RiToolsFill, RiSettings5Fill, RiFolder3Fill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { FaTools } from "react-icons/fa";

const SideLinks = () => {
  const [heading, setHeading] = useState("");

  const moduleCategory = useSelector((state) => state.moduleCategory?.category);

  const getCategoryIcon = (title) => {
    switch (title) {
      case "Processess":
        return <RiSettings5Fill />;
      case "Inquiries":
        return <RiFolder3Fill />;
      case "Setups":
        return <FaTools />;
      case "Reports":
        return <TbReportSearch fontSize={18} />;
      case "Member Services":
        return <RiSettings5Fill />;
      case "Other Services":
        return <RiFolder3Fill />;
      default:
        break;
    }
  };

  return (
    <>
      {moduleCategory.map((link) => {
        return (
          <div key={link.title}>
            <div className="cursor-pointer px-1 overflow-y-auto w-full max-h-80 scrollbar-hide bg-blend-overlay">
              <div
                className="font-semibold text-sm sticky pl-2 py-1 bg-sidebarHeading text-heading top-0 flex justify-between  items-center w-full"
                onClick={() =>
                  heading !== link.title
                    ? setHeading(link.title)
                    : setHeading("")
                }
              >
                <div className="flex items-center gap-1">
                  {link?.icon}
                  {link.title}
                </div>
                <div className="flex items-center">
                  {heading !== link.title ? (
                    <MdArrowDropUp fontSize={26} />
                  ) : (
                    <MdArrowDropDown fontSize={26} />
                  )}
                </div>
              </div>
              {link.submenu && (
                <div
                  className={`
              ${heading === link.title && "hidden"}
              `}
                >
                  <div className="">
                    <div className="px-2">
                      {link.sublinks.map((mysublinks) => (
                        <div
                          className="flex items-center gap-1 hover:bg-[#f5f5f5]"
                          key={mysublinks.name}
                        >
                          <RxDot />
                          <li className="text-sm font-normal text-sideMenu py-1.5">
                            <Link to={mysublinks.link}>{mysublinks.name}</Link>
                          </li>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SideLinks;
