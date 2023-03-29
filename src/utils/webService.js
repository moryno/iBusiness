import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_VERSION
// axios.defaults.baseURL = BASE_URL

export default class WebService {
  static async post(action, params) {
    const { data } = await axios.post(action, params);
    return data;
  }
  static async put(action, params) {
    const { data } = await axios.put(action, params);
    return data;
  }
  static async get(action) {
    const { data } = await axios.get(action);
    return data;
  }
  static async delete(action) {
    const { data } = await axios.delete(action);
    return data;
  }
  static async patch(action, params) {
    const { data } = await axios.patch(action, params);
    return data;
  }
}

// axios.interceptors.request.use(
//     async config => {
//         // Do something before request is sent
//         config.baseURL = BASE_URL
//         const token = await getLocalData('token')

//         config.headers.common['Authorization'] = token ? 'Bearer ' + token : ''
//         return config
//     },
//     error => {
//         // Do something with request error
//         return Promise.reject(error)
//     },
// )

// axios.interceptors.response.use(
//     response => {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data

//         return response
//     },
//     error => {
//         // // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // // Do something with response error

//         const { response } = error
//         // const originalRequest = config;

//         if (response.status === 401 || response.status === 404) {
//             return Promise.reject(error)
//         } else {
//             return Promise.reject(error)
//         }
//     },
// )
