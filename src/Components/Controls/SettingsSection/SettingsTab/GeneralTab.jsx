import { useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useTabs } from "../../../Helpers/Context/TabContext";
import Breadcrumbs from "../../../Shared/Breadcrumbs/Breadcrumbs";
import { generateSlides } from "../../../Shared/Tabs/Tabs";
import TabsCarousel from "../../../Shared/TabsCarousel/TabsCarousel";
import Tabs from "../../../Shared/Tabs/Tabs";
const GeneralTab = ({ defaultSubTabs }) => {
  const { t, i18n } = useTranslation();

  
  const { activeTab, setActiveTab, setActiveSubTab } = useTabs();

  // Define tabs specific to this component
  const tabs = [
    'rooms',
    'services',
    "seasons",
    "currency",
    "geo-location",
    "inventory",
    "dependents",
    "housekeeping",
    "maintenance",
    "channel-booking",
    "customer-type",
    "meal-plan",
   
    
  ]

  // Use memoization to generate slides only when tabs array changes
  const slides = useMemo(() => generateSlides(tabs), [tabs]);

  // Breadcrumbs are dynamically derived based on the current active tab
  const breadcrumbs = [
    t("settings"),
    t("generalSettings"),
    activeTab ? t(activeTab) : null
  ].filter(Boolean);// Filter removes null values (e.g., when activeTab is undefined)

  /**
  * Handles the main tab click event.
  * - Updates the active tab.
  * - Sets the corresponding sub-tab from defaultSubTabs.
  */
  const handleMainTabClick = (tab) => {


    setActiveTab(tab);
    setActiveSubTab(defaultSubTabs[tab]);

  };



  
  return (
    <div className="px-content mb-auto mt-3">
      <div className="px-card p-4 pb-0 mb-4">
        <div className="breadcrumbs-list w-100">
          {/* Breadcrumbs display navigation hierarchy */}
          <Breadcrumbs breadcrumbs={breadcrumbs} isRTL={i18n.language === "ar"} />
        </div>
        <div className=" pt-2 w-100"  >
          <h3>{t('generalSettings')}</h3>
          {/* TabsCarousel renders tabs divided into slides */}
          
          <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleMainTabClick} />
          
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
