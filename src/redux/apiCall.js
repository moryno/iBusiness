import request from "../helpers/requestMethod";
import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import { setupLogin } from "../helpers/auth.js";
import { logoutFunc } from "../helpers/auth.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const { data } = await request.post("/Account/Login", user);
    setupLogin(data?.token);
    dispatch(loginSuccess(data));
    window.location.replace("/");
  } catch (error) {
    dispatch(loginFailure());
    logoutFunc();
  }
};
