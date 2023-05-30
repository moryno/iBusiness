import { useEffect, useState } from "react";
import { TextBox } from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { Button } from "devextreme-react";
import { LoadIndicator } from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";

import {
  onboardingQuestionsOptions,
  organizationCategoryOptions,
  servicePlanOptions,
} from "../../helpers/onBoardingSource";

import services from "../../helpers/timezones";
import {
  handleCategory,
  handleServicePlan,
} from "../../utils/onBoardingServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import request from "../../utils/requestService";
import { getUserInformation } from "../../redux/userService";

const Onboarding = () => {
  const [loading, setLoading] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationCategory, setOrganizationCategory] = useState("Software");
  const [organizationCategoryNumber, setOrganizationCategoryNumber] =
    useState(null);

  const [selectedTimezone, setSelectedTimezone] = useState(
    "(UTC+03:00) Nairobi"
  );
  const [timeZone, setTimezone] = useState("(UTC+03:00) Nairobi");
  const [onboardingQuestions, setOnboardingQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  const [servicePlan, setServicePlan] = useState(
    "Standard (Ksh10,000, Free 14 Days Trial)"
  );
  const [servicePlanNumber, setServicePlanNumber] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set the industry for the organisation according to what the user selects
  const handleCategorySelection = (category) => {
    const selectedCategory = handleCategory(category);
    setOrganizationCategory(selectedCategory.name);
    setOrganizationCategoryNumber(selectedCategory.key);
  };

  // Set the service plan otpions according to what the user selects
  const handleServicePlanSelection = (servicePlan) => {
    const selectedService = handleServicePlan(servicePlan);
    setServicePlan(selectedService.name);
    setServicePlanNumber(selectedService.key);
  };

  // Set the timezone according to what the user selects
  const handleTimeZone = (selectedTimeZone) => {
    const allTimezones = services.getAllTimezones();
    allTimezones.filter((timezone) => {
      if (timezone.text === selectedTimeZone) {
        setSelectedTimezone(timezone.text);
        setTimezone(timezone.value);
      }
    });
  };

  // Fetch user information the first time signing in
  useEffect(() => {
    const url = "https://192.168.1.5/user-info";
    getUserInformation(dispatch, url);
  }, [dispatch]);

  // Submit the tenant info to be processed and added to the database
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      company: organizationName,
      // profession: organizationCategoryNumber,
      timeZone,
      question: onboardingQuestions,
      answer,
      // servicePlanNumber,
    };

    try {
      const { data } = await request.post("/SadUser", formData);

      if (data) {
        setLoading(false);
        navigate("/dashboard");
      }
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
                  >
                    <Validator>
                      <RequiredRule message="Organisation name is required" />
                    </Validator>
                  </TextBox>
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
                  >
                    <Validator>
                      <RequiredRule message="An answer is required" />
                    </Validator>
                  </TextBox>
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
                    value={selectedTimezone}
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
                <Button id="onBoardingButton" useSubmitBehavior={true}>
                  {" "}
                  <FcAddDatabase className="text-white" fontSize={20} />
                  Submit
                </Button>
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
