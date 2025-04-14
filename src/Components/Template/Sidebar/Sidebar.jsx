
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

const SideBar = ({ collapsed, toggleSidebar }) => {
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("language") || "en"; // Default to English
  const [activeTab, setActiveTab] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('');
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({}); // Tracks submenu position
  const [openSubmenuTab, setOpenSubmenuTab] = useState(""); // Tracks the open submenu tab
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // Tracks if submenu is open
  const [hoveredTab, setHoveredTab] = useState(null); // Tracks the hovered tab
  const submenuRef = useRef(null); // Ref for the submenu

  const tabs = [
    { type: 'link', text: t("Dashboard"), path: "./dashboard", icon: <i className="fa-thin fa-chart-bar" /> },
    { type: 'link', text: t("Contact"), path: './contact', icon: <i className="fa-thin fa-address-book" /> },
    { type: 'link', text: t("Lead"), path: './lead', icon: <i className="fa-kit fa-opportunity-svg" /> },
    { type: 'link', text: t("Tasks"), path: './tasks', icon: <i className="fa-thin fa-file-pen" /> },]

  const settings = [
    // { type: 'link', text: t("Industries"), path: './industries', icon: <i className="fa-thin fa-suitcase" /> },
    // { type: 'link', text: t("Service"), path: './service', icon: <i className="fa-kit fa-service-svg" /> },
    { type: 'link', text: t("Reasons"), path: './reasons', icon: <i className="fa-thin fa-clipboard-list" /> },
    { type: 'link', text: t("Source"), path: './source', icon: <i className="fa-kit fa-source-svg" /> },
    { type: 'link', text: t("Tasks Settings"), path: './tasks-settings', icon: <i className="fa-thin fa-diagram-subtask" /> },
    { type: 'link', text: t("Pipeline"), path: './pipeline', icon: <i className="fa-kit fa-timeline-svg" />},
    { type: 'link', text: t("Users"), path: './users', icon: <i className="fa-thin fa-user" /> },
    { type: 'link', text: t("Teams"), path: './teams', icon: <i className="fa-thin fa-users" /> },
    { type: 'link', text: t("Activity log"), path: './activity log', icon: <i className="fa-thin fa-clock" /> },
    { type: 'link', text: t("Custom field"), path: './custom field', icon: <i className="fa-thin fa-list-timeline" /> },
    { type: 'link', text: t("reports"), path: './report', icon: <i className="fa-light fa-memo" /> },
    { type: 'link', text: t("location"), path: './location', icon: <i className="fa-thin fa-location-dot" /> },
    { type: 'link', text: t("Permissions"), path: './permissions', icon: <i className="fa-thin fa-shield-keyhole" /> },
  ]












  const renderSubmenu = (position, tabText) => {
    if (!position || !tabText) return null;

    const activeTab = tabs.find((tab) => tab.text === tabText);
    if (!activeTab || activeTab.type !== "list") return null;

    return createPortal(
      <ul
        ref={submenuRef} // Attach ref to the submenu
        className={`floating-submenu ${isSubmenuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          backgroundColor: "white",
          boxShadow: "0 4px 8px #00000040",
          borderRadius: "12px",
        }}
        onMouseEnter={() => setHoveredTab(tabText)} // Keep submenu open when hovering over it

      >
        {activeTab.subTabs.map((subTab, index) => (
          <React.Fragment key={subTab.subTabText}>
            <li style={{ padding: "8px 16px", fontSize: "14px", color: "#333" }}>
              <NavLink to={subTab.subTabPath} className="submenu-link">
                {subTab.subTabText}
              </NavLink>
            </li>
            {index < activeTab.subTabs.length - 1 && (
              <hr style={{ margin: "4px 0", border: "none", borderTop: "1px solid #e0e0e0" }} />
            )}
          </React.Fragment>
        ))}
      </ul>,
      document.body // Render outside the sidebar's DOM hierarchy
    );
  };

  return (
    <div
      className={`sidebar-container ${collapsed ? "collapsed" : "expanded"}`}
      style={{ width: collapsed ? "88px" : "272px", transition: "width 0.3s ease" }}
    >
      <div className={`side-collaps`} onClick={toggleSidebar} style={{
        position: "absolute",
        left: collapsed ? "5%" : "",
        transition: "right 0.3s ease",
      }}>
        <i className={`fa-kit ${collapsed ? "fa-expand" : "fa-collapse"}`} />
      </div>




      <aside className="sidebar px-card ">
        <div className="d-flex align-items-center p-2 mb-3">
          <div className="imgLogo bg-info ms-auto rounded-3 " style={{ width: '20%', height: "20%" }} >
            <img src={logo}
              alt="Application Logo" // Meaningful alt text
              className="w-100 h-100 object-fit-contain "
            />
          </div>
          <div className={`logo ${collapsed ? "logoPadding" : "ps-3 text-center"}  me-auto `}>
            <span className={`${collapsed ? "d-none" : ""}`}>Pixi</span>
          </div>
        </div>
        <div className="side-links ps-1 ps-md-2 ps-lg-3 pe-1 pe-md-2 pe-lg-3" style={{
          height: "calc(100vh - 120px)", // Adjust based on your header height
          overflowY: "auto",
          paddingRight: "8px" // Prevent scrollbar overlap
        }}>
          <ul className={`mt-3  ${collapsed ? "tabListCollapsed" : "tabList"}`}>
            {tabs.map((tab) => (
              <li
                key={tab.text}
                className={activeTab === tab.text ? "active-tab" : ""}

              >
                <NavLink to={tab.path || "#"} className="side-link">
                  <div className="d-flex py-1 align-items-start map">
                    <div className="icon ps-1 pe-2">{tab.icon}</div>
                    <span className={`side-text ${collapsed ? "d-none" : ""}`}>{tab.text}</span>
                  </div>
                </NavLink>

                {/* Render submenu only for the active tab */}
                {openSubmenuTab === tab.text &&
                  submenuPosition &&
                  isSubmenuOpen &&
                  renderSubmenu(submenuPosition, openSubmenuTab)}
              </li>
            ))}
            <li className="settings-header d-flex justify-content-between align-items-center">
              <span className="settings-title">Settings</span>
              <hr className="settings-divider" />
            </li>
            {settings.map((tab) => (
              <li key={tab.text} className={activeTab === tab.text ? "active" : ""}>
                <NavLink to={tab.path || "#"} className="side-link">
                  <div className="d-flex py-1 align-items-start map">
                    <div className="icon ps-1 pe-2">{tab.icon}</div>
                    <span className={`side-text ${collapsed ? "d-none" : ""}`}>{tab.text}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>

        </div>
      </aside>

    </div>
  );
};

export default SideBar;