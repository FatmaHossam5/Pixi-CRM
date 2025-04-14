// import { useEffect } from "react";
// import Currency from "../../../Controls/SettingsSection/GeneralSettingsSection/Currency/CurrencyTable";
// import CustomerTypeTable from "../../../Controls/SettingsSection/GeneralSettingsSection/CustomerType/CustomerTypeTable";
// import Dependents from "../../../Controls/SettingsSection/GeneralSettingsSection/Dependents/Dependents";
// import GeoLocation from "../../../Controls/SettingsSection/GeneralSettingsSection/GeoLocation/GeoLocation";
// import HousekeepingSection from "../../../Controls/SettingsSection/GeneralSettingsSection/HousekeepingSection/HousekeepingSection";
// import InventorySection from "../../../Controls/SettingsSection/GeneralSettingsSection/InventorySection/InventorySection";
// import Maintenance from "../../../Controls/SettingsSection/GeneralSettingsSection/Maintenance/Maintenance";
// import MealPlanTable from "../../../Controls/SettingsSection/GeneralSettingsSection/MealPlan/MealPlanTable";
// import SeasonsSection from "../../../Controls/SettingsSection/GeneralSettingsSection/SeasonsSection/SeasonsSection";
// import ServicesSection from "../../../Controls/SettingsSection/GeneralSettingsSection/ServicesSection/ServicesSection";
// import RoomsSection from "./../../../Controls/SettingsSection/GeneralSettingsSection/RoomsSection/RoomsSection";
// import ChannelBookingTable from "./../../../Controls/SettingsSection/GeneralSettingsSection/ChannelBooking/ChannelBookingTable";
// import BedTypeTable from "./../../../Controls/SettingsSection/GeneralSettingsSection/BedType/BedTypeTable";

// const GeneralSettings = ({ activeTab, activeSubTab, setActiveSubTab }) => {
//   // Update localStorage whenever activeTab changes
//   useEffect(() => {
//     localStorage.setItem("activeSubTab", activeSubTab);
//   }, [activeSubTab]);

//   const handleTabClick = (tab) => {
//     setActiveSubTab(tab);
//   };

//   return (
//     <>
//       {/* rooms tab */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "rooms" ? "show active" : ""
//         }`}
//         id="pills-rooms"
//         role="tabpanel"
//         aria-labelledby="pills-rooms-tab"
//         tabIndex={0}
//       >
//         <RoomsSection
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* services tab */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "services" ? "show active" : ""
//         }`}
//         id="pills-services"
//         role="tabpanel"
//         aria-labelledby="pills-services-tab"
//         tabIndex={0}
//       >
//         <ServicesSection
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* seasons tab */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "seasons" ? "show active" : ""
//         }`}
//         id="pills-seasons"
//         role="tabpanel"
//         aria-labelledby="pills-seasons-tab"
//         tabIndex={0}
//       >
//         <SeasonsSection
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* currency tab */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "currency" ? "show active" : ""
//         }`}
//         id="pills-currency"
//         role="tabpanel"
//         aria-labelledby="pills-currency-tab"
//         tabIndex={0}
//       >
//         <Currency activeSubTab={activeSubTab} handleTabClick={handleTabClick} />
//       </div>

//       {/* geo location tab */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "geo-location" ? "show active" : ""
//         }`}
//         id="pills-geo-location"
//         role="tabpanel"
//         aria-labelledby="pills-geo-location-tab"
//         tabIndex={0}
//       >
//         <GeoLocation
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* inventory tab */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "inventory" ? "show active" : ""
//         }`}
//         id="pills-inventory"
//         role="tabpanel"
//         aria-labelledby="pills-inventory-tab"
//         tabIndex={0}
//       >
//         <InventorySection
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* dependents tab */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "dependents" ? "show active" : ""
//         }`}
//         id="pills-dependents"
//         role="tabpanel"
//         aria-labelledby="pills-dependents-tab"
//         tabIndex={0}
//       >
//         <Dependents
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//         {/* <div className="px-card">dependents</div> */}
//       </div>

