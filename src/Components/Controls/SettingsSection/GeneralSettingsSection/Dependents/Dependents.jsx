import { useMemo } from "react";
import { useTabs } from "../../../../Helpers/Context/TabContext";
import useFetchData from "../../../../Helpers/Hook/useFetchData";
import DynamicSection from "../../../../Shared/DynamicSection/DynamicSection";
import DependentType from "../Dependents/DependentType/DependentType";
import CreateDependentRelationship from "./DependentRelationship/CreateDependentRelationship";
import DependentRelationship from './DependentRelationship/DependentRelationship';
import CreateDependentType from "./DependentType/CreateDependentType";
import { DataProvider } from "../../../../Helpers/Context/useData";

const DependentsSection = ({ handleTabClick }) => {
  const { activeSubTab } = useTabs();




  const subTabsConfig = useMemo(
    () => [
      { id: "dependent-type", label: "dependentType" },
      { id: "dependent-relationship", label: "dependentRelationship" },

    ],
    []
  );



  const endpoints = useMemo(() => {
    return {
      "dependent-type": "age_group/all/",
      "dependent-relationship": "dependant_relationship/all/", // Direct endpoint

    };
  }, []);
  const { data, fetchData } = useFetchData(endpoints[activeSubTab]);


  const filteredData = useMemo(() => {

    if (!data) return [];
    switch (activeSubTab) {
      case "dependent-type":
        return data.filter(
          (row) =>
            row?.pms_age_group_ar?.age_group_name_ar &&
            row?.pms_age_group_en?.age_group_name_en
        );
      case "dependent-relationship":
        return data.filter(
          (row) =>
            row?.pms_dependant_relationship_en?.dependant_relationship_name_en &&
            row?.pms_dependant_relationship_ar?.dependant_relationship_name_ar
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
            "dependent-type": (
              <DependentType data={filteredData} fetchData={fetchData} />
            ),
            "dependent-relationship": (
              <DependentRelationship data={filteredData} fetchData={fetchData} />
            ),

          }}
          componentMapConfig={{
            "dependent-type": <CreateDependentType fetchData={fetchData} />,
            "dependent-relationship": <CreateDependentRelationship fetchData={fetchData} />,

          }}
          handleTabClick={handleTabClick}
        />

      </DataProvider>
    </>
  );
}

export default DependentsSection
