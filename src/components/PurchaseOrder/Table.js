import React, { useRef, useState } from 'react'
import '../../assets/P_order.css';
import { DataGrid, Editing, FilterRow, Column, Sorting } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { items, summary, columns } from '../../data/PurchaseOrderData'
import dataitem from '../../utils/Order';
import { getDataGridRef } from "../../helpers/datagridFunctions";

// Table component

export const Table = ({ data, count, message }) => {
    const gridRef = useRef(null);
    const [collapsed, setCollapsed] = useState(false);
    const addRef = useRef(null);
    data.sort({ getter: "itemNumber", desc: true });

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
      return  <button ref={addRef} onClick={handleRowAdded}>Add new</button>;
    }
    const handleRowAdded = (e) => {
      gridRef.current.instance.addRow();
  
    }
  
    const handleRowInserted = (rowIndex) => {
      if ( rowIndex.data.quantity === "" || isNaN(rowIndex.data.quantity) || rowIndex.data.item === ""){
        data.store().remove(rowIndex.key);
        data.reload();
        return;
      }

      const item = items.find((x) => x.name === rowIndex.data.item);
      const itemtoupdate = data.store()._array.find((x) => x.item === rowIndex.data.item);

      if ( typeof itemtoupdate === "undefined" ) {
        let extendedCost = item.amount * rowIndex.data.quantity;
        let discountAmount = extendedCost * 0.05;
        let itemtoadd = new dataitem(
          item.key,
          item.name,
          rowIndex.data.quantity,
          extendedCost * 0.25,
          item.amount,
          extendedCost,
          "VAT",
          "16%",
          extendedCost * 0.16,
          "Merchant",
          extendedCost * 0.1,
          "5%",
          discountAmount,
          extendedCost - discountAmount
          );
          data.store().remove(rowIndex.key);
          data.store().insert(itemtoadd.data());
          data.reload();
          count.current++;
          message.current = `${item.name} has been added successfully.`;
          gridRef.current.instance.focus();

      } else if ( itemtoupdate.item === rowIndex.data.item ) {
        let extendedCost = item.amount * (rowIndex.data.quantity + itemtoupdate.quantity);
        let discountAmount = extendedCost * 0.05;
        let itemtoadd = new dataitem(
          item.key,
          item.name,
          rowIndex.data.quantity + itemtoupdate.quantity,
          extendedCost * 0.25,
          item.amount,
          extendedCost,
          "VAT",
          "16%",
          extendedCost * 0.16,
          "Merchant",
          extendedCost * 0.1,
          "5%",
          discountAmount,
          extendedCost - discountAmount
          );

          data.store().remove(itemtoupdate);
          data.store().remove(rowIndex.key);
          data.store().insert(itemtoadd.data());
          data.reload();
          count.current++;
          message.current = `${item.name} has been added successfully.`;
          gridRef.current.instance.focus();
      }
        
    } 
    // Recalculates values after row info is updated
    const handleRowUpdated = (rowIndex) => {
        let unitCost = rowIndex.data.unitCost;
        let extendedCost = unitCost * parseInt(rowIndex.data.quantity);
        let discountAmount = rowIndex.data.discountAmount;
        let itemtoadd = new dataitem(
            rowIndex.data.itemNumber,
            rowIndex.data.item,
            parseInt(rowIndex.data.quantity),
            extendedCost * 0.25,
            unitCost,
            extendedCost,
            "VAT",
            "16%",
            extendedCost * 0.16,
            "Merchant",
            extendedCost * 0.1,
            "5%",
            discountAmount,
            extendedCost - discountAmount
            );
        data.store().remove(rowIndex.key);
        data.store().insert(itemtoadd.data());
        data.reload();
        message.current = 'Item details updated.';
        console.log(data.store()._array)
    }
  
    // End of function
  
  
    const handleRowRemoving = (e) => {
      e.cancel = console.log(!window.confirm(confirmDeleteMessage(e.data)));
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
    }

  
    
  
    return (
      <DataGrid 
          style={{height: '41vh', borderStyle:'solid', marginTop:'1rem', fontSize: '.7rem'}}
          showBorders={true}
          dataSource={data}
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
          <Editing
          mode="cell"
          allowUpdating={true}
          confirmDelete={false}
          />
          <Column
              dataField='item'
              allowEditing={true}
              alignment='left'
              dataType="string"
              editorType="dxSelectBox"
              allowHeaderFiltering={false}
              editorOptions={{ items: items, displayExpr:"name", valueExpr:"name", searchEnabled: true }}
              headerCellRender={renderHeader}
          />
          <Column
             dataField= 'quantity'
             allowEditing={true}
             visible={true}
             dataType="number"
             showSpinButtons={true}
             alignment='left'
          />
          {columns.map(column => (
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
              useGrouping: true
            }}
            alignment='left'
          />)
          )
          }
          <Column cellRender={renderDeleteLink} width={100} alignment='center'/>
          <FilterRow visible={true} />
          <Sorting mode="none"/>
      </DataGrid>
    )
  }
   
  // End of component's code