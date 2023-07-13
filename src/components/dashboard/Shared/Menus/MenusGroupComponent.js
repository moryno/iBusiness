import React from "react";
import DesktopMenus from "./DesktopMenus";
import MobileMenus from "./MobileMenus";

const MenusGroupComponent = ({
  menus,
  customActions,
  heading,
  onMenuClick,
  onActionClick,
}) => {
  return (
    <section>
      <DesktopMenus
        heading={heading}
        menus={menus}
        customActions={customActions}
        onMenuClick={onMenuClick}
        onActionClick={onActionClick}
      />
      <MobileMenus menus={menus} onMenuClick={onMenuClick} />
    </section>
  );
};

export default MenusGroupComponent;
