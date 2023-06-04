import axios from "axios";
import { loginSuccess } from "./userSlice";
import { setUpToken } from "../helpers/auth";

export const getUserInformation = async (dispatch, url) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });

    if (response.data) {
      dispatch(loginSuccess(response.data));
      setUpToken(response.data?.accessToken);
    }
  } catch (error) {
    console.log(error);
  }
};
