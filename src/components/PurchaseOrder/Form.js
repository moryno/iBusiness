import React, { useState } from 'react'
import '../../assets/P_order.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { centerOptions } from '../../data/PurchaseOrderData'

// Getting date today

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const dateString = `${year}-${month}-${day}`;

// End of function

// Form Component

export const Form = () => {
    const [costCenter, setCostCenter] = useState('');
    const [supplier, setSupplier] = useState('');
    const [shipsTo, setShipsTo] = useState('');
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
              <select name="Center" className="select-control-input" value={costCenter} onChange={handleCostCenter} >
                {centerOptions.map(center => (
                  <option className="select-options" key={center.value} value={costCenter}>{center.text}</option>
                ))}
              </select>
            </div>
            <div className='select-control'>
              <label className='label-control'>Ships to:</label>
              <select name="Center" className="select-control-input" value={shipsTo} onChange={handleShipsTo} >
                {centerOptions.map(center => (
                  <option key={center.value} value={center.value}>{center.text}</option>
                ))}
              </select>
            </div>
            <div className='select-control'>
              <label className='label-control'>Order Amount:</label>
              <input type='text' className="control-input"/>
            </div>
            <div className='select-control'>
              <label className='label-control'>First Delivery Date:</label>
              <input type='date' className="control-input" value={firstDeliveryDate} onChange={handleFirstdDeliveryDate} />
            </div>
          </div>
          <div className='po-right'>
            <div className='select-control'>
              <label className='label-control'>Supplier:</label>
              <select className="select-control-input" value={supplier} onChange={handleSupplier} >
                {centerOptions.map(center => (
                  <option key={center.value} value={center.value}>{center.text}</option>
                ))}
              </select>
            </div>
            <div className='select-control'>
              <label className='label-control'>Order Date:</label>
              <input type='date' className="control-input" value={orderDate} onChange={handleOrderDate} />
            </div>
            <div className='select-control'>
              <label className='label-control'>Delivery Period (Days):</label>
              <input type='text' className="control-input" value={deliveryPeriod} onChange={handleDeliveryPeriod} />
            </div>
            <div className='select-control'>
              <label className='label-control'>Vehicle/Driver Details:</label>
              <input type='text' className="control-input" value={driverDetails} onChange={handleDriverDetails} />
            </div>
          </div>
          <div className='select-control'>
            <label className='label-control'>Narration:</label>
            <textarea rows="10" cols="50" style={{resize: 'none', marginLeft: '3.2rem'}} type='text' className="select-control-input narration-input" value={narration} onChange={handleNarration} />
          </div>
        </div>
    )
  }
  
  // End of component code