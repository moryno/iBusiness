import { TextBox } from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";
import {
  organizationCategoryOptions,
  servicePlanOptions,
} from "../../helpers/onBoardingSource";
import { useState } from "react";
import { LoadIndicator } from "devextreme-react";

const Onboarding = () => {
  const [loading, setLoading] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationCategory, setOrganizationCategory] = useState(null);
  const [tenantRoute, setTenantRoute] = useState("");
  const [servicePlan, setServicePlan] = useState("");

  const handleCategory = (category) => {
    switch (category) {
      case "Automotive, Mobility & Transportation":
        setOrganizationCategory(1);
        break;
      case "Energy & Sustainability":
        setOrganizationCategory(2);
        break;
      case "Finance Services":
        setOrganizationCategory(3);
        break;
      case "Healthcare & Life Sciences":
        setOrganizationCategory(4);
        break;
      case "Manufacturing & Supply Chain":
        setOrganizationCategory(5);
        break;
      case "Media & Communications":
        setOrganizationCategory(6);
        break;
      case "Public Sector":
        setOrganizationCategory(7);
        break;
      case "Retail & Consumer Goods":
        setOrganizationCategory(8);
        break;

      case "Software":
        setOrganizationCategory(9);
        break;

      default:
        setOrganizationCategory(9);
        break;
    }
  };

  const handleServicePlan = (servicePlan) => {
    switch (servicePlan) {
      case "Free (Free Forever)":
        setServicePlan(5);
        break;
      case "Basic (Ksh3,000, Free 7 Days Trial)":
        setServicePlan(6);
        break;
      case "Standard (Ksh10,000, Free 14 Days Trial)":
        setServicePlan(7);
        break;

      default:
        setServicePlan(7);
        break;
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      organizationName,
      organizationCategory,
      tenantRoute,
      servicePlan,
    };

    try {
      //TO DO: send a request to check if tenant exist and if not create on
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main>
      <section className="p-3 md:py-5 md:px-0">
        <section className="w-full md:w-[50%] mx-auto">
          <article className="mb-10">
            <h1 className="font-bold text-2xl md:text-3xl mb-1 text-headingBlue">
              Welcome to the onboarding process
            </h1>
            <p className="font-medium text-gray-700">
              Just a few steps to set you up
            </p>
          </article>
          <article>
            <form
              onSubmit={submitForm}
              className="flex flex-col md:items-start items-center"
            >
              <article className="flex flex-wrap">
                <div className="flex justify-between box-border flex-col gap-2  w-full mb-5">
                  <label
                    className="text-lg text-gray-800 font-medium"
                    htmlFor="organizationName"
                  >
                    What is your Organization's Name?:
                  </label>
                  <span className="text-xs">
                    The name should be the name of your business, brand or
                    organization. You can change this later.
                  </span>
                  <TextBox
                    placeholder="Type here.."
                    onValueChanged={(e) => setOrganizationName(e.value)}
                    value={organizationName}
                    height={30}
                    style={{ fontSize: "12px" }}
                    className=" border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  ></TextBox>
                </div>
                <div className="flex justify-between box-border flex-col gap-2  w-full mb-5">
                  <label
                    className="text-lg text-gray-800 font-medium"
                    htmlFor="organizationCategory"
                  >
                    In what industry is your organization?
                  </label>
                  <span className="text-xs">
                    Identifying your industry will help people find you in
                    search results. Choose the closest one - you can update it
                    later.
                  </span>
                  <SelectBox
                    dataSource={organizationCategoryOptions}
                    searchEnabled={true}
                    onValueChanged={(e) => handleCategory(e.value)}
                    value={organizationCategory}
                    placeholder="Select Organization Category"
                    height={30}
                    style={{ fontSize: "12px" }}
                    className="border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  />
                </div>
                <div className="flex justify-between box-border flex-col gap-2  w-full mb-5">
                  <label
                    className="text-lg text-gray-800 font-medium"
                    htmlFor="tenantRoute"
                  >
                    Please choose a name for your custom Tenant Route
                  </label>
                  <span className="text-xs">
                    Choose a unique route to use when accessing your tenant. You
                    can change this later.
                  </span>
                  <TextBox
                    placeholder="Type here.."
                    onValueChanged={(e) => setTenantRoute(e.value)}
                    value={tenantRoute}
                    height={30}
                    style={{ fontSize: "12px" }}
                    className=" border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  ></TextBox>
                </div>
                <div className="flex justify-between box-border flex-col gap-2  w-full mb-5">
                  <label
                    className="text-lg   text-gray-800 font-medium"
                    htmlFor="originCountry"
                  >
                    Create your Subscriber - Select a Plan
                  </label>
                  <span className="text-xs">
                    The name should be the name of your business, brand or
                    organization. You can change this later.
                  </span>
                  <SelectBox
                    dataSource={servicePlanOptions}
                    searchEnabled={true}
                    onValueChanged={(e) => handleServicePlan(e.value)}
                    value={servicePlan}
                    placeholder="Select a Service Plan"
                    height={30}
                    style={{ fontSize: "12px" }}
                    className="border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  />
                </div>
              </article>
              <article>
                <button className="flex border-none py-2 rounded-sm px-4 w-fit bg-buttonBlue text-white items-center font-semibold  cursor-pointer  text-xs">
                  {loading ? <LoadIndicator /> : "Submit"}
                </button>
              </article>
            </form>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Onboarding;
