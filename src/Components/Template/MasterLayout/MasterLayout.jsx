import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "./../Sidebar/Sidebar";
import { useState } from "react";
import { useTranslation } from "react-i18next";



function MasterLayout() {
  const location = useLocation();
  const { i18n } = useTranslation();  // Access i18n instance to get the current language
  const [collapsed, setCollapsed] = useState(false);
  const loggedInUser = {
    name: 'Ashraf Galal',
    photo: 'https://example.com/path/to/ashraf-photo.jpg',
  };
  // Toggle Sidebar collapse state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  // Check if the current language is Arabic (apply RTL direction)
  const isRTL = i18n.language === 'ar';
  return (
    <>
      <div className={`container-fluid main-content-container d-flex `} >

        <div
          className={`main-sidebar-container  d-flex `}

        >
          <SideBar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        </div>
        <div
          className="main-header-container"
          style={{
            flexGrow: 1, 
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Header  userName={loggedInUser.name} userPhoto={loggedInUser.photo} />
          <div className="content mt-3" style={{ flexGrow: 1, overflowY: "auto" }}>
            <Outlet />
          </div>
        </div>

      </div>
    </>
  )
}

export default MasterLayout;