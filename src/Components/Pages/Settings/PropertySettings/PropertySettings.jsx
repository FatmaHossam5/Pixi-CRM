
import { useEffect } from "react";
import BedType from "../../../Controls/SettingsSection/PropertySettings/BedType/BedType/BedType";
import Buildings from "../../../Controls/SettingsSection/PropertySettings/Buildings/Pipeline";
import Floors from "../../../Controls/SettingsSection/PropertySettings/Leads/Lead";
import RoomsSection from "../../../Controls/SettingsSection/PropertySettings/Rooms/RoomsSection";

const PropertySettings = ({ activeTab, activeSubTab, setActiveTab,setActiveSubTab }) => {

  const handleTabClick = (tab) =>{ setActiveTab(tab)
 


    
  }
const handleSubTabClick=(subTabs)=>setActiveSubTab(subTabs)

  useEffect(() => {
    localStorage.setItem('PropertyactiveSubTab', activeSubTab);
  }, [activeSubTab]);
  useEffect(() => {
    localStorage.setItem('propertyActiveTab', activeTab);
  }, [activeTab]);
  const sections = {
    // hotels: <Hotels activeTab={activeTab} handleTabClick={handleTabClick} />,
    // branches: <Branches activeTab={activeTab} handleTabClick={handleTabClick} />,
    buildings: <Buildings activeTab={activeTab} handleTabClick={handleTabClick} />,
    floors: <Floors activeTab={activeTab} handleTabClick={handleTabClick} />,
    rooms: <RoomsSection activeSubTab={activeSubTab} handleSubTabClick={handleSubTabClick} />,
    "bed-type": <BedType activeTab={activeTab} handleTabClick={handleTabClick} />,
  };

  return <>{sections[activeTab]}</>;
};

export default PropertySettings;


