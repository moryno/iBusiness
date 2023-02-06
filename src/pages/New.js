import axios from "axios";
import { createPortal } from "react-dom";
import React, { useState } from "react";

import { Link } from "react-router-dom";

const New = ({ showPortal, onClose }) => {
  const [formInputs, setFormInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const save = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/bookings",
        formInputs
      );
      setFormInputs({});
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!showPortal) return;

  return createPortal(
    <main className="w-full overflow-scroll  md:h-screen md:w-screen fixed top-0 bg-neutral-900 left-0 bg-opacity-50 flex items-center justify-center z-40 ">
      <section className=" flex items-center justify-center">
        <div className="py-5 md:m-5 md:p-5 md:w-[80%] h-[80%] rounded-md bg-white shadow-2xl">
          <form className="flex w-full  p-4 md:p-8 rounded-md flex-wrap justify-between gap-2">
            <div className="flex flex-col gap-1 md:gap-0 md:flex-row justify-between w-full md:w-[45%]">
              <label htmlFor="bookingType">
                Booking Type:<sup className=" text-red-600">*</sup>
              </label>
              <select
                className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                id="bookingType"
                name="bookingType"
                onChange={handleChange}
              >
                <option className="rounded-none p-5" value="First Time">
                  First Time
                </option>
                <option className="rounded-none p-5" value="Retake">
                  Retake
                </option>
                <option className="rounded-none p-5" value="Resit">
                  Resit
                </option>
              </select>
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="retirementSchemeName">
                Retirement Scheme Name:
                <sup className=" text-red-600">*</sup>
              </label>
              <select
                className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                id="retirementSchemeName"
                name="retirementSchemeName"
                onChange={handleChange}
              >
                <option
                  className=" rounded-none p-5"
                  value="A I C KIJABE MEDICAL"
                >
                  A I C KIJABE MEDICAL CENTERE STAFF PENSION SCHEME-476
                </option>
                <option
                  className=" rounded-none p-5"
                  value="A I C KIJABE PRINTING"
                >
                  A I C KIJABE PRINTING PRESS STAFF RETIREMENT
                </option>
                <option
                  className=" rounded-none p-5"
                  value="AIC LITENI CATTAGE"
                >
                  AIC LITENI CATTAGE STAFF PENSION
                </option>
              </select>
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="fullName">
                Full Names:<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="text"
                id="fullName"
                name="fullName"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="schemePosition">
                Scheme Position:<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="text"
                id="schemePosition"
                name="schemePosition"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="idNumber">
                ID Number:<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="text"
                id="idNumber"
                name="idNumber"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="email">
                Email:<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="telephone">
                Telephone:<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="text"
                id="telephone"
                name="telephone"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="physicalAddress">
                Physical Address:<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="text"
                id="physicalAddress"
                name="physicalAddress"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="employerName">
                Employer Names:<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="text"
                id="email"
                name="employerName"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="originCountry">
                Origin Country:<sup className=" text-red-600">*</sup>
              </label>
              <select
                className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                id="originCountry"
                name="originCountry"
                onChange={handleChange}
              >
                <option className=" rounded-none p-5" value="Kenya">
                  Kenya
                </option>
                <option className=" rounded-none p-5" value="Tanzania">
                  Tanzania
                </option>
                <option className=" rounded-none p-5" value="Uganda">
                  Uganda
                </option>
                <option className=" rounded-none p-5" value="Others">
                  Others
                </option>
              </select>
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="trainingVenue">
                Training Venue:<sup className=" text-red-600">*</sup>
              </label>
              <select
                className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                id="trainingVenue"
                name="trainingVenue"
                onChange={handleChange}
              >
                <option className=" rounded-none p-5" value="INHOUSE">
                  INHOUSE
                </option>
                <option className=" rounded-none p-5" value="Kisumu">
                  Kisumu
                </option>
                <option className=" rounded-none p-5" value="Nairobi">
                  Nairobi
                </option>
                <option className=" rounded-none p-5" value="Mombasa">
                  Mombasa
                </option>
                <option className=" rounded-none p-5" value="Naivasha">
                  Naivasha
                </option>
              </select>
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="courseDate">
                Couse Date:<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="date"
                id="courseDate"
                name="courseDate"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="experience">
                Experience (years):<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="number"
                id="experience"
                name="experience"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="position">
                Position:<sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="text"
                id="position"
                name="position"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="paymentMode">
                Payment Mode:<sup className=" text-red-600">*</sup>
              </label>
              <select
                className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                id="paymentMode"
                name="paymentMode"
                onChange={handleChange}
              >
                <option className=" rounded-none p-5" value="Cheque">
                  Cheque
                </option>
                <option className=" rounded-none p-5" value="Cash">
                  Cash
                </option>
                <option
                  className=" rounded-none p-5"
                  value="Electronic Funds Transfer"
                >
                  Electronic Funds Transfer
                </option>
              </select>
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="additionalRequirements">
                Additional Requirements:
                <sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="text"
                id="additionalRequirements"
                name="additionalRequirements"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="externalSchemeAdmin">
                External Scheme Admin:
                <sup className=" text-red-600">*</sup>
              </label>
              <input
                className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                type="text"
                id="externalSchemeAdmin"
                name="externalSchemeAdmin"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
              <label htmlFor="disabilityStatus">
                Disability Status:<sup className=" text-red-600">*</sup>
              </label>
              <select
                className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                id="disabilityStatus"
                name="disabilityStatus"
                onChange={handleChange}
              >
                <option className=" rounded-none p-5" value="Disabled">
                  Disabled
                </option>
                <option className=" rounded-none p-5" value="Not Disabled">
                  Not Disabled
                </option>
              </select>
            </div>
          </form>
          <div className="flex gap-2 flex-col md:flex-row md:items-center items-start justify-between w-full  mt-2">
            <div className="flex items-center justify-between md:justify-end w-full md:gap-8">
              <button
                className="bg-blue text-white font-medium cursor-pointer py-2 px-8 w-fit rounded-md"
                onClick={save}
              >
                Save
              </button>
              <button
                onClick={onClose}
                className=" bg-orang text-white font-medium cursor-pointer py-2 px-3 w-fit rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>,
    document.getElementById("modal")
  );
};

export default New;
