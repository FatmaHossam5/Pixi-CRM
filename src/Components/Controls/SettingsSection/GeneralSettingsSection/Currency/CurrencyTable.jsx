import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTabs } from '../../../../Helpers/Context/TabContext';
import { DataProvider } from '../../../../Helpers/Context/useData';
import useFetchData from '../../../../Helpers/Hook/useFetchData';
import DynamicSection from '../../../../Shared/DynamicSection/DynamicSection';
import CreateCurrency from './Currency/CreateCurrency';
import Currency from './Currency/Currency';

const CurrencyTable = ({ handleTabClick }) => {
  const { t } = useTranslation();
  const { activeSubTab } = useTabs();



  const subTabsConfig = useMemo(
    () => [
      { id: "currency", label: "currency" },

    ],
    []
  );
  const endpoints = useMemo(() => {
    return {
      "currency": "currency_saved/all",

    };
  }, []);
  const { data, fetchData } = useFetchData(endpoints[activeSubTab]);
  console.log(data);

  const filteredData = useMemo(() => {

    if (!data) return [];
    switch (activeSubTab) {
      case "currency":
        return data.filter(
          (row) =>
            row?.currency_info?.mis_currency_en?.currency_name_en &&
            row?.currency_info?.mis_currency_ar.currency_name_ar
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
            "currency": (
              <Currency data={filteredData} fetchData={fetchData} />
            ),

          }}
          componentMapConfig={{
            "currency": <CreateCurrency fetchData={fetchData} />,

          }}
          handleTabClick={handleTabClick}
        />

      </DataProvider>
    </>
  );

}

export default CurrencyTable
