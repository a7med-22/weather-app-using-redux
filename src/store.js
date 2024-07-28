import { configureStore } from "@reduxjs/toolkit";
import WeatherApiSlice from "./WeatherApiSlice";

export const store = configureStore({
  reducer: {
    weather: WeatherApiSlice,
  },
});
