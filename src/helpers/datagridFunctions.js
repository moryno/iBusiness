import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid as exportDataGridToExcel } from "devextreme/excel_exporter";
import { jsPDF } from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";

// Fuction to edit row
export const startEdit = (e) => {
  if (e.rowType === "data") {
    e.component.editRow(e.rowIndex);
  }
};

// Function to export row as excel or pdf
export const onExporting = (e) => {
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
};
