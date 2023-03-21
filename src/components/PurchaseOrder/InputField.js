import React, { useState, useRef } from 'react'
import '../../assets/P_order.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { items } from '../../data/PurchaseOrderData'
import dataitem from '../../utils/Order';
import SelectBox from 'devextreme-react/select-box';
import { IoAdd, IoTrash } from "react-icons/io5";
import { NumberBox } from 'devextreme-react/number-box';
import ConfirmMessage from './ConfirmMessage';
import { useSelector } from "react-redux";
import request from "../../helpers/tempRequest";

// Input section component

export const InputField = ({ count, data, setMessage, setModalMessage }) => {
    const [quantity, setQuantity] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const numberBoxRef = useRef(null);
    const selectboxRef = useRef(null);
    const addRef = useRef(null);
    const currentUser = useSelector((state) => state.user?.currentUser?.user);

    console.log(currentUser);
  
    const handleOptionSelection = (e) => {
      setSelectedOption(e.value);
      
   }   
  
    const handleItemPopulation = async() => {
      // Data validation
  
      if ( selectedOption === null ){
        setMessage('Please select an item.');
        return null;
  
      } else if ( quantity === "" ) {
        setMessage('Please enter the number of items.');
        return 0;
  
      } else if ( isNaN(quantity) ) {
        setMessage('Quantity has to be a number.');
        return 0;
  
      } else if ( quantity === 0 ) {
        setMessage('Quantity cannot be none.');
        return 0;
      }
  
      // End of validation

      const item = items.find((x) => x.key === selectedOption);
      const itemtoupdate = data.store()._array.find((x) => x.item === item.name);

      if ( typeof itemtoupdate === "undefined" ) {
        let extendedCost = item.amount * quantity;
        let discountAmount = extendedCost * 0.05;
        let itemtoadd = new dataitem(
          item.name,
          quantity,
          item.amount,
          extendedCost,
          extendedCost * 0.25,
          extendedCost * 0.16,
          extendedCost - discountAmount,
          currentUser?.email,
          `${currentUser?.email}.${item.name}`
          

          );

          data.store().insert(itemtoadd.data());
          data.reload();
          count.current++;
          setMessage(`${item.name} has been added successfully.`);
          setSelectedOption(null);
          setQuantity();
          selectboxRef.current.instance.focus();
          
          try {
            const data = {
              "item" : item.name,
              "quantity" : itemtoadd.quantity,
              "unitCost" : item.amount,
              "extendedCost" : itemtoadd.extendedCost,
              "taxAmount" : itemtoadd.taxAmount,
              "discountAmount" : itemtoadd.discountAmount,
              "lineTotal" : itemtoadd.lineTotal,
              "partitionKey" : itemtoadd.partitionKey,
              "id" : itemtoadd.id
            }
            console.log(data);
            const response = await request.post("PurchaseOrder/insertorderitems", data);
            console.log(response);

          } catch(e) {
            const itemtoremove = data.store()._array.find((x) => x.item === item.name);
            data.store().remove(itemtoremove);
            data.reload();
            console.log(e);
          }
        

      } else if ( itemtoupdate.item === item.name ) {
        console.log(quantity);
        console.log(itemtoupdate.quantity);
        let extendedCost = item.amount * (quantity + itemtoupdate.quantity);
        let discountAmount = extendedCost * 0.05;
        let itemtoadd = new dataitem(
          item.name,
          quantity,
          item.amount,
          extendedCost,
          extendedCost * 0.25,
          extendedCost * 0.16,
          extendedCost - discountAmount,
          currentUser?.fullname,
          `${currentUser?.email}.${item.name}`
          );

          data.store().remove(itemtoupdate);
          data.store().insert(itemtoadd.data());
          data.reload();
          count.current++;
          setMessage(`${item.name} has been added successfully.`);
          setSelectedOption(null);
          setQuantity();
          selectboxRef.current.instance.focus();

          try {
            const data = {
              "item" : item.name,
              "quantity" : itemtoadd.quantity,
              "unitCost" : item.amount,
              "extendedCost" : itemtoadd.extendedCost,
              "taxAmount" : itemtoadd.taxAmount,
              "discountAmount" : itemtoadd.discountAmount,
              "lineTotal" : itemtoadd.lineTotal,
              "partitionKey" : itemtoadd.partitionKey,
              "id" : itemtoadd.id
            }
            console.log(data);
            const response = await request.put("PurchaseOrder/updateorderitems", data);
            console.log(response);

          } catch(e) {
            // const itemtoremove = data.store()._array.find((x) => x.item === item.name);
            // data.store().remove(itemtoremove);
            // data.reload();
            // console.log(e);
          }
  
      }
    };
    
    // End of function 
  
    // Clears the table field
  
    const handleClearData = () => {
      setModalMessage("Are you sure you want to clear the table?");
      ConfirmMessage("", function(result) {
        if (result) {
          data.store().clear();
          setMessage("Table successfully cleared. You can add new items.")
          data.reload();
        } else {

        }
      });
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
          min={0}
          max={5000}
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
        </>
  
    )
  
  
  }
  
  // End of component's code

