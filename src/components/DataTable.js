import React, { useState } from "react";
import "devextreme/dist/css/dx.light.css";
import "devextreme/data/odata/store";
import ODataStore from "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
  SearchPanel,
  GroupPanel,
  RequiredRule,
  Editing,
  Grouping,
  Toolbar,
  Item,
  ColumnChooser,
  Selection,
  Export,
} from "devextreme-react/data-grid";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid as exportDataGridToExcel } from "devextreme/excel_exporter";
import { jsPDF } from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { Button } from "devextreme-react/button";

const exportFormats = ["xlsx", "pdf"];

function DataTable({ data }) {
  const [expanded, setExpanded] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  function onExporting(e) {
    if (e.format === "xlsx") {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Main sheet");
      // Export to excel method
      exportDataGridToExcel({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "DataGrid.xlsx"
          );
        });
      });
      e.cancel = true;
    } else {
      // Export to pdf
      const doc = new jsPDF();

      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
        indent: 5,
      }).then(() => {
        doc.save("Companies.pdf");
      });
    }
  }
  function onContentReady(e) {
    if (!collapsed) {
      e.component.expandRow(["EnviroCare"]);
      setCollapsed({
        collapsed: true,
      });
    }
  }

  const startEdit = (e) => {
    if (e.rowType === "data") {
      e.component.editRow(e.rowIndex);
    }
  };

  const onSelectionChanged = ({ selectedRowsData }) => {
    const data = selectedRowsData[0];
  };

  return (
    <React.Fragment>
      <DataGrid
        className={"dx-card wide-card"}
        dataSource={"http://localhost:3000/bookings"}
        showBorders={true}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        onRowDblClick={startEdit}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onExporting={onExporting}
        onSelectionChanged={onSelectionChanged}
        onContentReady={onContentReady}
      >
        <Export
          enabled={true}
          formats={exportFormats}
          allowExportSelectedData={true}
        />
        <Editing mode="popup" allowAdding={true} />
        <ColumnChooser enabled={true} />
        <Grouping autoExpandAll={expanded} />

        <Selection mode="multiple" />

        <Toolbar>
          <Item name="groupPanel" />
          <Item name="addRowButton" showText="always" />
          <Item name="exportButton" showText="always" />
          <Item name="columnChooserButton" />
          <Item name="searchPanel" />
        </Toolbar>
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <SearchPanel visible={true} />
        <Column dataField={"bookingId"} width={90} hidingPriority={8} />
        <Column
          dataField={"bookingRef"}
          width={100}
          caption={"Booking Ref"}
          hidingPriority={3}
        >
          <RequiredRule />
        </Column>
        <Column dataField={"idNumber"} caption={"ID Number"} hidingPriority={6}>
          <RequiredRule />
        </Column>
        <Column dataField={"fullName"} caption={"Full Name"} hidingPriority={7}>
          <RequiredRule />
        </Column>
        <Column
          dataField={"email"}
          caption={"Email"}
          allowSorting={false}
          hidingPriority={5}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField={"telephone"}
          caption={"Telephone"}
          hidingPriority={3}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField={"retirementSchemeName"}
          caption={"Retirement Scheme Name"}
          hidingPriority={4}
        >
          <RequiredRule />
        </Column>
      </DataGrid>
    </React.Fragment>
  );
}
export default DataTable;
