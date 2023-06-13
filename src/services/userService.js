import axios from "axios";
import { loginSuccess } from "../redux/userSlice";
import { setUpToken } from "../helpers/auth";

export const getCurrentUser = async (dispatch) => {
  const getTokenUrl = process.env.REACT_APP_BASE_URL;
  const getUserURL = process.env.REACT_APP_SEC_API;

  try {
    const { data } = await axios.get(getTokenUrl + "/GetAuthUser", {
      withCredentials: true,
    });

    setUpToken(data?.accessToken);

    const config = {
      headers: { Authorization: `Bearer ${data?.accessToken}` },
    };

    const response = await axios.get(getUserURL + "/user", config);

    dispatch(loginSuccess(response?.data));
  } catch (error) {
    console.log(error);
  }
};
