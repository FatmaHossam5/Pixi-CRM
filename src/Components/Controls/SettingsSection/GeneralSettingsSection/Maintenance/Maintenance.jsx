import { useMemo } from 'react';
import { useTabs } from '../../../../Helpers/Context/TabContext';
import DynamicSection from '../../../../Shared/DynamicSection/DynamicSection';
import CreateSpecialization from './Specialization/CreateSpecialization';
import Specialization from './Specialization/Specialization';
import CreateWorkers from './Workers/CreateWorkers';
import Workers from './Workers/Workers';
import useFetchData from '../../../../Helpers/Hook/useFetchData';
import { DataProvider } from '../../../../Helpers/Context/useData';

const Maintenance = ({ handleTabClick }) => {
 const { activeSubTab } = useTabs();



  const subTabsConfig = useMemo(() => [
    { id: "specialization", label: "specialization" },
    { id: "workers", label: "workers" },

  ], [])


  const endpoints = useMemo(() => {
    return {
      "specialization": "maintenance_type/all/",
      "workers": "maintenance_worker/all/",
   
    }
  }, [])

  const { data, fetchData } = useFetchData(endpoints[activeSubTab]);




  const filteredData = useMemo(() => {

    if (!data) return [];
    switch (activeSubTab) {
      case "specialization":
        return data.filter(
          (row) => 
            row?.pms_maintenance_type_en?.maintenance_type_en &&
            row?.pms_maintenance_type_ar?.maintenance_type_ar
        );
      case "workers":
        return data.filter(
          (row) =>
            row?.pms_maintenance_worker_ar?.maintenance_worker_name_ar &&
            row?.pms_maintenance_worker_en?.maintenance_worker_name_en
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
            "specialization": (
              <Specialization data={filteredData} fetchData={fetchData} />
            ),
            "workers": (
              <Workers data={filteredData} fetchData={fetchData} />
            ),
           
          }}
          componentMapConfig={{
            "specialization": <CreateSpecialization fetchData={fetchData} />,
            "workers": <CreateWorkers fetchData={fetchData} />,
          
          }}
          handleTabClick={handleTabClick}
        />

      </DataProvider>

    </>
  );
}

export default Maintenance
