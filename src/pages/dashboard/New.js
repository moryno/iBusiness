import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { ImUndo2 } from "react-icons/im";
import { FcAddDatabase } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";
import { TextBox } from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";
import DateBox from "devextreme-react/date-box";
import NumberBox from "devextreme-react/number-box";
import Validator, {
  RequiredRule,
  PatternRule,
  EmailRule,
} from "devextreme-react/validator";

import services from "../../helpers/formDataSource";
import webService from "../../utils/webService";
import LoadingIndicator from "../../components/features/LoadingIndicator";

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
  // Define state to store the change in the input field
  // Code starts here
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState(
    statusMode === "EditBooking" ? singleBooking.user?.fullName : ""
  );
  const [idNumber, setIdNumber] = useState(
    statusMode === "EditBooking" ? singleBooking.user?.idNumber : ""
  );
  const [email, setEmail] = useState(
    statusMode === "EditBooking" ? singleBooking.user?.email : ""
  );
  const [telephone, setTelephone] = useState(
    statusMode === "EditBooking" ? singleBooking.user?.telephone : ""
  );
  const [physicalAddress, setPhysicalAddress] = useState(
    statusMode === "EditBooking" ? singleBooking.user?.physicalAddress : ""
  );
  const [employerName, setEmployerName] = useState(
    statusMode === "EditBooking" ? singleBooking.user?.employerName : ""
  );
  const [position, setPosition] = useState(
    statusMode === "EditBooking" ? singleBooking.user?.position : ""
  );
  const [schemePosition, setSchemePosition] = useState(
    statusMode === "EditBooking" ? singleBooking.booking?.schemePosition : ""
  );
  const [additionalRequirements, setAdditionalRequirements] = useState(
    statusMode === "EditBooking"
      ? singleBooking.booking?.additionalRequirements
      : ""
  );
  const [externalSchemeAdmin, setExternalSchemeAdmin] = useState(
    statusMode === "EditBooking"
      ? singleBooking.booking?.externalSchemeAdmin
      : ""
  );

  const [experience, setExperience] = useState(
    statusMode === "EditBooking" ? singleBooking.user?.experience : 0
  );
  const [selectedCountry, setSelectedCountry] = useState(
    statusMode === "EditBooking" ? singleBooking.user?.originCountry : "Kenya"
  );
  const [selectedStatus, setSelectedStatus] = useState(
    statusMode === "EditBooking"
      ? singleBooking.user?.disabilityStatus
      : "Not Disabled"
  );
  const [schemeOptions, setSchemeOptions] = useState(
    statusMode === "EditBooking"
      ? singleBooking.booking?.retirementSchemeName
      : "A I C KIJABE PRINTING"
  );
  const [bookingType, setBookingType] = useState(
    statusMode === "EditBooking"
      ? singleBooking.booking?.bookingType
      : "First Time"
  );
  const [trainingVenue, setTrainingVenue] = useState(
    statusMode === "EditBooking"
      ? singleBooking.booking?.trainingVenue
      : "INHOUSE"
  );
  const [courseDate, setCourseDate] = useState(
    statusMode === "EditBooking" ? singleBooking.booking?.courseDate : today
  );
  const [paymentMode, setPaymentMode] = useState(
    statusMode === "EditBooking" ? singleBooking.booking?.paymentMode : "Cheque"
  );
  // Code ends here

  // Get our current user using redux to update booking when creating or updating
  const currentUser = useSelector((state) => state.user?.currentUser?.user);

  // A function to save the booking details to the backend then populate the datagrid
  const save = async () => {
    setLoading(true);
    // Create Booking information
    const formData = {
      user: {
        userID: currentUser?.userID,
        fullName,
        idNumber,
        email,
        telephone,
        physicalAddress,
        originCountry: selectedCountry,
        employerName,
        experience,
        position,
        disabilityStatus: selectedStatus,
      },
      booking: {
        bookingType,
        retirementSchemeName: schemeOptions,
        schemePosition,
        trainingVenue,
        courseDate,
        paymentMode,
        additionalRequirements,
        externalSchemeAdmin,
      },
    };

    // Update Booking information
    const editData = {
      user: {
        userID: singleBooking?.user?.userID,
        fullName,
        idNumber,
        email,
        telephone,
        physicalAddress,
        employerName,
        experience,
        position,
        disabilityStatus: selectedStatus,
      },
      booking: {
        bookingId: singleBooking?.booking?.bookingId,
        bookingType,
        retirementSchemeName: schemeOptions,
        schemePosition,
        originCountry: selectedCountry,
        trainingVenue,
        courseDate,
        paymentMode,
        additionalRequirements,
        externalSchemeAdmin,
      },
    };

    // Check to save depending on the current mode
    if (statusMode === "CreateBooking") {
      try {
        // perform form submission on creating new booking
        const response = await webService.Request.create(formData);
        // Append the new booking to the top of the datagrid
        setBookings([response?.Booking?.booking, ...bookings]);
        setLoading(false);
        handleClose();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      try {
        // perform form submission on updating existing booking
        const response = await webService.Request.update(editData);

        // Append the updated booking to the top of the datagrid
        const newBooking = bookings.map((booking) => {
          if (booking.bookingId === response?.Booking.bookingId) {
            return response?.Booking;
          }
          return booking;
        });
        setBookings(newBooking);
        handleClose();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <main className="bg-white w-full md:w-[80%] xl:w-[70%] xxl:w-[60%] xxxl-[50%]  mx-auto h-screen md:h-fit items-stretch overflow-y-scroll md:overflow-visible">
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
        <article className="h-full px-2 md:border md: overflow-y-auto">
          <div>
            <form className="flex w-full mt-1 py-4 md:py-3  items-stretch rounded-sm flex-wrap justify-between gap-2">
              <section className="flex flex-col md:flex-row w-full gap-2">
                <article className="w-full flex flex-wrap box-border justify-between  gap-2">
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                    <label className="text-xs text-gray-600" htmlFor="fullName">
                      Full Name:<sup className=" text-red-600">*</sup>
                    </label>

                    <TextBox
                      type="text"
                      id="fullName"
                      name="fullName"
                      onValueChanged={(e) => setFullName(e.value)}
                      value={fullName}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                    >
                      <Validator>
                        <RequiredRule message="Name is required" />
                        <PatternRule
                          message="Do not use digits in the Name"
                          pattern={/^[^0-9]+$/}
                        />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-4/12">
                    <label className="text-xs text-gray-600" htmlFor="idNumber">
                      ID Number:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="idNumber"
                      name="idNumber"
                      onValueChanged={(e) => setIdNumber(e.value)}
                      value={idNumber}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                    >
                      <Validator>
                        <RequiredRule message="ID is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                    <label className="text-xs text-gray-600" htmlFor="email">
                      Email:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="email"
                      name="email"
                      onValueChanged={(e) => setEmail(e.value)}
                      value={email}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Email is required" />
                        <EmailRule message="Email is invalid" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3  md:flex-row w-full md:w-4/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="telephone"
                    >
                      Telephone:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="telephone"
                      name="telephone"
                      onValueChanged={(e) => setTelephone(e.value)}
                      value={telephone}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Telephone is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="employerName"
                    >
                      Empl Name:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="employerName"
                      name="employerName"
                      onValueChanged={(e) => setEmployerName(e.value)}
                      value={employerName}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Employer Name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-4/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="experience"
                    >
                      Experience:<sup className=" text-red-600">*</sup>
                    </label>
                    <NumberBox
                      id="experience"
                      name="experience"
                      onValueChanged={(e) => setExperience(e.value)}
                      value={experience}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Experience is required" />
                      </Validator>
                    </NumberBox>
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
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-4/12">
                    <label className="text-xs text-gray-600" htmlFor="position">
                      Position:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="position"
                      name="position"
                      onValueChanged={(e) => setPosition(e.value)}
                      value={position}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border h-7  pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Position is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-7/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="physicalAddress"
                    >
                      Address:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="physicalAddress"
                      name="physicalAddress"
                      onValueChanged={(e) => setPhysicalAddress(e.value)}
                      value={physicalAddress}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border h-7 pl-1 w-full md:w-[70%] lg:w-[80%]  outline-none "
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Address is required" />
                      </Validator>
                    </TextBox>
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
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setSelectedStatus(e.value)}
                      value={selectedStatus}
                      className=" text-center border pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%]"
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
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setSchemeOptions(e.value)}
                      value={schemeOptions}
                      className=" border pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    />
                  </div>
                </article>
              </section>
              <section className="w-full flex flex-col gap-2">
                <article className="w-full flex flex-wrap lg:w-[80%] box-border justify-between  gap-2">
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[48%]">
                    <label
                      className="text-xs  text-gray-600"
                      htmlFor="bookingType"
                    >
                      Booking Type:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={bookingTypeOptions}
                      searchEnabled={true}
                      name="bookingType"
                      placeholder="Select a Scheme Name"
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setBookingType(e.value)}
                      value={bookingType}
                      className=" border pl-1 w-full md:w-[70%]  outline-none"
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[48%]">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="schemePosition"
                    >
                      Sch Position:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="schemePosition"
                      name="schemePosition"
                      onValueChanged={(e) => setSchemePosition(e.value)}
                      value={schemePosition}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" h-7 border pl-1 w-full md:w-[70%]  outline-none"
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Scheme Position is required" />
                      </Validator>
                    </TextBox>
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
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setTrainingVenue(e.value)}
                      value={trainingVenue}
                      className=" border pl-1 w-full md:w-[70%]  outline-none"
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
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setCourseDate(e.value)}
                      value={courseDate}
                      className=" border pl-1 w-full md:w-[70%]  outline-none"
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
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setPaymentMode(e.value)}
                      value={paymentMode}
                      className=" border  pl-1 w-full md:w-[70%]  outline-none"
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
                    <TextBox
                      type="text"
                      id="externalSchemeAdmin"
                      name="externalSchemeAdmin"
                      onValueChanged={(e) => setExternalSchemeAdmin(e.value)}
                      value={externalSchemeAdmin}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border h-7 pl-1 w-full md:w-[70%]  outline-none"
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Scheme admin is required" />
                      </Validator>
                    </TextBox>
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
                    className=" border resize-none text-xs pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    type="text"
                    id="additionalRequirements"
                    name="additionalRequirements"
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    value={additionalRequirements}
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
            {loading ? (
              <LoadingIndicator />
            ) : statusMode === "CreateBooking" ? (
              "Save"
            ) : (
              "Update"
            )}
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

// Controls Options

const countriesOptions = services.getCountries();

const trainingVenuesOptions = services.getCities();

const bookingTypeOptions = services.getBookinType();

const retirementSchemeOptions = services.getRetirementScheme();

const paymentModeOptions = services.getPaymentMode();

const diabilityStatusOptions = services.getDisabilityStatus();

const today = new Date().toISOString().slice(0, 10);

export default New;
