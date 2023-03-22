import React, { useRef, useState } from "react";
import "devextreme/dist/css/dx.light.css";
import "devextreme/data/odata/store";
import DataGrid, {
  Pager,
  Paging,
  FilterRow,
  FilterPanel,
  FilterBuilderPopup,
  SearchPanel,
  Editing,
  Toolbar,
  Item,
  Selection,
  Export,
} from "devextreme-react/data-grid";
import { ContextMenu } from "devextreme-react/context-menu";

import { getDataGridRef } from "../helpers/datagridFunctions";
import { bookingColumns } from "../data/PurchaseOrderData";

function DataTable({ data, startEdit }) {
  const [collapsed, setCollapsed] = useState(false);
  // Define a state variable to hold the context menu target element
  const [contextMenuTarget, setContextMenuTarget] = useState(null);

  // Define a dataGridRef variable to hold the reference to the datagrid
  const dataGridRef = useRef();
  const exportFormats = ["xlsx", "pdf"];

  function onContentReady(e) {
    getDataGridRef(dataGridRef.current);
    if (!collapsed) {
      e.component.expandRow(["EnviroCare"]);
      setCollapsed({
        collapsed: true,
      });
    }
  }

  // const handleRowClick = (e) => {
  //   setContextMenuVisible(true);
  // };

  function handleContextMenuHiding() {
    setContextMenuTarget(null);
  }

  function handleContextMenuShowing(e) {
    console.log(e);
    console.log("Function was called");
    const rowIndex = contextMenuTarget.dataset.rowKey;
    const columnIndex = contextMenuTarget.dataset.columnIndex;
    const dataGrid = dataGridRef.current.instance;
    const cellElement = dataGrid.getCellElement(rowIndex, columnIndex);
    dataGrid.showContextMenuAt(cellElement);
  }

  // Define a function to handle the context menu event
  const handleContextMenu = (e) => {
    // e.preventDefault();
    console.log(e + "   function to handle the context menu event");
    setContextMenuTarget(e.cellElement);
  };
  console.log(contextMenuTarget);
  return (
    <main>
      <DataGrid
        id="bookingGrid"
        className={"dx-card wide-card"}
        dataSource={data}
        columns={bookingColumns}
        showBorders={false}
        filterBuilder={filterBuilder}
        hoverStateEnabled={true}
        keyExpr="bookingId"
        focusedRowEnabled={true}
        onRowDblClick={(e) => startEdit(e)}
        onRowClick={handleContextMenu}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnMinWidth={100}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        ref={dataGridRef}
        onContentReady={onContentReady}
        onCellContextMenu={handleContextMenu}
      >
        <Export
          enabled={true}
          formats={exportFormats}
          allowExportSelectedData={true}
        />
        <Editing mode="popup" />
        <Selection mode="single" />
        <Toolbar>
          <Item name="groupPanel" />
          <Item name="columnChooserButton" />
          <Item name="searchPanel" />
        </Toolbar>
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <FilterBuilderPopup
          position={filterBuilderPopupPosition}
          height={"50vh"}
          width={"50vw"}
        />

        <SearchPanel visible={true} />
      </DataGrid>
      {contextMenuTarget && (
        <ContextMenu
          dataSource={options}
          target={contextMenuTarget}
          showEvent="dxcontextmenu"
          onShowing={handleContextMenuShowing}
          onHiding={handleContextMenuHiding}
        />
      )}
    </main>
  );
}

const filterBuilderPopupPosition = {
  of: window,
  at: "center",
  my: "center",
  offset: { y: 10 },
};

const filterBuilder = [
  ["bookingType", "anyof", ["First Time", "Retake", "Resit"]],
];
const options = [
  { text: "Edit", icon: "edit" },
  { text: "Delete", icon: "trash" },
];

export default DataTable;
