import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
  },
  reducers: {
    getBookingSuccess: (state, action) => {
      state.bookings = action.payload;
    },
    refreshBooking: (state, action) => {
      const existingBookingIds = state.bookings.map(
        (booking) => booking.bookingId
      );
      const updatedBookings = action.payload.filter(
        (booking) => !existingBookingIds.includes(booking.bookingId)
      );
      state.bookings = [...state.bookings, ...updatedBookings];
    },
    // Add Booking
    addBookingSuccess: (state, action) => {
      state.bookings = [action.payload, ...state.bookings];
    },
    // Edit Booking
    updateBookingSuccess: (state, action) => {
      state.bookings[
        state.bookings.findIndex(
          (booking) => booking.bookingId === action.payload.bookingId
        )
      ] = action.payload.booking;
    },

    // Delete Booking
    deleteBookingSuccess: (state, action) => {
      state.bookings.splice(
        state.bookings.findIndex(
          (booking) => booking.bookingId === action.payload
        ),
        1
      );
    },
  },
});

export const {
  getBookingSuccess,
  refreshBooking,
  addBookingSuccess,
  updateBookingSuccess,
  deleteBookingSuccess,
} = bookingSlice.actions;

export default bookingSlice.reducer;
