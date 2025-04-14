import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddonsReqSection from "./Components/Controls/Customers/AddonsReqSection/AddonsReqSection";
import CreateAddonsReq from "./Components/Controls/Customers/AddonsReqSection/CreateAddonsReq";
import AllCustomers from "./Components/Controls/Customers/AllCustomers";
import BlackList from "./Components/Controls/Customers/BlackList/BlackList";
import CustomerDependents from "./Components/Controls/Customers/CustomerDependents/CustomerDependents";
import CustomerProfile from "./Components/Controls/Customers/CustomerProfile/CustomerProfile";
import Products from "./Components/Controls/InventorySections/Products";
import Vendor from "./Components/Controls/InventorySections/Vendor";
import RoomProfile from "./Components/Controls/RoomsSection/RoomProfile/RoomProfile";
import BranchAddOns from "./Components/Controls/SettingsSection/PropertySettings/Branches/BranchAddOns/BranchAddOns";
import BuildingAmenities from "./Components/Controls/SettingsSection/PropertySettings/Buildings/BuildingAmenities/BuildingAmenities";
import BuildingFacilities from "./Components/Controls/SettingsSection/PropertySettings/Buildings/BuildingFacilities/BuildingFacilities";
import ProtectedRoute from "./Components/Helpers/ProtectedRoute/ProtectedRoute";
import CustomerGroupReq from "./Components/Pages/Customers/CustomerGroupReq/CustomerGroupReq";
import CustomerSingleReq from "./Components/Pages/Customers/CustomerSingleReq/CustomerSingleReq";
import ForgetPassword from "./Components/Pages/ForgetPassword/ForgetPassword";
import Housekeeping from "./Components/Pages/Housekeeping/Housekeeping";
import Login from "./Components/Pages/Login/Login";
import Maintanance from "./Components/Pages/Maintanance/Maintanance";
import AllAddonsRequests from "./Components/Pages/Reservation/AllAddonsRequests/AllAddonsRequests";
import AllGroupRequests from "./Components/Pages/Reservation/AllGroupRequests/AllGroupRequests";
import GroupDetails from "./Components/Pages/Reservation/AllGroupRequests/GroupDetails";
import AllSingleRequests from "./Components/Pages/Reservation/AllSingleRequests/AllSingleRequests";
import GroupRequest from "./Components/Pages/Reservation/GroupRequest/Source";
import CreateSingleRequest from "./Components/Pages/Reservation/SingleRequest/CreateSingleRequest";
import SingleRequestOld from "./Components/Pages/Reservation/SingleRequestOld/SingleRequestOld";
import ResetPassword from "./Components/Pages/ResetPassword/ResetPassword";
import Rooms from "./Components/Pages/Rooms/Rooms";
import SelectHotel from "./Components/Pages/SelectHotel/SelectHotel";
import SendOtp from "./Components/Pages/SendOtp/SendOtp";
import AuthLayout from "./Components/Template/AuthLayout/AuthLayout";
import MasterLayout from "./Components/Template/MasterLayout/MasterLayout";

import CreateBedsPricing from './Components/Controls/SettingsSection/PricingSettingSection/BedsPricing/CreateBedsPricing';
import CreateRoomsPricing from "./Components/Controls/SettingsSection/PricingSettingSection/RoomsPricing/CreateRoomsPricing";
import GeneralPage from "./Components/Pages/Settings/GeneralSettings/GeneralPage";
import PaymentPage from './Components/Pages/Settings/PaymentSettings/PaymentPage';
import PricingPage from "./Components/Pages/Settings/Pricing/PricingPage";
import PropertyPage from "./Components/Pages/Settings/PropertySettings/PropertyPage";

import { useTranslation } from "react-i18next";

import CreateBuildingsPricing from './Components/Controls/SettingsSection/PricingSettingSection/BuildingsPricing/CreateBuildingsPricing';
import CreateFloorsPricing from "./Components/Controls/SettingsSection/PricingSettingSection/FloorsPricing/CreateFloorsPricing";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
// import './App.css'


