import { useMemo } from "react";
import { useTabs } from "../../../../Helpers/Context/TabContext";
import { DataProvider } from "../../../../Helpers/Context/useData";
import useFetchData from "../../../../Helpers/Hook/useFetchData";
import DynamicSection from "../../../../Shared/DynamicSection/DynamicSection";
import CreateHousekeepers from "./Housekeepers/CreateHousekeepers";
import Housekeepers from "./Housekeepers/Housekeepers";
import CreateHousekeepingTask from "./HousekeepingTask/CreateHousekeepingTask";
import HousekeepingTask from "./HousekeepingTask/HousekeepingTask";

const HousekeepingSection = ({ handleTabClick }) => {
  const { activeSubTab } = useTabs();


  const subTabsConfig = useMemo(() => [
    { id: "houseKeeper-task", label: "housekeeperTask" },
    { id: "houseKeeper", label: "housekeeper" },

  ], [])

  const endpoints = useMemo(() => {
    return {
      "houseKeeper-task": "housekeeper_task/all/",
      "houseKeeper": "housekeeper/all/",
  
    }
  }, []);
  const { data, fetchData } = useFetchData(endpoints[activeSubTab]);

  
  const filteredData = useMemo(() => {

    if (!data) return [];
    switch (activeSubTab) {
      case "houseKeeper-task":
        return data.filter(
          (row) => 
            row?.pms_housekeeper_task_ar?.housekeeper_task_name_ar &&
            row?.pms_housekeeper_task_en?.housekeeper_task_name_en
        );
      case "houseKeeper":
        return data.filter(
          (row) =>
            row?.pms_housekeeper_en?.housekeeper_name_en &&
            row?.pms_housekeeper_ar?.housekeeper_name_ar
        );
  
      default:
        return [];
    }
  }, [data, activeSubTab]);


  return (
    <>

      <DataProvider value={{ data: filteredData, fetchData }}>
        <DynamicSection
          subTabsConfig={subTabsConfig}
          contentMapConfig={{
            "houseKeeper-task": (
              <HousekeepingTask data={filteredData} fetchData={fetchData} />
            ),
            "houseKeeper": (
              <Housekeepers data={filteredData} fetchData={fetchData} />
            ),
          
          }}
          componentMapConfig={{
            "houseKeeper-task": <CreateHousekeepingTask fetchData={fetchData} />,
            "houseKeeper": <CreateHousekeepers fetchData={fetchData} />,
          
          }}
          handleTabClick={handleTabClick}
        />

      </DataProvider>


    </>
  );
};

export default HousekeepingSection;








 











