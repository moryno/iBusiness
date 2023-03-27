import React, { useRef, useState } from "react";
import "../../../pages/dashboard/purchase-orders/PurchaseOrder.css";
import {
  DataGrid,
  Editing,
  FilterRow,
  Column,
  Sorting,
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { items, summary, columns } from "../../../data/PurchaseOrderData";
import dataitem from "../../../utils/Order";
import { getDataGridRef } from "../../../helpers/datagridFunctions";
import { useSelector } from "react-redux";
import request from "../../../helpers/tempRequest";
import ConfirmMessage from "./ConfirmMessage";

// Table component

export const Table = ({ data, count, setMessage, setModalMessage }) => {
  const gridRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const currentUser = useSelector((state) => state.user?.currentUser?.user);
  const addRef = useRef(null);

  function onContentReady(e) {
    getDataGridRef(gridRef.current);
    if (!collapsed) {
      e.component.expandRow(["EnviroCare"]);
      setCollapsed({
        collapsed: true,
      });
    }
  }

  const renderHeader = () => {
    return (
      <button ref={addRef} onClick={handleRowAdded}>
        Add new
      </button>
    );
  };
  const handleRowAdded = (e) => {
    gridRef.current.instance.addRow();
  };

  const handleRowInserted = async (rowIndex) => {
    if (
      rowIndex.data.quantity === "" ||
      isNaN(rowIndex.data.quantity) ||
      rowIndex.data.item === ""
    ) {
      data.store().remove(rowIndex.key);
      data.reload();
      return;
    }

    const item = items.find((x) => x.name === rowIndex.data.item);
    const itemtoupdate = data
      .store()
      ._array.find((x) => x.itemNumber === item.key);
    console.log(itemtoupdate);

    if (typeof itemtoupdate === "undefined") {
      let extendedCost = item.amount * rowIndex.data.quantity;
      let discountAmount = extendedCost * 0.05;
      let itemtoadd = new dataitem(
        item.name,
        rowIndex.data.quantity,
        item.amount,
        extendedCost,
        extendedCost * 0.25,
        extendedCost * 0.16,
        extendedCost - discountAmount,
        currentUser?.email,
        `${currentUser?.email}.${rowIndex.data.item}`
      );
      data.store().remove(rowIndex.key);
      data.store().insert(itemtoadd.data());
      data.reload();
      count.current++;
      setMessage(`${item.name} has been added successfully.`);
      gridRef.current.instance.focus();

      try {
        const data = {
          item: item.name,
          quantity: itemtoadd.quantity,
          unitCost: item.amount,
          extendedCost: itemtoadd.extendedCost,
          taxAmount: itemtoadd.taxAmount,
          discountAmount: itemtoadd.discountAmount,
          lineTotal: itemtoadd.lineTotal,
          partitionKey: itemtoadd.partitionKey,
          id: itemtoadd.id,
        };
        console.log(data);
        const response = await request.put(
          "PurchaseOrder/insertorderitems",
          data
        );
        console.log(response);
      } catch (e) {
        // const itemtoremove = data.store()._array.find((x) => x.item === item.name);
        // data.store().remove(itemtoremove);
        // data.reload();
        // console.log(e);
      }

    } else if (itemtoupdate.item === rowIndex.data.item) {
      console.log(rowIndex.data.quantity);
      let extendedCost =
        item.amount * (rowIndex.data.quantity + itemtoupdate.quantity);
      let discountAmount = extendedCost * 0.05;
      let itemtoadd = new dataitem(
        item.name,
        rowIndex.data.quantity + itemtoupdate.quantity,
        item.amount,
        extendedCost,
        extendedCost * 0.25,
        extendedCost * 0.16,
        extendedCost - discountAmount,
        currentUser?.email,
        currentUser?.fullname + item.name
      );

      data.store().remove(itemtoupdate);
      data.store().remove(rowIndex.key);
      data.store().insert(itemtoadd.data());
      data.reload();
      count.current++;
      setMessage(`${item.name} has been added successfully.`);
      gridRef.current.instance.focus();

      try {
        const data = {
          item: item.name,
          quantity: itemtoadd.quantity,
          unitCost: item.amount,
          extendedCost: itemtoadd.extendedCost,
          taxAmount: itemtoadd.taxAmount,
          discountAmount: itemtoadd.discountAmount,
          lineTotal: itemtoadd.lineTotal,
          partitionKey: itemtoadd.partitionKey,
          id: itemtoadd.id,
        };
        console.log(data);
        const response = await request.post(
          "PurchaseOrder/insertorderitems",
          data
        );
        console.log(response);
      } catch (e) {
        // const itemtoremove = data.store()._array.find((x) => x.item === item.name);
        // data.store().remove(itemtoremove);
        // data.reload();
        // console.log(e);
      }
    }
  };
  // Recalculates values after row info is updated
  const handleRowUpdated = async (rowIndex) => {
    let unitCost = rowIndex.data.unitCost;
    let extendedCost = unitCost * parseInt(rowIndex.data.quantity);
    let discountAmount = rowIndex.data.discountAmount;
    let itemtoadd = new dataitem(
      rowIndex.data.item,
      parseInt(rowIndex.data.quantity),
      unitCost,
      extendedCost,
      extendedCost * 0.25,
      discountAmount,
      extendedCost - discountAmount,
      currentUser?.email,
      `${currentUser?.email}.${rowIndex.data.item}`
    );
    const itemtoremove = data
      .store()
      ._array.find((x) => x.item === rowIndex.data.item);
    data.store().remove(itemtoremove);
    data.store().insert(itemtoadd.data());
    data.reload();
    setMessage(`${rowIndex.data.item} has been updated.`);
    console.log(data.store()._array);

    try {
      const data = {
        item: rowIndex.data.item,
        quantity: itemtoadd.quantity,
        unitCost: itemtoadd.unitCost,
        extendedCost: itemtoadd.extendedCost,
        taxAmount: itemtoadd.taxAmount,
        discountAmount: itemtoadd.discountAmount,
        lineTotal: itemtoadd.lineTotal,
        partitionKey: itemtoadd.partitionKey,
        id: itemtoadd.id,
      };
      console.log(data);
      const response = await request.put("PurchaseOrder/updateorderitem", data);
      console.log(response);
    } catch (e) {
      data.store().remove(rowIndex.key);
      data.store().insert(rowIndex.data);
      data.reload();
      console.log(e.response.data);
    }
  };

  // End of function

  const handleRowRemoving = async (e) => {
    console.log(e.data);
    e.cancel = !window.confirm(confirmDeleteMessage(e.data));
    if (!e.cancel) {
      try {
        const response = await request.delete(
          "PurchaseOrder/removeorderitem",
          {data: e.data}
        );
        console.log(response);
      } catch (e) {
        console.log(e);
        data.store().insert(e.data);
        setMessage("Server error. Item was not removed.");
      }
    }
  };

  const confirmDeleteMessage = (rowIndex) => {
    return `Are you sure you want to delete ${rowIndex.item}?`;
  };

  const onDeleteClick = (e) => {
    const dataGrid = e.component;
    dataGrid.deleteRow(e.rowIndex);
  };

  const renderDeleteLink = (cellInfo) => {
    return (
      <button
        onClick={(e) => onDeleteClick(cellInfo)}
        className="delete-btn h-auto items-center cursor-pointer"
      >
        Remove
      </button>
    );
  };

  const handleKeyPress = (e) => {
    if (e.event.keyCode === 9 && e.event.shiftKey === true) {
      handleRowAdded();
    }
  };

  const handleRowUpdating = (e) => {
    console.log(e);
    if (e.oldData.discountAmount === e.newData.discountAmount) {
      console.log("Same");
    } else {
      console.log("Updating");
    }
  };

  return (
    <DataGrid
      style={{
        height: "41vh",
        borderStyle: "solid",
        marginTop: "1rem",
        fontSize: ".7rem",
      }}
      showBorders={true}
      dataSource={data}
      onRowUpdating={handleRowUpdating}
      hoverStateEnabled={true}
      reshapeOnPush={true}
      onRowUpdated={handleRowUpdated}
      showRowLines={true}
      onKeyDown={handleKeyPress}
      onRowRemoving={handleRowRemoving}
      columnHidingEnabled={true}
      onRowInserted={handleRowInserted}
      allowColumnResizing={true}
      columnMinWidth={70}
      summary={summary}
      columnAutoWidth={true}
      allowColumnReordering={true}
      ref={gridRef}
      onContentReady={onContentReady}
    >
      <Editing mode="cell" allowUpdating={true} confirmDelete={false} />
      <Column
        dataField="item"
        allowEditing={true}
        alignment="left"
        dataType="string"
        editorType="dxSelectBox"
        allowHeaderFiltering={false}
        editorOptions={{
          items: items,
          displayExpr: "name",
          valueExpr: "name",
          searchEnabled: true,
        }}
        headerCellRender={renderHeader}
      />
      <Column
        dataField="quantity"
        allowEditing={true}
        visible={true}
        dataType="number"
        max={5000}
        showSpinButtons={true}
        alignment="left"
      />
      {columns.map((column) => (
        <Column
          dataField={column.dataField}
          allowEditing={column.allowEditing}
          visible={column.visible}
          dataType="number"
          key={column.dataField}
          format={{
            type: "fixedPoint",
            precision: 2,
            currency: "KES",
            useGrouping: true,
          }}
          alignment="left"
        />
      ))}
      <Column cellRender={renderDeleteLink} width={100} alignment="center" />
      <FilterRow visible={true} />
      <Sorting mode="none" />
    </DataGrid>
  );
};

// End of component's code