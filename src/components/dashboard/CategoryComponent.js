import Statusbar from "../../components/dashboard/Statusbar";
import MenuButtonsGroup from "../../components/dashboard/MenuButtonsGroup";
import MobileMenus from "../../components/dashboard/MobileMenus";
import FromToDateComponent from "./FromToDateComponent";
import DataTable from "./DataTable";
import { memo } from "react";

const CategoryComponent = ({
  heading,
  menus,
  company,
  data,
  keyExpr,
  route,
  columns,
  startEdit,
  setRowClickItem,
  openConfirmationPopup,
  filterValues,
  onMenuClick,
}) => {
  return (
    <main className="w-full">
      <MenuButtonsGroup
        heading={heading}
        menus={menus}
        onMenuClick={onMenuClick}
      />

      <MobileMenus menus={menus} onMenuClick={onMenuClick} />
      <FromToDateComponent />

      <DataTable
        data={data}
        columns={columns}
        keyExpr={keyExpr}
        route={route}
        startEdit={(e) => startEdit(e)}
        setRowClickItem={setRowClickItem}
        openConfirmationPopup={openConfirmationPopup}
        filterValues={filterValues}
      />

      <Statusbar heading={heading} company={company} />
    </main>
  );
};

export default memo(CategoryComponent);
