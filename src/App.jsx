import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./Components/Template/AuthLayout/AuthLayout";
import MasterLayout from "./layouts/MasterLayout/MasterLayout";
import "react-toastify/dist/ReactToastify.css";
import Contacts from "./features/admin/crm/Contacts/Contacts";
import Lead from "./features/admin/crm/Leads/Lead";
import Tasks from "./features/admin/crm/Tasks/Tasks";
import ActivityLog from "./features/admin/settings/ActivityLog/ActivityLog";
import CustomField from "./features/admin/settings/CustomeField/CustomField";
import Pipeline from "./features/admin/settings/PipeLine/Pipeline";
import Reasons from "./features/admin/settings/Reasons/Reasons";
import Source from "./features/admin/settings/Source/Source";
import TasksSettings from "./features/admin/settings/TasksSettings/TasksSettings";
import Team from "./features/admin/settings/Teams/Teams";
import Users from "./features/admin/settings/Users/Users";
import Dashboard from "./features/admin/crm/Dashboard/Dashboard";
import AllBusiness from "./features/landlord/AllBusiness/AllBusiness";
import Login from "./pages/admin/Login/Login";


function App() {
  const { i18n } = useTranslation();
  // const isRtl = i18n.language === 'ar';

  // useEffect(() => {
  //   const ltrBootstrap = document.getElementById('ltr-bootstrap');
  //   const rtlBootstrap = document.getElementById('rtl-bootstrap');
  //   const ltrApp = document.getElementById('ltr-app');
  //   const rtlApp = document.getElementById('rtl-app');

  //   if (isRtl) {
  //     ltrBootstrap.disabled = true;
  //     rtlBootstrap.disabled = false;
  //     ltrApp.disabled = true;
  //     rtlApp.disabled = false;

  //   } else {
  //     ltrBootstrap.disabled = false;
  //     rtlBootstrap.disabled = true;
  //     ltrApp.disabled = false;
  //     rtlApp.disabled = true;

  //   }
  // }, [isRtl]);

useEffect(() => {
  document.body.dir = i18n.dir();
}, [i18n.language]);


  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login/> },

      ],
    },

    {
      path: "contact",
      element: (
        <MasterLayout />
      ),
      children: [
        { index: true, element: <Contacts /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contacts /> },
        { path: "lead", element: <Lead /> },
        { path: "tasks", element: <Tasks /> },
        { path: "reasons", element: <Reasons /> },
        { path: "source", element: <Source /> },
        { path: "source", element: <Source /> },
        { path: 'tasks-settings', element: <TasksSettings /> },
        { path: "pipeline", element: <Pipeline /> },
        { path: "users", element: <Users /> },
        { path: "teams", element: <Team /> },
        { path: "activity log", element: <ActivityLog /> },
        { path: "custom field", element: <CustomField /> },
      ],
    },
    {
      path: "super-admin",
      element: (
        <MasterLayout />
      ),
      children: [
        { index: true, element: <AllBusiness /> },
        { path: "business", element: <AllBusiness /> },
     
      ],
    },
  ]);

  return (
    <>
      {/*  <DisplayModal /> */}
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
