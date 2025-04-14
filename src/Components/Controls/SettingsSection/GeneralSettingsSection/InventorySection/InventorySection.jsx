import { useMemo } from "react";
import { useTabs } from "../../../../Helpers/Context/TabContext";
import DynamicSection from "../../../../Shared/DynamicSection/DynamicSection";
import CategorySection from "./CategorySection/CategorySection";
import CreateCategory from "./CategorySection/CreateCategory";
import CreateItem from "./ItemSection/CreateItem";
import ItemSection from "./ItemSection/ItemSection";
import CreateVendor from "./VendorSection/CreateVendor";
import VendorSection from "./VendorSection/VendorSection";
import useFetchData from "../../../../Helpers/Hook/useFetchData";
import { DataProvider } from "../../../../Helpers/Context/useData";

const InventorySection = ({ handleTabClick }) => {


  const { activeSubTab } = useTabs();


  const subTabsConfig = useMemo(() => [
    { id: "vendor", label: "vendor" },
    { id: "category", label: "category" },
    { id: "item", label: "item" },
  ], [])


  const endpoints = useMemo(() => {
    return {
      "vendor": "vendor/all/",
      "category": "category/all/",
      "item": "product/all/",
    }
  }, [])

  const { data, fetchData } = useFetchData(endpoints[activeSubTab]);




  const filteredData = useMemo(() => {

    if (!data) return [];
    switch (activeSubTab) {
      case "vendor":
        return data.filter(
          (row) => 
            row?.pms_vendor_ar?.vendor_name_ar &&
            row?.pms_vendor_en?.vendor_name_en
        );
      case "category":
        return data.filter(
          (row) =>
            row.pms_category_en?.category_name_en &&
            row.pms_category_ar?.category_name_ar
        );
      case "item":
        return data.filter(
          (row) =>
            row.pms_product_en?.product_name_en &&
            row.pms_product_ar?.product_name_ar
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
            "vendor": (
              <VendorSection data={filteredData} fetchData={fetchData} />
            ),
            "category": (
              <CategorySection data={filteredData} fetchData={fetchData} />
            ),
            "item": (
              <ItemSection data={filteredData} fetchData={fetchData} />
            ),
          }}
          componentMapConfig={{
            "vendor": <CreateVendor fetchData={fetchData} />,
            "category": <CreateCategory fetchData={fetchData} />,
            "item": <CreateItem fetchData={fetchData} />,
          }}
          handleTabClick={handleTabClick}
        />

      </DataProvider>


    </>
  );
};

export default InventorySection;
