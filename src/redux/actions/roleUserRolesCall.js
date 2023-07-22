import SadService from "../../ClientServices/sadService";
import { getGroupRolesSuccess } from "../reducers/groupRoleSlice";
import { getRolesSuccess } from "../reducers/rolesSlice";

export const getRoles = async (dispatch) => {
  try {
    const response = await SadService.get("/Roles/GetAll");
    dispatch(getRolesSuccess(response));
  } catch (error) {
    console.log(error);
  }
};

export const getGroupRoles = async (dispatch) => {
  try {
    const response = await SadService.get("/GroupRoles/GetAll");
    dispatch(getGroupRolesSuccess(response));
  } catch (error) {
    console.log(error);
  }
};
