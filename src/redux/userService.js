import axios from "axios";
import { loginSuccess } from "./userSlice";
import { setUpToken } from "../helpers/auth";

export const getUserInformation = async (dispatch, url) => {
  try {
    const { data } = await axios.get(url, {
      withCredentials: true,
    });

    if (data) {
      dispatch(loginSuccess(data));
      setUpToken(data?.accessToken);
    }
  } catch (error) {
    console.log(error);
  }
};