import NotificationFlow from "./Components/Controls/NotificationFlow/NotificationFlow";
import Contacts from "./Components/Controls/SettingsSection/PropertySettings/Branches/Contacts";
import CreateRole from "./Components/Controls/SettingsSection/RolesAndPermissionSection/RoleDetailsSection/CreateRole";
import Users from "./Components/Controls/SettingsSection/RolesAndPermissionSection/Users/Users";
import Source from "./Components/Pages/Reservation/GroupRequest/Source";
import RoleDetails from './Components/Pages/Settings/RolesAndPermission/RoleDetails/RoleDetails';
import RolesAndPermission from './Components/Pages/Settings/RolesAndPermission/RolesAndPermission';
import Taxes from "./Components/Pages/Settings/Taxes/Taxes";
import Pipeline from "./Components/Controls/SettingsSection/PropertySettings/Buildings/Pipeline";
import Lead from "./Components/Controls/SettingsSection/PropertySettings/Floors/Lead";
import Hotels from "./Components/Controls/SettingsSection/PropertySettings/Teams/Teams";
import Teams from "./Components/Controls/SettingsSection/PropertySettings/Teams/Teams";

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
      // errorElement: <NotFound />
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "forgetPass", element: <ForgetPassword /> },
        { path: "sendOtp", element: <SendOtp /> },
        { path: "resetPass", element: <ResetPassword /> },
      ],
    },
    {
      path: "selectHotel",
      element: (
        <ProtectedRoute>
          <SelectHotel />
        </ProtectedRoute>
      ),
      // errorElement: <NotFound />
    },
    {
      path: "contact",
      element: (
        // <ProtectedRoute>
        <MasterLayout />
        // </ProtectedRoute>
      ),
      // errorElement: <NotFound />
      children: [
        { index: true, element: <Contacts /> },
        { path: "contact", element: <Contacts /> },
        { path: "lead", element: <Lead /> },
        { path: "teams", element: <Teams /> },
        { path: "industries", element: <AllGroupRequests /> },
        { path: "service", element: <GroupRequest /> },
        {
          path: "reasons",
          element: <GroupDetails />,
        },
        {
          path: "source",
          element: <Source />,
        },

        { path: "tasks", element: <AllAddonsRequests /> },
        {
          path: "pipeline",
          element: <Pipeline />,
        },
        // { path: "generalSettings", element: <GeneralSettings /> },
        { path: "users", element: <GeneralPage /> },
        // { path: "propertySettings", element: <PropertySettings /> },
        { path: "activity log", element: <PropertyPage /> },
        // { path: "paymentSettings", element: <PaymentSettings /> },
        { path: "custom field", element: <PaymentPage /> },
        {
          path: "location",
          element: <BuildingFacilities />,
        },
        {
          path: "permissions",
          element: <BuildingAmenities />,
        },
        // { path: "propertySettings/BranchAddOns/:branchId", element: <AddOns/> },

        // wait creating AddOns page
        {
          path: "propertySettings/BranchAddOns/:branchId",
          element: <BranchAddOns />,
        },
        // Customers
        {
          path: "allCustomers",
          element: <AllCustomers />,
        },
        {
          path: "customerSingleRqu/:customerId",
          element: <CustomerSingleReq />,
        },
        {
          path: "customerSingleRqu/:customerId/createSingleRequest",
          element: <CreateSingleRequest />,
        },
        {
          path: "allSingleRequest/createSingleRequest",
          element: <CreateSingleRequest />,
        },
        {
          path: "customerSingleRqu/addonsReq/:requestId",
          element: <AddonsReqSection />,
        },
        {
          path: "customerSingleRqu/addonsReq/:requestId/createAddonsRequest",
          element: <CreateAddonsReq />,
        },

        {
          path: "customerGroupRqu/:customerId",
          element: <CustomerGroupReq />,
        },
        {
          path: "customerDependent/:customerId",
          element: <CustomerDependents />,
        },
        {
          path: "blackList",
          element: <BlackList />,
        },
        {
          path: "customerProfile/:CustomerId",
          element: <CustomerProfile />,
        },
        {
          path: "rooms",
          element: <Rooms />,
        },
        {
          path: "rooms/roomProfile/:RoomId",
          element: <RoomProfile />,
        },
        {
          path: "vendor",
          element: <Vendor />,
        },
        {
          path: "allProducts",
          element: <Products />,
        },
        {
          path: "housekeeping",
          element: <Housekeeping />,
        },
        {
          path: "maintanance",
          element: <Maintanance />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "pricing",
          element: <PricingPage />,
        },
        {
          path: "pricing/bedPricing",
          element: <CreateBedsPricing />,
        },
        {
          path: "pricing/roomPricing",
          element: <CreateRoomsPricing />,
        },
        {
          path: "pricing/floorPricing",
          element: <CreateFloorsPricing />,
        },
        {
          path: "pricing/buildingPricing",
          element: <CreateBuildingsPricing />,
        },
        {
          path: "rolesAndPermission",
          element: <RolesAndPermission />,
        },
        {
          path: "rolesAndPermission/roleDetails/:roleId/:roleName",
          element: <RoleDetails />,
        },
        {
          path: "rolesAndPermission/createRole",
          element: <CreateRole />,
        },
        {
          path: "rolesAndPermission/roleDetails/createRole",
          element: <CreateRole />,
        },
        {
          path: "taxes",
          element: <Taxes />
        }
        ,
        {
          path: "notification",
          element: <NotificationFlow />
        }
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
