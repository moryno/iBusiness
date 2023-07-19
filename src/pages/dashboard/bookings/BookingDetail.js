import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailsPage from "../../../components/dashboard/Shared/DetailsComponents/DetailsPage";
import OnboardingService from "../../../ClientServices/onboardingRequest";
import {
  userGroupActionsSource,
  updateMenuSource,
} from "../../../data/dashboard-page/menu";
import Portal from "../../../components/modals/Portal";
import New from "../../../components/dashboard/Shared/New";
import {
  bookingDetailTitle,
  editFormHeadingFooter,
} from "../../../data/headingFooterTitle";
import GridItemContent from "../../../components/dashboard/Shared/DetailsComponents/GridItemContent";

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
        navigate(-1);
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
    <main className="w-full min-h-full relative">
      <DetailsPage
        data={data}
        heading={bookingDetailTitle.heading}
        title={`${bookingDetailTitle.title}: ${data?.bookingId}`}
        footer={bookingDetailTitle.footer}
        menus={updateMenuSource}
        customAction={userGroupActionsSource}
        company={bookingDetailTitle.company}
        onMenuClick={handleClick}
        DetailComponent={GridItemContent}
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
