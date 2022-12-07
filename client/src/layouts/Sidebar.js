import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { SideMenuList, SideMenuSettings } from "../components/common";

const logocollapsed = `https://www.msysreminisce.com/wp-content/uploads/2019/05/favicon.png`;

const Sidebar = () => {
  const [index, setIndex] = useState(0);
  const onActiveLi = (idx) => {
    setIndex(idx);
  };
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 sidebar-custom">
      <ul className="nav nav-pills nav-flush flex-column mb-auto">
        {SideMenuList.map((sidemenu, idx) => (
          <li key={idx}>
            <Link
              to={sidemenu.link}
              className={`nav-link ${index === idx ? "active" : ""}`}
              onClick={() => onActiveLi(idx)}
            >
              <i className={`bi ${sidemenu.icon} me-2`}></i>
              <span> {sidemenu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <hr />
       {/*<div className="dropdown">
        <a
          href="/#"
          className="d-flex align-items-center text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="User"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Mekilan R</strong>
        </a>
       <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            {SideMenuSettings.map((sidemenusetting, idx) => (
              <Fragment>
                {!sidemenusetting.divider ? (
                  <li key={idx}>
                    <a className="dropdown-item" href="/#">
                      <span>{sidemenusetting.name}</span>
                    </a>
                  </li>
                ) : (
                  <Fragment key={idx}>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        <span>{sidemenusetting.name}</span>
                      </a>
                    </li>
                  </Fragment>
                )}
              </Fragment>
            ))}
                </ul>
      </div>*/}
    </div>
  );
};

export default Sidebar;
