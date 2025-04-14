// import { useMemo } from 'react';
// import { useTabs } from '../../../../Helpers/Context/TabContext';
// import { DataProvider } from '../../../../Helpers/Context/useData';
// import DynamicSection from '../../../../Shared/DynamicSection/DynamicSection';
// import BedType from './BedType/BedType';
// import CreateBedType from './BedType/CreateBedType';
// import useFetchData from '../../../../Helpers/Hook/useFetchData';

// const BedTypeTable = ({ handleTabClick }) => {

//   const { activeSubTab } = useTabs();



//   const subTabsConfig = useMemo(
//     () => [
//       { id: "bed-type", label: "bed-type" },


//     ],
//     []
//   );
//   const endpoints = useMemo(() => {
//     return {
//       "bed-type": "bed_type/all/",


//     };
//   }, []);
//   const { data, fetchData } = useFetchData(endpoints[activeSubTab]);
//   const filteredData = useMemo(() => {

//     if (!data) return [];
//     switch (activeSubTab) {
//       case "bed-type":
//         return data.filter(
//           (row) =>
//             row?.pms_bed_type_en?.bed_type_name_en &&
//             row?.pms_bed_type_ar?.bed_type_name_ar
//         );

//       default:
//         return [];
//     }
//   }, [data, activeSubTab]);


//   return (
//     <>
//       <DataProvider value={{ data: filteredData, fetchData }}>
//         <DynamicSection
//           subTabsConfig={subTabsConfig}
//           contentMapConfig={{
//             "bed-type": (
//               <BedType data={filteredData} fetchData={fetchData} />
//             )

//           }}
//           componentMapConfig={{
//             "bed-type": <CreateBedType fetchData={fetchData} />,


//           }}
//           handleTabClick={handleTabClick}
//         />

//       </DataProvider>
//     </>
//   );
// }

// export default BedTypeTable
















