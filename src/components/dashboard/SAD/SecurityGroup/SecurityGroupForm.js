import { ImUndo2 } from "react-icons/im";
import { TextBox } from "devextreme-react/text-box";
import { useState } from "react";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { Button } from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";
import SadService from "../../../../ClientServices/sadService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addSecurityGroupsSuccess,
  updateSecurityGroupsSuccess,
} from "../../../../redux/reducers/securityGroupSlice";
import { StringLengthRule } from "devextreme-react/form";

const SecurityGroupForm = ({ handleClose, singleRecord, statusMode }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [groupCode, setGroupCode] = useState(
    statusMode === "EditMode" ? singleRecord.groupCode : ""
  );
  const [groupDesc, setGroupDesc] = useState(
    statusMode === "EditMode" ? singleRecord.groupDesc : ""
  );
  const [narration, setNarration] = useState(
    statusMode === "EditMode" ? singleRecord.narration : ""
  );

  const formData = {
    groupCode,
    groupDesc,
    narration,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (statusMode === "CreateMode") {
      try {
        const response = await SadService.post(
          "/SecurityGroups/Create",
          formData
        );

        if (response?.dbResponse?.responseCode === "01") {
          dispatch(addSecurityGroupsSuccess(response?.securityGroup));
          toast.success(response.dbResponse.responseMsg);
        } else if (response.status === 401) {
          toast.error(response?.message);
        } else {
          toast.error(response.dbResponse.responseMsg);
        }
        setLoading(false);
        handleClose();
      } catch (error) {
        setLoading(false);
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
          dispatch(updateSecurityGroupsSuccess(response?.securityGroup));
          toast.success(response.dbResponse.responseMsg);
        } else if (response.status === 401) {
          toast.error(response?.message);
        } else {
          toast.error(response.dbResponse.responseMsg);
        }
        setLoading(false);
        handleClose();
      } catch (error) {
        setLoading(false);
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
              htmlFor="groupCode"
            >
              <sup className="text-red-600">*</sup>Group Code
            </label>
            <TextBox
              placeholder="Type scheme position here"
              onValueChanged={(e) => setGroupCode(e.value)}
              value={groupCode}
              height={30}
              disabled={statusMode === "EditMode" && true}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Group Code is required" />
                <StringLengthRule
                  min={2}
                  max={4}
                  message="Group code length should be betwen 2-4 characters"
                />
              </Validator>
            </TextBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="groupName"
            >
              <sup className="text-red-600">*</sup>Group Name
            </label>
            <TextBox
              placeholder="Type group name here"
              onValueChanged={(e) => setGroupDesc(e.value)}
              value={groupDesc}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Group Name is required" />
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

export default SecurityGroupForm;
