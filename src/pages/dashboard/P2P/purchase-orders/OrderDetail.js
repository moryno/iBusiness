import React, { useEffect, useState } from "react";
import DetailsPage from "../../../../components/dashboard/Shared/DetailsComponents/DetailsPage";
import OnboardingService from "../../../../ClientServices/onboardingRequest";
import { useNavigate, useParams } from "react-router-dom";
import {
  customActionsSource,
  updateMenuSource,
} from "../../../../data/dashboard-page/menu";
import { orderDetailTitle } from "../../../../data/headingFooterTitle";
import GridItemContent from "../../../../components/dashboard/Shared/DetailsComponents/GridItemContent";
import DetailsRightBar from "../../../../components/dashboard/Shared/DetailsComponents/DetailsRightBar";

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

  return (
    <main className="w-full min-h-full relative  px-3 md:px-5 py-1.5">
      <DetailsPage
        data={data}
        heading={orderDetailTitle.heading}
        footer={orderDetailTitle.footer}
        title={`${orderDetailTitle.title} ${data?.orderNumber}`}
        menus={updateMenuSource}
        customAction={customActionsSource}
        company={orderDetailTitle.company}
        onMenuClick={handleClick}
        DetailComponent={GridItemContent}
        CustomActionComponent={DetailsRightBar}
      />
    </main>
  );
};

export default OrderDetail;
