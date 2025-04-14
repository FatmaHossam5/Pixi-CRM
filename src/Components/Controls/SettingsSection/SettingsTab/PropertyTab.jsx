
import { useTranslation } from "react-i18next";
import { useTabs } from "../../../Helpers/Context/TabContext";
import { useMemo } from "react";
import Tabs, { generateSlides } from "../../../Shared/Tabs/Tabs";
import Breadcrumbs from "../../../Shared/Breadcrumbs/Breadcrumbs";

// export default PropertyTab


const PropertyTab = ({ defaultSubTabs ,defaultTab }) => {
  console.log(defaultSubTabs);
  console.log(defaultTab);
  
  const { t, i18n } = useTranslation();

  const { activeTab, setActiveTab, setActiveSubTab } = useTabs();

    // Define tabs specific to this component
    const tabs = [
      // 'hotels',
      'branches',
      "buildings",
      "floors",
      "rooms", 
      "bed-type"
      
    ]
  const slides = useMemo(() => generateSlides(tabs), [tabs]);

  const breadcrumbs = [
    t("settings"),
    t("Property Settings"),
    activeTab ? t(activeTab) : null
  ].filter(Boolean);
  // Handle tab click and update activeTab in the parent
  const handleMainTabClick = (tab) => {
console.log(tab);


    setActiveTab(tab);
    setActiveSubTab(defaultSubTabs[tab]);
   

  };

  return (
    // <div className="px-card p-4 pb-0 mb-4">
    //   <div className="container-fluid">
    //     <div className="row">
    //       <div className="col-12 gx-0">
    //         <div className="card-head d-flex flex-wrap">
    //           <div className="page-name pt-2 pb-2 w-100">
    //             <h3>{t("propertySettings")}</h3>
    //             {/* Start Tabs */}
    //             <div className="px-taps">
    //               <ul className="nav nav-pills mt-3" id="pills-tab" role="tablist">
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeTab === "hotels" ? "active" : ""}`}
    //                     onClick={() => handleTabClick("hotels")}
    //                     type="button"
    //                   >
    //                    {t("hotels")}
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeTab === "branches" ? "active" : ""}`}
    //                     onClick={() => handleTabClick("branches")}
    //                     type="button"
    //                   >
    //                   {t("branches")}
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeTab === "buildings" ? "active" : ""}`}
    //                     onClick={() => handleTabClick("buildings")}
    //                     type="button"
    //                   >
    //                    {t("buildings")}
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeTab === "floors" ? "active" : ""}`}
    //                     onClick={() => handleTabClick("floors")}
    //                     type="button"
    //                   >
    //                     {t("floors")}
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeTab === "rooms" ? "active" : ""}`}
    //                     onClick={() => handleTabClick("rooms")}
    //                     type="button"
    //                   >
    //                     {t("rooms")}
    //                   </button>
    //                 </li>
    //               </ul>
    //             </div>
    //             {/* End Tabs */}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
     <div className="px-content mb-auto mt-3">
     <div className="px-card px-4 pt-1 pb-0 mb-4">
       <div className="breadcrumbs-list w-100  ms-2">
         {/* Breadcrumbs display navigation hierarchy */}
         <Breadcrumbs breadcrumbs={breadcrumbs} isRTL={i18n.language === "ar"} />
       </div>
       <div className=" pt-2 w-100"  >
         <h3 className=" ms-2">{t('propertySettings')}</h3>
         {/* TabsCarousel renders tabs divided into slides */}
         
         <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleMainTabClick} />
         
       </div>
     </div>
   </div>
  );
};

export default PropertyTab;

