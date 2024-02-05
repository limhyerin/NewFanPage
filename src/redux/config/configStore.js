import { createStore } from "redux";
import rootReducer from "../modules/data";

const store = createStore(rootReducer);

export default store;
