import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MenuButtonsGroup from "../components/MenuButtonsGroup";
import "../assets/P_order.css";
import {
  DataGrid,
  Editing,
  FilterRow,
  Column,
  Sorting,
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import {
  items,
  summary,
  columns,
  centerOptions,
} from "../data/PurchaseOrderData";
import dataitem from "../utils/Order";
import { purchaseOrderMenu } from "../data/menu";
import SelectBox from "devextreme-react/select-box";
import { IoAdd, IoTrash, IoClose } from "react-icons/io5";
import { NumberBox } from "devextreme-react/number-box";
import DataSource from "devextreme/data/data_source";
import Popup from "devextreme/ui/popup";
import { getDataGridRef } from "../helpers/datagridFunctions";

// Getting date today

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const dateString = `${year}-${month}-${day}`;

// End of function

// Memoizing message div to avoid unnecessary rerender
const MessageDiv = ({ message }) => {
  const [currentmessage, setMessage] = useState("");
  useEffect(() => {
    setMessage(message);
  }, [message]);

  return <p className="po-message">{currentmessage}</p>;
};

// End

// Form Component

const Form = () => {
  const [costCenter, setCostCenter] = useState("");
  const [supplier, setSupplier] = useState("");
  const [shipsTo, setShipsTo] = useState("");
  const [orderDate, setOrderDate] = useState(dateString);
  const [firstDeliveryDate, setfirstDeliveryDate] = useState(dateString);
  const [narration, setNarration] = useState("");
  const [deliveryPeriod, setDeliveryPeriod] = useState(0);
  const [driverDetails, setdriverDetails] = useState("");

  // Handles change of values in input fields

  const handleDeliveryPeriod = (e) => {
    setDeliveryPeriod(e.value);
  };

  const handleNarration = (e) => {
    setNarration(e.value);
  };

  const handleDriverDetails = (e) => {
    setdriverDetails(e.value);
  };

  const handleOrderDate = (e) => {
    setOrderDate(e.value);
  };

  const handleFirstdDeliveryDate = (e) => {
    setfirstDeliveryDate(e.value);
  };

  const handleCostCenter = (e) => {
    setCostCenter(e.value);
  };
  const handleSupplier = (e) => {
    setSupplier(e.value);
  };

  const handleShipsTo = (e) => {
    setShipsTo(e.value);
  };

  // End of function

  return (
    <div className="po-form">
      <div className="po-left">
        <div className="select-control">
          <label className="label-control">Cost Center:</label>
          <select
            name="Center"
            className="select-control-input"
            value={costCenter}
            onChange={handleCostCenter}
          >
            {centerOptions.map((center) => (
              <option
                className="select-options"
                key={center.value}
                value={costCenter}
              >
                {center.text}
              </option>
            ))}
          </select>
        </div>
        <div className="select-control">
          <label className="label-control">Ships to:</label>
          <select
            name="Center"
            className="select-control-input"
            value={shipsTo}
            onChange={handleShipsTo}
          >
            {centerOptions.map((center) => (
              <option key={center.value} value={center.value}>
                {center.text}
              </option>
            ))}
          </select>
        </div>
        <div className="select-control">
          <label className="label-control">Order Amount:</label>
          <input type="text" className="control-input" />
        </div>
        <div className="select-control">
          <label className="label-control">First Delivery Date:</label>
          <input
            type="date"
            className="control-input"
            value={firstDeliveryDate}
            onChange={handleFirstdDeliveryDate}
          />
        </div>
      </div>
      <div className="po-right">
        <div className="select-control">
          <label className="label-control">Supplier:</label>
          <select
            className="select-control-input"
            value={supplier}
            onChange={handleSupplier}
          >
            {centerOptions.map((center) => (
              <option key={center.value} value={center.value}>
                {center.text}
              </option>
            ))}
          </select>
        </div>
        <div className="select-control">
          <label className="label-control">Order Date:</label>
          <input
            type="date"
            className="control-input"
            value={orderDate}
            onChange={handleOrderDate}
          />
        </div>
        <div className="select-control">
          <label className="label-control">Delivery Period (Days):</label>
          <input
            type="text"
            className="control-input"
            value={deliveryPeriod}
            onChange={handleDeliveryPeriod}
          />
        </div>
        <div className="select-control">
          <label className="label-control">Vehicle/Driver Details:</label>
          <input
            type="text"
            className="control-input"
            value={driverDetails}
            onChange={handleDriverDetails}
          />
        </div>
      </div>
      <div className="select-control">
        <label className="label-control">Narration:</label>
        <textarea
          rows="10"
          cols="50"
          style={{ resize: "none" }}
          type="text"
          className="select-control-input narration-input"
          value={narration}
          onChange={handleNarration}
        />
      </div>
    </div>
  );
};

// End of component code

// Input section component

const InputArea = ({ count, data, message }) => {
  const options = items.map((item) => item.name);
  const [quantity, setQuantity] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const numberBoxRef = useRef(null);
  const selectboxRef = useRef(null);
  const addRef = useRef(null);

  const handleOptionSelection = (e) => {
    setSelectedOption(e.value);
  };

  const handleItemPopulation = () => {
    // Data validation

    if (selectedOption === null) {
      message.current = "Please select an item.";
      return null;
    } else if (quantity === "") {
      //setMessage('Please enter the number of items.');
      return 0;
    } else if (isNaN(quantity)) {
      //setMessage('Quantity has to be a number.');
      return 0;
    } else if (quantity === 0) {
      //setMessage('Quantity cannot be none.');
      return 0;
    }

    // End of validation

    let unitCost = 200;
    let extendedCost = unitCost * quantity;
    let discountAmount = extendedCost * 0.05;
    let itemtoadd = new dataitem(
      count.current,
      selectedOption,
      quantity,
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
    data.store().insert(itemtoadd.data());
    data.reload();
    count.current++;
    message.current = `${selectedOption} has been added successfully.`;
    setSelectedOption(null);
    setQuantity();
    selectboxRef.current.instance.focus();
  };

  // End of function

  // Clears the table field

  const handleClearData = () => {
    data.store().clear();
    data.reload();
    //setMessage('Items cleared successfully. You can now add new items.')
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.value);
  };

  function handleEnterPressSelect(e) {
    if (e.event.keyCode === 13) {
      // check if Enter key is pressed
      numberBoxRef.current.instance.focus();
    }
  }

  function handleEnterPressQuantity(e) {
    if (e.event.keyCode === 13) {
      // check if Enter key is pressed
      addRef.current.focus();
    }
  }

  return (
    <>
      <div className="add-item">
        <SelectBox
          dataSource={options}
          searchEnabled={true}
          value={selectedOption}
          onKeyDown={handleEnterPressSelect}
          onValueChanged={handleOptionSelection}
          placeholder="Select an item"
          ref={selectboxRef}
          width="250px"
          height="35px"
        />

        <NumberBox
          value={quantity}
          onValueChanged={handleQuantityChange}
          placeholder="Quantity"
          showSpinButtons={true}
          width="150px"
          ref={numberBoxRef}
          onKeyDown={handleEnterPressQuantity}
          height="35px"
        />
        <div className="po-btns">
          <button
            onClick={handleItemPopulation}
            className="hover:bg-gray-200 py-0.5 px-4 h-full bg-menuBg text-menuText items-center font-medium  cursor-pointer text-sm"
            ref={addRef}
          >
            <IoAdd
              style={{
                display: "inline",
                fontSize: "1.3rem",
                paddingBottom: ".2rem",
              }}
            />
            &nbsp; Add
          </button>
          <button
            onClick={handleClearData}
            className="hover:bg-gray-200 py-0.5 px-4 h-full bg-menuBg text-menuText items-center font-medium  cursor-pointer text-sm"
          >
            <IoTrash
              style={{
                display: "inline",
                fontSize: "1.3rem",
                paddingBottom: ".2rem",
              }}
            />
            &nbsp; Clear
          </button>
        </div>
      </div>
      <MessageDiv message={message.current} />
    </>
  );

  // End of component's code
};

// Table component

const Table = ({ data, count, message }) => {
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
    return (
      <button ref={addRef} onClick={handleRowAdded}>
        Add new
      </button>
    );
  };
  const handleRowAdded = (e) => {
    gridRef.current.instance.addRow();
  };

  const handleRowInserted = (rowIndex) => {
    if (rowIndex.data.quantity === "" || isNaN(rowIndex.data.quantity)) {
      data.store().remove(rowIndex.key);
      data.reload();
      return;
    }

    let unitCost = 200.56;
    let extendedCost = unitCost * parseInt(rowIndex.data.quantity);
    let discountAmount = extendedCost * 0.05;
    let itemtoadd = new dataitem(
      count.current,
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
    data.store().insert(itemtoadd.data());
    data.store().remove(rowIndex.key);
    data.reload();
    count.current++;
    message.current = `${rowIndex.data.item} has been added successfully.`;
    gridRef.current.instance.focus();
  };
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
    message.current = "Item details updated.";
  };

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
        className="delete-btn  h-auto items-center cursor-pointer"
      >
        <IoClose
          style={{
            display: "inline",
            fontSize: "0.9rem",
            paddingBottom: ".2rem",
          }}
        />
        &nbsp; Remove
      </button>
    );
  };

  const handleKeyPress = (e) => {
    if (e.event.keyCode === 9 && e.event.shiftKey === true) {
      handleRowAdded();
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
      hoverStateEnabled={true}
      reshapeOnPush={true}
      onRowUpdated={handleRowUpdated}
      showRowLines={true}
      paging={false}
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
          items: items.map((item) => item.name),
          searchEnabled: true,
        }}
        headerCellRender={renderHeader}
      />
      <Column
        dataField="quantity"
        allowEditing={true}
        visible={true}
        dataType="number"
        showSpinButtons={true}
        alignment="left"
      />
      {columns.map((column) => (
        <Column
          dataField={column.dataField}
          allowEditing={column.allowEditing}
          visible={column.visible}
          dataType="number"
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

// Main Function
export const PurchaseOrder = () => {
  const [data, setData] = useState(new DataSource());
  const count = useRef(1);
  const message = useRef();
  const navigate = useNavigate();
  const handleClick = (menu) => {
    switch (menu) {
      case "Close":
        navigate("/");
        break;

      default:
        break;
    }
  };

  return (
    <main className="w-full min-h-full relative h-full px-3 md:px-5 py-1.5">
      <section>
        <MenuButtonsGroup
          heading="Purchase Order"
          menus={purchaseOrderMenu}
          onMenuClick={handleClick}
        />
      </section>
      <div className="mt-3 w-full">
        <Form />
      </div>
      <section className="mt-2">
        <div className="po-grid h-full mt-2">
          <div className="add-item-btns">
            <InputArea data={data} count={count} message={message} />
          </div>
          <Table data={data} count={count} message={message} />
        </div>
      </section>
    </main>
  );
};

// End of function
