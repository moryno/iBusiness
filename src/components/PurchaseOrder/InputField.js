import React, { useState, useRef, useEffect } from 'react'
import '../../assets/P_order.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { items } from '../../data/PurchaseOrderData'
import dataitem from '../../utils/Order';
import SelectBox from 'devextreme-react/select-box';
import { IoAdd, IoTrash } from "react-icons/io5";
import { NumberBox } from 'devextreme-react/number-box';

// Memoizing message div to avoid unnecessary rerender
const MessageDiv = ({ message }) => {
    const [ currentmessage, setMessage ] = useState("");
      useEffect(() => {
        setMessage(message);
      }, [message]);
  
    return (
      <p className="po-message">{currentmessage}</p>
    )
  }
  
// End

// Input section component

export const InputField = ({ count, data, message }) => {
    const options = items.map(item => (item.name));
    const [quantity, setQuantity] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const numberBoxRef = useRef(null);
    const selectboxRef = useRef(null);
    const addRef = useRef(null);
  
    const handleOptionSelection = (e) => {
      setSelectedOption(e.value);
      
   }   
  
    const handleItemPopulation = () => {
      // Data validation
  
      if ( selectedOption === null ){
        message.current = 'Please select an item.';
        return null;
  
      } else if ( quantity === "" ) {
        //setMessage('Please enter the number of items.');
        return 0;
  
      } else if ( isNaN(quantity) ) {
        //setMessage('Quantity has to be a number.');
        return 0;
  
      } else if ( quantity === 0 ) {
        //setMessage('Quantity cannot be none.');
        return 0;
      }
  
      // End of validation

      const item = items.find((x) => x.key === selectedOption);
      const itemtoupdate = data.store()._array.find((x) => x.itemNumber === selectedOption);

      if ( typeof itemtoupdate === "undefined" ) {
        let extendedCost = item.amount * quantity;
        let discountAmount = extendedCost * 0.05;
        let itemtoadd = new dataitem(
          item.key,
          item.name,
          quantity,
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
          data.store().insert(itemtoadd.data());
          data.reload();
          count.current++;
          message.current = `${item.name} has been added successfully.`;
          setSelectedOption(null);
          setQuantity();
          selectboxRef.current.instance.focus();

      } else if( itemtoupdate.itemNumber === selectedOption ) {
        let extendedCost = item.amount * (quantity + itemtoupdate.quantity);
        let discountAmount = extendedCost * 0.05;
        let itemtoadd = new dataitem(
          item.key,
          item.name,
          quantity + itemtoupdate.quantity,
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
          data.store().insert(itemtoadd.data());
          data.reload();
          count.current++;
          message.current = `${item.name} has been added successfully.`;
          setSelectedOption(null);
          setQuantity();
          selectboxRef.current.instance.focus();
  
      }
    };
    
    // End of function 
  
    // Clears the table field
  
    const handleClearData = () => {
      data.store().clear();
      data.reload();
      //setMessage('Items cleared successfully. You can now add new items.')
    }
    
      const handleQuantityChange = (e) => {
        setQuantity(e.value);
      }
  
  
      function handleEnterPressSelect(e) {
      if (e.event.keyCode === 13) { // check if Enter key is pressed
        numberBoxRef.current.instance.focus();
      }
      }
  
      function handleEnterPressQuantity(e) {
      if (e.event.keyCode === 13) { // check if Enter key is pressed
        addRef.current.focus();
      }
    }
  
    return (
      <>
        <div className="add-item">
          <SelectBox
            dataSource={items}
            displayExpr="name"
            valueExpr="key"
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
          height="35px" />
          <div className='po-btns'>
              <button 
                onClick={handleItemPopulation}
                className="hover:bg-gray-200 py-0.5 px-4 h-full bg-menuBg text-menuText items-center font-medium  cursor-pointer text-sm"
                ref={addRef}
              >
                <IoAdd style={{ display:'inline', fontSize:'1.3rem', paddingBottom:'.2rem' }}/>
                &nbsp;
                Add
              </button>
              <button 
                onClick={handleClearData}
                className="hover:bg-gray-200 py-0.5 px-4 h-full bg-menuBg text-menuText items-center font-medium  cursor-pointer text-sm"
              >
                <IoTrash style={{ display:'inline', fontSize:'1.3rem', paddingBottom:'.2rem' }}/>
                &nbsp;
                Clear
              </button>
          </div>
        </div>
        <MessageDiv message={message.current} />  
        </>
  
    )
  
  
  }
  
  // End of component's code