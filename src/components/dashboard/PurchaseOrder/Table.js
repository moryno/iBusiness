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
      typeof rowIndex.data.quantity === "undefined" ||
      typeof rowIndex.data.item === "undefined"
    ) {
      rowIndex.cancel = true;
      return data.reload();
    }
    console.log(rowIndex.data)
    const item = items.find((x) => x.name === rowIndex.data.item);
    let itemtoupdate = null;
    try {
      itemtoupdate = data.store()._array.find((x) => x.item === item.name);
      console.log(itemtoupdate);
    } catch(e){
      console.log(e);
    }

    if (itemtoupdate == null) {
      let extendedCost = item.amount * rowIndex.data.quantity;
      let discountAmount = extendedCost * 0.05;
      rowIndex.data = new dataitem(
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
      console.log("Item is being added");
      data.reload();
      count.current++;
      setMessage(`${item.name} has been added successfully.`);
      gridRef.current.instance.focus();

      // try {
      //   const data = {
      //     item: item.name,
      //     quantity: itemtoadd.quantity,
      //     unitCost: item.amount,
      //     extendedCost: itemtoadd.extendedCost,
      //     taxAmount: itemtoadd.taxAmount,
      //     discountAmount: itemtoadd.discountAmount,
      //     lineTotal: itemtoadd.lineTotal,
      //     partitionKey: itemtoadd.partitionKey,
      //     id: itemtoadd.id,
      //   };
      //   console.log(data);
      //   const response = await request.put(
      //     "PurchaseOrder/insertorderitems",
      //     data
      //   );
      //   console.log(response);
      // } catch (e) {
      //   // const itemtoremove = data.store()._array.find((x) => x.item === item.name);
      //   // data.store().remove(itemtoremove);
      //   // data.reload();
      //   // console.log(e);
      // }

    } else {
      let extendedCost =
        item.amount * (rowIndex.data.quantity + itemtoupdate.quantity);
      let discountAmount = extendedCost * 0.05;
      rowIndex.data = new dataitem(
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
      data.reload();
      count.current++;
      setMessage(`${item.name} has been updated successfully.`);
      gridRef.current.instance.focus();

      // try {
      //   const data = {
      //     item: item.name,
      //     quantity: itemtoadd.quantity,
      //     unitCost: item.amount,
      //     extendedCost: itemtoadd.extendedCost,
      //     taxAmount: itemtoadd.taxAmount,
      //     discountAmount: itemtoadd.discountAmount,
      //     lineTotal: itemtoadd.lineTotal,
      //     partitionKey: itemtoadd.partitionKey,
      //     id: itemtoadd.id,
      //   };
      //   console.log(data);
      //   const response = await request.post(
      //     "PurchaseOrder/insertorderitems",
      //     data
      //   );
      //   console.log(response);
      // } catch (e) {
      //   // const itemtoremove = data.store()._array.find((x) => x.item === item.name);
      //   // data.store().remove(itemtoremove);
      //   // data.reload();
      //   // console.log(e);
      // }
    }
  };

  // Recalculates values after row info is updated
  const handleRowUpdated = async (rowIndex) => {
    console.log(rowIndex); 
    let unitCost = rowIndex.oldData.unitCost;
    if (typeof rowIndex.newData.quantity !== "undefined"){
      let extendedCost = unitCost * parseInt(rowIndex.newData.quantity);
      let discountAmount = extendedCost * 0.05;
      rowIndex.newData = new dataitem(
        rowIndex.oldData.item,
        parseInt(rowIndex.newData.quantity),
        unitCost,
        extendedCost,
        extendedCost * 0.25,
        discountAmount,
        extendedCost - discountAmount,
        currentUser?.email,
        `${currentUser?.email}.${rowIndex.oldData.item}`
      );
      data.reload();
      setMessage(`${rowIndex.oldData.item} has been updated.`);
    } 
    else if(typeof rowIndex.newData.discountAmount !== "undefined"){
      let discountAmount = parseInt(rowIndex.newData.discountAmount);
      rowIndex.newData = new dataitem(
        rowIndex.oldData.item,
        rowIndex.oldData.quantity,
        unitCost,
        rowIndex.oldData.extendedCost,
        rowIndex.oldData.taxAmount,
        discountAmount,
        rowIndex.oldData.extendedCost - discountAmount,
        currentUser?.email,
        `${currentUser?.email}.${rowIndex.oldData.item}`
      );
      data.reload();
      setMessage(`${rowIndex.oldData.item} has been updated.`);

    }
    else if(typeof rowIndex.newData.item !== "undefined"){
      console.log("Item changed");

    }


    // try {
    //   const data = {
    //     item: rowIndex.data.item,
    //     quantity: itemtoadd.quantity,
    //     unitCost: itemtoadd.unitCost,
    //     extendedCost: itemtoadd.extendedCost,
    //     taxAmount: itemtoadd.taxAmount,
    //     discountAmount: itemtoadd.discountAmount,
    //     lineTotal: itemtoadd.lineTotal,
    //     partitionKey: itemtoadd.partitionKey,
    //     id: itemtoadd.id,
    //   };
    //   console.log(data);
    //   const response = await request.put("PurchaseOrder/updateorderitem", data);
    //   console.log(response);
    // } catch (e) {
    //   data.store().remove(rowIndex.key);
    //   data.store().insert(rowIndex.data);
    //   data.reload();
    //   console.log(e.response.data);
    // }
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
        height: "37.5vh",
        borderStyle: "solid",
        marginTop: "1rem",
        fontSize: ".7rem",
      }}
      showBorders={true}
      dataSource={data}
      //onRowUpdating={handleRowUpdating}
      hoverStateEnabled={true}
      reshapeOnPush={true}
      onRowUpdating={handleRowUpdated}
      showRowLines={true}
      onKeyDown={handleKeyPress}
      onRowRemoving={handleRowRemoving}
      columnHidingEnabled={true}
      onRowInserting={handleRowInserted}
      // onRowInserted={handleRowInserted}
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
