import React, { useMemo } from 'react';
import DynamicSection from '../../../../Shared/DynamicSection/DynamicSection';
import ChannelBooking from './ChannelBooking/ChannelBooking';
import CreateChannelBooking from './ChannelBooking/CreateChannelBooking';
import { useTabs } from '../../../../Helpers/Context/TabContext';
import useFetchData from '../../../../Helpers/Hook/useFetchData';
import { DataProvider } from '../../../../Helpers/Context/useData';

const ChannelBookingTable = ({ handleTabClick }) => {
  const { activeSubTab } = useTabs();
  const subTabsConfig = useMemo(
    () => [
      { id: "channel-booking", label: "channel-booking" },


    ],
    []
  );


  const endpoints = useMemo(() => {
    return {
      "channel-booking": "channel_booking/all/",


    };
  }, []);
  const { data, fetchData } = useFetchData(endpoints[activeSubTab]);
  console.log(data);
  
  const filteredData = useMemo(() => {

    if (!data) return [];
    switch (activeSubTab) {
      case "channel-booking":
        return data.filter(
          (row) =>
            row?.pms_channel_booking_en?.channel_booking_name_en &&
            row?.pms_channel_booking_ar?.channel_booking_name_ar
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
            "channel-booking": (
              <ChannelBooking data={filteredData} fetchData={fetchData} />
            )

          }}
          componentMapConfig={{
            "channel-booking": <CreateChannelBooking fetchData={fetchData} />,


          }}
          handleTabClick={handleTabClick}
        />

      </DataProvider>
    </>
  );
}

export default ChannelBookingTable