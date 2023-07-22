import { ImUndo2 } from "react-icons/im";
import { TextBox } from "devextreme-react/text-box";
import { useCallback, useEffect, useState } from "react";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { Button, SelectBox } from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";
import SadService from "../../../../ClientServices/sadService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addRolesSuccess,
  updateRolesSuccess,
} from "../../../../redux/reducers/rolesSlice";
import { menuClassSource } from "../../../../data/dashboard-page/menuClassSource";

const RolesForm = ({ handleClose, singleRecord, statusMode }) => {
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState(
    statusMode === "EditMode" ? singleRecord.roleName : ""
  );
  const [moduleSource, setModuleSource] = useState([]);

  const [module, setModule] = useState("");

  const [menuItem, setMenuItem] = useState(
    statusMode === "EditMode" ? singleRecord.menuItem : ""
  );
  const [menuClass, setMenuClass] = useState(
    statusMode === "EditMode" ? singleRecord.menuClass : ""
  );
  const [roleDescription, setRoleDescription] = useState(
    statusMode === "EditMode" ? singleRecord.roleDescription : ""
  );
  const [narration, setNarration] = useState(
    statusMode === "EditMode" ? singleRecord.narration : ""
  );

  const getAllModules = async () => {
    const url = "/Modules/GetAll";
    const response = await SadService.get(url);
    setModuleSource(response);
  };

  const getItem = useCallback((data) => {
    return (
      <div className="flex items-center w-full justify-between">
        <div className="w-10/12 text-menuText">{data.moduleName}</div>
        <div className="w-2/12">{data.moduleCode}</div>
      </div>
    );
  }, []);

  const onModuleSelected = useCallback((e) => {
    setModule(e.value);
  }, []);

  useEffect(() => {
    getAllModules();
  }, []);

  const formData = {
    roleName,
    module,
    menuItem,
    menuClass,
    roleDescription,
    narration,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (statusMode === "CreateMode") {
      try {
        const response = await SadService.post("/Roles/Create", formData);

        if (response?.dbResponse?.responseCode === "01") {
          dispatch(addRolesSuccess(response?.roles));
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
        const response = await SadService.post("/Roles/Create", formData);

        if (response?.dbResponse?.responseCode === "02") {
          dispatch(updateRolesSuccess(response?.roles));
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
              htmlFor="groupCode"
            >
              <sup className="text-red-600">*</sup>Role Name
            </label>
            <TextBox
              placeholder="Type role name here"
              onValueChanged={(e) => setRoleName(e.value)}
              value={roleName}
              height={30}
              disabled={statusMode === "EditMode" && true}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Role name is required" />
              </Validator>
            </TextBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="groupCode"
            >
              <sup className="text-red-600">*</sup>Module
            </label>
            <SelectBox
              dataSource={moduleSource}
              onValueChanged={onModuleSelected}
              searchEnabled={true}
              placeholder="Select a module"
              displayExpr="moduleName"
              valueExpr="moduleCode"
              itemRender={getItem}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Module name is required" />
              </Validator>
            </SelectBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="groupCode"
            >
              <sup className="text-red-600">*</sup>Menu Class
            </label>
            <SelectBox
              dataSource={menuClassSources}
              onValueChanged={(e) => setMenuClass(e.value)}
              searchEnabled={true}
              placeholder="Select a menu class"
              value={menuClass}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Menu class is required" />
              </Validator>
            </SelectBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="groupName"
            >
              <sup className="text-red-600">*</sup>Menu Item
            </label>
            <TextBox
              placeholder="Type group name here"
              onValueChanged={(e) => setMenuItem(e.value)}
              value={menuItem}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Menu item is required" />
              </Validator>
            </TextBox>
          </div>

          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>Role Description
            </label>
            <TextBox
              placeholder="Type role description here"
              onValueChanged={(e) => setRoleDescription(e.value)}
              value={roleDescription}
              height={30}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Role description is required" />
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
              placeholder="Type role description here"
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

const menuClassSources = menuClassSource.getMenuClass();

export default RolesForm;
