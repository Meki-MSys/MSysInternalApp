import axios from "axios";
import { LOG_IN, USER_LOAD, AUTH_ERR } from "../reducer/types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    // const res = await axios.get("api/user/getuser");
    // console.log(res);
    // dispatch({ type: USER_LOAD, payload: res.data });
    // return false;
  } catch (err) {
    //dispatch({ type: AUTH_ERR });
  }
};

// export const LoginAction =
//   ({ email, empId,admin }) =>
//   async (dispatch) => {
//     const config = { headers: { "Content-Type": "application/json" } };
//     const body = JSON.stringify({ email, empId, admin });
//     try {
//       const response = await axios.post("api/user", body, config);
//       console.log(response);
//       dispatch({
//         type: LOG_IN,
//         payload: {
//           data: { empId: empId, email: email, token: response.data.token ,admin:admin},
//         },
//       });
//       dispatch(loadUser());
//     } catch (err) {}
//   };

// export const LoginAction =
//   ({ token, username, email }) =>
//   async (dispatch) => {
//     dispatch({
//       type: LOG_IN,
//       payload: {
//         data: {
//           email: email,
//           token: token,
//           username: username,
//         },
//       },
//     });
//     // setTimeout(() => {
//     //   dispatch(loadUser());
//     // }, 500);
//   };

export const LoginAction =
  ({ email, sub, email_verified, name, picture }) =>
  async (dispatch) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({
      sub,
      email,
      admin: true,
      email_verified,
      picture,
      name
    });
    try {
      const saveuserdetails = await axios.post(
        "api/user/saveuserdetails",
        body,
        config
      );
      if (saveuserdetails.data) {
        const { email, token, username } = saveuserdetails.data;
        dispatch({
          type: LOG_IN,
          payload: {
            data: {
              email: email,
              token: token,
              username: username,
            },
          },
        });
        setTimeout(() => {
          dispatch(loadUser());
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };
