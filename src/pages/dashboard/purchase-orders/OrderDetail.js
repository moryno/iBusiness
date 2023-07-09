import React, { useEffect, useState } from "react";
import GridItemDetails from "../../../components/dashboard/GridDetailComponents/GridItemDetails";
import OnboardingService from "../../../axios/onboardingRequest";
import { useNavigate, useParams } from "react-router-dom";
import { customActionsSource, updateMenuSource } from "../../../data/menu";
import { orderDetailTitle } from "../../../data/headingFooterTitle";

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
        navigate("/dashboard/orders");
        break;
      case "Help":
        console.log("Help was clicked");
        break;

      default:
        break;
    }
  };

  return (
    <main className="w-full min-h-full relative  px-3 md:px-5 py-1.5">
      <GridItemDetails
        data={data}
        heading={orderDetailTitle.heading}
        footer={orderDetailTitle.footer}
        title={`${orderDetailTitle.title} ${data?.orderNumber}`}
        menus={updateMenuSource}
        customAction={customActionsSource}
        company={orderDetailTitle.company}
        onMenuClick={handleClick}
      />
    </main>
  );
};

export default OrderDetail;
