import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const MobileMenus = ({ onMenuClick, menus }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <main className="md:hidden">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="space-y-1 p-1.5 md:hidden cursor-pointer z-40"
      >
        <MenuIcon className=" opacity-50 cursor-pointer" />
      </div>
      {isExpanded && (
        <ul className="top-0 left-0 bg-bgxLight font-medium w-fit  z-20">
          {menus.map((menu) => (
            <li
              key={menu.id}
              className="flex items-center gap-1  text-sm text-menu px-5 py-1.5 cursor-pointer hover:bg-bgLight"
              onClick={() => onMenuClick(menu.title)}
            >
              {menu.icon}
              {menu.title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default MobileMenus;
