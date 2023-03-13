import React, { useState } from 'react'
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

export const Form = () => {
    const [costCenter, setCostCenter] = useState(1);
    const [supplier, setSupplier] = useState(1);
    const [shipsTo, setShipsTo] = useState(1);
    const [orderDate, setOrderDate] = useState(dateString);
    const [firstDeliveryDate, setfirstDeliveryDate] = useState(dateString);
    const [narration, setNarration] = useState('');
    const [deliveryPeriod, setDeliveryPeriod] = useState(0);
    const [driverDetails, setdriverDetails] = useState('');
  
      // Handles change of values in input fields
    
      const handleDeliveryPeriod = (e) => {
         setDeliveryPeriod(e.value);
      }
  
      const handleNarration = (e) => {
         setNarration(e.value);
      }
  
      const handleDriverDetails = (e) => {
         setdriverDetails(e.value);
  
      }
  
      const handleOrderDate = (e) => {
         setOrderDate(e.value);
      }
  
      const handleFirstdDeliveryDate = (e) => {
        setfirstDeliveryDate(e.value);
      }
      
  
      const handleCostCenter = (e) => {
        setCostCenter(e.value);

      }
      
      const handleSupplier = (e) => {
        setSupplier(e.value);
      }
  
      const handleShipsTo = (e) => {
        setShipsTo(e.value);
      }
  
  
      // End of function
  
    return (
        <div className='po-form'>
          <div className='po-left'>
            <div className='select-control'>
              <label className='label-control'>Cost Center:</label>
              <SelectBox items={centerOptions} searchEnabled={true} valueExpr="value" displayExpr="text" width="68%" height="4.5vh" value={costCenter} onValueChanged={handleCostCenter}/>
            </div>
            <div className='select-control'>
              <label className='label-control'>Ships to:</label>
              <SelectBox items={centerOptions} valueExpr="value" displayExpr="text" width="68%" height="4.5vh" value={shipsTo} onValueChanged={handleShipsTo}/>
            </div>
            <div className='select-control'>
              <label className='label-control'>Order Amount:</label>
              <TextBox width="68%" height="4vh"/>
            </div>
            <div className='select-control'>
              <label className='label-control'>First Delivery Date:</label>
              <DateBox defaultValue={dateString} width="68%" height="4vh" value={firstDeliveryDate} onValueChanged={handleFirstdDeliveryDate} />
            </div>
          </div>
          <div className='po-right'>
            <div className='select-control'>
              <label className='label-control'>Supplier:</label>
              <SelectBox items={centerOptions} valueExpr="value" displayExpr="text" width="68%" height="4.5vh" value={supplier} onValueChanged={handleSupplier}/>
            </div>
            <div className='select-control'>
              <label className='label-control'>Order Date:</label>
              <DateBox defaultValue={dateString} width="68%" height="4vh" value={orderDate} onValueChanged={handleOrderDate} />
            </div>
            <div className='select-control'>
              <label className='label-control'>Delivery Period (Days):</label>
              <TextBox width="79%" height="4vh" value={deliveryPeriod} onValueChanged={handleDeliveryPeriod} />
            </div>
            <div className='select-control'>
              <label className='label-control'>Vehicle/Driver Details:</label>
              <TextBox width="79%" height="4vh" value={driverDetails} onValueChanged={handleDriverDetails} />
            </div>
          </div>
          <div className='select-control'>
            <label className='label-control'>Narration:</label>
            <TextArea type='text' width="40vw" height="9vh" placeholder="Type narration here" style={{ marginLeft: "3.3rem"}}className="select-control-input" value={narration} onValueChanged={handleNarration} />
          </div>
        </div>
    )
  }
  
  // End of component code