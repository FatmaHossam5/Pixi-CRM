import { useContext, useMemo, useState } from "react";
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
import Rooms from "./AllRooms/Rooms";
import CreateRooms from "./AllRooms/CreateRooms";
import { useTranslation } from "react-i18next";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import CreateSingleRooms from "./AllRooms/CreateSingleRooms";
import CreateMultipulRooms from "./AllRooms/CreateMultipulRooms";

const RoomsSection = ({ handleSubTabClick }) => {

  const { activeSubTab } = useTabs();
  const CustomCreateRoomButton = () => {
    const { t } = useTranslation();
    const { setShowState } = useContext(ModalContext);
  
    const handleSingleRoom = () => {
      setShowState('single-room');
    };
  
    const handleMultipleRoom = () => {
      setShowState('multiple-room');
    };
  
    return (
      <div className="px-dropdown-btn">
        <button
          className="px-btn px-blue-btn"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          {t('createNew')} {t("room")}
        </button>
        <div className="collapse px-dropdown-list" id="collapseExample">
          <div className="card card-body p-2">
            <ul className="w-100 p-2">
              <li className="mb-3 d-flex">
                <button
                  className="bg-transparent border-0"
                  onClick={handleSingleRoom}
                >
                  {t("createRoomForm.singleRoom")}
                </button>
              </li>
              <li className=" d-flex">
                <button
                  className="bg-transparent border-0"
                  onClick={handleMultipleRoom}
                >
                  {t("createRoomForm.multiRoom")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };


  // Memoize subTabsConfig to prevent re-initialization on every render
  const subTabsConfig = useMemo(
    () => [
      { id: "room-type", label: "roomType" },
      { id: "room-view", label: "roomView" },
      { id: "rooms", label: "rooms" },
      { id: "room-status", label: "roomStatus" },
    ],
    []
  );

  
// Define endpoints dynamically based on subTabsConfig
const endpoints = useMemo(() => {
  const endpointMap = {
    "room-type": "room_type/all/",
    "room-view": "view_type/all/", // Exception for room-view
    "rooms":"room/all/",
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
        case "rooms":
          return data.filter(
            (row) =>
              row?.pms_room_en?.room_name_en && row?.pms_room_ar?.room_name_ar
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
          activeSubTab === 'room-type'&&  <RoomTypeSection data={filteredData} fetchData={fetchData} />
        
        ),
        "room-view": (
          activeSubTab === 'room-view'&& <RoomViewSection data={filteredData} fetchData={fetchData} />
        ),
        "rooms":(
          activeSubTab === 'rooms'&&  <Rooms data={filteredData} fetchData={fetchData}/>
        ),
        "room-status": (
          activeSubTab === 'room-status'&&  <RoomStatusSection data={filteredData} fetchData={fetchData} />
        ),
      }}
      componentMapConfig={{
        "room-type": <CreateRoomType fetchData={fetchData} />,
        "room-view": <CreateRoomView fetchData={fetchData} />,
        "rooms":<CreateRooms fetchData={fetchData}/>,
        "room-status": <CreateRoomStatus fetchData={fetchData} />,
        "single-room": <CreateSingleRooms />,
        "multiple-room": <CreateMultipulRooms />,
      }}
      customCreateButtonMapConfig={{
        "rooms": <CustomCreateRoomButton />
      }}
      handleTabClick={handleSubTabClick}
    />
    </DataProvider>
    </>
  );
};

export default RoomsSection;





