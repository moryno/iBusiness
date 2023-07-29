import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid as exportDataGridToExcel } from "devextreme/excel_exporter";
import { jsPDF } from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { checkPermission } from "../redux/actions/userManagementCall";
import { toast } from "react-toastify";

let dataGridInstance;
// Function to get the instance of the datagrid onLoad
export const getDataGridRef = (dataGrid) => {
  return (dataGridInstance = dataGrid);
};

// Function to export row as excel or pdf
export const onExporting = (exportValue, pageTitle) => {
  if (exportValue.format === "xlsx") {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    // Export to excel method
    try {
      exportDataGridToExcel({
        component: dataGridInstance._instance,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            `${pageTitle ? pageTitle : "Datagrid"}.xlsx`
          );
        });
      });
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }

    dataGridInstance.cancel = true;
  } else {
    // Export to pdf
    const doc = new jsPDF();

    try {
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: dataGridInstance._instance,
        indent: 5,
      }).then(() => {
        doc.save(`${pageTitle ? pageTitle : "Datagrid"}.pdf`);
      });
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    }
  }
};

// Define function to switch between different export format in Excel or Pdf
export const handleExportFormat = (title) => {
  let format;
  let selectedRowsOnly;

  switch (title) {
    case "Export selected rows to Excel":
      format = "xlsx";
      selectedRowsOnly = true;
      break;
    case "Export to Excel":
      format = "xlsx";
      selectedRowsOnly = false;
      break;
    case "Export selected rows to PDF":
      format = "pdf";
      selectedRowsOnly = true;
      break;
    case "Export to PDF":
      format = "pdf";
      selectedRowsOnly = false;
      break;

    default:
      break;
  }

  return { format, selectedRowsOnly };
};

// Define a function that calls on OnExporting function and pass the format to export
export const handleExporting = async (exportFormat, pageTitle) => {
  const exportPermission = await checkPermission({
    role: pageTitle,
    permissions: "Export",
  });
  if (exportPermission) {
    const exportValue = handleExportFormat(exportFormat);
    onExporting(exportValue, pageTitle);
  } else {
    toast.error("Unauthorized access");
  }
};
