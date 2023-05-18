import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://ibusinessbooking.azurewebsites.net/api";

axios.interceptors.response.use(undefined, (error) => {
  const { status, config } = error.response;
  if (status === 404) {
    toast.error("Not found");
  }
  if (status === 400 && config.method === "get") {
    toast.error("Not found");
  }
  if (
    status === 400 &&
    (config.method === "post" ||
      config.method === "put" ||
      config.method === "delete")
  ) {
    toast.error("Multiple fields are required.");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
});

const responseBody = (response) => response.data;

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Request = {
  get: () => request.get("/booking"),
  getByDate: (fromDate, toDate) =>
    request.get(`booking/GetbyDate?startdate=${fromDate}&enddate=${toDate}`),
  getById: (id) => request.get(`booking?bookingID=${id}`),
  create: (payload) => request.post("/booking/Create", payload),
  update: (payload) => request.put("/booking/UpdateBooking", payload),
  delete: (id) => request.del(`booking?bookingID=${id}`),
};

axios.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem("token");

    if (TOKEN) {
      config.headers = { Authorization: `Bearer ${TOKEN}` };
    }

    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default { Request };

export const sideMenuRequest =
  "https://modulemenus.azurewebsites.net/api/CategoryMenus/GetModuleMenu";

export const msSingleSign = "https://saas-app-asdk-ecdf-a6tx.azurewebsites.net/MicrosoftIdentity/Account/SignIn"
  // "https://ibusinessaccountservice.azurewebsites.net/login/Loginwithmicrosoft";
// "https://login.microsoftonline.com/429eb2c8-ad5d-4e03-b326-a26d27a067f7/oauth2/authorize?client_id=fd6d9002-4eb4-4b56-b3a4-29f9cf05141f&response_type=token&redirect_uri=http://localhost:3000/login&resource=fd6d9002-4eb4-4b56-b3a4-29f9cf05141f&scope=openid&response_mode=fragment&state=12345&nonce=678910";

// URL to our homepage
export const homeWebsite = "https://ibusiness-git-main-moryno.vercel.app/";
