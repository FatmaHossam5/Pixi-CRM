import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import { menuConfig } from "./menuConfig";
import styles from './Sidebar.module.css';
const SideBar = ({ collapsed, toggleSidebar }) => {
  const { user } = useContext(AuthContext);
  const role = user?.roles?.[0] || "leader";

  const [showSettings, setShowSettings] = useState(false);
  const menu = menuConfig[role] || menuConfig["leader"];

  return (
    <div className={`${styles.sidebarContainer} ${collapsed ? styles.collapsed : styles.expanded}`}>
      {/* Collapse button */}
      <div className={styles.sideCollapse} onClick={toggleSidebar}>
        <i className={`fa-kit ${collapsed ? "fa-expand" : "fa-collapse"}`} />
      </div>

      <aside className={styles.sidebar}>
        {/* Logo section */}
        <div className={`d-flex align-items-center p-2 mb-3 ${styles.logoSection}`}>
          <div className={`bg-info ms-auto rounded-3  ${styles.imgLogo}`}>
            <img
              src={logo}
              alt="Application Logo"
              className="w-100 h-100 object-fit-contain"
            />
          </div>

          <div className={`${collapsed ? "d-none" : "ps-3 text-center"} me-auto`}>
            <span className={styles.logo}>Pixi</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.sideLinks}>
          {showSettings && (
            <div className={styles.navItem} onClick={() => setShowSettings(false)}>
              <i className="fa fa-chevron-left" />
              {!collapsed && <span>Back</span>}
            </div>
          )}
          {(showSettings ? menu?.settings : menu?.main)?.map((item) => {
            if (item.path === "settings-toggle") {
              return (
                <div key="toggle-settings" className={styles.navItem} onClick={() => setShowSettings(true)}>
                  <i className={item.icon} />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              );
            }

            return (
              <NavLink
                key={item?.path}
                to={item?.path}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.activeSideLink : ""}`
                }              >
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
