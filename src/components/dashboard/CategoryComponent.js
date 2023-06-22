import Statusbar from "../../components/dashboard/Statusbar";
import MenuButtonsGroup from "../../components/dashboard/MenuButtonsGroup";
import MobileMenus from "../../components/dashboard/MobileMenus";
import FromToDateComponent from "./FromToDateComponent";
import DataTable from "./DataTable";

const CategoryComponent = ({
  heading,
  menus,
  company,
  handleRedirect,
  data,
  keyExpr,
  columns,
  startEdit,
  setRowClickItem,
  openConfirmationPopup,
  filterValues,
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
            <FromToDateComponent />
          </article>
        </section>
        <section className="mt-5">
          <DataTable
            data={data}
            columns={columns}
            keyExpr={keyExpr}
            startEdit={(e) => startEdit(e)}
            handleRedirect={handleRedirect}
            //loading={loading}
            setRowClickItem={setRowClickItem}
            openConfirmationPopup={openConfirmationPopup}
            filterValues={filterValues}
          />
        </section>
      </section>
      <Statusbar heading={heading} company={company} />
    </main>
  );
};

export default CategoryComponent;
