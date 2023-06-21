import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataTable from "../../components/dashboard/DataTable";
import { homeMenuSource } from "../../data/menu";
import Portal from "../../components/dashboard/Portal";
import New from "../../components/dashboard/New";
import { bookingColumns } from "../../data/PurchaseOrderData";
import { bookingFilterValues } from "../../helpers/datatableSource";
import ConfirmationPopupComponent from "../../components/dashboard/ConfirmationPopupComponent";
import OnboardingService from "../../axios/onboardingRequest";
import CategoryComponent from "../../components/dashboard/CategoryComponent";
import { useNavigate } from "react-router";

const today = new Date().toISOString().slice(0, 10);

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [singleBooking, setSingleBooking] = useState({});
  const [onRowDblClickBookingId, setRowDblClickBookingId] = useState(null);
  const [onRowClickItem, setRowClickItem] = useState(null);
  // eslint-disable-next-line
  const [fromDate, setFromDate] = useState(today);
  // eslint-disable-next-line
  const [toDate, setToDate] = useState(today);
  const [date, setDate] = useState("");
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setRowDblClickBookingId(null);
    setSingleBooking({});
    setStatusMode("");
    setOpen(false);
  };

  const startEdit = ({ data }) => {
    if (data) {
      setRowDblClickBookingId(data.bookingId);
    } else {
      setRowDblClickBookingId(null);
    }
  };

  useEffect(() => {
    try {
      const getData = async () => {
        setLoading(true);
        // const response = date
        //   ? await webService.Request.getByDate(date.startdate, date.enddate)
        //   : await webService.Request.get();
        const url = "/test";
        const response = await OnboardingService.get(url);
        setLoading(false);
        setBookings(response);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  useEffect(() => {
    const getSingleBooking = async () => {
      // const response = await webService.Request.getById(onRowDblClickBookingId);
      const url = "/test/" + onRowDblClickBookingId;
      const response = await OnboardingService.get(url);
      setSingleBooking(response);
      navigate(`/dashboard/bookings/${response?.bookingId}`, {
        state: { data: response },
      });
      // setStatusMode("EditMode");
      setOpen((isOpen) => !isOpen);
    };
    if (onRowDblClickBookingId) getSingleBooking();
  }, [onRowDblClickBookingId]);

  const openConfirmationPopup = async (rowItem) => {
    if (rowItem === null) {
      toast.warning("Please select a booking to delete");
    } else {
      setStatusMode("DeleteMode");
      setOpen((isOpen) => !isOpen);
    }
  };

  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        fromDate === null && toDate && date === ""
          ? setDate({ startdate: fromDate, enddate: toDate })
          : setDate({ startdate: fromDate, enddate: toDate });
        break;
      case "New":
        setStatusMode("CreateMode");
        setOpen((isOpen) => !isOpen);
        break;
      case "Delete":
        openConfirmationPopup(onRowClickItem);
        break;
      case "Close":
        console.log("Close was clicked");
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
      <section>
        <CategoryComponent
          menus={homeMenuSource}
          heading={"Booking List"}
          company={"ARBS Customer Portal"}
          onMenuClick={handleClick}
        >
          <DataTable
            data={bookings}
            columns={bookingColumns}
            keyExpr="bookingId"
            startEdit={(e) => startEdit(e)}
            //loading={loading}
            setRowClickItem={setRowClickItem}
            openConfirmationPopup={openConfirmationPopup}
            filterValues={bookingFilterValues}
          />
        </CategoryComponent>
      </section>

      {statusMode === "CreateMode" ? (
        <Portal isOpen={isOpen} setOpen={setOpen}>
          <New
            bookings={bookings}
            singleBooking={singleBooking}
            setBookings={setBookings}
            handleClose={handleClose}
            title={"Create New Booking"}
            heading={"Booking Item Management"}
            statusBarText={"New Booking Item"}
            statusMode={statusMode}
          />
        </Portal>
      ) : statusMode === "EditMode" ? (
        <Portal isOpen={isOpen} setOpen={setOpen}>
          <New
            bookings={bookings}
            singleBooking={singleBooking}
            setBookings={setBookings}
            handleClose={handleClose}
            title={"Update A Booking Item"}
            heading={"Booking Item Management"}
            statusBarText={"Updating Booking Item"}
            statusMode={statusMode}
          />
        </Portal>
      ) : (
        statusMode === "DeleteMode" && (
          <Portal isOpen={isOpen} setOpen={setOpen}>
            <ConfirmationPopupComponent
              item={onRowClickItem}
              bookings={bookings}
              setBookings={setBookings}
              handleClose={handleClose}
              title={"Delete A Booking Item"}
              statusBarText={"Delete Booking Item"}
              statusMode={statusMode}
            />
          </Portal>
        )
      )}
    </main>
  );
};

export default Booking;
