import { makeRequest } from "../utils/axios";

export const logoutFunc = () => {
  localStorage.removeItem("token");
  // eslint-disable-next-line
  const response = makeRequest.get("/Microsoftidentity/Account/SignOut", {
    withCredentials: true,
  });
  // if(response){
  //   window.location.href = "/";
  // }
};

export const setUpToken = (token) => {
  localStorage.setItem("token", token);
};

// export function setLocalData(key, value) {
//   try {
//       localStorage.setItem(key, value)
//   } catch (error) {
//       console.log('error', error)
//   }
// }

export function getLocalData(key) {
  try {
    let data = localStorage.getItem(key);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}
