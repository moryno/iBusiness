import SadService from "../../ClientServices/sadService";
import {
  getSecurityGroupsSuccess,
  refreshSecurityGroupsOrder,
} from "../securityGroupSlice";
import {
  getUserGroupsSuccess,
  refreshUserGroupsOrder,
} from "../userGroupSlice";

export const getSecurityGroups = async (dispatch) => {
  try {
    const response = await SadService.get("/SecurityGroups/GetAll");
    dispatch(getSecurityGroupsSuccess(response));
  } catch (error) {
    console.log(error);
  }
};

export const getFreshSecurityGroups = async (dispatch) => {
  try {
    const response = await SadService.get("/SecurityGroups/GetAll");
    dispatch(refreshSecurityGroupsOrder(response));
  } catch (error) {
    console.log(error);
  }
};

export const getUserGroups = async (dispatch) => {
  try {
    const response = await SadService.get("/UserGroups/GetAll");
    dispatch(getUserGroupsSuccess(response));
  } catch (error) {
    console.log(error);
  }
};

export const getFreshUserGroups = async (dispatch) => {
  try {
    const response = await SadService.get("/UserGroups/GetAll");
    dispatch(refreshUserGroupsOrder(response));
  } catch (error) {
    console.log(error);
  }
};

// export const addSecurityGroups = async (group, dispatch, handleClose) => {
//   try {
//     const response = await SadService.post(`/SecurityGroups/Create`, group);
//     dispatch(addSecurityGroupsSuccess(response));
//     handleClose();
//     toast.success(response.responseMsg);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateSecurityGroups = async (group, dispatch, handleClose) => {
//   try {
//     const response = await SadService.put(`/SecurityGroups/Edit`, group);
//     dispatch(updateSecurityGroupsSuccess({ bookingId: id, booking }));
//     handleClose();
//     toast.success(response.responseMsg);
//   } catch (err) {}
// };
