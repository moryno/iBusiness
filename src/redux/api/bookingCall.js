import OnboardingService from "../../axios/onboardingRequest";
import {
  addBookingSuccess,
  deleteBookingSuccess,
  getBookingSuccess,
  refreshBooking,
  updateBookingSuccess,
} from "../bookingSlice";

export const getBookings = async (dispatch) => {
  try {
    const response = await OnboardingService.get("/test");
    dispatch(getBookingSuccess(response));
  } catch (error) {}
};

export const getFreshBookings = async (dispatch) => {
  try {
    const response = await OnboardingService.get("/test");
    dispatch(refreshBooking(response));
  } catch (error) {}
};

export const addBooking = async (booking, dispatch) => {
  try {
    const response = await OnboardingService.post(`/bookings`, booking);
    dispatch(addBookingSuccess(response));
  } catch (err) {}
};

export const updateBooking = async (id, booking, dispatch) => {
  try {
    await OnboardingService.put(`/bookings/${id}`, booking);
    dispatch(updateBookingSuccess({ bookingId: id, booking }));
  } catch (err) {}
};

export const deleteBooking = async (bookingId, dispatch) => {
  try {
    await OnboardingService.delete(`/bookings/${bookingId}`);
    dispatch(deleteBookingSuccess(bookingId));
  } catch (err) {}
};
