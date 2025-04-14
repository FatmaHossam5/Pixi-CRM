import React, { useMemo } from "react";
import { useTabs } from "../../../../Helpers/Context/TabContext";
import { DataProvider } from "../../../../Helpers/Context/useData";
import useFetchData from "../../../../Helpers/Hook/useFetchData";
import DynamicSection from "../../../../Shared/DynamicSection/DynamicSection";
import Country from "./Country/Country";
import CreateCountry from "./Country/CreateCountry";

const GeoLocation = ({ handleTabClick }) => {

  const { activeSubTab } = useTabs();

  const subTabsConfig = [
    { id: "country", label: "country" }

  ];

  const endpoints = useMemo(() => {
    const endpointMap = {
      "country": "country_saved/all/",

    };

    return subTabsConfig.reduce((acc, tab) => {
      acc[tab.id] = endpointMap[tab.id] || `${tab.id.replace(/-/g, "_")}/all/`;
      return acc;
    }, {});
  }, [subTabsConfig]);
  const { data, fetchData } = useFetchData(endpoints[activeSubTab]);
  const filteredData = useMemo(() => {
    if (!data) return [];
    switch (activeSubTab) {
      case "country":
        return data.filter(
          (row) =>
            row.country_info?.mis_country_en?.country_name_en &&
            row.country_info?.mis_country_ar?.country_name_ar
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
            "country": (
              <Country data={filteredData} fetchData={fetchData} />
            ),

          }}
          componentMapConfig={{
            "country": <CreateCountry fetchData={fetchData} />,

          }}
          handleTabClick={handleTabClick}
        />
      </DataProvider>

    </>
  );
};

export default GeoLocation;
