import React, { useState, useEffect, useRef } from "react";
import MenuButtonsGroup from "../components/MenuButtonsGroup";
import "../assets/P_order.css";
import { DataGrid, Editing, FilterRow } from "devextreme-react/data-grid";
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
import request from "../helpers/requestMethod";
import { IoAdd, IoTrash } from "react-icons/io5";
import { NumberBox } from "devextreme-react/number-box";
import { useNavigate } from "react-router-dom";

// Memoizing message div to avoid unnecessary rerender
function MessageDiv({ message }) {
  return <p className="po-message">{message}</p>;
}

// End

export const PurchaseOrder = () => {
  const gridRef = useRef(null);
  const [count, setCount] = useState(1);
  const options = items.map((item) => item.name);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [supplier, setSupplier] = useState("");
  const [shipsTo, setShipsTo] = useState("");
  const [orderDate, setOrderDate] = useState(null);
  const [firstDeliveryDate, setfirstDeliveryDate] = useState(null);
  const [narration, setNarration] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState("");
  const [deliveryPeriod, setDeliveryPeriod] = useState(0);
  const [driverDetails, setdriverDetails] = useState("");
  const [filterRow, setfilterRow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (dataSource.length === 0) {
      setfilterRow(false);
    } else {
      setfilterRow(true);
    }
  }, [dataSource]);

  // Recalculates values after row info is updated
  const handleRowUpdated = (rowIndex) => {
    let dataupdated = dataSource;
    for (let i = 0; i < dataupdated.length; i++) {
      if (dataupdated[i].itemNumber === rowIndex.data.itemNumber) {
        let previousamt = rowIndex.data.lineTotal;
        let unitCost = rowIndex.data.unitCost;
        let extendedCost = unitCost * parseInt(rowIndex.data.quantity);
        let discountAmount = extendedCost * 0.05;
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
        dataupdated[i] = itemtoadd.data();
        setTotal(total + (extendedCost - discountAmount) - previousamt);
        setDataSource(dataupdated);
        gridRef.current.instance.refresh();
        setMessage("Item details updated.");
      }
    }
  };

  // End of function

  // Getting date today

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  // End of function

  // Handles deletion of data from grid

  const handleRowRemoved = (rowIndex) => {
    setTotal(total - rowIndex.data.lineTotal);
  };

  //End

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

  const handleQuantityChange = (e) => {
    setQuantity(e.value);
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
  const handleOptionSelection = (e) => {
    setSelectedOption(e.value);
  };

  // End of function

  // Saving the data

  const save = async () => {
    const data = {
      CostCenter: costCenter,
      ShipsTo: shipsTo,
      Supplier: supplier,
      Narration: narration,
      DeliveryPeriod: parseInt(deliveryPeriod),
      VehicleDetails: driverDetails,
      OrderDate: orderDate,
      OrderAmount: total,
      FirstDeliveryDate: firstDeliveryDate,
    };

    console.log(data);

    try {
      const resp = await request.post("/createpurchaseorder", data);
      resp.status === 200
        ? setMessage("Purchase order has been submitted successfully.")
        : setMessage("Bad request");
    } catch (error) {
      console.log(error);
      return setMessage("There was an error trying to submit the data.");
    }

    setMessage("Purchase order has been submitted successfully.");
    setCount(1);
    setSelectedOption(null);
    setQuantity("");
    setDataSource([]);
    setCostCenter("");
    setSupplier("");
    setShipsTo("");
    setNarration("");
    setDeliveryPeriod("");
    setdriverDetails("");
    setTotal(0);
  };

  // End of function

  // Adds data to the table

  const handleItemPopulation = () => {
    // Data validation

    if (selectedOption === null) {
      setMessage("Please select an item.");
      return null;
    } else if (quantity === "") {
      setMessage("Please enter the number of items.");
      return 0;
    } else if (isNaN(quantity)) {
      setMessage("Quantity has to be a number.");
      return 0;
    } else if (quantity === "0") {
      setMessage("Quantity cannot be none.");
      return 0;
    }

    // End of validation

    let unitCost = 200;
    let extendedCost = unitCost * quantity;
    let discountAmount = extendedCost * 0.05;
    let itemtoadd = new dataitem(
      count,
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
    setDataSource([itemtoadd.data(), ...dataSource]);
    setCount(count + 1);
    setTotal(total + (extendedCost - discountAmount));
    setSelectedOption(null);
    setQuantity("");
    setMessage(`${selectedOption} has been added successfully.`);
  };

  // End of function

  // Clears the table field

  const handleClearData = () => {
    setDataSource([]);
    setCount(1);
    setTotal(0);
    setMessage("Items cleared successfully. You can now add new items.");
  };

  // End of function

  // Manages main buttons functionality
  const handleClick = (menu) => {
    switch (menu) {
      case "Submit Order":
        if (count === 1) {
          setMessage("Add items to submit.");
          break;
        } else {
          save();
        }
        break;

      case "Cancel":
        setMessage("Purchase order has been cleared.");
        setCount(1);
        setSelectedOption(null);
        setQuantity("");
        setDataSource([]);
        navigate("/");
        break;

      default:
        break;
    }
  };

  // End

  return (
    <main className="w-full min-h-full relative  px-3 md:px-5 py-1.5">
      <section>
        <MenuButtonsGroup
          heading="Purchase Order"
          menus={purchaseOrderMenu}
          onMenuClick={handleClick}
        />
      </section>
      <div className="mt-3 w-full h-full">
        <div className="po-form">
          <div className="po-left">
            <div className="select-control">
              <label className="label-control" for="center">
                Cost Center:
              </label>
              <select
                name="Center"
                className="select-control-input"
                value={costCenter}
                onChange={handleCostCenter}
              >
                {centerOptions.map((center) => (
                  <option className="select-options" value={costCenter}>
                    {center.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-control">
              <label className="label-control" for="center">
                Ships to:
              </label>
              <select
                name="Center"
                className="select-control-input"
                value={shipsTo}
                onChange={handleShipsTo}
              >
                {centerOptions.map((center) => (
                  <option value={center.value}>{center.text}</option>
                ))}
              </select>
            </div>
            <div className="select-control">
              <label className="label-control" for="center">
                Order Amount:
              </label>
              <input
                type="text"
                className="control-input"
                value={total}
                disabled
              />
            </div>
            <div className="select-control">
              <label className="label-control" for="center">
                First Delivery Date:
              </label>
              <input
                type="date"
                defaultValue={dateString}
                className="control-input"
                value={firstDeliveryDate}
                onChange={handleFirstdDeliveryDate}
              />
            </div>
          </div>
          <div className="po-right">
            <div className="select-control">
              <label className="label-control" for="center">
                Supplier:
              </label>
              <select
                className="select-control-input"
                value={supplier}
                onChange={handleSupplier}
              >
                {centerOptions.map((center) => (
                  <option value={center.value}>{center.text}</option>
                ))}
              </select>
            </div>
            <div className="select-control">
              <label className="label-control" for="center">
                Order Date:
              </label>
              <input
                type="date"
                defaultValue={dateString}
                className="control-input"
                value={orderDate}
                onChange={handleOrderDate}
              />
            </div>
            <div className="select-control">
              <label className="label-control" for="center">
                Delivery Period (Days):
              </label>
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
            <label className="label-control" for="center">
              Narration:
            </label>
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
      </div>
      <div className="po-grid mt-5">
        <div className="add-item-btns">
          <div className="add-item">
            <SelectBox
              dataSource={options}
              value={selectedOption}
              onValueChanged={handleOptionSelection}
              placeholder="Select an item"
              width="250px"
              height="35px"
            />

            <NumberBox
              value={quantity}
              onValueChanged={handleQuantityChange}
              placeholder="Quantity"
              showSpinButtons={true}
              width="150px"
            />
            <div className="po-btns">
              <button onClick={handleItemPopulation} className="grid-button">
                <IoAdd
                  style={{
                    display: "inline",
                    fontSize: "1.3rem",
                    paddingBottom: ".2rem",
                  }}
                />
                &nbsp; Add
              </button>
              <button onClick={handleClearData} className="grid-button">
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
          <MessageDiv message={message} />
        </div>
        <DataGrid
          className="purchaseGrid"
          style={{
            borderStyle: "solid",
            marginTop: "1rem",
            fontSize: ".7rem",
          }}
          showBorders={true}
          dataSource={dataSource}
          hoverStateEnabled={true}
          keyExpr="itemNumber"
          onRowUpdated={handleRowUpdated}
          columnHidingEnabled={true}
          showRowLines={true}
          onRowRemoved={handleRowRemoved}
          //focusedRowEnabled={true}
          allowColumnResizing={true}
          showToolbar={true}
          columnMinWidth={120}
          summary={summary}
          columnAutoWidth={true}
          allowColumnReordering={true}
          ref={gridRef}
          columns={columns}
          cacheEnabled={false}
        >
          <Editing
            mode="cell"
            allowUpdating={true}
            allowDeleting={true}
            texts={{ deleteRow: "Remove" }}
          />
          <FilterRow visible={filterRow} />
        </DataGrid>
      </div>
    </main>
  );
};
