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

import { getDataGridRef } from "../helpers/datagridFunctions";

function DataTable({ data, startEdit }) {
  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef();
  const exportFormats = ["xlsx", "pdf"];

  function onContentReady(e) {
    getDataGridRef(ref.current);
    if (!collapsed) {
      e.component.expandRow(["EnviroCare"]);
      setCollapsed({
        collapsed: true,
      });
    }
  }

  return (
    <main>
      <DataGrid
        id="bookingGrid"
        className={"dx-card wide-card"}
        dataSource={data}
        showBorders={false}
        filterBuilder={filterBuilder}
        hoverStateEnabled={true}
        keyExpr="bookingId"
        focusedRowEnabled={true}
        onRowDblClick={(e) => startEdit(e)}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnResizingMode={"nextColumn"}
        columnMinWidth={100}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        ref={ref}
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
