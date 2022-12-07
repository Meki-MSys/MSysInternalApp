import React, { Fragment, memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../routes";

const AppContent = () => {
  return (
    <Fragment>
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                name={route.name}
                exact={route.exact}
                element={<route.element />}
              />
            )
          );
        })}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Fragment>
  );
};

export default memo(AppContent);
