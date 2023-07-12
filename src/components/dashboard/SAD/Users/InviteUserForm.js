import { ImUndo2 } from "react-icons/im";
import { TextBox } from "devextreme-react/text-box";
import { useState } from "react";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { Button } from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";
import SadService from "../../../../ClientServices/sadService";
import { toast } from "react-toastify";

const InviteUserForm = ({
  handleClose,
  records,
  setRecords,
  singleRecord,
  statusMode,
}) => {
  const [groupCode, setGroupCode] = useState(
    statusMode === "EditMode" ? singleRecord.groupCode : "ACC"
  );
  const [groupDesc, setGroupDesc] = useState(
    statusMode === "EditMode" ? singleRecord.groupDesc : "Accounts"
  );
  const [narration, setNarration] = useState(
    statusMode === "EditMode" ? singleRecord.narration : "Accounts"
  );

  const formData = {
    groupCode,
    groupDesc,
    narration,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (statusMode === "CreateMode") {
      try {
        const response = await SadService.post(
          "/SecurityGroups/Create",
          formData
        );

        if (response?.dbResponse?.responseCode === "01") {
          setRecords([response?.securityGroup, ...records]);
          toast.success(response.dbResponse.responseMsg);
        } else {
          toast.error(response.dbResponse.responseMsg);
        }
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
    if (statusMode === "EditMode") {
      try {
        const response = await SadService.post(
          "/SecurityGroups/Create",
          formData
        );

        if (response?.dbResponse?.responseCode === "02") {
          const newRecord = records.map((record) => {
            if (record.groupCode === response?.securityGroup?.groupCode) {
              return response?.securityGroup;
            }
            return record;
          });

          setRecords(newRecord);
          toast.success(response.dbResponse.responseMsg);
        } else {
          toast.error(response.dbResponse.responseMsg);
        }

        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full justify-between"
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
              onValueChanged={(e) => setGroupCode(e.value)}
              value={groupCode}
              height={26}
              disabled={statusMode === "EditMode" && true}
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
              onValueChanged={(e) => setGroupDesc(e.value)}
              value={groupDesc}
              height={26}
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
              height={26}
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
          <Button id="devBlueButton" useSubmitBehavior={true}>
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
