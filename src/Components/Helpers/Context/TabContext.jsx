import React, { createContext, useContext, useState } from "react";

const TabContext = createContext();

export const TabsProvider = ({ children , defaultActiveTab = 'rooms', defaultActiveSubTab = 'room-type'}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [activeSubTab, setActiveSubTab] = useState(defaultActiveSubTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, activeSubTab, setActiveSubTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => useContext(TabContext);
