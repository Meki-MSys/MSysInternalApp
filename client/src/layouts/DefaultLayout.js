import React, { Fragment, useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AppContent from "./AppContent";
import { ThemeProvider } from "../components/context/ThemeProvider";
import { LoginAction } from "../components/action/auth";
import axios from "axios";

const DefaultLayout = ({ LoginAction }) => {
  const queryClient = new QueryClient();
  const [username,setUsername] = useState("");
  const themevalue = useContext(ThemeProvider);
  const [themeMode, setThemeMode] = useState("skin-dark");
  const onsetTheme = (theme) => {
    setThemeMode(theme);
  };
  useEffect(() => {
    const localtheme = window.localStorage.getItem("theme");
    setThemeMode(localtheme);
  }, []);

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider.Provider value={themevalue}>
          <div id="wrapper">
            <div className={themeMode}>
              <Header ongetheme={onsetTheme}/>
              <Sidebar />
              <div className="custom-content">
                <AppContent />
              </div>
            </div>
          </div>
        </ThemeProvider.Provider>
      </QueryClientProvider>
    </Fragment>
  );
};

export default connect(null, { LoginAction })(DefaultLayout);
