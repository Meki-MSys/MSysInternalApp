import { LOG_IN, LOG_OUT, USER_LOAD, AUTH_ERR } from "./types";

const initalState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  empId: "",
  email: "",
  admin: true,
};

const Empreducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOG_IN:
      localStorage.setItem("token", payload.data.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        email: payload.data.email,
        admin: true,
        username:payload.data.username
      };
    case USER_LOAD:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        email: payload.email,
        admin: true,
        username:payload.username
      };
    case AUTH_ERR:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        empId: "",
        email: "",
        token: null,
      };
    default:
      return state;
  }
};

export default Empreducer;
