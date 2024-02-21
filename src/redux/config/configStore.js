import { configureStore } from "@reduxjs/toolkit";
import data from "../modules/data";

const store = configureStore({
  reducer: {
    data: data,
  },
});

export default store;
