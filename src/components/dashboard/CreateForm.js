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

import services from "../../helpers/formDataSource";
import request from "../../helpers/requestMethod";

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
const notesEditorOptions = { height: 50, maxLength: 200 };
const controlHeightOptions = { height: 30, maxLength: 200 };

const CreateForm = ({
  handleClose,
  bookings,
  singleBooking,
  setBookings,
  title,
  heading,
  statusBarText,
  statusMode,
}) => {
  const [formInputs, setFormInputs] = useState({});

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
    <main className="bg-white w-full h-screen md:h-fit overflow-y-scroll md:overflow-visible">
      <section className="sticky inset-x-0 top-0 z-50">
        <article className="bg-formHeading flex items-center justify-between">
          <div className="flex items-center py-1 px:2 md:px-5 w-full gap-1 text-formHeadingColor">
            <TbBrandBooking />
            <p className="text-[14px] opacity-90">{title}</p>
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
        <article className="text-formHeadingColor md:rounded-t-sm p-1 md:pt-5 md:pb-3 md:px-10 form-heading">
          <h2 className="text-xl flex justify-center md:justify-start font-medium opacity-90">
            {heading}
          </h2>
          <p className="text-base text-center md:text-left">
            Enter all the booking information in the fields below then tap on
            save.
          </p>
        </article>
        <article className="h-full px-2 md:border md:border-gray-300 overflow-y-auto">
          <div className="">
            <Form
              formData={singleBooking}
              className="dx-form"
              onFieldDataChanged={handleChange}
            >
              <GroupItem colCount={2}>
                <Item
                  dataField="fullName"
                  colSpan={2}
                  editorType="dxTextArea"
                  editorOptions={controlHeightOptions}
                >
                  <RequiredRule message="Full Name is required" />
                </Item>
                <Item
                  dataField="idNumber"
                  editorType="dxTextArea"
                  editorOptions={controlHeightOptions}
                >
                  <RequiredRule message="ID is required" />
                </Item>
                <Item
                  dataField="email"
                  editorType="dxTextArea"
                  editorOptions={controlHeightOptions}
                >
                  <RequiredRule message="Email is required" />
                  <PatternRule
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    message="The email is invalid"
                  />
                </Item>
                <Item
                  dataField="telephone"
                  editorType="dxTextArea"
                  editorOptions={phoneOptions}
                >
                  <RequiredRule message="Telephone is required" />
                </Item>
                <Item
                  dataField="employerName"
                  editorType="dxTextArea"
                  editorOptions={controlHeightOptions}
                >
                  <RequiredRule message="Employer Name is required" />
                </Item>
                <Item
                  dataField="physicalAddress"
                  editorType="dxTextArea"
                  editorOptions={controlHeightOptions}
                >
                  <RequiredRule message="Address is required" />
                </Item>

                <Item
                  dataField="originCountry"
                  editorType="dxSelectBox"
                  editorOptions={countriesOptions}
                >
                  <RequiredRule message="Country is required" />
                </Item>
                <Item dataField="experience (years)" editorType="dxNumberBox">
                  <RequiredRule message="Experience is required" />
                </Item>
                <Item
                  dataField="position"
                  editorType="dxTextArea"
                  editorOptions={controlHeightOptions}
                >
                  <RequiredRule message="Position is required" />
                </Item>
                <Item
                  dataField="disabilityStatus"
                  editorType="dxSelectBox"
                  editorOptions={diabilityStatusOptions}
                >
                  <RequiredRule message="Disability Status is required" />
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
                <Item
                  dataField="schemePosition"
                  editorType="dxTextArea"
                  editorOptions={controlHeightOptions}
                >
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

                <Item
                  dataField="externalSchemeAdmin"
                  editorType="dxTextArea"
                  editorOptions={controlHeightOptions}
                >
                  <RequiredRule message="External Scheme Admin is required" />
                </Item>
                <Item
                  dataField="additionalRequirements"
                  colSpan={2}
                  editorType="dxTextArea"
                  editorOptions={notesEditorOptions}
                >
                  <RequiredRule message="Addition Requirement is required" />
                </Item>
              </GroupItem>
            </Form>
          </div>
        </article>
      </section>
      <section className="sticky border-t border-gray-100  inset-x-0 bottom-0 ">
        <article className="flex  bg-formTitle md:bg-white p-2 justify-center items-center gap-4">
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
        <article className="flex bg-formTitle text-formHeadingColor py-1 px:2 md:px-5 w-full">
          <p className="text-[14px] opacity-90">{statusBarText}</p>
        </article>
      </section>
    </main>
  );
};

export default CreateForm;
