import React, { useState, useEffect, forwardRef } from 'react'
import '../../assets/P_order.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { centerOptions } from '../../data/PurchaseOrderData'
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import DateBox from 'devextreme-react/date-box';
import TextArea from 'devextreme-react/text-area';

// Getting date today

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const dateString = `${year}-${month}-${day}`;

// End of function

// Form Component

const Form = ({ formUpdateData, setSubmitData, orderState }) => {
    const [costCenter, setCostCenter] = useState();
    const [supplier, setSupplier] = useState();
    const [shipsTo, setShipsTo] = useState();
    const [orderDate, setOrderDate] = useState(dateString);
    const [orderAmount, setOrderAmount] = useState();    
    const [firstDeliveryDate, setfirstDeliveryDate] = useState(dateString);
    const [narration, setNarration] = useState();
    const [deliveryPeriod, setDeliveryPeriod] = useState();
    const [driverDetails, setdriverDetails] = useState();

    useEffect(() => {
      if (  orderState === 1) {
      setCostCenter(formUpdateData.costCenter);
      setSupplier(formUpdateData.supplier);
      setShipsTo(formUpdateData.shipsTo);
      setOrderDate(dateString);
      setOrderAmount(formUpdateData.orderAmount);
      setDeliveryPeriod(formUpdateData.deliveryPeriod);
      setfirstDeliveryDate(dateString);
      setdriverDetails(formUpdateData.driverDetails);
      setNarration(formUpdateData.narration);

      }
    }, [formUpdateData])

    useEffect(
      () => {
        setSubmitData(
          {
            costCenter: costCenter,
            supplier: supplier,
            shipsTo: shipsTo,
            orderDate: orderDate,
            orderAmount: parseInt(orderAmount),
            deliveryPeriod: parseInt(deliveryPeriod),
            firstDeliveryDate: firstDeliveryDate,
            vehicleDetails: driverDetails,
            narration: narration
          }
          
        )
      }, [costCenter, supplier, shipsTo, orderDate, orderAmount, firstDeliveryDate, narration, deliveryPeriod, driverDetails, setSubmitData]
    )

 
    return (
        <div className='po-form'>
          <div className='po-left'>
            <div className='select-control'>
              <label className='label-control'>Cost Center:</label>
              <SelectBox items={centerOptions} searchEnabled={true} valueExpr="text" displayExpr="text" width="68%" height="4.5vh" value={costCenter} onValueChanged={(e) => {setCostCenter(e.value)}}/>
            </div>
            <div className='select-control'>
              <label className='label-control'>Ships to:</label>
              <SelectBox items={centerOptions} valueExpr="text" displayExpr="text" width="68%" height="4.5vh" value={shipsTo} onValueChanged={(e) => {setShipsTo(e.value)}}/>
            </div>
            <div className='select-control'>
              <label className='label-control'>Order Amount:</label>
              <TextBox width="68%" height="4vh" value={orderAmount} onValueChanged={(e) => {setOrderAmount(e.value)}} />
            </div>
            <div className='select-control'>
              <label className='label-control'>First Delivery Date:</label>
              <DateBox defaultValue={dateString} width="68%" height="4vh" value={firstDeliveryDate} onValueChanged={(e) => {setfirstDeliveryDate(e.value)}} />
            </div>
          </div>
          <div className='po-right'>
            <div className='select-control'>
              <label className='label-control'>Supplier:</label>
              <SelectBox items={centerOptions} valueExpr="text" displayExpr="text" width="68%" height="4.5vh" value={supplier} onValueChanged={(e) => {setSupplier(e.value)}}/>
            </div>
            <div className='select-control'>
              <label className='label-control'>Order Date:</label>
              <DateBox defaultValue={dateString} width="68%" height="4vh" value={orderDate} onValueChanged={(e) => {setOrderDate(e.value)}} />
            </div>
            <div className='select-control'>
              <label className='label-control'>Delivery Period (Days):</label>
              <TextBox width="79%" height="4vh" value={deliveryPeriod} onValueChanged={(e) => {setDeliveryPeriod(e.value)}} />
            </div>
            <div className='select-control'>
              <label className='label-control'>Vehicle/Driver Details:</label>
              <TextBox width="79%" height="4vh" value={driverDetails} onValueChanged={(e) => {setdriverDetails(e.value)}} />
            </div>
          </div>
          <div className='select-control'>
            <label className='label-control'>Narration:</label>
            <TextArea type='text' width="40vw" height="9vh" placeholder="Type narration here" style={{ marginLeft: "3.3rem"}} className="select-control-input" value={narration} onValueChanged={(e) => {setNarration(e.value)}} />
          </div>
        </div>
    )
  }
  
  // End of component code

  export default Form;