import React, { useMemo } from 'react';
import DynamicSection from '../../../../Shared/DynamicSection/DynamicSection';
import CreateCustomerType from './CustomerType/CreateCustomerType';
import CustomerType from './CustomerType/CustomerType';
import { DataProvider } from '../../../../Helpers/Context/useData';
import useFetchData from '../../../../Helpers/Hook/useFetchData';
import { useTabs } from '../../../../Helpers/Context/TabContext';

const CustomerTypeTable = ({ handleTabClick }) => {
    const { activeSubTab } = useTabs();



    const subTabsConfig = useMemo(
        () => [
          { id: "customer-type", label: "customer-type" },
    
    
        ],
        []
      );
      const endpoints = useMemo(() => {
        return {
          "customer-type": "customer_type/all/",
    
    
        };
      }, []);
      const { data, fetchData } = useFetchData(endpoints[activeSubTab]);
      const filteredData = useMemo(() => {

        if (!data) return [];
        switch (activeSubTab) {
          case "customer-type":
            return data.filter(
              (row) =>
                row?.pms_customer_type_en?.customer_type_name_en &&
                row?.pms_customer_type_ar?.customer_type_name_ar
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
            "customer-type": (
              <CustomerType data={filteredData} fetchData={fetchData} />
            )

          }}
          componentMapConfig={{
            "customer-type": <CreateCustomerType fetchData={fetchData} />,


          }}
          handleTabClick={handleTabClick}
        />

      </DataProvider>
        </>
    );
}

export default CustomerTypeTable



 
  



  

  


