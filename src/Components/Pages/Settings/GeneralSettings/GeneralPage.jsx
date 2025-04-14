
import { useEffect } from 'react';
import GeneralTab from '../../../Controls/SettingsSection/SettingsTab/GeneralTab';
import { useTabs } from '../../../Helpers/Context/TabContext';
import GeneralSettings from './GeneralSettings';

const GeneralPage = () => {
  const defaultSubTabs = {

    rooms: 'room-type',
    services: 'facility',
    seasons: 'season',
    currency: 'currency',
    'geo-location': 'country',
    inventory: 'vendor',
    dependents: 'dependent-type',
    housekeeping: 'houseKeeper-task',
    maintenance: 'specialization',
    'channel-booking': 'channel-booking',
    'customer-type': 'customer-type',
    'meal-plan': 'meal-plan',
   
  };
  const { activeTab, setActiveTab, activeSubTab, setActiveSubTab } = useTabs();

  // Persist activeTab and activeSubTab in localStorage
  useEffect(() => {
    if (activeTab) localStorage.setItem("generalActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (activeSubTab) localStorage.setItem("activeSubTab", activeSubTab);
  }, [activeSubTab]);

  return (
    <>
      <GeneralTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveSubTab={setActiveSubTab}
        defaultSubTabs={defaultSubTabs}
      />
      <GeneralSettings
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />
    </>
  );
};

export default GeneralPage;
