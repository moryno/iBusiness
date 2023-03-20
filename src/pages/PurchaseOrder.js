import React, { useState, useRef, useEffect } from 'react'
import MenuButtonsGroup from "../components/MenuButtonsGroup";
import '../assets/P_order.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { purchaseOrderMenu } from "../data/menu";
import DataSource from 'devextreme/data/data_source';
import Form from '../components/PurchaseOrder/Form'
import { InputField } from '../components/PurchaseOrder/InputField'
import { Table } from '../components/PurchaseOrder/Table'
import { MessageDiv } from '../components/PurchaseOrder/Message'
import { useNavigate } from 'react-router-dom';
import request from "../helpers/requestMethod";
import Statusbar from "../components/Statusbar";


// Main Function
export const PurchaseOrder = () => {
  const [currentmessage, setMessage] = useState();
  // eslint-disable-next-line
  const [data, setData] = useState(new DataSource());
  const [dataToSubmit, setSubmitData] = useState();
  const count = useRef(1);
  const [modalmessage, setModalMessage] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function getdata (){
    const user = {
      "userid": "Staicy"
    };
    try {
      const response = await request.post("/PurchaseOrder/getorderitems", user);
      response.data.map(item => {
        return data.store().insert(item);
      })
      data.reload();
          
    } catch(e) { 
      console.log(e);

    }
  }

  getdata();

  }, [data]);

  const submitData = async() => {
    const confirmedData = {
      formData: dataToSubmit,
      tableData: data.store()._array
    }

    console.log(confirmedData);
    setMessage("Submitting data...");      
        try {
          const { data } = await request.post("/createpurchaseorder", confirmedData);
          console.log(data);
          setMessage("Data submitted successfully.");

         }
          catch(e)
          {
            console.log(e);
            return setMessage("There was an error trying to submit your request.");
          }

  }

  const handleClick = (menu) => {
    switch (menu) {
      case "Submit Order":
        submitData();
        break;

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
        <Form setSubmitData={setSubmitData} />
      </div>
      <section className="mt-2">
        <div className="po-grid h-full mt-2">
          <div className="add-item-btns">
          <div className="add-item">
          <InputField data={data} count={count} setMessage={setMessage}  setModalMessage={setModalMessage}/>
          <MessageDiv message={currentmessage} />  
        </div>
          </div>
          <Table data={data} count={count} setMessage={setMessage} setModalMessage={setModalMessage}/>
        </div>
      </section>
      <div id="confirm-modal" className="po-modal">
            <div className="po-modal-content">
                <div className="po-modal-header">
                </div>
                <div className="po-modal-body">
                    <p>{modalmessage}</p>
                </div>
                <div className="po-modal-footer">
                    <button id="confirm-yes" className="po-modal-btn">Yes</button>
                    <button id="confirm-no" className="po-modal-btn">No</button>
                </div>
            </div>
        </div>
      <Statusbar heading="Purchase Order Entry" company="iBusiness" />
    </main>
  );
};

// End of function
