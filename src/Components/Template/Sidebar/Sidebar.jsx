import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import { menuConfig } from "./menuConfig";
import './SideBar.css';

const SideBar = ({ collapsed, toggleSidebar }) => {
  const { user } = useContext(AuthContext);
  const role = user?.roles?.[0] || "leader";

  const [showSettings, setShowSettings] = useState(false);
  const menu = menuConfig[role] || menuConfig["leader"];

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : "expanded"}`}>
      {/* Collapse button */}
      <div className="side-collapse" onClick={toggleSidebar}>
        <i className={`fa-kit ${collapsed ? "fa-expand" : "fa-collapse"}`} />
      </div>

      <aside className="sidebar ">
        {/* Logo section */}
        <div className="d-flex align-items-center p-2 mb-3 logo-section">
          <div className="imgLogo bg-info ms-auto rounded-3">
            <img
              src={logo}
              alt="Application Logo"
              className="w-100 h-100 object-fit-contain"
            />
          </div>
          <div className={`logo ${collapsed ? "d-none" : "ps-3 text-center"} me-auto`}>
            <span>Pixi</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="side-links">
          {showSettings && (
            <div className="nav-item" onClick={() => setShowSettings(false)}>
              <i className="fa fa-chevron-left" />
              {!collapsed && <span>Back</span>}
            </div>
          )}
          {(showSettings ? menu?.settings : menu?.main)?.map((item) => {
            if (item.path === "settings-toggle") {
              return (
                <div key="toggle-settings" className="nav-item" onClick={() => setShowSettings(true)}>
                  <i className={item.icon} />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              );
            }

            return (
              <NavLink
                key={item?.path}
                to={item?.path}
                className={({ isActive }) => `nav-item ${isActive ? "active-side-link" : ""}`}
              >
                <i className={item?.icon} />
                {!collapsed && <span>{item?.label}</span>}
              </NavLink>
            );
          })}


        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
