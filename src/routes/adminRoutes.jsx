import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/admin/AdminLayout';
import Dashboard from '../features/crm/Dashboard/Dashboard';
import Contacts from '../features/crm/Contacts/Contacts';
import Lead from '../features/crm/Leads/Lead';
import Tasks from '../features/crm/Tasks/Tasks';
import Reasons from '../features/settings/Reasons/Reasons';
import Source from '../features/settings/Source/Source';
import TasksSettings from '../features/settings/TasksSettings/TasksSettings';
import Pipeline from '../features/settings/PipeLine/Pipeline';
import Users from '../features/settings/Users/Users';
import Team from '../features/settings/Teams/Teams';
import ActivityLog from '../features/settings/ActivityLog/ActivityLog';
import CustomField from '../features/settings/CustomeField/CustomField';

const adminRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
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
      // add more admin/user routes here
    ],
  },
]);

export default adminRoutes;
