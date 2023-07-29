import React, { useEffect, useState } from "react";
import DesktopMenus from "./DesktopMenus";
import MobileMenus from "./MobileMenus";
import { useParams } from "react-router-dom";

const MenusGroupComponent = ({
  menus,
  customActions,
  heading,
  onMenuClick,
  onActionClick,
}) => {
  const [filteredMenus, setFilteredMenus] = useState([]);
  const params = useParams();

  useEffect(() => {
    const menuItem = menus?.filter((item) => {
      if (Object.keys(params).length > 0) {
        return item;
      }
      return item.title !== "Edit";
    });
    setFilteredMenus(menuItem);
  }, [menus, params]);

  return (
    <section>
      <DesktopMenus
        heading={heading}
        menus={filteredMenus}
        customActions={customActions}
        onMenuClick={onMenuClick}
        onActionClick={onActionClick}
      />
      <MobileMenus
        menus={filteredMenus}
        onMenuClick={onMenuClick}
        customActions={customActions}
        onActionClick={onActionClick}
      />
    </section>
  );
};

export default MenusGroupComponent;
