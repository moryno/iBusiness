import React from "react";

import { Link } from "react-router-dom";

const New = () => {
  return (
    <main className="w-full h-screen md:min-h-screen md:bg-section p-2 md:px-5 py-1">
      <section className="">
        <article className="md:shadow-xl shadow-md p-2 md:p-5 flex items-center bg-bgxLight">
          <div className="flex gap-2 flex-col md:flex-row md:items-center items-start justify-between w-full  mt-2">
            <h1 className="md:text-2xl text-xl w-full font-semibold">
              Add a Booking
            </h1>
            <div className="flex items-center justify-between md:justify-end w-full md:gap-8">
              <button className=" bg-orang text-white font-medium cursor-pointer py-2 px-3 w-fit rounded-md">
                <Link to="/">Cancel Save</Link>
              </button>
              <button className=" bg-blue text-white font-medium cursor-pointer py-2 px-8 w-fit rounded-md">
                Save
              </button>
            </div>
          </div>
        </article>
        <article>
          <div className="py-5 md:m-5 md:p-5">
            <form className="flex w-full bg-white shadow-lg p-4 md:p-8 rounded-md flex-wrap justify-between gap-2">
              <div className="flex flex-col gap-1 md:gap-0 md:flex-row justify-between w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="bookingType"
                >
                  Booking Type:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                  id="bookingType"
                >
                  <option className=" rounded-none p-5">First Time</option>
                  <option className=" rounded-none p-5">Retake</option>
                  <option className=" rounded-none p-5">Resit</option>
                </select>
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="retirementSchemeName"
                >
                  Retirement Scheme Name:
                  <sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                  id="retirementSchemeName"
                >
                  <option className=" rounded-none p-5">
                    A I C KIJABE MEDICAL CENTERE STAFF PENSION SCHEME-476
                  </option>
                  <option className=" rounded-none p-5">
                    A I C KIJABE MEDICAL CENTERE STAFF PENSION SCHEME-476
                  </option>
                  <option className=" rounded-none p-5">
                    A I C KIJABE MEDICAL CENTERE STAFF PENSION SCHEME-476
                  </option>
                  <option className=" rounded-none p-5">
                    A I C KIJABE MEDICAL CENTERE STAFF PENSION SCHEME-476
                  </option>
                  <option className=" rounded-none p-5">
                    A I C KIJABE MEDICAL CENTERE STAFF PENSION SCHEME-476
                  </option>
                </select>
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="fullName"
                >
                  Full Names:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="fullName"
                  name="fullName"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="schemePosition"
                >
                  Scheme Position:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="schemePosition"
                  name="schemePosition"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="idNumber"
                >
                  ID Number:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="idNumber"
                  name="fullName"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label className="font-semibold  text-gray-600" htmlFor="email">
                  Email:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="telephone"
                >
                  Telephone:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="telephone"
                  name="telephone"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="physicalAddress"
                >
                  Physical Address:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="physicalAddress"
                  name="physicalAddress"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="employerName"
                >
                  Employer Names:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="email"
                  name="employerName"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="originCountry"
                >
                  Origin Country:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                  id="originCountry"
                >
                  <option className=" rounded-none p-5">Kenya</option>
                  <option className=" rounded-none p-5">Tanzania</option>
                  <option className=" rounded-none p-5">Uganda</option>
                  <option className=" rounded-none p-5">Others</option>
                </select>
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="trainingVenue"
                >
                  Training Venue:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                  id="trainingVenue"
                >
                  <option className=" rounded-none p-5">INHOUSE</option>
                  <option className=" rounded-none p-5">Kisumu</option>
                  <option className=" rounded-none p-5">Nairobi</option>
                  <option className=" rounded-none p-5">Mombasa</option>
                  <option className=" rounded-none p-5">Naivasha</option>
                </select>
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="courseDate"
                >
                  Couse Date:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="courseDate"
                  name="courseDate"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="experience"
                >
                  Experience (years):<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="number"
                  id="experience"
                  name="experience"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="position"
                >
                  Position:<sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="position"
                  name="position"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="paymentMode"
                >
                  Payment Mode:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                  id="paymentMode"
                >
                  <option className=" rounded-none p-5">Cheque</option>
                  <option className=" rounded-none p-5">Cash</option>
                  <option className=" rounded-none p-5">
                    Electronic Funds Transfer
                  </option>
                </select>
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="additionalRequirements"
                >
                  Additional Requirements:
                  <sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="additionalRequirements"
                  name="additionalRequirements"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="externalSchemeAdmin"
                >
                  External Scheme Admin:
                  <sup className=" text-red-600">*</sup>
                </label>
                <input
                  className="border border-gray-300 p-1 w-full md:w-1/2 outline-none rounded-sm"
                  type="text"
                  id="externalSchemeAdmin"
                  name="externalSchemeAdmin"
                />
              </div>
              <div className="flex justify-between flex-col gap-1 md:gap-0 md:flex-row w-full md:w-[45%]">
                <label
                  className="font-semibold  text-gray-600"
                  htmlFor="disabilityStatus"
                >
                  Disability Status:<sup className=" text-red-600">*</sup>
                </label>
                <select
                  className="w-full md:w-1/2 p-1 border border-gray-300 outline-1 outline-blue text-gray-500"
                  id="disabilityStatus"
                >
                  <option className=" rounded-none p-5">Disabled</option>
                  <option className=" rounded-none p-5">Not Disabled</option>
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
