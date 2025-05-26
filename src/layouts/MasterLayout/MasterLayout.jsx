import { Outlet, useLocation } from "react-router-dom";
import Header from "../../Components/Template/Header/Header";
import SideBar from "../../Components/Template/Sidebar/Sidebar";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../Components/Helpers/Context/AuthContext";
import styles from './MasterLayout.module.css'


function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const{user}=useContext(AuthContext)
  const loggedInUser = {
    name: 'Ashraf Galal',
    photo: 'https://example.com/path/to/ashraf-photo.jpg',
  };
  // Toggle Sidebar collapse state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div  className={styles.container} >
        <div className={styles.sidebarWrapper}>
          <SideBar collapsed={collapsed} toggleSidebar={toggleSidebar}  role={user?.roles}/>
        </div>
        <div className={styles.headerContainer}>
          <Header  userName={loggedInUser.name} userPhoto={loggedInUser.photo} />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>

      </div>
    </>
  )
}

export default MasterLayout;