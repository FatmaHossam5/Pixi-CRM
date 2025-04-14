import { useMemo } from "react";
import CreateRoomStatus from "../../Controls/SettingsSection/GeneralSettingsSection/RoomsSection/RoomStatusSection/CreateRoomStatus";
import CreateRoomType from "../../Controls/SettingsSection/GeneralSettingsSection/RoomsSection/RoomTypeSection/CreateRoomType";
import CreateRoomView from "../../Controls/SettingsSection/GeneralSettingsSection/RoomsSection/RoomViewSection/CreateRoomView";
import CreateRooms from "../../Controls/SettingsSection/PropertySettings/Rooms/AllRooms/CreateRooms";

const useSubTabs = (t) => {
    const subTabs = useMemo(() => [
      { id: "room-type", label: t("roomType") },
      { id: "room-view", label: t("roomView") },
      { id: "rooms", label: t("rooms") },

      { id: "room-status", label: t("roomStatus") },
    ], [t]);
  
    const componentMap = useMemo(() => ({
      "room-type": <CreateRoomType />,
      "room-view": <CreateRoomView />,
      "rooms":<CreateRooms/>,
      "room-status": <CreateRoomStatus />
     
    }), []);
  
    return { subTabs, componentMap };
  };
  export default useSubTabs