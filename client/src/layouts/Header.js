import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SideMenuSettings } from "../components/common";
import { FormCheck } from "react-bootstrap";
import { googleLogout } from "@react-oauth/google";
import { store } from "../components/common/store";

const logo = `https://www.msysreminisce.com/wp-content/uploads/2019/05/header-sticky-logo.png`;
const logosm = `https://www.msysreminisce.com/wp-content/uploads/2019/05/favicon.png`;

const Header = ({ ongetheme, username }) => {
  let getStoredData = store.getState();
  let getempdata = getStoredData.empdata;
  let name = getempdata.username || username;
  const navigate = useNavigate();
  const [ischeck, setIsCheck] = useState(false);
  const onLogoutClick = () => {
    googleLogout();
    setTimeout(() => {
      navigate("/");
    }, 100);
  };
  const onThemeModeChange = (e) => {
    const mode = e.currentTarget.checked;
    if (mode) {
      let light = "skin-white";
      window.localStorage.setItem("theme", light);
      setIsCheck(mode);
      ongetheme(light);
    } else {
      let dark = "skin-dark";
      window.localStorage.setItem("theme", dark);
      setIsCheck(mode);
      ongetheme(dark);
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme === "skin-white") {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, []);

  const onToggleClick = (e) => {
    e.preventDefault();
    if (document.body) {
      const getType = document.body.getAttribute("data-sidebar-size");
      if (getType === "default" || getType === null) {
        document.body.setAttribute("data-sidebar-size", "sidebar-minimized");
      } else {
        document.body.setAttribute("data-sidebar-size", "default");
      }
    }
  };

  return (
    <header className="header-sticky">
      <div className="container-fluid">
        <div className="logo-box">
          <div className="logo-lg">
            <a
              href="/#"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <img
                alt="MSys Technologies"
                src={logo}
                width="100"
                height="45"
                className="d-inline-block align-top mx-4 my-3"
              />
            </a>
          </div>
          <div className="logo-sm">
            <a
              href="/#"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <img
                alt="MSys Technologies"
                src={logosm}
                width="30"
                height="40"
                className="d-inline-block align-top mx-4 my-3"
              />
            </a>
          </div>
        </div>
        <ul className="list-unstyled topnav-menu mb-0">
          <li>
            <button className="btn-toggler" onClick={(e) => onToggleClick(e)}>
              <i className="bi bi-list"></i>
            </button>
          </li>
        </ul>
        {/*<div className="float-end mb-0 mt-4">
          <div className="d-flex">
           <label className="label-clr">Dark Mode</label>
            <FormCheck
              type="switch"
              id="custom-switch"
              label="Light Mode"
              className="switch-toggle mx-3"
            />
            <a href="/#" onClick={() => onLogoutClick()}>
              <LogOut width={20} />
            </a>
          </div>
  </div>*/}
        <ul className="list-unstyled topnav-menu float-end mb-0 mt-4 mx-3">
          <li>
            <div className="dropdown">
              <a
                href="/#"
                className="d-flex align-items-center text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <strong>{name}</strong>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <div className="d-flex">
                  <label className="f-s-1 label-clr mx-2">Dark</label>
                  <FormCheck
                    type="switch"
                    id="custom-switch"
                    className="switch-toggle mx-1 f-s-1"
                    checked={ischeck}
                    onChange={(e) => onThemeModeChange(e)}
                  />
                  <label className="f-s-1 label-clr mx-1">Light</label>
                </div>
                {SideMenuSettings.map((sidemenusetting, idx) => (
                  <Fragment key={idx}>
                    {!sidemenusetting.divider ? (
                      <li key={idx}>
                        <a className="dropdown-item" href="/#">
                          <sidemenusetting.icon />
                          <span>{sidemenusetting.name}</span>
                        </a>
                      </li>
                    ) : (
                      <Fragment key={idx}>
                        <li key={idx}>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/#"
                            onClick={() => onLogoutClick()}
                          >
                            <sidemenusetting.icon width={20} />
                            <span className="mx-3 f-s-1">
                              {sidemenusetting.name}
                            </span>
                          </a>
                        </li>
                      </Fragment>
                    )}
                  </Fragment>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
