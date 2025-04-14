import React, { useMemo, useState } from "react";
import DynamicSection from "../../../../Shared/DynamicSection/DynamicSection";
import CreateSeason from "./Season/CreateSeason";
import Season from "./Season/Season";
import CreateSpecialDays from "./SpecialDays/CreateSpecialDays";
import SpecialDays from "./SpecialDays/SpecialDays";
import CreateWorkDays from "./WorkDays/CreateWorkDays";
import WorkDays from "./WorkDays/WorkDays";
import { DataProvider } from "../../../../Helpers/Context/useData";
import useFetchData from "../../../../Helpers/Hook/useFetchData";
import { useTabs } from "../../../../Helpers/Context/TabContext";

const SeasonsSection = ({ handleTabClick }) => {


 
  const { activeSubTab } = useTabs();





    const subTabsConfig = useMemo(
      () => [
        { id: "season", label: "Season" },
        { id: "special-days", label: "special-days" },
        { id: "work-day", label: "workday" },
      ],
      []
    );



  const endpoints = useMemo(() => {
    return {
      "season": "season/all/",
      "special-days": "special_day_branch_season/all/", // Direct endpoint
      "work-day": "weekend_branch_season/all/",
    };
  }, []);
    const { data, fetchData } = useFetchData(endpoints[activeSubTab]);
   
    
    const filteredData = useMemo(() => {
  
      if (!data) return [];
      switch (activeSubTab) {
        case "season":
          return data.filter(
            (row) =>
              row?.pms_season_en?.season_name_en &&
              row?.pms_season_ar?.season_name_ar
          );
        case "special-days":
          return data.filter(
            (row) =>
              row?.special_day_info?.special_day_date
          );
        case "work-day":
          return data.filter(
            (row) =>
              row?.weekend_info?.weekend_date
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
            "season": (
              <Season data={filteredData} fetchData={fetchData} />
            ),
            "special-days": (
              <SpecialDays data={filteredData} fetchData={fetchData} />
            ),
            "work-day": (
              <WorkDays data={filteredData} fetchData={fetchData} />
            ),
          }}
          componentMapConfig={{
            "season": <CreateSeason fetchData={fetchData} />,
            "special-days": <CreateSpecialDays fetchData={fetchData} />,
            "work-day": <CreateWorkDays fetchData={fetchData} />,
          }}
          handleTabClick={handleTabClick}
        />

      </DataProvider>


    </>
  );
};

export default SeasonsSection;
