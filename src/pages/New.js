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
    <main className="w-full container  bg-white md:w-2/3 mx-auto overflow-y-scroll md:overflow-visible md:rounded-lg  md:h-[500px] h-screen relative  md:p-0">
      <section className="sticky inset-x-0 top-0 z-20 bg-light w-full md:rounded-t-lg  overflow-hidden">
        <MdOutlineClose
          className="text-lg hover:text-xl text-formHeadingColor opacity-60 absolute right-4 top-2 cursor-pointer"
          onClick={handleClose}
        />
        <article className="text-formHeadingColor pt-1 bg-formHeading">
          <div className="flex w-full items-center px-2">
            <div>
              <TbBrandBooking className="text-2xl opacity-80" />
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
            <form className="flex w-full mt-1 py-4 md:py-3 md:px-5 rounded-sm  flex-wrap justify-between gap-2 lg:gap-4">
              {inputs.map((formInput) => {
                if (formInput.inputType === "select") {
                  return (
                    <div
                      key={formInput.id}
                      className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[47%]"
                    >
                      <label
                        className="text-sm font-normal text-gray-600"
                        htmlFor={formInput.name}
                      >
                        {formInput.label}:<sup className=" text-red-600">*</sup>
                      </label>
                      <select
                        className="w-full md:w-1/2 py-1  border border-menu rounded-[4px] pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
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
                        className="text-sm font-normal text-gray-600"
                        htmlFor={formInput.name}
                      >
                        {formInput.label}:<sup className=" text-red-600">*</sup>
                      </label>
                      <input
                        className="border border-menu rounded-[4px] pl-1 w-full md:w-1/2 py-1  outline-none "
                        type={formInput.type}
                        id={formInput.name}
                        name={formInput.name}
                        value={
                          statusMode === "EditBooking"
                            ? editInput[formInput.value]
                            : formInput[formInput.value]
                        }
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

export default New;
