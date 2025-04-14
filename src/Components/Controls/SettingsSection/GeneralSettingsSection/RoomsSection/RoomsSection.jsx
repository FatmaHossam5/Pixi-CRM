import { useMemo } from "react";
import { useTabs } from "../../../../Helpers/Context/TabContext";
import { DataProvider } from "../../../../Helpers/Context/useData";
import useFetchData from "../../../../Helpers/Hook/useFetchData";
import DynamicSection from "../../../../Shared/DynamicSection/DynamicSection";
import CreateRoomStatus from "./RoomStatusSection/CreateRoomStatus";
import RoomStatusSection from "./RoomStatusSection/RoomStatusSection";
import CreateRoomType from "./RoomTypeSection/CreateRoomType";
import RoomTypeSection from "./RoomTypeSection/RoomTypeSection";
import CreateRoomView from "./RoomViewSection/CreateRoomView";
import RoomViewSection from "./RoomViewSection/RoomViewSection";

const RoomsSection = ({ handleTabClick }) => {

  const { activeSubTab } = useTabs();

  // Memoize subTabsConfig to prevent re-initialization on every render
  const subTabsConfig = useMemo(
    () => [
      { id: "room-type", label: "roomType" },
      { id: "room-view", label: "roomView" },
      { id: "room-status", label: "roomStatus" },
    ],
    []
  );

  
// Define endpoints dynamically based on subTabsConfig
const endpoints = useMemo(() => {
  const endpointMap = {
    "room-type": "room_type/all/",
    "room-view": "view_type/all/", // Exception for room-view
    "room-status": "room_status/all/",
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
      case "room-type":
        return data.filter(
          (row) =>
            row.pms_room_type_en?.room_type_name_en &&
            row.pms_room_type_ar?.room_type_name_ar
        );
      case "room-view":
        return data.filter(
          (row) =>
            row.pms_view_type_en?.view_type_name_en &&
            row.pms_view_type_ar?.view_type_name_ar
        );
      case "room-status":
        return data.filter(
          (row) =>
            row.pms_room_status_en?.room_status_name_en &&
            row.pms_room_status_ar?.room_status_name_ar
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
        "room-type": (
          <RoomTypeSection data={filteredData} fetchData={fetchData} />
        ),
        "room-view": (
          <RoomViewSection data={filteredData} fetchData={fetchData} />
        ),
        "room-status": (
          <RoomStatusSection data={filteredData} fetchData={fetchData} />
        ),
      }}
      componentMapConfig={{
        "room-type": <CreateRoomType fetchData={fetchData} />,
        "room-view": <CreateRoomView fetchData={fetchData} />,
        "room-status": <CreateRoomStatus fetchData={fetchData} />,
      }}
      handleTabClick={handleTabClick}
    />
    </DataProvider>
    </>
  );
};

export default RoomsSection;





