import { useCallback, useEffect, useState } from "react";
import { ImUndo2 } from "react-icons/im";
import { TextBox } from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { Button } from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";
import SadService from "../../../../ClientServices/sadService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addUserGroupsSuccess,
  updateUserGroupsSuccess,
} from "../../../../redux/reducers/userGroupSlice";

const UserGroupForm = ({ singleRecord, handleClose, statusMode }) => {
  const dispatch = useDispatch();
  const [groupCodeSource, setGroupCodeSource] = useState([]);

  const [groupCode, setGroupCode] = useState(
    statusMode === "EditMode" ? singleRecord.groupCode : ""
  );
  const [users, setUsers] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [userName] = useState(
    statusMode === "EditMode" && singleRecord.userName
  );
  const [selecteduserName, setSelectedUserName] = useState("");
  const [narration, setNarration] = useState(
    statusMode === "EditMode" ? singleRecord.narration : ""
  );

  const getGroupCodes = async () => {
    const url = "/SecurityGroups/GetGroupCode";
    const response = await SadService.get(url);
    setGroupCodeSource(response);
  };

  const getAllUsers = async () => {
    const url = "/UserGroups/GetAllUsers";
    const response = await SadService.get(url);
    setUsers(response);
    setUserNames(response?.map((user) => user.userName));
  };

  const getItemCode = useCallback((data) => {
    return (
      <div className="flex items-center w-full justify-between px-1">
        <div className="text-menuText">{data.groupDesc}</div>
        <div>{data.groupCode}</div>
      </div>
    );
  }, []);

  const onCodeSelected = useCallback((e) => {
    setGroupCode(e.value);
  }, []);

  const getUser = () => {
    return users?.find(
      (user) =>
        selecteduserName === user.userName ||
        singleRecord.userName === user.userName
    );
  };

  useEffect(() => {
    getAllUsers();
    getGroupCodes();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = getUser();
    const formData = {
      groupCode,
      userId: user.userId,
      narration,
    };

    const editData = {
      groupCode: singleRecord.groupCode,
      userId: user.userId,
      narration,
    };

    if (statusMode === "CreateMode") {
      try {
        const response = await SadService.post("/UserGroups/Create", formData);

        if (response?.dbResponse?.responseCode === "01") {
          dispatch(addUserGroupsSuccess(response?.userGroup));
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
        const response = await SadService.post("/UserGroups/Create", editData);

        if (response?.dbResponse?.responseCode === "00") {
          dispatch(updateUserGroupsSuccess(response?.userGroup));
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
          {statusMode === "CreateMode" ? (
            <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
              <label
                className="text-[11px] text-label font-semibold"
                htmlFor="groupCode"
              >
                <sup className="text-red-600">*</sup>Group Code
              </label>
              <SelectBox
                dataSource={groupCodeSource}
                onValueChanged={onCodeSelected}
                searchEnabled={true}
                placeholder="Select a Group Code"
                displayExpr="groupDesc"
                valueExpr="groupCode"
                itemRender={getItemCode}
                height={30}
                style={{ fontSize: "12px" }}
                className="border pl-1 text-center w-full  outline-none"
              >
                {" "}
                <Validator>
                  <RequiredRule message="Group code is required" />
                </Validator>
              </SelectBox>
            </div>
          ) : (
            <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
              <label
                className="text-[11px] text-label font-semibold"
                htmlFor="groupCode"
              >
                <sup className="text-red-600">*</sup>Group Code
              </label>
              <TextBox
                value={groupCode}
                height={30}
                disabled={statusMode === "EditMode" && true}
                style={{ fontSize: "12px" }}
                className="border pl-1 text-center w-full  outline-none"
              ></TextBox>
            </div>
          )}
          {statusMode === "CreateMode" ? (
            <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
              <label
                className="text-[11px] text-label font-semibold"
                htmlFor="userName"
              >
                <sup className="text-red-600">*</sup>UserName
              </label>
              <SelectBox
                dataSource={userNames}
                onValueChanged={(e) => setSelectedUserName(e.value)}
                searchEnabled={true}
                placeholder="Select a UserName"
                height={30}
                disabled={statusMode === "EditMode" && true}
                style={{ fontSize: "12px" }}
                className="border pl-1 text-center w-full  outline-none"
              />
            </div>
          ) : (
            <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
              <label
                className="text-[11px] text-label font-semibold"
                htmlFor="groupCode"
              >
                <sup className="text-red-600">*</sup>UserName
              </label>
              <TextBox
                value={userName}
                height={30}
                disabled={statusMode === "EditMode" && true}
                style={{ fontSize: "12px" }}
                className="border pl-1 text-center w-full  outline-none"
              ></TextBox>
            </div>
          )}

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
              height="5vh"
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

export default UserGroupForm;
