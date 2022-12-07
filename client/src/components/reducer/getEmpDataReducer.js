import { GET_EMPDATA, GET_COUNT, GET_SKILLCOUNT } from "./types";

const initalState = {
  empdata: [],
  count: 0,
  skills: null,
};

const GetEmpData = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_EMPDATA:
      return {
        ...state,
        empdata: payload,
      };
    case GET_COUNT:
      return {
        ...state,
        count: payload,
      };
    case GET_SKILLCOUNT:
      return {
        ...state,
        skills: payload,
      };
    default:
      return state;
  }
};

export default GetEmpData;
