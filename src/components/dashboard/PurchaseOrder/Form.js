import React, { useState, useEffect, memo } from "react";
import "../../../pages/dashboard/purchase-orders/PurchaseOrder.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { centerOptions } from "../../../data/PurchaseOrderData";
import SelectBox from "devextreme-react/select-box";
import TextBox from "devextreme-react/text-box";
import DateBox from "devextreme-react/date-box";
import TextArea from "devextreme-react/text-area";
import NumberBox from "devextreme-react/number-box";
import { useSelector } from "react-redux";
import request from "../../../helpers/tempRequest";

// Getting date today

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const dateString = `${year}-${month}-${day}`;

// End of function

// Form Component

const Form = ({ formUpdateData, setSubmitData, dataToSubmit }) => {
  const [costCenter, setCostCenter] = useState();
  const [supplier, setSupplier] = useState();
  const [shipsTo, setShipsTo] = useState();
  const [orderDate, setOrderDate] = useState(dateString);
  const [orderAmount, setOrderAmount] = useState();
  const [firstDeliveryDate, setfirstDeliveryDate] = useState(dateString);
  const [narration, setNarration] = useState();
  const [deliveryPeriod, setDeliveryPeriod] = useState();
  const [driverDetails, setdriverDetails] = useState();
  const [orderNumber, setOrderNumber] = useState(0);
  const currentUser = useSelector((state) => state.user?.currentUser?.user);
  var dataToCosmos = {
      costCenter: "",
      supplier: "",
      shipsTo: "",
      orderDate: dateString,
      orderAmount: 0,
      deliveryPeriod: 0,
      firstDeliveryDate: dateString,
      vehicleDetails: "",
      narration: "",
      orderNumber: 0,
      id: currentUser.email ?? ""
    }

  useEffect(() => {
      if (typeof formUpdateData === "undefined"){
        return;
      }
      setCostCenter(formUpdateData.costCenter);
      setSupplier(formUpdateData.supplier);
      setShipsTo(formUpdateData.shipsTo);
      setOrderDate(dateString);
      setOrderAmount(formUpdateData.orderAmount);
      setDeliveryPeriod(formUpdateData.deliveryPeriod);
      setfirstDeliveryDate(dateString);
      setdriverDetails(formUpdateData.vehicleDetails);
      setNarration(formUpdateData.narration);
      setOrderNumber(formUpdateData.orderNumber);
    
  }, [formUpdateData]);

  useEffect(() => {
    // const data = {
    //   costCenter: costCenter ?? "",
    //   supplier: supplier ?? "",
    //   shipsTo: shipsTo ?? "",
    //   orderDate: orderDate ?? dateString,
    //   orderAmount: orderAmount ?? 0,
    //   deliveryPeriod: deliveryPeriod ?? 0,
    //   firstDeliveryDate: firstDeliveryDate ?? dateString,
    //   vehicleDetails: driverDetails ?? "",
    //   narration: narration ?? "",
    //   orderNumber: orderNumber ?? 0,
    //   id: currentUser.email ?? ""
    // }
    console.log(dataToSubmit);
    updateToCosmos(dataToSubmit);
    // setSubmitData({...data, [name]});

  }, [
    // costCenter,
    // supplier,
    // shipsTo,
    // orderDate,
    // orderAmount,
    // firstDeliveryDate,
    // narration,
    // deliveryPeriod,
    // driverDetails,
    dataToSubmit,
  ]);

  const updateToCosmos = async(data) => {
    try {
      await request.put("/PurchaseOrder/updateorderinfo", data);
      console.log("Updated");
    }
    catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="po-form">
      <div className="po-left">
        <div className="select-control">
          <label className="label-control">Cost Center:</label>
          <SelectBox
            items={centerOptions}
            searchEnabled={true}
            valueExpr="text"
            displayExpr="text"
            width="68%"
            height="4.5vh"
            value={costCenter}
            onValueChanged={(e) => {
              setCostCenter(e.value);
              setSubmitData({...dataToSubmit, costCenter: e.value});
              dataToCosmos = {...dataToSubmit, costCenter: e.value};
              console.log(dataToCosmos);
            }}
          />
        </div>
        <div className="select-control">
          <label className="label-control">Ships to:</label>
          <SelectBox
            items={centerOptions}
            valueExpr="text"
            displayExpr="text"
            width="68%"
            height="4.5vh"
            value={shipsTo}
            onValueChanged={(e) => {
              setShipsTo(e.value);
              setSubmitData({...dataToSubmit, shipsTo: e.value});
              updateToCosmos();
            }}
          />
        </div>
        <div className="select-control">
          <label className="label-control">Order Amount:</label>
          <NumberBox
            width="68%"
            height="4vh"
            value={orderAmount}
            onValueChanged={(e) => {
              setOrderAmount(e.value);
              setSubmitData({...dataToSubmit, orderAmount: e.value});
              updateToCosmos();
            }}
          />
        </div>
        <div className="select-control">
          <label className="label-control">First Delivery Date:</label>
          <DateBox
            defaultValue={dateString}
            width="68%"
            height="4vh"
            value={firstDeliveryDate}
            onValueChanged={(e) => {
              setfirstDeliveryDate(e.value);
              setSubmitData({...dataToSubmit, firstDeliveryDate: e.value});
              updateToCosmos();
            }}
          />
        </div>
      </div>
      <div className="po-right">
        <div className="select-control">
          <label className="label-control">Supplier:</label>
          <SelectBox
            items={centerOptions}
            valueExpr="text"
            displayExpr="text"
            width="68%"
            height="4.5vh"
            value={supplier}
            onValueChanged={(e) => {
              setSupplier(e.value);
              setSubmitData({...dataToSubmit, supplier: e.value});
              updateToCosmos();
            }}
          />
        </div>
        <div className="select-control">
          <label className="label-control">Order Date:</label>
          <DateBox
            defaultValue={dateString}
            width="68%"
            height="4vh"
            value={orderDate}
            onValueChanged={(e) => {
              setOrderDate(e.value);
              setSubmitData({...dataToSubmit, orderDate: e.value});
              updateToCosmos();
            }}
          />
        </div>
        <div className="select-control">
          <label className="label-control">Delivery Period (Days):</label>
          <NumberBox
            width="79%"
            height="4vh"
            value={deliveryPeriod}
            onValueChanged={(e) => {
              setDeliveryPeriod(e.value);
              setSubmitData({...dataToSubmit, deliveryPeriod: e.value});
              updateToCosmos();
            }}
          />
        </div>
        <div className="select-control">
          <label className="label-control">Vehicle/Driver Details:</label>
          <TextBox
            width="79%"
            height="4vh"
            value={driverDetails}
            onValueChanged={(e) => {
              setdriverDetails(e.value);
              setSubmitData({...dataToSubmit, driverDetails: e.value});
              updateToCosmos();
            }}
          />
        </div>
      </div>
      <div className="select-control">
        <label className="label-control">Narration:</label>
        <TextArea
          type="text"
          width="40vw"
          height="9vh"
          placeholder="Type narration here"
          style={{ marginLeft: "3.3rem" }}
          className="select-control-input"
          value={narration}
          onValueChanged={(e) => {
            setNarration(e.value);
            setSubmitData({...dataToSubmit, narration: e.value});
            updateToCosmos();
          }}
        />
      </div>
    </div>
  );
};

// End of component code

export default memo(Form);
