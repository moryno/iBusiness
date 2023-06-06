import axios from "axios";
import { loginSuccess } from "../redux/userSlice";
import { setUpToken } from "../helpers/auth";
import requestService from "../axios/requestService";

export const getUserInformation = async (dispatch, url) => {
  try {
    const response = await requestService.get(url);

    dispatch(loginSuccess(response.data));
    setUpToken(response.data?.accessToken);
  } catch (error) {
    console.log(error);
  }
};

export const getAuthToken = async (url) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });

    setUpToken(response?.data?.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async (dispatch) => {
  const getTokenUrl = "https://localhost:5001/api/GetAuthUser";
  const getUserURL = "https://localhost:7041/api/user";

  try {
    const { data } = await axios.get(getTokenUrl, {
      withCredentials: true,
    });

    setUpToken(data?.accessToken);

    const config = {
      headers: { Authorization: `Bearer ${data?.accessToken}` },
    };

    const response = await axios.get(getUserURL, config);

    dispatch(loginSuccess(response?.data));
  } catch (error) {
    console.log(error);
  }
};
