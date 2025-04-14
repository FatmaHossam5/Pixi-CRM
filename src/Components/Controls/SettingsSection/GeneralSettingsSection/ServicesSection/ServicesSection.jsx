import { useContext, useMemo } from "react";
import { useTabs } from "../../../../Helpers/Context/TabContext";
import { DataProvider } from "../../../../Helpers/Context/useData";
import useFetchData from "../../../../Helpers/Hook/useFetchData";
import DynamicSection from "../../../../Shared/DynamicSection/DynamicSection";
import AddonsSection from "./AddonsSection/AddonsSection";
import CreateAddOn from "./AddonsSection/CreateAddOn";
import AmenitiesSection from "./AmenitiesSection/AmenitiesSection";
import CreateAmenity from "./AmenitiesSection/CreateAmenity";
import CreateFacilitiesSection from "./FacilitiesSection/CreateFacility";
import FacilitiesSection from "./FacilitiesSection/FacilitiesSection";
import { AddOnsProvider } from "../../../../Helpers/Context/AddOnsContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { ToastContext } from "../../../../Helpers/Context/ToastContext ";

const ServicesSection = ({ handleTabClick }) => {
  const { activeSubTab } = useTabs();
  const { baseUrlPms, Headers,setIsLoading } = useContext(AuthContext);
  const organization_id = localStorage.getItem('organization_id');
  const { showToast } = useContext(ToastContext);


  // Memoize subTabsConfig to prevent re-initialization on every render
  const subTabsConfig = useMemo(
    () => [
      { id: "facility", label: "Facility" },
      { id: "amenity", label: "Amenity" },
      { id: "add-ons", label: "AddOn" },
    ],
    []
  );

  // Define endpoints dynamically based on subTabsConfig
  const endpoints = useMemo(() => {
    const endpointMap = {
      "facility": "facility/all/",
      "amenity": "amenity/all/", // Exception for room-view
      "add-ons": "addons/all/",
    };

    return subTabsConfig.reduce((acc, tab) => {
      acc[tab.id] = endpointMap[tab.id] || `${tab.id.replace(/-/g, "_")}/all/`;
      return acc;
    }, {});
  }, [subTabsConfig]);

  // Use fetch hook with dynamic endpoint
  const { data, fetchData } = useFetchData(endpoints[activeSubTab]);

  // Filtering logic for the fetched data
  const filteredData = useMemo(() => {
    if (!data) return [];
    switch (activeSubTab) {
      case "facility":
        return data.filter(
          (row) =>
            row?.pms_facility_en?.facility_name_en &&
            row?.pms_facility_ar?.facility_name_ar
        );
      case "amenity":
        return data.filter(
          (row) =>
            row?.pms_amenity_en?.amenity_name_en &&
            row?.pms_amenity_ar?.amenity_name_ar
        );
      case "add-ons":
        return data.filter(
          (row) =>
            row?.pms_addons_en?.addons_name_en && row?.pms_addons_ar?.addons_name_ar
        );
      default:
        return [];
    }
  }, [data, activeSubTab]);


  return (
    <>
      <DataProvider value={{ data: filteredData, fetchData }}>
      <AddOnsProvider
      baseUrlPms={baseUrlPms}
      Headers={Headers}
      organization_id={organization_id}
      showToast={showToast}
    >
        <DynamicSection
          subTabsConfig={subTabsConfig}
          contentMapConfig={{
            "facility": (
              <FacilitiesSection data={filteredData} fetchData={fetchData} />
            ),
            "amenity": (
              <AmenitiesSection data={filteredData} fetchData={fetchData} />
            ),
            "add-ons": (
              <AddonsSection data={filteredData} fetchData={fetchData} />
            ),
          }}
          componentMapConfig={{
            "facility": <CreateFacilitiesSection fetchData={fetchData} />,
            "amenity": <CreateAmenity fetchData={fetchData} />,
            "add-ons": <CreateAddOn fetchData={fetchData} />,
          }}
          handleTabClick={handleTabClick}
        />
   </AddOnsProvider>
      </DataProvider>
    </>
  );
};

export default ServicesSection;
