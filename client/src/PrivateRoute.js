import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { store } from "./components/common/store";

const PrivateRoute = ({ children }) => {
  let getStoredData = store.getState();
  let getempdata = getStoredData.empdata;
  return getempdata ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate to="/" />
  );
};

const mapStateToProps = (state) => ({
  empdata: state.empdata,
});

export default PrivateRoute;
