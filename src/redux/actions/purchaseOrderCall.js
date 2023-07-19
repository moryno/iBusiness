import OnboardingService from "../../ClientServices/onboardingRequest";
import { getPurchaseOrderSuccess } from "../reducers/purchaseOrderSlice";

export const getPurchaseOrders = async (dispatch) => {
  try {
    const response = await OnboardingService.get("test2");
    dispatch(getPurchaseOrderSuccess(response));
  } catch (error) {}
};
