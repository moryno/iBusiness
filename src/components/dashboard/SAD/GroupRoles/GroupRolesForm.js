import { ImUndo2 } from "react-icons/im";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  DateBox,
  SelectBox,
  Switch,
  TextBox,
  Validator,
} from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";
import SadService from "../../../../ClientServices/sadService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  addGroupRolesSuccess,
  updateGroupRolesSuccess,
} from "../../../../redux/reducers/groupRoleSlice";
import { RequiredRule } from "devextreme-react/validator";

const today = new Date().toISOString().slice(0, 10);

const GroupRolesForm = ({ handleClose, singleRecord, statusMode }) => {
  const dispatch = useDispatch();
  const [groupCodeSource, setGroupCodeSource] = useState([]);
  const [groupCode, setGroupCode] = useState(
    statusMode === "EditMode" ? singleRecord.groupCode : ""
  );
  const [roleNameSource, setRoleNameSource] = useState([]);
  const [roleName, setRoleName] = useState(
    statusMode === "EditMode" ? singleRecord.roleName : ""
  );
  const [view, setView] = useState(
    statusMode === "EditMode" ? singleRecord.view : false
  );
  const [add, setAdd] = useState(
    statusMode === "EditMode" ? singleRecord.add : false
  );
  const [edit, setEdit] = useState(
    statusMode === "EditMode" ? singleRecord.edit : false
  );
  const [isDelete, setDelete] = useState(
    statusMode === "EditMode" ? singleRecord.delete : false
  );
  const [isExport, setExport] = useState(
    statusMode === "EditMode" ? singleRecord.export : false
  );
  const [isImport, setImport] = useState(
    statusMode === "EditMode" ? singleRecord.import : false
  );
  const [effectiveDate, setEffectiveDate] = useState(
    statusMode === "EditMode" ? singleRecord.effectiveDate : today
  );
  const [expiryDate, setExpiryDate] = useState(
    statusMode === "EditMode" ? singleRecord.expiryDate : today
  );

  const getGroupCodes = async () => {
    const url = "/SecurityGroups/GetGroupCode";
    const response = await SadService.get(url);
    setGroupCodeSource(response);
  };

  const getRoleNames = async () => {
    const url = "/Roles/GetRoleNames";
    const response = await SadService.get(url);
    setRoleNameSource(response);
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

  useEffect(() => {
    getGroupCodes();
    getRoleNames();
    // eslint-disable-next-line
  }, []);

  // const onSelectAll = (e) => {
  //   const selectAllState = e.value;
  //   setView(selectAllState);
  //   setAdd(selectAllState);
  //   setEdit(selectAllState);
  //   setDelete(selectAllState);
  //   setExport(selectAllState);
  //   setImport(selectAllState);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      groupCode,
      roleName,
      view,
      add,
      edit,
      delete: isDelete,
      export: isExport,
      import: isImport,
      effectiveDate,
      expiryDate,
    };

    if (statusMode === "CreateMode") {
      try {
        if (expiryDate >= effectiveDate) {
          const response = await SadService.post(
            "/GroupRoles/Create",
            formData
          );
          if (response?.dbResponse?.responseCode === "01") {
            dispatch(addGroupRolesSuccess(response?.groupRole));
            toast.success(response?.dbResponse?.responseMsg);
          } else {
            toast.error(response?.dbResponse?.responseMsg);
          }
          handleClose();
        } else {
          toast.error("Expiry date should not be less than effective date.");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (statusMode === "EditMode") {
      try {
        if (expiryDate >= effectiveDate) {
          const response = await SadService.post(
            "/GroupRoles/Create",
            formData
          );

          if (response?.dbResponse?.responseCode === "02") {
            dispatch(updateGroupRolesSuccess(response?.groupRole));
            toast.success(response?.dbResponse?.responseMsg);
          } else {
            toast.error(response?.dbResponse?.responseMsg);
          }
          handleClose();
        } else {
          toast.error("Expiry date should not be less than effective date.");
        }
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
                height={30}
                displayExpr="groupDesc"
                valueExpr="groupCode"
                itemRender={getItemCode}
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
                placeholder="Type group code here"
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
                htmlFor="groupCode"
              >
                <sup className="text-red-600">*</sup>Role Name
              </label>
              <SelectBox
                dataSource={roleNameSource}
                onValueChanged={(e) => setRoleName(e.value)}
                searchEnabled={true}
                placeholder="Select a Group Code"
                height={30}
                style={{ fontSize: "12px" }}
                className="border pl-1 text-center w-full  outline-none"
              >
                {" "}
                <Validator>
                  <RequiredRule message="Role name is required" />
                </Validator>
              </SelectBox>
            </div>
          ) : (
            <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
              <label
                className="text-[11px] text-label font-semibold"
                htmlFor="groupCode"
              >
                <sup className="text-red-600">*</sup>Role Name
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

          <div className="box-border border-b px-1 py-1 w-full flex items-center gap-2 mb-2">
            <label
              className="text-[12px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>Select all
            </label>
            <Switch height={30} />
          </div>

          <div className="box-border border rounded-[4px] px-1 w-full items-center flex justify-between mb-2">
            <label
              className="text-[12px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>View
            </label>
            <Switch onValueChanged={(e) => setView(e.value)} height={30} />
          </div>

          <div className="box-border border rounded-[4px] px-1 w-full items-center flex justify-between mb-2">
            <label
              className="text-[12px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>Add
            </label>
            <Switch
              onValueChanged={(e) => setAdd(e.value)}
              //value={add}
              height={30}
            />
          </div>

          <div className="box-border border rounded-[4px] px-1 w-full items-center flex justify-between mb-2">
            <label
              className="text-[12px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>Edit
            </label>
            <Switch
              onValueChanged={(e) => setEdit(e.value)}
              //value={edit}
              height={30}
            />
          </div>

          <div className="box-border border rounded-[4px] px-1 w-full items-center flex justify-between mb-2">
            <label
              className="text-[12px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>Delete
            </label>
            <Switch
              onValueChanged={(e) => setDelete(e.value)}
              //value={isDelete}
              height={30}
            />
          </div>

          <div className="box-border border rounded-[4px] px-1 w-full items-center flex justify-between mb-2">
            <label
              className="text-[12px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>Export
            </label>
            <Switch
              onValueChanged={(e) => setExport(e.value)}
              // value={isExport}
              height={30}
            />
          </div>

          <div className="box-border border rounded-[4px] px-1 w-full items-center flex justify-between mb-2">
            <label
              className="text-[12px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>Import
            </label>
            <Switch
              onValueChanged={(e) => setImport(e.value)}
              // value={isImport}
              height={30}
            />
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="userName"
            >
              <sup className="text-red-600">*</sup>Effective Date
            </label>
            <DateBox
              onValueChanged={(e) => setEffectiveDate(e.value)}
              value={effectiveDate}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            />
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="userName"
            >
              <sup className="text-red-600">*</sup>Expiry Date
            </label>
            <DateBox
              onValueChanged={(e) => setExpiryDate(e.value)}
              value={expiryDate}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            />
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

export default GroupRolesForm;
