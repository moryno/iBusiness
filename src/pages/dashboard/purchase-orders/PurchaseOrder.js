import React, { useState, useRef, useEffect } from "react";
import MenuButtonsGroup from "../../../components/dashboard/MenuButtonsGroup";
import "./PurchaseOrder.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { purchaseOrderMenu } from "../../../data/menu";
import DataSource from "devextreme/data/data_source";
import Form from "../../../components/dashboard/PurchaseOrder/Form";
import { InputField } from "../../../components/dashboard/PurchaseOrder/InputField";
import { Table } from "../../../components/dashboard/PurchaseOrder/Table";
import { MessageDiv } from "../../../components/dashboard/PurchaseOrder/Message";
import { useNavigate, useParams } from "react-router-dom";
import request from "../../../helpers/requestMethod";
import Statusbar from "../../../components/dashboard/Statusbar";
import { useSelector } from "react-redux";

// Main Function
export const PurchaseOrder = ({ orderstate }) => {
  const [currentmessage, setMessage] = useState();
  const [formUpdateData, setFormUpdateData] = useState({
    costCenter: "",
    supplier: "",
    shipsTo: "",
    orderDate: "",
    orderAmount: 0,
    deliveryPeriod: 0,
    firstDeliveryDate: "",
    vehicleDetails: "",
    narration: "",
    orderNumber: 0
  });
  const { id } = useParams();
  // eslint-disable-next-line})
  const [data, setData] = useState(new DataSource());
  const [dataToSubmit, setSubmitData] = useState();
  const count = useRef(1);
  const [modalmessage, setModalMessage] = useState();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user?.currentUser?.user);

  useEffect(() => {
    if (orderstate === 0) {
      async function getdata() {
        const user = {
          userid: currentUser?.email,
        };
        try {
          const response = await request.post(
            "/PurchaseOrder/getorderitems",
            user
          );
          response.data.map((item) => {
            return data.store().insert(item);
          });
          data.reload();
        } catch (e) {
          console.log(e);
        }
      }

      getdata();
    } else if (orderstate === 1) {
      const getUpdateData = async () => {
        try {
          const response = await request.get(
            `/PurchaseOrder/getorder?orderNumber=${id}`
          );
          response.data.tableData.map((item) => {
            data.store().insert(item);
            data.reload();
          });
          setFormUpdateData(response.data.formInfo);
        } catch (e) {
          console.log(e);
        }
      };

      getUpdateData();
    }
  }, []);

  const submitData = async () => {
    const confirmedData = {
      formData: dataToSubmit,
      tableData: data.store()._array,
    };

    setMessage("Submitting data...");
    try {
      const { data } = await request.post(
        "/PurchaseOrder/createpurchaseorder",
        confirmedData
      );
      console.log(data);
      if (orderstate === 0){
        setMessage("Data submitted successfully.");
      }
      else {
        setMessage("Order has been updated successfully.");
      }
      setTimeout(() => {
        navigate("/dashboard/orders");
      }, 1500);
    } catch (e) {
      console.log(e);
      return setMessage("There was an error trying to submit your request.");
    }
  };

  const handleClick = (menu) => {
    switch (menu) {
      case "Submit Order":
        submitData();
        break;

      case "Close":
        navigate("/dashboard/orders");
        break;

      default:
        break;
    }
  };

  return (
    <main className="w-full min-h-full relative h-full px-3 md:px-5 py-1.5">
      <section>
        <MenuButtonsGroup
          heading= {orderstate === 0 ? "Purchase Order Entry" : "Update Purchase Order"}
          menus={purchaseOrderMenu}
          onMenuClick={handleClick}
        />
      </section>
      <div className="mt-3 w-full">
        <Form
          setSubmitData={setSubmitData}
          orderState={orderstate}
          formUpdateData={formUpdateData}
        />
      </div>
      <section className="mt-2">
        <div className="po-grid h-full mt-2">
          <div className="add-item-btns">
            <div className="add-item">
              <InputField
                data={data}
                count={count}
                setMessage={setMessage}
                setModalMessage={setModalMessage}
              />
              <MessageDiv message={currentmessage} />
            </div>
          </div>
          <Table
            data={data}
            count={count}
            setMessage={setMessage}
            setModalMessage={setModalMessage}
          />
        </div>
      </section>
      <div id="confirm-modal" className="po-modal">
        <div className="po-modal-content">
          <div className="po-modal-header"></div>
          <div className="po-modal-body">
            <p>{modalmessage}</p>
          </div>
          <div className="po-modal-footer">
            <button id="confirm-yes" className="po-modal-btn">
              Yes
            </button>
            <button id="confirm-no" className="po-modal-btn">
              No
            </button>
          </div>
        </div>
      </div>
      <Statusbar heading="Purchase Order Entry" company="iBusiness" />
    </main>
  );
};

// End of function
