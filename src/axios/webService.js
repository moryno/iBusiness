import axios from "axios";

const BASE_URL = "https://ibusinessbooking.azurewebsites.net/api";

const webService = axios.create({ baseURL: BASE_URL });

axios.interceptors.response.use(undefined, (error) => {
  // const { status, config } = error.response;
  // if (status === 404) {
  //   toast.error("Not found");
  // }
  // if (status === 400 && config.method === "get") {
  //   toast.error("Not found");
  // }
  // if (
  //   status === 400 &&
  //   (config.method === "post" ||
  //     config.method === "put" ||
  //     config.method === "delete")
  // ) {
  //   toast.error("Multiple fields are required.");
  // }
  // if (status === 500) {
  //   toast.error("Server error - check the terminal for more info!");
  // }
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

webService.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem("token");

    if (TOKEN) {
      config.headers = { Authorization: `Bearer ${TOKEN}` };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// eslint-disable-next-line
export default { Request };

export const signUpInURL =
  "https://localhost:5001/MicrosoftIdentity/Account/SignIn";

export const sideMenuRequest =
  "http://ibusinesstestutils.azurewebsites.net/api/CategoryMenus/GetModuleMenu";
