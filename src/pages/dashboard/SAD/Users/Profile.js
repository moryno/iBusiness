import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextBox from "devextreme-react/text-box";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../../redux/reducers/userSlice";
import { profileMenuSource } from "../../../../data/dashboard-page/menu";
import Statusbar from "../../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import { toast } from "react-toastify";
import MenusGroupComponent from "../../../../components/dashboard/Shared/Menus/MenusGroupComponent";
import { NumberBox, SelectBox, Validator } from "devextreme-react";
import OnboardingService from "../../../../ClientServices/onboardingRequest";
import Constant from "../../../../utils/constant";
import { FaPen } from "react-icons/fa";
import refStrings from "../../../../data/dashboard-page/sadData";
import { Loader } from "../../loader/Loader";
import services from "../../../../helpers/formDataSource";
import { RequiredRule } from "devextreme-react/validator";
import { PatternRule } from "devextreme-react/form";

const Profile = () => {
  const currentUser = useSelector((state) => state.user?.currentUser?.user);
  const [fullNames, setfullNames] = useState(currentUser?.fullName);
  const [telephone, setTelephone] = useState("" + currentUser?.telephone);
  const [physicalAddress, setpAddress] = useState(
    currentUser?.physicalAddress ?? ""
  );
  const [country, setCountry] = useState(currentUser?.country);
  const [countryCode, setCountryCode] = useState("+254");
  const [editable, setEditable] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Profile link
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    try {
      if (file) {
        formData.append("profile", file);
      }
      const response = await OnboardingService.post("/UploadImage", formData);

      //setProfileImage(response.imageLink)
      let cUser = { ...currentUser };
      cUser.imageLink = response?.imageLink ?? currentUser?.imageLink;
      dispatch(updateUserProfile(cUser));
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await OnboardingService.post(Constant.ACTION.USER_PROFILE_EDIT, {
        DisplayName: fullNames,
        MobilePhone: countryCode + telephone,
        StreetAddress: physicalAddress,
        Country: country,
      });

      const data = {
        fullName: fullNames,
        telephone,
        country,
        company: "",
        email: currentUser?.email,
        id: 0,
        industry: "",
        userName: currentUser?.email,
        physicalAddress,
      };

      setEditable(false);
      toast.success(refStrings.operationSuceess);
      dispatch(updateUserProfile(data));
      setLoading(false);
    } catch (error) {
      toast.error(refStrings.operationFailed);
      console.log(error);
      setLoading(false);
    }
  };

  const handleClick = (menu) => {
    switch (menu) {
      case refStrings.menu1:
        if (editable) {
          setTelephone();
          setEditable(!editable);
        }
        break;
      case refStrings.menu2:
        handleSubmit();
        break;
      case refStrings.menu3:
        navigate(-1);
        break;
      default:
        break;
    }
  };

  const inputAttr = {
    autocomplete: "chrome-off",
  };

  const handleTelephone = useCallback((e) => {
    // e = e.replace(/^0+/, '');
    // console.log(e)
    setTelephone(e);
  }, []);

  return (
    <main className="w-full relative h-full md:h-full py-1.5">
      {loading && <Loader />}
      <section>
        <MenusGroupComponent
          heading={refStrings.heading}
          menus={profileMenuSource}
          onMenuClick={handleClick}
        />

        <section>
          <article className="md:p-5 flex flex-col gap-3 w-full">
            <article className="flex flex-col w-3/4 p-5 relative shadow-none md:shadow-xl">
              <h1 className="mb-5 text-menu text-lg font-semibold">
                {refStrings.subHeading}
              </h1>
              <div className="flex flex-col gap-5">
                <div className="w-[7rem] h-[7rem] self-center relative">
                  <div className="absolute bottom-0 right-0 flex gap-2 items-center bg-slate-800 rounded p-1 text-xs text-blueLight hover:text-headingBlue">
                    <label
                      htmlFor="image-input"
                      className="flex justify-center items-center gap-2 cursor-pointer"
                    >
                      {refStrings.menu1}
                      <FaPen fontSize={10} />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="profile-edit"
                      id="image-input"
                      onChange={handleImageChange}
                    />
                  </div>
                  <img
                    className="w-[6.5rem] h-[6.5rem] rounded-full object-cover cursor-pointer"
                    src={
                      currentUser?.imageLink ??
                      "https://pp-b5facpcqcnbmaecm.z01.azurefd.net/profilepic/default.jpg"
                    }
                    alt="profile"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="mb-2.5 text-[14px] w-2/3">
                    <span className=" font-bold mr-1 text-menu">
                      {refStrings.fullNames}
                    </span>
                    <span className="text-text font-medium">
                      <TextBox
                        onValueChange={(e) => setfullNames(e)}
                        id={refStrings.fullNamesid}
                        value={fullNames}
                        disabled={editable}
                      />
                    </span>
                  </div>
                  <div className="mb-2.5 text-[14px] w-1/3">
                    <span className=" font-bold mr-1 text-menu">
                      {refStrings.userName}
                    </span>
                    <span className="text-text font-medium">
                      <TextBox
                        id={refStrings.userNameid}
                        disabled={true}
                        value={currentUser?.userName}
                      />
                    </span>
                  </div>
                  <div className="mb-2.5 text-[14px] w-1/2">
                    <span className=" font-bold mr-1 text-menu">
                      {refStrings.email}
                    </span>
                    <span className="text-text font-medium">
                      <TextBox
                        id={refStrings.emailid}
                        disabled={true}
                        value={currentUser?.email}
                      />
                    </span>
                  </div>
                  <div className="mb-2.5 text-[14px] w-1/2">
                    <span className=" font-bold mr-1 text-menu">
                      {refStrings.telephone}
                    </span>
                    {!editable ? (
                      <span className="text-text font-medium flex gap-1">
                        <SelectBox
                          dataSource={services.getCountryCodes()}
                          onValueChange={(e) => setCountryCode(e)}
                          value={countryCode}
                          displayExpr={"dial_code"}
                          valueExpr={"dial_code"}
                          disabled={editable}
                          searchEnabled={true}
                          search
                          width={80}
                          maxLength={5}
                          inputAttr={inputAttr}
                        />
                        <NumberBox
                          id={refStrings.telephoneid}
                          onValueChange={(e) => handleTelephone(e)}
                          value={telephone}
                          disabled={editable}
                          maxLength={11}
                          min={10}
                        >
                          <Validator>
                            <RequiredRule />
                            <PatternRule
                              pattern="^[0-9]+$"
                              message="Do not use text characters."
                            />
                          </Validator>
                        </NumberBox>
                      </span>
                    ) : (
                      <span className="text-text font-medium">
                        <TextBox
                          id={refStrings.telephoneid}
                          value={telephone}
                          disabled={editable}
                        />
                      </span>
                    )}
                  </div>
                  <div className="mb-2.5 text-[14px] w-1/2">
                    <span className=" font-bold mr-1 text-menu">
                      {refStrings.physicalAddress}
                    </span>
                    <span className="text-text font-medium">
                      <TextBox
                        id={refStrings.physicalAddressid}
                        placeholder={refStrings.physicalAddress}
                        onValueChange={(e) => setpAddress(e)}
                        value={physicalAddress}
                        disabled={editable}
                      />
                    </span>
                  </div>
                  <div className="mb-2.5 text-[14px] w-1/2">
                    <span className=" font-bold mr-1 text-menu">
                      {refStrings.country}
                    </span>
                    <span className="text-text font-medium">
                      <SelectBox
                        dataSource={services.getCountries()}
                        onValueChange={(e) => setCountry(e)}
                        value={country}
                        searchEnabled={true}
                        id={refStrings.countryid}
                        placeholder={refStrings.country}
                        disabled={editable}
                        inputAttr={inputAttr}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </article>
            <article className="hidden md:block w-1/2"></article>
          </article>
        </section>
      </section>

      <Statusbar
        heading={`Welcome ${currentUser?.fullName}`}
        company={refStrings.company}
      />
    </main>
  );
};

export default Profile;
