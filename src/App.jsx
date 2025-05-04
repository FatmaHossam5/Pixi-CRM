import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Contacts from "./Components/Controls/features/crm/Contacts/Contacts";
import Lead from "./Components/Controls/features/crm/Leads/Lead";
import Tasks from "./Components/Controls/features/crm/Tasks/Tasks";
import ActivityLog from "./Components/Controls/features/settings/ActivityLog/ActivityLog";
import CustomField from "./Components/Controls/features/settings/CustomeField/CustomField";
import Pipeline from "./Components/Controls/features/settings/PipeLine/Pipeline";
import Reasons from "./Components/Controls/features/settings/Reasons/Reasons";
import Source from "./Components/Controls/features/settings/Source/Source";
import TasksSettings from "./Components/Controls/features/settings/TasksSettings/TasksSettings";
import Team from "./Components/Controls/features/settings/Teams/Teams";
import Users from "./Components/Controls/features/settings/Users/Users";
import AuthLayout from "./Components/Template/AuthLayout/AuthLayout";
import MasterLayout from "./Components/Template/MasterLayout/MasterLayout";
import Dashboard from "./Components/Controls/features/crm/Dashboard/Dashboard";

function App() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    const ltrBootstrap = document.getElementById('ltr-bootstrap');
    const rtlBootstrap = document.getElementById('rtl-bootstrap');
    const ltrApp = document.getElementById('ltr-app');
    const rtlApp = document.getElementById('rtl-app');

    if (isRtl) {
      ltrBootstrap.disabled = true;
      rtlBootstrap.disabled = false;
      ltrApp.disabled = true;
      rtlApp.disabled = false;

    } else {
      ltrBootstrap.disabled = false;
      rtlBootstrap.disabled = true;
      ltrApp.disabled = false;
      rtlApp.disabled = true;

    }
  }, [isRtl]);



  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Contacts /> },

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
