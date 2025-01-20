import { combineReducers } from "redux";
import toggleSlice from "./slices/toggleSlice"
const rootReducer = combineReducers({
    sidebar: toggleSlice,
  });
  

export default rootReducer;