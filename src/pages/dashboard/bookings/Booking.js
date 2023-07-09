import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { homeMenuSource } from "../../../data/menu";
import Portal from "../../../components/dashboard/Portal";
import New from "../../../components/dashboard/New";
import { bookingColumns } from "../../../data/datagridColumns";
import { bookingFilterValues } from "../../../helpers/datatableSource";
import ConfirmationPopupComponent from "../../../components/dashboard/ConfirmationPopupComponent";
import OnboardingService from "../../../axios/onboardingRequest";
import CategoryComponent from "../../../components/dashboard/CategoryComponent";
import Constant from "../../../utils/constant";
import FromToDateComponent from "../../../components/dashboard/FromToDateComponent";
import DataTable from "../../../components/dashboard/DataGrids/DataTable";
import Statusbar from "../../../components/dashboard/Statusbar";
import MenusGroupComponent from "../../../components/dashboard/Menus/MenusGroupComponent";

import { getBookings, getFreshBookings } from "../../../redux/api/bookingCall";
import {
  bookingHeadingFooter,
  deleteTitle,
  editFormHeadingFooter,
  newFormHeadingFooter,
} from "../../../data/headingFooterTitle";

const Booking = () => {
  const dispatch = useDispatch();
  const [singleRecord, setSingleRecord] = useState({});
  const [onEditRecordId, setEditRecordId] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);

  const bookings = useSelector((state) => state.booking.bookings);

  const route = Constant.ROUTE.BOOKING;

  useEffect(() => {
    if (!bookings || bookings.length < 1) {
      getBookings(dispatch);
    } else {
      getFreshBookings(dispatch);
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    const getSingleRecord = async () => {
      const url = "/test/" + onEditRecordId;
      const response = await OnboardingService.get(url);
      setSingleRecord(response);
      setStatusMode("EditMode");
      setOpen((isOpen) => !isOpen);
    };
    if (onEditRecordId) getSingleRecord();
  }, [onEditRecordId]);

  const startEdit = useCallback(({ key }) => {
    if (key) {
      setEditRecordId(key);
    } else {
      setEditRecordId(null);
    }
  }, []);

  const selectRowItem = useCallback(({ key }) => {
    if (key) {
      setSelectedRecordId(key);
    }
  }, []);

  const handleClose = () => {
    setEditRecordId(null);
    setSingleRecord({});
    setStatusMode("");
    setOpen(false);
  };

  const openConfirmationPopup = useCallback(async (rowItem) => {
    if (rowItem === null) {
      toast.warning(
        "You must select one or more records before you can perform this action."
      );
    } else {
      setStatusMode("DeleteMode");
      setOpen((isOpen) => !isOpen);
    }
  }, []);

  const handleDelete = async () => {
    console.log("delted");
  };

  const handleClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Find":
          // fromDate === null && toDate && date === ""
          //   ? setDate({ startdate: fromDate, enddate: toDate })
          //   : setDate({ startdate: fromDate, enddate: toDate });
          break;
        case "New":
          setStatusMode("CreateMode");
          setOpen((isOpen) => !isOpen);
          break;
        case "Delete":
          openConfirmationPopup(selectedRecordId);
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
    },
    [selectedRecordId, openConfirmationPopup]
  );

  return (
    <main className="w-full min-h-full relative px-3 md:px-5 py-1.5">
      <CategoryComponent>
        <MenusGroupComponent
          menus={homeMenuSource}
          heading={bookingHeadingFooter.heading}
          onMenuClick={handleClick}
        />
        <FromToDateComponent />
        <DataTable
          data={bookings}
          route={route}
          keyExpr={"bookingId"}
          columns={bookingColumns}
          startEdit={startEdit}
          selectRowItem={selectRowItem}
          openConfirmationPopup={openConfirmationPopup}
          filterValues={bookingFilterValues}
        />
        <Statusbar
          footer={bookingHeadingFooter.footer}
          company={bookingHeadingFooter.company}
        />
      </CategoryComponent>

      {statusMode === "CreateMode" ? (
        <Portal isOpen={isOpen} setOpen={setOpen}>
          <New
            bookings={bookings}
            singleRecord={singleRecord}
            handleClose={handleClose}
            title={newFormHeadingFooter.title}
            heading={newFormHeadingFooter.heading}
            statusBarText={newFormHeadingFooter.footer}
            statusMode={statusMode}
          />
        </Portal>
      ) : statusMode === "EditMode" ? (
        <Portal isOpen={isOpen} setOpen={setOpen}>
          <New
            singleRecord={singleRecord}
            setSingleRecord={setSingleRecord}
            bookings={bookings}
            handleClose={handleClose}
            title={editFormHeadingFooter.title}
            heading={editFormHeadingFooter.heading}
            statusBarText={editFormHeadingFooter.footer}
            statusMode={statusMode}
          />
        </Portal>
      ) : (
        statusMode === "DeleteMode" && (
          <Portal isOpen={isOpen} setOpen={setOpen}>
            <ConfirmationPopupComponent
              handleClose={handleClose}
              title={deleteTitle.heading}
              text={deleteTitle.text}
              statusBarText={deleteTitle.footer}
              statusMode={statusMode}
              onDelete={handleDelete}
            />
          </Portal>
        )
      )}
    </main>
  );
};

export default Booking;
