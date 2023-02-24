import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ImUndo2 } from "react-icons/im";
import { FcAddDatabase } from "react-icons/fc";

import request from "../helpers/requestMethod";

const New = ({ handleClose, bookings, setBookings }) => {
  const [userInput, setUserInputs] = useState({});
  const [bookingInput, setBookingInputs] = useState({});

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserInputs({ ...userInput, [name]: value });
  };

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingInputs({ ...bookingInput, [name]: value });
  };

  const save = async () => {
    const formData = {
      user: userInput,
      booking: bookingInput,
    };
    console.log(formData);
    try {
      const { data } = await request.post("/Booking/Create", formData);
      setBookings([data?.Booking, ...bookings]);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full container bg-white md:w-2/3 mx-auto overflow-y-scroll md:overflow-visible rounded-md md:h-[500px] h-screen relative  md:p-0">
      <section className="sticky inset-x-0 top-0 z-20 bg-light w-full">
        <article className="flex  bg-formTitle text-formHeadingColor md:py-1 px-2 w-full justify-end">
          {/* <p className="text-xs">Add a booking</p> */}
          <button className="text-lg cursor-pointer">
            <MdOutlineClose onClick={handleClose} />
          </button>
        </article>
        <article className="text-formHeadingColor  bg-formHeading">
          <h2 className="text-lg text-center md:text-left py-1 px-2 font-semibold ">
            Create New Booking
          </h2>
          <p className="py-1 text-center md:text-left px-2 text-sm font-medium ">
            Enter all the details in the fields below then tap on save.
          </p>
        </article>
      </section>
      <section className="w-full h-full px-2 md:p-0 md:h-[400px] overflow-y-scroll">
        <article className="flex items-center justify-center">
          <div className=" md:p-0  w-full md:px-0">
            <form className="flex w-full mt-1 py-4 md:py-3 md:px-5 rounded-sm  flex-wrap justify-between gap-4">
              <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="bookingType"
                >
                  Booking Type:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-md pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                  id="bookingType"
                  name="bookingType"
                  onChange={handleBookingChange}
                >
                  <option
                    className="rounded-none p-5 text-sm"
                    value="First Time"
                  >
                    First Time
                  </option>
                  <option className="rounded-none p-5 text-sm" value="Retake">
                    Retake
                  </option>
                  <option className="rounded-none p-5 text-sm" value="Resit">
                    Resit
                  </option>
                </select>
              </div>

              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="retirementSchemeName"
                >
                  Retirement Scheme Name:
                  <sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-md pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                  id="retirementSchemeName"
                  name="retirementSchemeName"
                  onChange={handleBookingChange}
                >
                  <option
                    className=" rounded-none p-5 text-sm"
                    value="A I C KIJABE MEDICAL"
                  >
                    A I C KIJABE MEDICAL CENTERE STAFF PENSION SCHEME-476
                  </option>
                  <option
                    className=" rounded-none p-5 text-sm"
                    value="A I C KIJABE PRINTING"
                  >
                    A I C KIJABE PRINTING PRESS STAFF RETIREMENT
                  </option>
                  <option
                    className=" rounded-none p-5 text-sm"
                    value="AIC LITENI CATTAGE"
                  >
                    AIC LITENI CATTAGE STAFF PENSION
                  </option>
                </select>
              </div>

              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="fullName"
                >
                  Full Names:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="fullName"
                  name="fullName"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="schemePosition"
                >
                  Scheme Position:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="schemePosition"
                  name="schemePosition"
                  onChange={handleBookingChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="idNumber"
                >
                  ID Number:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="email"
                >
                  Email:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="telephone"
                >
                  Telephone:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="telephone"
                  name="telephone"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="physicalAddress"
                >
                  Physical Address:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="physicalAddress"
                  name="physicalAddress"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="employerName"
                >
                  Employer Names:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="email"
                  name="employerName"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="originCountry"
                >
                  Origin Country:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-md pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                  id="originCountry"
                  name="originCountry"
                  onChange={handleUserChange}
                >
                  <option className=" rounded-none p-5 text-sm" value="Kenya">
                    Kenya
                  </option>
                  <option
                    className=" rounded-none p-5 text-sm"
                    value="Tanzania"
                  >
                    Tanzania
                  </option>
                  <option className=" rounded-none p-5 text-sm" value="Uganda">
                    Uganda
                  </option>
                  <option className=" rounded-none p-5 text-sm" value="Others">
                    Others
                  </option>
                </select>
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="trainingVenue"
                >
                  Training Venue:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-md pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                  id="trainingVenue"
                  name="trainingVenue"
                  onChange={handleBookingChange}
                >
                  <option className=" rounded-none p-5 text-sm" value="INHOUSE">
                    INHOUSE
                  </option>
                  <option className=" rounded-none p-5 text-sm" value="Kisumu">
                    Kisumu
                  </option>
                  <option className=" rounded-none p-5 text-sm" value="Nairobi">
                    Nairobi
                  </option>
                  <option className=" rounded-none p-5 text-sm" value="Mombasa">
                    Mombasa
                  </option>
                  <option
                    className=" rounded-none p-5 text-sm"
                    value="Naivasha"
                  >
                    Naivasha
                  </option>
                </select>
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="courseDate"
                >
                  Couse Date:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="date"
                  id="courseDate"
                  name="courseDate"
                  onChange={handleBookingChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="experience"
                >
                  Experience (years):<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="number"
                  id="experience"
                  name="experience"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="position"
                >
                  Position:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="position"
                  name="position"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="paymentMode"
                >
                  Payment Mode:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-md pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                  id="paymentMode"
                  name="paymentMode"
                  onChange={handleBookingChange}
                >
                  <option className=" rounded-none p-5 text-sm" value="Cheque">
                    Cheque
                  </option>
                  <option className=" rounded-none p-5 text-sm" value="Cash">
                    Cash
                  </option>
                  <option
                    className=" rounded-none p-5 text-sm"
                    value="Electronic Funds Transfer"
                  >
                    Electronic Funds Transfer
                  </option>
                </select>
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="additionalRequirements"
                >
                  Additional Requirements:
                  <sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="additionalRequirements"
                  name="additionalRequirements"
                  onChange={handleBookingChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="externalSchemeAdmin"
                >
                  External Scheme Admin:
                  <sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="externalSchemeAdmin"
                  name="externalSchemeAdmin"
                  onChange={handleBookingChange}
                />
              </div>
              <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="disabilityStatus"
                >
                  Disability Status:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-md pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                  id="disabilityStatus"
                  name="disabilityStatus"
                  onChange={handleUserChange}
                >
                  <option
                    className=" rounded-none p-5 text-sm"
                    value="Disabled"
                  >
                    Disabled
                  </option>
                  <option
                    className=" rounded-none p-5 text-sm"
                    value="Not Disabled"
                  >
                    Not Disabled
                  </option>
                </select>
              </div>
            </form>
          </div>
        </article>
      </section>
      <section className="sticky  inset-x-0 bottom-0 ">
        <article className="flex bg-formTitle md:bg-white p-2 justify-center items-center gap-4">
          <button
            onClick={save}
            className="flex gap-1 border-none  hover:bg-gray-200 py-1.5 px-4 w-fit bg-white text-menuText items-center font-medium  cursor-pointer text-sm"
          >
            <FcAddDatabase fontSize={20} />
            Save
          </button>
          <button
            onClick={handleClose}
            className="flex gap-1 border-none  hover:bg-gray-200 py-1.5 px-4 w-fit bg-white text-menuText items-center font-medium  cursor-pointer text-sm"
          >
            <ImUndo2 fontSize={18} />
            Cancel
          </button>
        </article>
        <article className="flex bg-formTitle text-formHeadingColor px-5 w-full">
          <p className="text-xs">Add a booking</p>
        </article>
      </section>
    </main>
  );
};

export default New;
