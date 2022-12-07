import axios from "axios";
import { GET_EMPDATA, GET_COUNT,GET_SKILLCOUNT } from "./../reducer/types";
import setAuthToken from "../utils/setAuthToken";

export const FormAction = (state) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  // const token = localStorage.getItem("token");
  // if (token) {
  //   setAuthToken(token);
  // }
  const body = JSON.stringify(state);
  try {
    const response = await axios.post("api/empdetails", body,config);
  } catch (error) {}
};

export const GetAllData = () => async (dispatch) => {
  try {
    const response = await axios.get("api/empdetails/all");
    dispatch({
      type: GET_EMPDATA,
      payload: response.data,
    });
  } catch (error) {}
};

export const getEmpDetailsCount = () => async (dispatch) => {
  try {
    const response = await axios.get("api/empdetails/count");
    dispatch({
      type: GET_COUNT,
      payload: response.data,
    });
  } catch (error) {}
};

export const getSkillsCount = () => async (dispatch) => {
  try {
    const response = await axios.get("api/empdetails/skillcount");
    dispatch({
      type: GET_SKILLCOUNT,
      payload: response.data,
    });
  } catch (error) {}
};

