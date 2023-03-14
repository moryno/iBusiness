import React, { useState, useRef } from 'react'
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

// Main Function
export const PurchaseOrder = () => {
  const [currentmessage, setMessage] = useState("Hey what's good?");
  // eslint-disable-next-line
  const [data, setData] = useState(new DataSource());
  const [dataToSubmit, setSubmitData] = useState();
  const count = useRef(1);
  const navigate = useNavigate();
  

  const submitData = () => {
    console.log("Submitting data...");
    const confirmedData = {
      formData: dataToSubmit,
      tableData: data.store()._array
    }
    console.log(confirmedData);
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
        <Form setSubmitData={setSubmitData} datatosubmit={dataToSubmit}/>
      </div>
      <section className="mt-2">
        <div className="po-grid h-full mt-2">
          <div className="add-item-btns">
          <div className="add-item">
          <InputField data={data} count={count} setMessage={setMessage} />
          <MessageDiv message={currentmessage} />  
        </div>
          </div>
          <Table data={data} count={count} setMessage={setMessage} />
        </div>
      </section>
    </main>
  );
};

// End of function
