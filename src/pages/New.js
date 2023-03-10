import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ImUndo2 } from "react-icons/im";
import { FcAddDatabase } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";

import request from "../helpers/requestMethod";

const New = ({
  inputs,
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
        experience: formInput.experience,
        position: formInput.position,
        disabilityStatus: formInput.disabilityStatus,
      },
      booking: {
        bookingType: formInput.bookingType,
        retirementSchemeName: formInput.retirementSchemeName,
        schemePosition: formInput.schemePosition,
        originCountry: formInput.originCountry,
        trainingVenue: formInput.trainingVenue,
        courseDate: formInput.courseDate,
        paymentMode: formInput.paymentMode,
        additionalRequirements: formInput.additionalRequirements,
        externalSchemeAdmin: formInput.externalSchemeAdmin,
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
        const { data } = await request.put("/Booking/UpdateBooking", editInput);
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
    <main className="bg-white w-full md:w-[60%] mx-auto h-screen md:h-fit  overflow-y-scroll md:overflow-visible">
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
          <div>
            <form className="flex w-full mt-1 py-4 md:py-3 items-stretch rounded-sm flex-wrap justify-between gap-2">
              <section className="flex flex-col md:flex-row w-full gap-2">
                <article className="w-full md:w-7/12 flex flex-col items gap-2">
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full">
                    <label className="text-sm text-gray-600" htmlFor="fullName">
                      Full Name:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-[80%] outline-none "
                      type="text"
                      id="fullName"
                      name="fullName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3  md:flex-row w-full">
                    <label className="text-sm text-gray-600" htmlFor="email">
                      Email:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-[80%] outline-none "
                      type="text"
                      id="email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3  md:flex-row w-full">
                    <label
                      className="text-sm text-gray-600"
                      htmlFor="employerName"
                    >
                      Employer Name:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-[70%] outline-none "
                      type="text"
                      id="employerName"
                      name="employerName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full">
                    <label
                      className="text-sm   text-gray-600"
                      htmlFor="originCountry"
                    >
                      Origin Country:<sup className=" text-red-600">*</sup>
                    </label>
                    <select
                      className="w-full md:w-[75%]  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                      id="originCountry"
                      name="originCountry"
                      onChange={handleChange}
                    >
                      <option
                        className="rounded-none p-5 text-sm"
                        value="Kenya"
                      >
                        Kenya
                      </option>
                      <option
                        className="rounded-none p-5 text-sm"
                        value="Uganda"
                      >
                        Uganda
                      </option>
                      <option
                        className="rounded-none p-5 text-sm"
                        value="Tanzania"
                      >
                        Tanzania
                      </option>
                      <option
                        className="rounded-none p-5 text-sm"
                        value="Others"
                      >
                        Others
                      </option>
                    </select>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full">
                    <label
                      className="text-sm text-gray-600"
                      htmlFor="physicalAddress"
                    >
                      Physical Address:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-[70%]  outline-none "
                      type="text"
                      id="physicalAddress"
                      name="physicalAddress"
                      onChange={handleChange}
                    />
                  </div>
                </article>
                <article className="w-full md:w-5/12 flex flex-col gap-2">
                  <div className="flex justify-between  box-border flex-col gap-3  md:flex-row w-full">
                    <label className="text-sm text-gray-600" htmlFor="idNumber">
                      ID Number:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
                      type="text"
                      id="idNumber"
                      name="idNumber"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-between box-border flex-col gap-3  md:flex-row w-full">
                    <label
                      className="text-sm text-gray-600"
                      htmlFor="telephone"
                    >
                      Telephone:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
                      type="text"
                      id="telephone"
                      name="telephone"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full">
                    <label
                      className="text-sm text-gray-600"
                      htmlFor="experience"
                    >
                      Experience:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
                      type="number"
                      id="experience"
                      name="experience"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full">
                    <label className="text-sm text-gray-600" htmlFor="position">
                      Position:<sup className=" text-red-600">*</sup>
                    </label>
                    <input
                      className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
                      type="text"
                      id="position"
                      name="position"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full">
                    <label
                      className="text-sm   text-gray-600"
                      htmlFor="disabilityStatus"
                    >
                      Disability Status:<sup className=" text-red-600">*</sup>
                    </label>
                    <select
                      className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                      id="disabilityStatus"
                      name="disabilityStatus"
                      onChange={handleChange}
                    >
                      <option
                        className="rounded-none p-5 text-sm"
                        value="Disabled"
                      >
                        Disabled
                      </option>
                      <option
                        className="rounded-none p-5 text-sm"
                        value="Not Disabled"
                      >
                        Not Disabled
                      </option>
                    </select>
                  </div>
                </article>
              </section>
              <section className="w-full flex flex-col  gap-2">
                <div className="flex flex-col gap-3  md:flex-row justify-between w-full">
                  <label
                    className="text-sm  text-gray-600"
                    htmlFor="retirementSchemeName"
                  >
                    Retirement Scheme Name:
                    <sup className=" text-red-600">*</sup>
                  </label>
                  <select
                    className="w-full md:w-[70%] rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                    id="retirementSchemeName"
                    name="retirementSchemeName"
                    onChange={handleChange}
                  >
                    <option
                      className="rounded-none p-5 text-sm"
                      value="A I C KIJABE MEDICA"
                    >
                      A I C KIJABE MEDICA
                    </option>
                    <option
                      className="rounded-none p-5 text-sm"
                      value="A I C KIJABE PRINTING"
                    >
                      A I C KIJABE PRINTING
                    </option>
                    <option
                      className="rounded-none p-5 text-sm"
                      value="AIC LITENI CATTAGE"
                    >
                      AIC LITENI CATTAGE
                    </option>
                  </select>
                </div>

                <article className="flex flex-col md:flex-row gap-2">
                  <article className="w-full md:w-1/2 flex flex-col gap-2">
                    <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full">
                      <label
                        className="text-sm   text-gray-600"
                        htmlFor="bookingType"
                      >
                        Booking Type:<sup className=" text-red-600">*</sup>
                      </label>
                      <select
                        className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                        id="bookingType"
                        name="bookingType"
                        onChange={handleChange}
                      >
                        <option
                          className="rounded-none p-5 text-sm"
                          value="First Time"
                        >
                          First Time
                        </option>
                        <option
                          className="rounded-none p-5 text-sm"
                          value="Retake"
                        >
                          Retake
                        </option>
                        <option
                          className="rounded-none p-5 text-sm"
                          value="Resit"
                        >
                          Resit
                        </option>
                      </select>
                    </div>
                    <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full">
                      <label
                        className="text-sm text-gray-600"
                        htmlFor="schemePosition"
                      >
                        Scheme Position:<sup className=" text-red-600">*</sup>
                      </label>
                      <input
                        className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
                        type="text"
                        id="schemePosition"
                        name="schemePosition"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full">
                      <label
                        className="text-sm   text-gray-600"
                        htmlFor="trainingVenue"
                      >
                        Training Venue:<sup className=" text-red-600">*</sup>
                      </label>
                      <select
                        className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                        id="trainingVenue"
                        name="trainingVenue"
                        onChange={handleChange}
                      >
                        <option
                          className="rounded-none p-5 text-sm"
                          value="INHOUSE"
                        >
                          INHOUSE
                        </option>
                        <option
                          className="rounded-none p-5 text-sm"
                          value="Kisumu"
                        >
                          Kisumu
                        </option>
                        <option
                          className="rounded-none p-5 text-sm"
                          value="Nairobi"
                        >
                          Nairobi
                        </option>
                        <option
                          className="rounded-none p-5 text-sm"
                          value="Mombasa"
                        >
                          Mombasa
                        </option>
                      </select>
                    </div>
                  </article>
                  <article className="w-full md:w-1/2 flex flex-col gap-2">
                    <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full">
                      <label
                        className="text-sm text-gray-600"
                        htmlFor="courseDate"
                      >
                        Course Date:<sup className=" text-red-600">*</sup>
                      </label>
                      <input
                        className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
                        type="text"
                        id="courseDate"
                        name="courseDate"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full">
                      <label
                        className="text-sm   text-gray-600"
                        htmlFor="paymentMode"
                      >
                        Payment Mode:<sup className=" text-red-600">*</sup>
                      </label>
                      <select
                        className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                        id="paymentMode"
                        name="paymentMode"
                        onChange={handleChange}
                      >
                        <option
                          className="rounded-none p-5 text-sm"
                          value="Cheque"
                        >
                          Cheque
                        </option>
                        <option
                          className="rounded-none p-5 text-sm"
                          value="Cash"
                        >
                          Cash
                        </option>
                        <option
                          className="rounded-none p-5 text-sm"
                          value="Electronic Funds Transfer"
                        >
                          Electronic Funds Transfer
                        </option>
                      </select>
                    </div>
                    <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full">
                      <label
                        className="text-sm text-gray-600"
                        htmlFor="externalSchemeAdmin"
                      >
                        External Scheme Admin:
                        <sup className=" text-red-600">*</sup>
                      </label>
                      <input
                        className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
                        type="text"
                        id="externalSchemeAdmin"
                        name="externalSchemeAdmin"
                        onChange={handleChange}
                      />
                    </div>
                  </article>
                </article>
                <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full">
                  <label
                    className="text-sm text-gray-600"
                    htmlFor="externalSchemeAdmin"
                  >
                    Additional Requirements:
                    <sup className=" text-red-600">*</sup>
                  </label>
                  <textarea
                    className="w-full md:w-[70%] resize-none col-span-2 rounded-[3px] border border-gray-300 pl-1  outline-none "
                    type="text"
                    id="additionalRequirements"
                    name="additionalRequirements"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </section>
            </form>
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

export default New;
