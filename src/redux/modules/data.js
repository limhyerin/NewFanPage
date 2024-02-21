import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 비동기 처리를 위한 thunk를 생성합니다.
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/posts`
    ); // axios.get 함수를 이용해 데이터를 불러옵니다.

    const nickName = localStorage.getItem("nickName") || "";

    return { posts: response.data.posts, nickName };
  } catch (err) {
    console.error("Failed to fetch data: ", err);
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    selectBtn: "winter",
    selectWho: "winter",
    nickName: "",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSelectBtn: (state, action) => {
      state.selectBtn = action.payload;
    },
    setSelectWho: (state, action) => {
      state.selectWho = action.payload;
    },
    setNickName: (state, action) => {
      state.nickName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.posts;
      state.nickName = action.payload.nickName;
    });
  },
});

export const { setData, setSelectBtn, setSelectWho, setNickName } =
  dataSlice.actions;

export default dataSlice.reducer;
