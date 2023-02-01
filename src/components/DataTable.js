import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { bookingColumns, bookingRows } from "../helpers/datatableSource";
import { Link } from "react-router-dom";

const DataTable = () => {
  let actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <article className="flex items-center gap-1">
            <Link to={`/update/${params.row.id}`}>
              <div className="py-[3px] px-[6px] text-orange-100 bg-orange-500 ">
                Update
              </div>
            </Link>
            <div className="py-[3px] px-[6px] cursor-pointer text-red-100 bg-red-500 rounded-sm">
              Delete
            </div>
          </article>
        );
      },
    },
  ];

  return (
    <div className="h-[37.5rem]">
      <DataGrid
        rows={bookingRows}
        columns={bookingColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
