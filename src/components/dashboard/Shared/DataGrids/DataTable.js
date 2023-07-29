import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "devextreme/data/odata/store";
import DataGrid, {
  Pager,
  Paging,
  FilterRow,
  FilterPanel,
  FilterBuilderPopup,
  Editing,
  Toolbar,
  Item,
  Selection,
  Export,
  Column,
} from "devextreme-react/data-grid";
import {
  getDataGridRef,
  handleExporting,
} from "../../../../helpers/datagridFunctions";
import { useNavigate } from "react-router-dom";

const DataTable = ({
  data,
  startEdit,
  selectRowItem,
  columns,
  route,
  className,
  keyExpr,
  openConfirmationPopup,
  filterValues,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const dataGridRef = useRef(null);

  const exportFormats = useMemo(() => {
    return ["xlsx", "pdf"];
  }, []);

  const pageSizes = useMemo(() => {
    return [10, 25, 50, 100];
  }, []);

  const onContentReady = useCallback(
    (e) => {
      getDataGridRef(dataGridRef.current);
      if (!collapsed) {
        e.component.expandRow(["EnviroCare"]);
        setCollapsed({
          collapsed: true,
        });
      }
    },
    [collapsed]
  );

  const handleContextMenuPreparing = useCallback(
    (e) => {
      if (e.row && e.row.rowType === "data") {
        if (!e.items) e.items = [];
        e.items.push(
          {
            text: "Edit",
            icon: "edit",
            onItemClick: () => {
              startEdit(e.row);
            },
          },
          {
            text: "Export",
            icon: "export",
            items: [
              {
                text: "Export to Excel",
                icon: "exportxlsx",
                onItemClick: () => {
                  handleExporting("Export to Excel");
                },
              },
              {
                text: "Export to PDF",
                icon: "exportpdf",
                onItemClick: () => {
                  handleExporting("Export to PDF");
                },
              },
            ],
          },
          {
            text: "Delete",
            icon: "trash",
            onItemClick: () => {
              openConfirmationPopup(e.row.key);
            },
          }
        );
      }
    },
    [openConfirmationPopup, startEdit]
  );

  const filterBuilder = {
    logic: "and",
    filters: filterValues.map(([field, operator, value]) => ({
      field,
      operator,
      value,
    })),
  };

  const handleDataValue = (data) => {
    if (data.value === true) {
      return "True";
    } else if (data.value === false) {
      return "False";
    } else {
      return data.value;
    }
  };

  const handleKeyDown = useCallback((event) => {
    if (
      (event.key === "a" || event.key === "A") &&
      (event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();
    } else if (
      (event.key === "c" || event.key === "C") &&
      (event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    const element = dataGridRef.current?.instance?.element?.();
    if (element) {
      element.addEventListener("keydown", handleKeyDown);
      return () => {
        element.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  return (
    <main className="mt-5">
      <DataGrid
        id="dataTableGrid"
        className={`${className}`}
        dataSource={data}
        onContextMenuPreparing={(e) => {
          handleContextMenuPreparing(e);
        }}
        showBorders={false}
        showColumnLines={false}
        showRowLines={true}
        filterBuilder={filterBuilder}
        hoverStateEnabled={true}
        keyExpr={keyExpr}
        focusedRowEnabled={true}
        onRowClick={(e) => selectRowItem(e)}
        onRowDblClick={(e) => startEdit(e)}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnMinWidth={70}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        ref={dataGridRef}
        onContentReady={onContentReady}
      >
        {columns.map((column) => (
          <Column
            dataField={column.dataField}
            key={column.dataField}
            alignment={column.alignment}
            caption={column.caption}
            format={column.format}
            cellRender={
              column?.pk === true
                ? (data) => {
                    return (
                      <button
                        onClick={() =>
                          navigate(`/dashboard/${route}/${data.row.key}/view`)
                        }
                      >
                        <div className="pk-div">
                          <span className="pk-hyperlink">Details...</span>
                        </div>
                      </button>
                    );
                  }
                : (data) => {
                    return (
                      <div
                        data-row-key={data.key}
                        data-column-index={data.columnIndex}
                      >
                        {handleDataValue(data)}
                      </div>
                    );
                  }
            }
            width={column.width}
            visible={true}
          />
        ))}
        <Export
          enabled={true}
          formats={exportFormats}
          allowExportSelectedData={true}
        />
        <Editing mode="row" />
        <Selection mode="none" />
        <Toolbar visible={false}>
          <Item name="groupPanel" />
          <Item name="columnChooserButton" />
        </Toolbar>
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <FilterBuilderPopup
          position={filterBuilderPopupPosition}
          height={"50vh"}
          width={"50vw"}
        />
        <Paging defaultPageSize={50} />
        <Pager
          showPageSizeSelector={true}
          showInfo={true}
          allowedPageSizes={pageSizes}
        />
      </DataGrid>
    </main>
  );
};

const filterBuilderPopupPosition = {
  of: window,
  at: "center",
  my: "center",
  offset: { y: 10 },
};

export default memo(DataTable);
