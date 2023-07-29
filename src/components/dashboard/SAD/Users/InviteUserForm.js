import { ImUndo2 } from "react-icons/im";
import { TextBox } from "devextreme-react/text-box";
import { useState } from "react";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { Button } from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";
import { toast } from "react-toastify";
import OnboardingService from "../../../../ClientServices/onboardingRequest";
import { Loader } from "../../../../pages/dashboard/loader/Loader";

const InviteUserForm = ({ handleClose }) => {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [narration, setNarration] = useState("");
  const [loading, setLoading] = useState(false);
  const formData = {
    fullName,
    emailAddress,
    narration,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await OnboardingService.post(
        "/UserInvitation/newInvite",
        formData
      );

      if (response?.responseCode === "001") {
        toast.success(response.responseMsg);
      } else {
        toast.error(response.responseMsg);
      }
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  };

  return (
    <main className="h-full mt-[-1.5rem]">
      { loading && (<Loader />) }
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full justify-between pt-[23px]"
      >
        <article className="flex px-5  flex-wrap  w-full">
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="fullName"
            >
              <sup className="text-red-600">*</sup>Full Name
            </label>
            <TextBox
              placeholder="Type Full Name here"
              onValueChanged={(e) => setFullName(e.value)}
              value={fullName}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Full Name is required" />
              </Validator>
            </TextBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="emailAddress"
            >
              <sup className="text-red-600">*</sup>Email Address
            </label>
            <TextBox
              placeholder="Type email address here"
              onValueChanged={(e) => setEmailAddress(e.value)}
              value={emailAddress}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Email Address is required" />
              </Validator>
            </TextBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>Narration
            </label>
            <TextBox
              placeholder="Type narration here"
              onValueChanged={(e) => setNarration(e.value)}
              value={narration}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Narration is required" />
              </Validator>
            </TextBox>
          </div>
        </article>
        <article className="w-full border-t border-gray-300 py-1.5 bg-white sticky inset-x-0 bottom-0 flex justify-center items-center gap-4">
          <Button
            id="devBlueButton"
            disabled={loading}
            useSubmitBehavior={true}
          >
            {" "}
            <FcAddDatabase fontSize={20} /> Save
          </Button>
          <button
            type="button"
            onClick={handleClose}
            className="flex gap-1 text-xs  items-center font-semibold bg-menuButton hover:bg-buttonBg border-none py-1 px-3 rounded-sm w-fit text-white cursor-pointer"
          >
            <ImUndo2 fontSize={18} />
            Cancel
          </button>
        </article>
      </form>
    </main>
  );
};

export default InviteUserForm;
