import axios from "axios";
import { getMenus } from "../moduleSlice";

export const getSideMenus = async (dispatch) => {
  const url = process.env.REACT_APP_SIDEMENUS_URL;
  try {
    const { data } = await axios.get(url);
    dispatch(getMenus(data));
  } catch (error) {
    console.log(error);
  }
};
