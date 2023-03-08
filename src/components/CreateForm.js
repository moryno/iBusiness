import { useState } from "react";
import "devextreme-react/text-area";
import Form, {
  GroupItem,
  Item,
  PatternRule,
  RequiredRule,
} from "devextreme-react/form";
import { MdOutlineClose } from "react-icons/md";
import { ImUndo2 } from "react-icons/im";
import { FcAddDatabase } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";

import services from "../helpers/formDataSource";
import request from "../helpers/requestMethod";

const countriesOptions = {
  items: services.getCountries(),
  searchEnabled: true,
  value: "",
};

const trainingVenuesOptions = {
  items: services.getCities(),
  searchEnabled: true,
  value: "",
};
const bookingTypeOptions = {
  items: services.getBookinType(),
  searchEnabled: true,
  value: "",
};
const retirementSchemeOptions = {
  items: services.getRetirementScheme(),
  searchEnabled: true,
  value: "",
};
const paymentModeOptions = {
  items: services.getPaymentMode(),
  searchEnabled: true,
  value: "",
};
const diabilityStatusOptions = {
  items: services.getDisabilityStatus(),
  searchEnabled: true,
  value: "",
};

const phoneOptions = { mask: "+254 (000) 000-000" };

const CreateForm = ({
  handleClose,
  bookings,
  singleBooking,
  setBookings,
  title,
  statusBarText,
  statusMode,
}) => {
  const [formInputs, setFormInputs] = useState({});
  console.log(singleBooking);
  const handleChange = (e) => {
    const name = e.dataField;
    const value = e.value;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const save = async () => {
    const formData = {
      user: {
        fullName: formInputs.fullName,
        idNumber: formInputs.idNumber,
        email: formInputs.email,
        telephone: formInputs.telephone,
        physicalAddress: formInputs.physicalAddress,
        employerName: formInputs.employerName,
        experience: formInputs.experience,
        position: formInputs.position,
        disabilityStatus: formInputs.disabilityStatus,
      },
      booking: {
        bookingType: formInputs.bookingType,
        retirementSchemeName: formInputs.retirementSchemeName,
        schemePosition: formInputs.schemePosition,
        originCountry: formInputs.originCountry,
        trainingVenue: formInputs.trainingVenue,
        courseDate: formInputs.courseDate,
        paymentMode: formInputs.paymentMode,
        additionalRequirements: formInputs.additionalRequirements,
        externalSchemeAdmin: formInputs.externalSchemeAdmin,
      },
    };
    if (statusMode === "CreateBooking") {
      try {
        const { data } = await request.post("/Booking/Create", formData);
        setBookings([data?.Booking, ...bookings]);
        handleClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await request.put("/Booking/UpdateBooking", formData);
        const newBooking = bookings.map((booking) => {
          if (booking.bookingId === data?.Booking.bookingId) {
            return data?.Booking;
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
    <main className="w-full container  bg-white  mx-auto overflow-y-scroll md:overflow-visible md:rounded-lg  md:h-[500px] h-screen relative  md:p-0">
      <section className="sticky inset-x-0 top-0 z-20 bg-light w-full md:rounded-t-lg  overflow-hidden">
        <MdOutlineClose
          className="text-lg hover:text-xl text-formHeadingColor opacity-60 absolute right-4 top-2 cursor-pointer"
          onClick={handleClose}
        />
        <article className="text-formHeadingColor pt-1 bg-formHeading">
          <div className="flex w-full items-center px-2">
            <div>
              <TbBrandBooking className="text-xl" />
            </div>
            <div className="w-full flex justify-center">
              <h2 className="text-xl flex font-medium opacity-90">{title}</h2>
            </div>
          </div>

          <p className="py-1 text-center  px-2 text-base  opacity-90">
            Enter all the details in the fields below then tap on save.
          </p>
        </article>
      </section>
      <section className="w-full border-r-2 border-l-2 border-col h-full px-2 md:p-0 md:h-[400px] overflow-y-auto">
        <article className="flex items-center justify-center">
          <div className="md:p-0  w-full md:px-0">
            <Form
              className="dx-form"
              onFieldDataChanged={handleChange}
              formData={singleBooking}
            >
              <GroupItem colCount={2}>
                <Item dataField="fullName">
                  <RequiredRule message="Full Name is required" />
                </Item>
                <Item dataField="email">
                  <RequiredRule message="Email is required" />
                  <PatternRule
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    message="The email is invalid"
                  />
                </Item>
                <Item dataField="telephone" editorOptions={phoneOptions}>
                  <RequiredRule message="Telephone is required" />
                </Item>
                <Item dataField="idNumber">
                  <RequiredRule message="ID is required" />
                </Item>
                <Item dataField="physicalAddress">
                  <RequiredRule message="Address is required" />
                </Item>
                <Item dataField="employerName">
                  <RequiredRule message="Employer Name is required" />
                </Item>
                <Item
                  dataField="originCountry"
                  editorType="dxSelectBox"
                  editorOptions={countriesOptions}
                >
                  <RequiredRule message="Country is required" />
                </Item>
                <Item dataField="experience (years)">
                  <RequiredRule message="Experience is required" />
                </Item>
                <Item dataField="position">
                  <RequiredRule message="Position is required" />
                </Item>
                <Item
                  dataField="bookingType"
                  editorType="dxSelectBox"
                  editorOptions={bookingTypeOptions}
                >
                  <RequiredRule message="Booking Type is required" />
                </Item>
                <Item
                  dataField="retirementSchemeName"
                  editorType="dxSelectBox"
                  editorOptions={retirementSchemeOptions}
                >
                  <RequiredRule message="Scheme Name is required" />
                </Item>
                <Item dataField="schemePosition">
                  <RequiredRule message="Scheme Position is required" />
                </Item>
                <Item
                  dataField="trainingVenue"
                  editorType="dxSelectBox"
                  editorOptions={trainingVenuesOptions}
                >
                  <RequiredRule message="Training venue is required" />
                </Item>
                <Item dataField="courseDate" editorType="dxDateBox">
                  <RequiredRule message="Course Date is required" />
                </Item>
                <Item
                  dataField="paymentMode"
                  editorType="dxSelectBox"
                  editorOptions={paymentModeOptions}
                >
                  <RequiredRule message="payment Mode is required" />
                </Item>
                <Item dataField="externalSchemeAdmin">
                  <RequiredRule message="External Scheme Admin is required" />
                </Item>
                <Item
                  dataField="disabilityStatus"
                  editorType="dxSelectBox"
                  editorOptions={diabilityStatusOptions}
                >
                  <RequiredRule message="Disability Status is required" />
                </Item>
                <Item dataField="additionalRequirements">
                  <RequiredRule message="Addition Requirement is required" />
                </Item>
              </GroupItem>
            </Form>
          </div>
        </article>
      </section>
      <section className="sticky border-t border-gray-100  inset-x-0 bottom-0 ">
        <article className="flex border-r-2 border-l-2 border-col bg-formTitle md:bg-white p-2 justify-center items-center gap-4">
          <button
            onClick={save}
            className="flex gap-1 border-none  hover:bg-gray-200 py-1 px-4 w-fit bg-white text-menuText items-center font-medium  cursor-pointer text-sm"
          >
            <FcAddDatabase fontSize={20} />
            {statusMode === "CreateBooking" ? "Save" : "Update"}
          </button>
          <button
            onClick={handleClose}
            className="flex gap-1 border-none  hover:bg-gray-200 py-1 px-4 w-fit bg-white text-menuText items-center font-medium  cursor-pointer text-sm"
          >
            <ImUndo2 fontSize={18} />
            Cancel
          </button>
        </article>
        <article className="flex bg-formTitle md:rounded-b-lg overflow-hidden text-formHeadingColor px:2 md:px-5 w-full">
          <p className="text-[14px] opacity-90">{statusBarText}</p>
        </article>
      </section>
    </main>
  );
};

export default CreateForm;
