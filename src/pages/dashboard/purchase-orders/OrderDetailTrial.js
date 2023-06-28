// OrderDetailTrial.jsx
import React, { useEffect, useState } from "react";
import GridItemDetails from "../../../components/dashboard/GridDetailComponents/GridItemDetails";
import OnboardingService from "../../../axios/onboardingRequest";
import { poDetailsActionsSource, updateMenuSource } from "../../../data/menu";
import onboardingRequest from "../../../axios/onboardingRequest";

const OrderDetailTrial = ({ id, modalActive, togglemodalActive }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getSingleBooking = async () => {
      const url = "/test2/" + id;
      const response = await OnboardingService.get(url);
      setData(response);
    };
    getSingleBooking();
  }, [id]);

  const handleClick = (menu) => {
    switch (menu) {
      case "Edit":
        break;
      case "Delete":
        break;
      case "Close":
        togglemodalActive(!modalActive);
        break;
      case "Help":
        console.log("Help was clicked");
        break;

      default:
        break;
    }
  };

  const handleCustomClick = (action) => {
    switch (action) {
      case "Approve":
        const response = onboardingRequest.post(
          `https://localhost:5001/api/test2/approvepurchaseorder?orderid=${id}`
        );
        console.log(response.data);
        break;

      default:
        break;
    }
  };

  const moreInfo = {
    "Created by": "James Karanja",
    "Created at": "Monday, 22nd July 2023",
    "Last updated by": "0354Hrs",
    "Last updated at": "Not approved",
  };

  return (
    <GridItemDetails
      data={data}
      heading={"Order details"}
      title={`Order number: ${data.orderNumber}`}
      menus={updateMenuSource}
      handleCustomClick={handleCustomClick}
      customAction={poDetailsActionsSource}
      moreInfo={moreInfo}
      company={"ARBS Customer Portal"}
      onMenuClick={handleClick}
    />
  );
};

export default OrderDetailTrial;
