import { TextBox } from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";
import {
  onboardingQuestionsOptions,
  organizationCategoryOptions,
  servicePlanOptions,
} from "../../helpers/onBoardingSource";
import { useEffect, useState } from "react";
import { LoadIndicator } from "devextreme-react";
import services from "../../helpers/timezones";
import {
  handleCategory,
  handleServicePlan,
} from "../../utils/onBoardingServices";
import axios from "axios";

const Onboarding = () => {
  const [loading, setLoading] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationCategory, setOrganizationCategory] = useState(null);
  const [servicePlan, setServicePlan] = useState("");
  const [timezone, setTimezone] = useState("(UTC+03:00) Nairobi");
  const [onboardingQuestions, setOnboardingQuestions] = useState("");
  const [answer, setAnswer] = useState("");

  // Set the industry for the organisation according to what the user selects
  const handleCategorySelection = (category) => {
    const selectedCategory = handleCategory(category);
    setOrganizationCategory(selectedCategory);
  };
  // Set the service plan otpions according to what the user selects
  const handleServicePlanSelection = (servicePlan) => {
    const selectedService = handleServicePlan(servicePlan);
    setServicePlan(selectedService);
  };
  // Set the timezone according to what the user selects
  const handleTimeZone = (selectedTimeZone) => {
    const allTimezones = services.getAllTimezones();
    allTimezones.filter((timezone) => {
      if (timezone.text === selectedTimeZone) {
        setTimezone(timezone.value);
      }
    });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get("https://192.168.1.5/user-info");
      console.log(response);
    };
    getUserInfo();
  }, []);
  // Submit the tenant info to be processed and added to the database
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      organizationName,
      organizationCategory,
      timezone,
      onboardingQuestions,
      answer,
      servicePlan,
    };

    try {
      //TO DO: send a request to check if tenant exist and if not create on
      const { data } = await axios.post(
        "https://192.168.1.5:7041/api/SadUser",
        formData,
        { withCredentials: true }
      );
      console.log(data);
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
                <div className="flex justify-between box-border flex-col gap-1  w-full mb-2">
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
                <div className="flex justify-between box-border flex-col gap-1  w-full mb-2">
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
                    onValueChanged={(e) => handleCategorySelection(e.value)}
                    value={organizationCategory}
                    placeholder="Select Organization Category"
                    height={30}
                    style={{ fontSize: "12px" }}
                    className="border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  />
                </div>
                <div className="flex justify-between box-border flex-col gap-1  w-full mb-2">
                  <label
                    className="text-lg text-gray-800 font-medium"
                    htmlFor="question"
                  >
                    Please choose question category
                  </label>
                  <span className="text-xs">
                    Choose any security question that is suitable for you. You
                    can change this later.
                  </span>
                  <SelectBox
                    dataSource={onboardingQuestionsOptions}
                    searchEnabled={true}
                    onValueChanged={(e) => setOnboardingQuestions(e.value)}
                    value={onboardingQuestions}
                    placeholder="Select a Service Plan"
                    height={30}
                    style={{ fontSize: "12px" }}
                    className="border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  />
                </div>
                <div className="flex justify-between box-border flex-col gap-1  w-full mb-2">
                  <label
                    className="text-lg text-gray-800 font-medium"
                    htmlFor="organizationName"
                  >
                    What is your answer to the question you have selected?:
                  </label>
                  <span className="text-xs">
                    The answer should be familiar to you and would not be hard
                    to remember.
                  </span>
                  <TextBox
                    placeholder="Type here.."
                    onValueChanged={(e) => setAnswer(e.value)}
                    value={answer}
                    height={30}
                    style={{ fontSize: "12px" }}
                    className=" border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  ></TextBox>
                </div>
                <div className="flex justify-between box-border flex-col gap-1  w-full mb-2">
                  <label
                    className="text-lg text-gray-800 font-medium"
                    htmlFor="organizationCategory"
                  >
                    Please choose your time zone
                  </label>
                  <span className="text-xs">
                    Choose the timezone that you are curretly at
                  </span>
                  <SelectBox
                    dataSource={timezonesOptions}
                    searchEnabled={true}
                    onValueChanged={(e) => handleTimeZone(e.value)}
                    value={timezone}
                    placeholder="Select Organization Category"
                    height={30}
                    style={{ fontSize: "12px" }}
                    className="border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  />
                </div>
                <div className="flex justify-between box-border flex-col gap-1  w-full mb-2">
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
                    onValueChanged={(e) => handleServicePlanSelection(e.value)}
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

const timezonesOptions = services.getTimezoneText();

export default Onboarding;
