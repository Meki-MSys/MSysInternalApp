import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import GetEmpData from "./getEmpDataReducer";

export const reducer = combineReducers({
  empdata: loginReducer,
  allempdata:GetEmpData
});
