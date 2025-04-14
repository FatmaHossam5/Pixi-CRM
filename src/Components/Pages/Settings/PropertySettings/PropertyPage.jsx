import { useState, useEffect } from "react";
import PropertySettings from "./PropertySettings";
import PropertyTab from "../../../Controls/SettingsSection/SettingsTab/PropertyTab";
import { useTabs } from "../../../Helpers/Context/TabContext";


const PropertyPage = () => {
  const { activeTab, setActiveTab,activeSubTab,setActiveSubTab} = useTabs();
const defaultTab='hotels'
  // Persist activeTab and activeSubTab in localStorage
  useEffect(() => {
    if (activeTab) localStorage.setItem("propertyActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (activeSubTab) localStorage.setItem("PropertyactiveSubTab", activeSubTab);
  }, [activeSubTab]);

  return (
    <>
      {/* Pass activeTab and setActiveTab to PropertyTab and PropertySettings */}
      <PropertyTab activeTab={activeTab} setActiveTab={setActiveTab} activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} defaultTab='hotels'/>
      <PropertySettings activeTab={activeTab} setActiveTab={setActiveTab} activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab}/>
    </>
  );
};

export default PropertyPage;


