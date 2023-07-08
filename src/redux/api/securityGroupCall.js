import { toast } from "react-toastify";
import ErpService from "../../axios/erpService";
import {
  getSecurityGroupsSuccess,
  refreshSecurityGroupsOrder,
  addSecurityGroupsSuccess,
  updateSecurityGroupsSuccess,
} from "../securityGroupSlice";

export const getSecurityGroups = async (dispatch) => {
  try {
    const response = await ErpService.get("/SecurityGroups/GetAll");
    dispatch(getSecurityGroupsSuccess(response));
  } catch (error) {
    console.log(error);
  }
};

export const getFreshSecurityGroups = async (dispatch) => {
  try {
    const response = await ErpService.get("/SecurityGroups/GetAll");
    dispatch(refreshSecurityGroupsOrder(response));
  } catch (error) {
    console.log(error);
  }
};

export const addSecurityGroups = async (group, dispatch, handleClose) => {
  try {
    const response = await ErpService.post(`/SecurityGroups/Create`, group);
    dispatch(addSecurityGroupsSuccess(response));
    handleClose();
    toast.success(response.responseMsg);
  } catch (error) {
    console.log(error);
  }
};

export const updateSecurityGroups = async (group, dispatch, handleClose) => {
  try {
    const response = await ErpService.put(`/SecurityGroups/Edit`, group);
    // dispatch(updateBookingSuccess({ bookingId: id, booking }));
    handleClose();
    toast.success(response.responseMsg);
  } catch (err) {}
};
