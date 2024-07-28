import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weatherApi/fetch",
  async (city) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e61d58cda3ae98a666ee0d2f435ecd03`
      // {
      //   cancelToken: new axios.CancelToken((c) => {
      //     cancelAxios = c;
      //   }),
      // }
    );
    console.log("========================");
    console.log(response);
    const number = Math.round(response.data.main.temp - 273);
    const min = Math.round(response.data.main.temp_min - 273);
    const max = Math.round(response.data.main.temp_max - 273);
    const description = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;
    const icon = `https://openweathermap.org/img/wn/${responseIcon}@2x.png`;

    return { number, min, max, description, icon };
  }
);
export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("+++++++++++++++++++++++++++++");
        console.log(action);
        state.weather = action.payload;
        console.log(state.weatherg      );
      })
      .addCase(fetchWeather.rejected, (state, actoin) => {
        state.isLoading = false;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
