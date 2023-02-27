import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ImUndo2 } from "react-icons/im";
import { FcAddDatabase } from "react-icons/fc";

import request from "../helpers/requestMethod";
import { bookingFormInputs } from "../helpers/formSource";

const New = ({ handleClose, bookings, setBookings }) => {
  const [formInput, setFormInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInput, [name]: value });
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
              {bookingFormInputs.map((formInput) => {
                if (formInput.inputType === "select") {
                  return (
                    <div
                      key={formInput.id}
                      className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[47%]"
                    >
                      <label
                        className="text-sm font-medium text-gray-600"
                        htmlFor={formInput.name}
                      >
                        {formInput.label}:<sup className=" text-red-600">*</sup>
                      </label>
                      <select
                        className="w-full md:w-1/2  border border-menu rounded-md pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
                        id={formInput.name}
                        name={formInput.name}
                        onChange={handleChange}
                      >
                        {formInput.options.map((option, index) => (
                          <option
                            key={index}
                            className="rounded-none p-5 text-sm"
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={formInput.id}
                      className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]"
                    >
                      <label
                        className="text-sm font-medium text-gray-600"
                        htmlFor={formInput.name}
                      >
                        {formInput.label}:<sup className=" text-red-600">*</sup>
                      </label>
                      <input
                        className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
                        type={formInput.type}
                        id={formInput.name}
                        name={formInput.name}
                        onChange={handleChange}
                      />
                    </div>
                  );
                }
              })}
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
