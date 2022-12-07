import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import DefaultLayout from "./layouts/DefaultLayout";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="*"
        name="Home"
        element={
          <PrivateRoute>
            <DefaultLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
