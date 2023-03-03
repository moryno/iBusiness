import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid as exportDataGridToExcel } from "devextreme/excel_exporter";
import { jsPDF } from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";

let dataGridInstance;

export const getDataGridRef = (dataGrid) => {
  return (dataGridInstance = dataGrid);
};

// Function to export row as excel or pdf
export const onExporting = (exportValue) => {
  if (exportValue.format === "xlsx") {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    // Export to excel method
    exportDataGridToExcel({
      component: dataGridInstance._instance,
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
    dataGridInstance.cancel = true;
  } else {
    // Export to pdf
    const doc = new jsPDF();

    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: dataGridInstance._instance,
      indent: 5,
    }).then(() => {
      doc.save("DataGrid.pdf");
    });
  }
};

export const handleExportFormat = (title) => {
  let format;
  let selectedRowsOnly;

  switch (title) {
    case "Export selected rows to Excel":
      format = "xlsx";
      selectedRowsOnly = true;
      break;
    case "Export all data to Excel":
      format = "xlsx";
      selectedRowsOnly = false;
      break;
    case "Export selected rows to PDF":
      format = "pdf";
      selectedRowsOnly = true;
      break;
    case "Export all data to PDF":
      format = "pdf";
      selectedRowsOnly = false;
      break;

    default:
      break;
  }

  return { format, selectedRowsOnly };
};

export const handleExporting = (exportFormat) => {
  const exportValue = handleExportFormat(exportFormat);
  onExporting(exportValue);
};
