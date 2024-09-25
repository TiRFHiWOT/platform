import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "@/redux/eventSlice";

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export default store;
