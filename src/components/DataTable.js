import React, { useRef, useState } from "react";
import "devextreme/dist/css/dx.light.css";
import "devextreme/data/odata/store";
import DataGrid, {
  Pager,
  Paging,
  FilterRow,
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
        className={"dx-card wide-card h-[400px] lg:h-[600px]"}
        dataSource={data}
        showBorders={false}
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
        <SearchPanel visible={true} />
      </DataGrid>
    </main>
  );
}
export default DataTable;
