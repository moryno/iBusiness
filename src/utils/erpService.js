import axios from "axios";

const ErpService = axios.create({
  baseURL: "https://saas-app-asdk-ecdf-a6tx.azurewebsites.net", // Replace with your API's base URL
  withCredentials: true, // Include credentials in the request
});

export default ErpService;
