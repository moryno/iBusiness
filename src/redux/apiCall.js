import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import { setupLogin } from "../helpers/auth.js";
import { logoutFunc } from "../helpers/auth.js";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const { data } = await axios.post("https://localhost:5179/login", user);
    setupLogin(data?.token);
    dispatch(loginSuccess(data));
    window.location.replace("/");
  } catch (error) {
    dispatch(loginFailure());
    logoutFunc();
  }
};
