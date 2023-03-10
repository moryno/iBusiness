import { useState } from "react";
import "devextreme-react/text-area";
import Form, {
  GroupItem,
  Item,
  PatternRule,
  RequiredRule,
  SimpleItem,
} from "devextreme-react/form";
import { MdOutlineClose } from "react-icons/md";
import { ImUndo2 } from "react-icons/im";
import { FcAddDatabase } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";
import services from "../helpers/formDataSource";
import request from "../helpers/requestMethod";
import Select from "react-select/dist/declarations/src/Select";

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

const phoneOptions = { mask: "+254 (000) 000-000", height: 30 };
const notesEditorOptions = { height: 50, maxLength: 200 };
const controlHeightOptions = { height: 30, maxLength: 200 };

const NewForm = () => {
  const [formInputs, setFormInputs] = useState({});

  const handleChange = (e) => {
    const name = e.dataField;
    const value = e.value;
    setFormInputs({ ...formInputs, [name]: value });
  };

  return (
    <main className="bg-white w-full h-screen md:h-fit overflow-y-scroll md:overflow-visible">
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="fullName">
          Full Name:<sup className=" text-red-600">*</sup>
        </label>
        <input
          className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
          type="text"
          id="fullName"
          name="fullName"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
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
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="email">
          Email:<sup className=" text-red-600">*</sup>
        </label>
        <input
          className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="telephone">
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
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="physicalAddress">
          Physical Address:<sup className=" text-red-600">*</sup>
        </label>
        <input
          className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
          type="text"
          id="physicalAddress"
          name="physicalAddress"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="employerName">
          Employer Name:<sup className=" text-red-600">*</sup>
        </label>
        <input
          className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
          type="text"
          id="employerName"
          name="employerName"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="experience">
          Experience (years):<sup className=" text-red-600">*</sup>
        </label>
        <input
          className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
          type="number"
          id="experience"
          name="experience"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
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
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[47%]">
        <label className="text-sm   text-gray-600" htmlFor="originCountry">
          Origin Country:<sup className=" text-red-600">*</sup>
        </label>

        <select
          className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
          id="originCountry"
          name="originCountry"
          onChange={handleChange}
        >
          <option className="rounded-none p-5 text-sm" value="Kenya">
            Kenya
          </option>
          <option className="rounded-none p-5 text-sm" value="Uganda">
            Uganda
          </option>
          <option className="rounded-none p-5 text-sm" value="Tanzania">
            Tanzania
          </option>
          <option className="rounded-none p-5 text-sm" value="Others">
            Others
          </option>
        </select>
      </div>
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[47%]">
        <label className="text-sm   text-gray-600" htmlFor="disabilityStatus">
          Disability Status:<sup className=" text-red-600">*</sup>
        </label>
        <select
          className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
          id="disabilityStatus"
          name="disabilityStatus"
          onChange={handleChange}
        >
          <option className="rounded-none p-5 text-sm" value="Disabled">
            Disabled
          </option>
          <option className="rounded-none p-5 text-sm" value="Not Disabled">
            Not Disabled
          </option>
        </select>
      </div>
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[47%]">
        <label className="text-sm   text-gray-600" htmlFor="bookingType">
          Booking Type:<sup className=" text-red-600">*</sup>
        </label>
        <select
          className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
          id="bookingType"
          name="bookingType"
          onChange={handleChange}
        >
          <option className="rounded-none p-5 text-sm" value="First Time">
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
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[47%]">
        <label
          className="text-sm   text-gray-600"
          htmlFor="retirementSchemeName"
        >
          Retirement Scheme Name:<sup className=" text-red-600">*</sup>
        </label>
        <select
          className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
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
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="schemePosition">
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
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[47%]">
        <label className="text-sm   text-gray-600" htmlFor="trainingVenue">
          Training Venue:<sup className=" text-red-600">*</sup>
        </label>
        <select
          className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
          id="trainingVenue"
          name="trainingVenue"
          onChange={handleChange}
        >
          <option className="rounded-none p-5 text-sm" value="INHOUSE">
            INHOUSE
          </option>
          <option className="rounded-none p-5 text-sm" value="Kisumu">
            Kisumu
          </option>
          <option className="rounded-none p-5 text-sm" value="Nairobi">
            Nairobi
          </option>
          <option className="rounded-none p-5 text-sm" value="Mombasa">
            Mombasa
          </option>
        </select>
      </div>
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="courseDate">
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
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[47%]">
        <label className="text-sm   text-gray-600" htmlFor="paymentMode">
          Payment Mode:<sup className=" text-red-600">*</sup>
        </label>
        <select
          className="w-full md:w-1/2  rounded-[3px] border border-gray-300 pl-1 outline-none placeholder:text-sm outline-blue text-gray-500"
          id="paymentMode"
          name="paymentMode"
          onChange={handleChange}
        >
          <option className="rounded-none p-5 text-sm" value="Cheque">
            Cheque
          </option>
          <option className="rounded-none p-5 text-sm" value="Cash">
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
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="externalSchemeAdmin">
          External Scheme Admin:<sup className=" text-red-600">*</sup>
        </label>
        <input
          className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
          type="text"
          id="externalSchemeAdmin"
          name="externalSchemeAdmin"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]">
        <label className="text-sm text-gray-600" htmlFor="externalSchemeAdmin">
          Additional Requirements:<sup className=" text-red-600">*</sup>
        </label>
        <textarea
          className="rounded-[3px] border border-gray-300 pl-1 w-full md:w-1/2 outline-none "
          type="text"
          id="additionalRequirements"
          name="additionalRequirements"
          onChange={handleChange}
        ></textarea>
      </div>
    </main>
  );
};

export default NewForm;
