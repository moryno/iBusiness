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

export const getOnboardingInfo = async (dispatch, url1, url2) => {
  try {
    const { data } = await axios.get(url1, {
      withCredentials: true,
    });

    const config = {
      headers: { Authorization: `Bearer ${data?.accessToken}` },
    };

    setUpToken(data?.accessToken);
    const response = await axios.get(url2, config);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};
