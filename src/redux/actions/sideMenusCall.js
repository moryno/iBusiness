import axios from "axios";
import { getMenus, getModuleMenus } from "../reducers/moduleSlice";
import OnboardingService from "../../ClientServices/onboardingRequest";

export const getSideMenus = async (dispatch) => {
  const url = process.env.REACT_APP_SIDEMENUS_URL_M;
  try {
    const { data } = await axios.get(url);
    dispatch(getMenus(data));
  } catch (error) {
    console.log(error);
  }
};

export const getSourceMenus = async (dispatch) => {
  try {
    const response = await OnboardingService.get("/menus");
    dispatch(getModuleMenus(response["menusDic"]));
    dispatch(getMenus(response["menusList"]));
  } catch (error) {
    console.error(error);
  }
};