//       {/* housekeeping tab */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "housekeeping" ? "show active" : ""
//         }`}
//         id="pills-housekeeping"
//         role="tabpanel"
//         aria-labelledby="pills-housekeeping-tab"
//         tabIndex={0}
//       >
//         <HousekeepingSection
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* maintenance */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "maintenance" ? "show active" : ""
//         }`}
//         id="pills-maintenance"
//         role="tabpanel"
//         aria-labelledby="pills-maintenance-tab"
//         tabIndex={0}
//       >
//         <Maintenance
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* channel Booking  */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "channel-booking" ? "show active" : ""
//         }`}
//         id="pills-channel-booking"
//         role="tabpanel"
//         aria-labelledby="pills-channel-booking-tab"
//         tabIndex={0}
//       >
//         <ChannelBookingTable
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* customer type  */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "customer-type" ? "show active" : ""
//         }`}
//         id="pills-customer-type"
//         role="tabpanel"
//         aria-labelledby="pills-customer-type-tab"
//         tabIndex={0}
//       >
//         <CustomerTypeTable
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* meal plan  */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "meal-plan" ? "show active" : ""
//         }`}
//         id="pills-meal-plan"
//         role="tabpanel"
//         aria-labelledby="pills-meal-plan-tab"
//         tabIndex={0}
//       >
//         <MealPlanTable
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>

//       {/* Bed Type  */}
//       <div
//         className={`tab-pane fade ${
//           activeTab === "bed_type" ? "show active" : ""
//         }`}
//         id="pills-bed_type"
//         role="tabpanel"
//         aria-labelledby="pills-bed_type-tab"
//         tabIndex={0}
//       >
//         <BedTypeTable
//           activeSubTab={activeSubTab}
//           handleTabClick={handleTabClick}
//         />
//       </div>
//     </>
//   );
// };

// export default GeneralSettings;


// GeneralSettings.js
import { useEffect } from 'react';
import Currency from '../../../Controls/SettingsSection/GeneralSettingsSection/Currency/CurrencyTable';
import CustomerTypeTable from '../../../Controls/SettingsSection/GeneralSettingsSection/CustomerType/CustomerTypeTable';
import Dependents from '../../../Controls/SettingsSection/GeneralSettingsSection/Dependents/Dependents';
import GeoLocation from '../../../Controls/SettingsSection/GeneralSettingsSection/GeoLocation/GeoLocation';
import HousekeepingSection from '../../../Controls/SettingsSection/GeneralSettingsSection/HousekeepingSection/HousekeepingSection';
import InventorySection from '../../../Controls/SettingsSection/GeneralSettingsSection/InventorySection/InventorySection';
import Maintenance from '../../../Controls/SettingsSection/GeneralSettingsSection/Maintenance/Maintenance';
import MealPlanTable from '../../../Controls/SettingsSection/GeneralSettingsSection/MealPlan/MealPlanTable';
import SeasonsSection from '../../../Controls/SettingsSection/GeneralSettingsSection/SeasonsSection/SeasonsSection';
import ServicesSection from '../../../Controls/SettingsSection/GeneralSettingsSection/ServicesSection/ServicesSection';
import RoomsSection from './../../../Controls/SettingsSection/GeneralSettingsSection/RoomsSection/RoomsSection';
import ChannelBookingTable from './../../../Controls/SettingsSection/GeneralSettingsSection/ChannelBooking/ChannelBookingTable';

const GeneralSettings = ({ activeTab, activeSubTab, setActiveSubTab }) => {
  const handleTabClick = (tab) => setActiveSubTab(tab);

  useEffect(() => {
    localStorage.setItem('activeSubTab', activeSubTab);
  }, [activeSubTab]);

  const sections = {
    rooms: <RoomsSection activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    services: <ServicesSection activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    seasons: <SeasonsSection activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    currency: <Currency activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    'geo-location': <GeoLocation activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    inventory: <InventorySection activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    dependents: <Dependents activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    housekeeping: <HousekeepingSection activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    maintenance: <Maintenance activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    'channel-booking': <ChannelBookingTable activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    'customer-type': <CustomerTypeTable activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
    'meal-plan': <MealPlanTable activeSubTab={activeSubTab} handleTabClick={handleTabClick} />,
  };

  return <>{sections[activeTab]}</>;
};

export default GeneralSettings;
