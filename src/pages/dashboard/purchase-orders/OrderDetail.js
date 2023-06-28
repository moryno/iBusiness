import React, { useEffect, useState } from "react";
import GridItemDetails from "../../../components/dashboard/GridDetailComponents/GridItemDetails";
import OnboardingService from "../../../axios/onboardingRequest";
import { useNavigate, useParams } from "react-router-dom";
import { poDetailsActionsSource, updateMenuSource } from "../../../data/menu";
import onboardingRequest from "../../../axios/onboardingRequest";

const OrderDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();


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
        navigate(-1);
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
        const response = onboardingRequest.post(`https://localhost:5001/api/test2/approvepurchaseorder?orderid=${id}`);
        console.log(response.data)
        break;

      default:
        break;
    }
  };


  return (
    <main className="w-full min-h-full relative px-3 md:px-5 py-1.5">
      {data && (
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
      )}
    </main>
  );
};

export default OrderDetail;


const moreInfo = {
  "Created by" : "James Karanja",
  "Date created" : "Monday, 22nd July 2023",
  "Time": "0354Hrs",
  "Status" : "Not approved"
}