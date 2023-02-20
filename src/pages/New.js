import { Close } from "@material-ui/icons";
import { FcAddDatabase } from "react-icons/fc";
import { MdFreeCancellation } from "react-icons/md";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "../helpers/requestMethod";
import { useSelector } from "react-redux";

const New = () => {
  const [userInput, setUserInputs] = useState({});
  const [bookingInput, setBookingInputs] = useState({});

  const navigate = useNavigate();

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserInputs({ ...userInput, [name]: value });
  };

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingInputs({ ...bookingInput, [name]: value });
  };

  const save = async (event) => {
    event.preventDefault();
    const formData = {
      user: userInput,
      booking: bookingInput,
    };
    try {
      const { data } = await request.post("/Booking/Create", formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full h-screen md:h-full  px-3 md:px-5 py-1.5">
      <section className="w-full h-full">
        <article className="px-3 w-full flex items-center bg-bgxLight ">
          <div className="flex flex-col md:flex-row md:items-center items-start justify-between w-full">
            <h1 className="text-menu py-1 text-lg w-full font-semibold">
              Add a Booking
            </h1>
            <div className="flex justify-between md:justify-end items-center bg-bgxLight  w-full">
              <div
                onClick={save}
                className="flex gap-1 border-l border-l-gray-300 hover:bg-bgLight  px-2 text-menu items-center font-medium  cursor-pointer text-sm"
              >
                <FcAddDatabase fontSize={"18px"} />
                Save
              </div>
              <Link to="/">
                <div className="flex gap-1 border-l border-l-gray-300 hover:bg-bgLight  px-2 text-menu items-center font-medium  cursor-pointer text-sm">
                  <MdFreeCancellation fontSize={"18px"} />
                  Close
                </div>
              </Link>
            </div>
          </div>
        </article>
        <article className="flex items-center justify-center">
          <div className="py-5 md:m-5 w-full p-2 md:p-5">
            <div className="text-menu bg-bgxLight rounded-t-md py-1 px-2 font-medium ">
              Enter all the details in the fields below then click save.
            </div>
            <form className="flex w-full mt-1 py-4 md:py-8 rounded-sm flex-wrap justify-between gap-2">
              <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="bookingType"
                >
                  Booking Type:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-sm pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
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
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="retirementSchemeName"
                >
                  Retirement Scheme Name:
                  <sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-sm pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
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
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="fullName"
                >
                  Full Names:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="fullName"
                  name="fullName"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="schemePosition"
                >
                  Scheme Position:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="schemePosition"
                  name="schemePosition"
                  onChange={handleBookingChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="idNumber"
                >
                  ID Number:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="email"
                >
                  Email:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="telephone"
                >
                  Telephone:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="telephone"
                  name="telephone"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="physicalAddress"
                >
                  Physical Address:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="physicalAddress"
                  name="physicalAddress"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="employerName"
                >
                  Employer Names:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="email"
                  name="employerName"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="originCountry"
                >
                  Origin Country:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-sm pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
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
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="trainingVenue"
                >
                  Training Venue:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-sm pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
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
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="courseDate"
                >
                  Couse Date:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="date"
                  id="courseDate"
                  name="courseDate"
                  onChange={handleBookingChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="experience"
                >
                  Experience (years):<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="number"
                  id="experience"
                  name="experience"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="position"
                >
                  Position:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="position"
                  name="position"
                  onChange={handleUserChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="paymentMode"
                >
                  Payment Mode:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-sm pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
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
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="additionalRequirements"
                >
                  Additional Requirements:
                  <sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="additionalRequirements"
                  name="additionalRequirements"
                  onChange={handleBookingChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="externalSchemeAdmin"
                >
                  External Scheme Admin:
                  <sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-menu rounded-sm pl-1 w-full md:w-1/2 outline-none "
                  type="text"
                  id="externalSchemeAdmin"
                  name="externalSchemeAdmin"
                  onChange={handleBookingChange}
                />
              </div>
              <div className="flex justify-between flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="disabilityStatus"
                >
                  Disability Status:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2  border border-menu rounded-sm pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
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
    </main>
  );
};

export default New;
