import React, { useCallback, useEffect, useState } from "react";
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

import request from "../helpers/requestMethod";
import { onExporting, startEdit } from "../helpers/datagridFunctions";

function DataTable({ date }) {
  const [collapsed, setCollapsed] = useState(false);
  const [changes, setChanges] = useState([]);
  const [editRowKey, setEditRowKey] = useState(null);
  const [data, setData] = useState([]);

  const exportFormats = ["xlsx", "pdf"];

  function onContentReady(e) {
    if (!collapsed) {
      e.component.expandRow(["EnviroCare"]);
      setCollapsed({
        collapsed: true,
      });
    }
  }

  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await request.get(
          date
            ? `Booking/GetbyDate?startdate=${date.startdate}&enddate=${date.enddate}`
            : "Booking"
        );
        setData(data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  const onSaving = useCallback((e) => {
    e.cancel = true;

    const { data } = e.changes[0];
  }, []);

  return (
    <main>
      <DataGrid
        className={"dx-card wide-card h-[500px] lg:h-[600px]"}
        dataSource={data}
        showBorders={true}
        hoverStateEnabled={true}
        keyExpr="bookingId"
        focusedRowEnabled={true}
        onRowDblClick={(e) => startEdit(e)}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onExporting={(e) => onExporting(e)}
        onContentReady={onContentReady}
        onSaving={onSaving}
      >
        <Export
          enabled={true}
          formats={exportFormats}
          allowExportSelectedData={true}
        />
        <Editing
          mode="popup"
          // changes={changes}
          // onChangesChange={onChangesChange}
          // editRowKey={editRowKey}
          // onEditRowKeyChange={onEditRowKeyChange}
        />
        <Selection mode="multiple" />
        <Toolbar>
          <Item name="groupPanel" />
          <Item name="exportButton" showText="always" />
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
