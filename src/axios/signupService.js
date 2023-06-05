import axios from "axios";

const signUpInService = "https://192.168.1.13/MicrosoftIdentity/Account/SignIn";

// const signUpInService = axios.create({ baseURL: BASE_URL });

// signUpInService.interceptors.request.use(
//   (config) => {
//     const TOKEN = localStorage.getItem("token");

//     if (TOKEN) {
//       config.headers = { Authorization: `Bearer ${TOKEN}` };
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default signUpInService;
