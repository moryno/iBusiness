import React, { useState, useRef } from 'react'
import MenuButtonsGroup from "../components/MenuButtonsGroup";
import '../assets/P_order.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { purchaseOrderMenu } from "../data/menu";
import DataSource from 'devextreme/data/data_source';
import { Form } from '../components/PurchaseOrder/Form'
import { InputField } from '../components/PurchaseOrder/InputField'
import { Table } from '../components/PurchaseOrder/Table'

// Main Function
export const PurchaseOrder = () => {
  // eslint-disable-next-line
  const [data, setData] = useState(new DataSource());
  const count = useRef(1);
  const message = useRef();
 
  return (
    <main className="w-full min-h-full relative h-full px-3 md:px-5 py-1.5">
        <section>
          <MenuButtonsGroup
            heading="Purchase Order"
            menus={purchaseOrderMenu}
            
          />
        </section>
        <div className="mt-3 w-full">
          <Form />
        </div>
        <section className="mt-2">
            <div className="po-grid h-full mt-2">
              <div className='add-item-btns'>
              <InputField data={data} count={count} message={message}/>
              </div>
              <Table data={data} count={count} message={message}/>
            </div>
        </section>
    </main>
  )
}

// End of function