import axios from "axios";

const BASE_URL =
  "http://ibusinesstestutils.azurewebsites.net/api/CategoryMenus/GetModuleMenu";

const sideMenuRequest = axios.create({ baseURL: BASE_URL });

export default sideMenuRequest;
