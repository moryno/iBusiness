import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ImUndo2 } from "react-icons/im";
import { FcAddDatabase } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";
import SelectBox from "devextreme-react/select-box";
import DateBox from "devextreme-react/date-box";
import NumberBox from "devextreme-react/number-box";
import request from "../helpers/requestMethod";
import services from "../helpers/formDataSource";

const New = ({
  handleClose,
  bookings,
  singleBooking,
  setBookings,
  title,
  heading,
  statusBarText,
  statusMode,
}) => {
  const [formInput, setFormInputs] = useState({});
  const [editInput, setEditInputs] = useState(singleBooking);
  const [experience, setExperience] = useState(
    statusMode === "EditBooking" ? editInput.user?.experience : 0
  );
  const [selectedCountry, setSelectedCountry] = useState(
    statusMode === "EditBooking" ? editInput.user?.originCountry : "Kenya"
  );
  const [selectedStatus, setSelectedStatus] = useState(
    statusMode === "EditBooking"
      ? editInput.user?.disabilityStatus
      : "Not Disabled"
  );
  const [schemeOptions, setSchemeOptions] = useState(
    statusMode === "EditBooking"
      ? editInput.booking?.retirementSchemeName
      : "A I C KIJABE PRINTING"
  );
  const [bookingType, setBookingType] = useState(
    statusMode === "EditBooking" ? editInput.booking?.bookingType : "First Time"
  );
  const [trainingVenue, setTrainingVenue] = useState(
    statusMode === "EditBooking" ? editInput.booking?.trainingVenue : "INHOUSE"
  );
  const [courseDate, setCourseDate] = useState(
    statusMode === "EditBooking" ? editInput.booking?.courseDate : today
  );
  const [paymentMode, setPaymentMode] = useState("Cheque");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (statusMode === "CreateBooking") {
      setFormInputs({ ...formInput, [name]: value });
    }
    setEditInputs({ ...editInput, [name]: value });
  };

  const save = async () => {
    const formData = {
      user: {
        fullName: formInput.fullName,
        idNumber: formInput.idNumber,
        email: formInput.email,
        telephone: formInput.telephone,
        physicalAddress: formInput.physicalAddress,
        employerName: formInput.employerName,
        experience,
        position: formInput.position,
        disabilityStatus: selectedStatus,
      },
      booking: {
        bookingType,
        retirementSchemeName: schemeOptions,
        schemePosition: formInput.schemePosition,
        originCountry: selectedCountry,
        trainingVenue,
        courseDate,
        paymentMode,
        additionalRequirements: formInput.additionalRequirements,
        externalSchemeAdmin: formInput.externalSchemeAdmin,
      },
    };

    const editData = {
      user: {
        fullName: editInput.user?.fullName,
        idNumber: editInput.user?.idNumber,
        email: editInput.user?.email,
        telephone: editInput.user?.telephone,
        physicalAddress: editInput.user?.physicalAddress,
        employerName: editInput.user?.employerName,
        experience,
        position: editInput.user?.position,
        disabilityStatus: selectedStatus,
      },
      booking: {
        bookingType,
        retirementSchemeName: schemeOptions,
        schemePosition: editInput.booking?.schemePosition,
        originCountry: selectedCountry,
        trainingVenue,
        courseDate,
        paymentMode,
        additionalRequirements: editInput.booking?.additionalRequirements,
        externalSchemeAdmin: editInput.booking?.externalSchemeAdmin,
      },
    };
    console.log(editData);
    if (statusMode === "CreateBooking") {
      try {
        const { data } = await request.post("/Booking/Create", formData);

        setBookings([data?.Booking?.booking, ...bookings]);
        handleClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await request.put("/Booking/UpdateBooking", editData);
        console.log(data);
        const newBooking = bookings.map((booking) => {
          if (booking.bookingId === data?.Booking.booking.bookingId) {
            return data?.Booking.booking;
          }
          return booking;
        });

        setBookings(newBooking);
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="bg-white w-full md:w-[70%] lg:w-[80%] xl:w-[70%] xxl:w-[60%]  mx-auto h-screen md:h-fit items-stretch overflow-y-scroll md:overflow-visible">
      <section className="sticky inset-x-0 top-0 z-50">
        <article className="bg-formHeading flex items-center justify-between">
          <div className="flex items-center py-1 px:2 md:px-5 w-full gap-1 text-formHeadingColor">
            <TbBrandBooking />
            <p className="text-xs opacity-90">{title}</p>
          </div>
          <div className="px:2 md:px-5">
            <MdOutlineClose
              onClick={handleClose}
              className="text-lg hover:text-xl text-formHeadingColor opacity-60 cursor-pointer"
            />
          </div>
        </article>
      </section>
      <section className="md:p-3">
        <article className="text-formHeadingColor md:rounded-t-sm p-1 md:py-2 md:px-10 form-heading">
          <h2 className="text-xl flex justify-center md:justify-start font-medium opacity-90">
            {heading}
          </h2>
          <p className="text-xs text-center md:text-left">
            Enter all the booking information in the fields below then tap on
            save.
          </p>
        </article>
        <article className="h-full px-2 md:border md:border-gray-300 overflow-y-auto">
          <div>
            <form className="flex w-full mt-1 py-4 md:py-3  items-stretch rounded-sm flex-wrap justify-between gap-2">
              <section className="flex flex-col md:flex-row w-full gap-2">
                <article className="w-full flex flex-wrap box-border justify-between  gap-2">
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                    <label className="text-xs text-gray-600" htmlFor="fullName">
                      Full Name:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border h-7 border-gray-300 text-xs pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                      type="text"
                      id="fullName"
                      name="fullName"
                      onChange={handleChange}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.user?.fullName
                          : formInput.fullName
                      }
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-4/12">
                    <label className="text-xs text-gray-600" htmlFor="idNumber">
                      ID Number:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border h-7 border-gray-300 text-xs pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                      type="text"
                      id="idNumber"
                      name="idNumber"
                      onChange={handleChange}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.user?.idNumber
                          : formInput.idNumber
                      }
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                    <label className="text-xs text-gray-600" htmlFor="email">
                      Email:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border h-7 border-gray-300 text-xs pl-1 w-full md:w-[70%] lg:w-[80%] outline-none "
                      type="text"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.user?.email
                          : formInput.email
                      }
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3  md:flex-row w-full md:w-4/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="telephone"
                    >
                      Telephone:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border h-7 border-gray-300 text-xs pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                      type="text"
                      id="telephone"
                      name="telephone"
                      onChange={handleChange}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.user?.telephone
                          : formInput.telephone
                      }
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="employerName"
                    >
                      Empl Name:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border h-7 border-gray-300 text-xs pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                      type="text"
                      id="employerName"
                      name="employerName"
                      onChange={handleChange}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.user?.employerName
                          : formInput.employerName
                      }
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-4/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="experience"
                    >
                      Experience:<sup className=" text-red-600">*</sup>
                    </label>
                    <NumberBox
                      className="rounded-[3px] border border-gray-300 text-xs pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                      height={28}
                      id="experience"
                      name="experience"
                      onValueChanged={(e) => setExperience(e.value)}
                      value={experience}
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-7/12">
                    <label
                      className="text-xs   text-gray-600"
                      htmlFor="originCountry"
                    >
                      Org Country:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={countriesOptions}
                      searchEnabled={true}
                      name="originCountry"
                      onValueChanged={(e) => setSelectedCountry(e.value)}
                      value={selectedCountry}
                      placeholder="Select a Country"
                      height={28}
                      className="rounded-[3px] border border-gray-300 text-xs pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-4/12">
                    <label className="text-xs text-gray-600" htmlFor="position">
                      Position:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 text-xs pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                      type="text"
                      id="position"
                      name="position"
                      onChange={handleChange}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.user?.position
                          : formInput.position
                      }
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-7/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="physicalAddress"
                    >
                      Address:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 text-xs pl-1 w-full md:w-[70%] lg:w-[80%]  outline-none "
                      type="text"
                      id="physicalAddress"
                      name="physicalAddress"
                      onChange={handleChange}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.user?.physicalAddress
                          : formInput.physicalAddress
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-4/12">
                    <label
                      className="text-xs   text-gray-600"
                      htmlFor="disabilityStatus"
                    >
                      Status:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={diabilityStatusOptions}
                      searchEnabled={true}
                      name="disabilityStatus"
                      placeholder="Select Status"
                      height={28}
                      onValueChanged={(e) => setSelectedStatus(e.value)}
                      value={selectedStatus}
                      className="rounded-[3px] text-center border border-gray-300 text-xs pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%]"
                    />
                  </div>
                  <div className="flex flex-col gap-3  md:flex-row justify-between w-full md:w-7/12">
                    <label
                      className="text-xs  text-gray-600"
                      htmlFor="retirementSchemeName"
                    >
                      Sch Name:
                      <sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={retirementSchemeOptions}
                      searchEnabled={true}
                      placeholder="Select an option"
                      height={28}
                      onValueChanged={(e) => setSchemeOptions(e.value)}
                      value={schemeOptions}
                      className="rounded-[3px] border border-gray-300 text-xs pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    />
                  </div>
                </article>
              </section>
              <section className="w-full flex flex-col gap-2">
                <article className="w-full flex flex-wrap lg:w-[80%] box-border justify-between  gap-2">
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[48%]">
                    <label
                      className="text-xs   text-gray-600"
                      htmlFor="bookingType"
                    >
                      Booking Type:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={bookingTypeOptions}
                      searchEnabled={true}
                      name="bookingType"
                      placeholder="Select a Scheme Name"
                      height={28}
                      onValueChanged={(e) => setBookingType(e.value)}
                      value={bookingType}
                      className="rounded-[3px] border border-gray-300 text-xs pl-1 w-full md:w-[70%]  outline-none"
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[48%]">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="schemePosition"
                    >
                      Sch Position:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] h-7 border border-gray-300 text-xs pl-1 w-full md:w-[70%]  outline-none"
                      type="text"
                      id="schemePosition"
                      name="schemePosition"
                      onChange={handleChange}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.booking?.schemePosition
                          : formInput.schemePosition
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[48%]">
                    <label
                      className="text-xs   text-gray-600"
                      htmlFor="trainingVenue"
                    >
                      Training Venue:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={trainingVenuesOptions}
                      searchEnabled={true}
                      name="trainingVenue"
                      placeholder="Select a Training Venue"
                      height={28}
                      onValueChanged={(e) => setTrainingVenue(e.value)}
                      value={trainingVenue}
                      className="rounded-[3px] border border-gray-300 text-xs pl-1 w-full md:w-[70%]  outline-none"
                    />
                  </div>

                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[48%]">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="courseDate"
                    >
                      Course Date:<sup className=" text-red-600">*</sup>
                    </label>

                    <DateBox
                      id="courseDate"
                      name="courseDate"
                      height={28}
                      onValueChanged={(e) => setCourseDate(e.value)}
                      value={courseDate}
                      className="rounded-[3px] border border-gray-300 text-xs pl-1 w-full md:w-[70%]  outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[48%]">
                    <label
                      className="text-xs   text-gray-600"
                      htmlFor="paymentMode"
                    >
                      Payment Mode:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={paymentModeOptions}
                      searchEnabled={true}
                      placeholder="Select a Payment Mode"
                      name="paymentMode"
                      height={28}
                      onValueChanged={(e) => setPaymentMode(e.value)}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.booking?.paymentMode
                          : paymentMode
                      }
                      className="rounded-[3px] border border-gray-300 text-xs pl-1 w-full md:w-[70%]  outline-none"
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[48%]">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="externalSchemeAdmin"
                    >
                      Scheme Admin:
                      <sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border h-7 border-gray-300 text-xs pl-1 w-full md:w-[70%]  outline-none"
                      type="text"
                      id="externalSchemeAdmin"
                      name="externalSchemeAdmin"
                      onChange={handleChange}
                      value={
                        statusMode === "EditBooking"
                          ? editInput.booking?.externalSchemeAdmin
                          : formInput.externalSchemeAdmin
                      }
                    />
                  </div>
                </article>
                <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                  <label
                    className="text-xs text-gray-600"
                    htmlFor="additionalRequirements"
                  >
                    Requirements:
                    <sup className=" text-red-600">*</sup>
                  </label>
                  <textarea
                    className="rounded-[3px] border border-gray-300  resize-none text-xs pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    type="text"
                    id="additionalRequirements"
                    name="additionalRequirements"
                    onChange={handleChange}
                    value={
                      statusMode === "EditBooking"
                        ? editInput.booking?.additionalRequirements
                        : formInput.additionalRequirements
                    }
                  ></textarea>
                </div>
              </section>
            </form>
          </div>
        </article>
      </section>
      <section className="sticky   inset-x-0 bottom-0 ">
        <article className="flex bg-white px-2 pb-1 justify-center items-center gap-4">
          <button
            onClick={save}
            className="flex gap-1 border-none  hover:bg-gray-200 py-1 px-4 w-fit bg-white text-menuText items-center font-medium  cursor-pointer text-xs"
          >
            <FcAddDatabase fontSize={20} />
            {statusMode === "CreateBooking" ? "Save" : "Update"}
          </button>
          <button
            onClick={handleClose}
            className="flex gap-1 border-none  hover:bg-gray-200 py-1 px-4 w-fit bg-white text-menuText items-center font-medium  cursor-pointer text-xs"
          >
            <ImUndo2 fontSize={18} />
            Cancel
          </button>
        </article>
        <article className="flex bg-formTitle text-formHeadingColor py-1 px:2 md:px-5 w-full">
          <p className="text-xs opacity-90">{statusBarText}</p>
        </article>
      </section>
    </main>
  );
};

// COntrols Options

const countriesOptions = services.getCountries();

const trainingVenuesOptions = services.getCities();

const bookingTypeOptions = services.getBookinType();

const retirementSchemeOptions = services.getRetirementScheme();

const paymentModeOptions = services.getPaymentMode();

const diabilityStatusOptions = services.getDisabilityStatus();

const today = new Date().toISOString().slice(0, 10);

export default New;
