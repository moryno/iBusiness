import React, { useState, useRef, useEffect } from "react";
import "./PurchaseOrder.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { purchaseOrderMenu } from "../../../../data/dashboard-page/menu";
import DataSource from "devextreme/data/data_source";
import Form from "../../../../components/dashboard/P2P/PurchaseOrder/Form";
import { InputField } from "../../../../components/dashboard/P2P/PurchaseOrder/InputField";
import { Table } from "../../../../components/dashboard/Shared/DataGrids/Table";
import { MessageDiv } from "../../../../components/dashboard/P2P/PurchaseOrder/Message";
import { useNavigate, useParams } from "react-router-dom";
import Statusbar from "../../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import { useSelector } from "react-redux";
import OnboardingService from "../../../../ClientServices/onboardingRequest";
import DesktopMenus from "../../../../components/dashboard/Shared/Menus/DesktopMenus";
import { toast } from "react-toastify";
import { SpinnerIcon } from "../../../../components/frontend/UI/SpinnerIcon";

export const PurchaseOrder = ({ orderstate }) => {
  const [currentmessage, setMessage] = useState();
  const [order, setOrder] = useState(0);
  const [updateData, setUpdateData] = useState({
    formData: "",
    tableData: "",
  });
  const [initialRender, setInitialRender] = useState(true);
  const currentUser = useSelector((state) => state.user?.currentUser?.user);
  const [formUpdateData, setFormUpdateData] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data] = useState(new DataSource());
  const count = useRef(1);
  const [modalmessage, setModalMessage] = useState(
    "Are you sure you want to clear the table?"
  );
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (orderstate === 1) {
      const getUpdateData = async () => {
        try {
          const response = await OnboardingService.get(
            `/PO/fetchOrder?orderNumber=${id}`
          );
          response.tableData.map((item) => {
            data.store().insert(item);
            return data.reload();
          });
          setFormUpdateData(response.formInfo);
          setUpdateData({ ...updateData, formData: response.formInfo });
          setOrder(response.formInfo.orderNumber);
        } catch (e) {
          console.log(e);
          setMessage("An error occured. Please refresh the page.");
        }
        setLoading(false)
        setMessage("");
      };

      getUpdateData();
    } else {
      async function getData() {
        try {
          setMessage("Checking for pending orders...");
          const response = await OnboardingService.get(
            `/PO/getorderitems?userid=${currentUser?.email}`
          );
          data.store().clear();
          response.orderItems.map((item) => {
            return data.store().insert(item);
          });
          if (response.orderInformation.length === 0) {
            setInitialRender(false);
          } else {
            setFormUpdateData(response.orderInformation[0]);
          }
          data.reload();
          setMessage("Order restored.");
          setInitialRender(false)
        } catch (e) {
          console.log(e);
          setMessage("Unable to fetch pending orders.");
        }
        setLoading(false)
      }
      getData();
    }
    

    const handleKeyUp = (e) => {
      if (e.code === "KeyS" && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        submitOrder();
      } else if (e.code === "Escape") {
        navigate(-1);
      }
    };

    document.addEventListener("keydown", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyUp);
    };
    // eslint-disable-next-line
  }, [orderstate]);

  const submitOrder = async () => {
    setLoading(true);
    try {
      if (orderstate === 0) {
        const dataToSubmit = {
          FormData: updateData.formData,
          TableData: data.store()._array,
        };
        await OnboardingService.post("/PO/createpurchaseorder", dataToSubmit);
        toast.success("Order submitted successfully.");
        setLoading(false);
      } else {
        const dataToUpdate = {
          FormData: updateData.formData,
          TableData: data.store()._array,
        };
        await OnboardingService.put("/PO/updateOrder", dataToUpdate);
        toast.success("Order has been updated successfully.");
        setLoading(false);
      }
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (e) {
      console.log(e);
      setLoading(false);
      return;
    }
  };

  const handleClick = (menu) => {
    switch (menu) {
      case "Submit Order":
        submitOrder();
        break;

      case "Close":
        navigate(-1);
        break;

      default:
        break;
    }
  };

  return (
    <main className="purchase-order-page w-full min-h-full relative h-full">
      <section>
        <DesktopMenus
          heading={
            id === undefined ? "Purchase Order Entry" : "Update Purchase Order"
          }
          menus={purchaseOrderMenu}
          onMenuClick={handleClick}
        />
      </section>
      <div className="mt-3 px-4 w-full">
        <Form
          orderState={orderstate}
          formUpdateData={formUpdateData}
          initialRender={initialRender}
          orderstate={orderstate}
          setInitialRender={setInitialRender}
          setLoading={setLoading}
          setUpdateData={setUpdateData}
          updateData={updateData}
          setMessage={setMessage}
        />
      </div>
      <section className="mt-2">
        <div className="po-grid h-full mt-2">
          <div className="add-item-btns">
            <div className="add-item px-3 md:px-5">
              <InputField
                data={data}
                count={count}
                order={order}
                setMessage={setMessage}
                orderstate={orderstate}
              />
              <MessageDiv message={currentmessage} />
            </div>
          </div>
          <Table
            data={data}
            count={count}
            setMessage={setMessage}
            setModalMessage={setModalMessage}
            order={order}
            updateData={updateData}
            setUpdateData={setUpdateData}
            orderstate={orderstate}
          />
        </div>
      </section>
      <div id="confirm-modal" className="po-modal">
        <div className="po-modal-content">
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
      {loading ? (
        <div className="absolute h-full w-full top-0 left-0 bg-slate-600 bg-opacity-20 flex justify-center items-center">
            <SpinnerIcon />
        </div>
      ) : <></>} 
    </main>
  );
};
