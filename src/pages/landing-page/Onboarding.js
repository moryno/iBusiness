import { TextBox } from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";

const Onboarding = () => {
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
            <form className="flex flex-col md:items-start items-center">
              <article className="flex flex-wrap">
                <div className="flex justify-between box-border flex-col gap-2  w-full mb-5">
                  <label
                    className="text-lg text-gray-800 font-medium"
                    htmlFor="fullName"
                  >
                    What is your Organization's Name?:
                  </label>
                  <span className="text-xs">
                    The name should be the name of your business, brand or
                    organization. You can change this later.
                  </span>
                  <TextBox
                    type="text"
                    id="fullName"
                    placeholder="Type full name here"
                    //   onValueChanged={(e) => setFullName(e.value)}
                    //   value={fullName}
                    height={30}
                    style={{ fontSize: "12px" }}
                    className=" border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  ></TextBox>
                </div>
                <div className="flex justify-between box-border flex-col gap-2  w-full mb-5">
                  <label
                    className="text-lg text-gray-800 font-medium"
                    htmlFor="originCountry"
                  >
                    In what industry is your organization?
                  </label>
                  <span className="text-xs">
                    Identifying your industry will help people find you in
                    search results. Choose the closest one - you can update it
                    later.
                  </span>
                  <SelectBox
                    //   dataSource={countriesOptions}
                    searchEnabled={true}
                    //   onValueChanged={(e) => setSelectedCountry(e.value)}
                    //   value={selectedCountry}
                    placeholder="Select a Country"
                    height={30}
                    style={{ fontSize: "12px" }}
                    className="border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  />
                </div>
                <div className="flex justify-between box-border flex-col gap-2  w-full mb-5">
                  <label
                    className="text-lg text-gray-800 font-medium"
                    htmlFor="fullName"
                  >
                    Please choose a name for your custom Tenant Route
                  </label>
                  <span className="text-xs">
                    Choose a unique route to use when accessing your tenant. You
                    can change this later.
                  </span>
                  <TextBox
                    type="text"
                    id="fullName"
                    placeholder="Type full name here"
                    //   onValueChanged={(e) => setFullName(e.value)}
                    //   value={fullName}
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
                    //   dataSource={countriesOptions}
                    searchEnabled={true}
                    //   onValueChanged={(e) => setSelectedCountry(e.value)}
                    //   value={selectedCountry}
                    placeholder="Select a Country"
                    height={30}
                    style={{ fontSize: "12px" }}
                    className="border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                  />
                </div>
              </article>
              <article>
                <button className="flex border-none py-2 rounded-sm px-4 w-fit bg-buttonBlue text-white items-center font-semibold  cursor-pointer  text-xs">
                  Submit
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
