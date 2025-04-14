import { useEffect, useState } from "react";
import PricingTab from "../../../Controls/SettingsSection/SettingsTab/PricingTab";
import PricingSettings from "./PricingSettings";

const PricingPage = () => {
  // Manage activeTab in the parent component
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activePricingTab") || "beds-pricing";
  });

  // Update localStorage whenever activeTab changes
  useEffect(() => {
    localStorage.setItem("activePricingTab", activeTab);
  }, [activeTab]);
  return (
    <>
      {/* Pass activeTab and setActiveTab to PropertyTab and PropertySettings */}
      <PricingTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <PricingSettings activeTab={activeTab}/>
    </>
  );
};

export default PricingPage;
