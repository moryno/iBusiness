import React, { useRef, useState } from "react";
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
import { bookingRows } from "../../helpers/datatableSource";
import { getDataGridRef } from "../../helpers/datagridFunctions";
import { bookingColumns } from "../../data/PurchaseOrderData";

function DataTable({ data, startEdit, columns, keyExpr }) {
  const [collapsed, setCollapsed] = useState(false);
  // Define a state variable to hold the context menu target element
  const [contextMenuTarget, setContextMenuTarget] = useState(null);
  const [contextMenuRow, setContextMenuRow] = useState(null);
  console.log(contextMenuRow);
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

  const contextMenuRef = useRef();
  // Define a function to handle the context menu event
  const handleContextMenu = (e) => {
    e.event.preventDefault();
    console.log(e.row.key);
    setContextMenuRow(e.row.key);
    contextMenuRef.current.instance.show(e.event.pageY, e.event.pageX);
  };

  const onContextMenuItemClick = (e) => {
    console.log(e.itemData.text + "function to handle the context menu event");
    // e.itemData.onItemClick(e);
  };

  const handleContextMenuItemClick = (e) => {
    switch (e.itemData.text) {
      case "Edit":
        handleEdit(contextMenuRow);
        break;
      default:
        break;
    }
  };

  const handleEdit = (row) => {
    console.log(row);
  };
  const handleExport = () => {
    console.log("Export function called");
  };

  const contextMenuItems = [
    { text: "Edit", onClick: handleEdit },
    { text: "Export", onClick: handleExport },
  ];

  console.log(contextMenuTarget);
  return (
    <main>
      <DataGrid
        id="bookingGrid"
        className={"dx-card wide-card"}
        dataSource={data}
        columns={bookingColumns}
        onCellContextMenu={handleContextMenu}
        showBorders={false}
        filterBuilder={filterBuilder}
        hoverStateEnabled={true}
        keyExpr={keyExpr}
        focusedRowEnabled={true}
        onRowDblClick={(e) => startEdit(e)}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnMinWidth={100}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        ref={dataGridRef}
        onContentReady={onContentReady}
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
      <ContextMenu
        dataSource={contextMenuItems}
        ref={contextMenuRef}
        target={"#bookingGrid"}
        showEvent="dxcontextmenu"
        onItemClick={handleContextMenuItemClick}
        // onShowing={handleContextMenuShowing}
        // onHiding={handleContextMenuHiding}
      >
        <Item disabled={true} />
      </ContextMenu>
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

export default DataTable;
