import React, { useEffect, useState } from "react";
import "devextreme/dist/css/dx.light.css";
import "devextreme/data/odata/store";
import DataGrid, {
  Pager,
  Paging,
  FilterRow,
  SearchPanel,
  Editing,
  Grouping,
  Toolbar,
  Item,
  Selection,
  Export,
  ColumnFixing,
} from "devextreme-react/data-grid";

import request from "../helpers/requestMethod";
import { onExporting, startEdit } from "../helpers/datagridFunctions";

function DataTable({ date }) {
  const [expanded, setExpanded] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
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

  // const onSelectionChanged = ({ selectedRowsData }) => {
  //   const data = selectedRowsData[0];
  // };

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

  return (
    <main>
      <DataGrid
        className={"dx-card wide-card "}
        dataSource={data}
        showBorders={true}
        keyExpr="bookingId"
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        onRowDblClick={(e) => startEdit(e)}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onExporting={(e) => onExporting(e)}
        // onSelectionChanged={onSelectionChanged}
        onContentReady={onContentReady}
      >
        <Export
          enabled={true}
          formats={exportFormats}
          allowExportSelectedData={true}
        />
        <Editing mode="popup" />
        <ColumnFixing enabled={true} />
        <Grouping autoExpandAll={expanded} />
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
