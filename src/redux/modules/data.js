export const SET_DATA = "SET_DATA";
export const SET_SELECT_BTN = "SET_SELECT_BTN";
export const SET_SELECT_WHO = "SET_SELECT_WHO";

export const setData = (data) => ({
  type: SET_DATA,
  data,
});
export const setSelectBtn = (selectBtn) => ({
  type: SET_SELECT_BTN,
  selectBtn,
});
export const setSelectWho = (selectWho) => ({
  type: SET_SELECT_WHO,
  selectWho,
});

const initialState = {
  data: JSON.parse(localStorage.getItem(["data"])) || [],
  selectBtn: "winter",
  selectWho: "winter",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.data };
    case SET_SELECT_BTN:
      return { ...state, selectBtn: action.selectBtn };
    case SET_SELECT_WHO:
      return { ...state, selectWho: action.selectWho };
    default:
      return state;
  }
}
