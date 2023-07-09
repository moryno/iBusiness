import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GridItemDetails from "../../../components/dashboard/GridDetailComponents/GridItemDetails";
import OnboardingService from "../../../axios/onboardingRequest";
import { customActionsSource, updateMenuSource } from "../../../data/menu";
import Portal from "../../../components/dashboard/Portal";
import New from "../../../components/dashboard/New";
import {
  bookingDetailTitle,
  editFormHeadingFooter,
} from "../../../data/headingFooterTitle";

const BookingDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  // Todo
  useEffect(() => {
    const getSingleBooking = async () => {
      const url = "/test/" + id;
      const response = await OnboardingService.get(url);
      setData(response);
    };
    getSingleBooking();
  }, [id]);

  const handleClick = (menu) => {
    switch (menu) {
      case "Edit":
        setStatusMode("EditMode");
        setOpen((isOpen) => !isOpen);
        break;
      case "Delete":
        break;
      case "Close":
        navigate("/dashboard/bookings");
        break;
      case "Help":
        console.log("Help was clicked");
        break;

      default:
        break;
    }
  };

  const handleClose = () => {
    setStatusMode("");
    setOpen(false);
  };

  return (
    <main className="w-full min-h-full relative  px-3 md:px-5 py-1.5">
      <GridItemDetails
        data={data}
        heading={bookingDetailTitle.heading}
        title={`${bookingDetailTitle.title}: ${data?.bookingId}`}
        footer={bookingDetailTitle.footer}
        menus={updateMenuSource}
        customAction={customActionsSource}
        company={bookingDetailTitle.company}
        onMenuClick={handleClick}
      />

      {statusMode === "EditMode" && (
        <Portal isOpen={isOpen} setOpen={setOpen}>
          <New
            singleBooking={data}
            setSingleBooking={setData}
            handleClose={handleClose}
            title={editFormHeadingFooter.title}
            heading={editFormHeadingFooter.heading}
            statusBarText={editFormHeadingFooter.footer}
            statusMode={statusMode}
          />
        </Portal>
      )}
    </main>
  );
};

export default BookingDetail;
