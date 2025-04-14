import { useContext } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";

const City = () => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
  // API endpoint for fetching room Views
  const endpoint = `${baseUrlPms}/city_saved/all/`;

  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.city_info?.mis_city_en?.city_name_en &&
    row?.city_info?.mis_city_ar.city_name_ar;


  // data of table
  const getColumns = (t) => [
    {
      name: t("englishName"),
      selector: (row) => row?.city_info?.mis_city_en?.city_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.city_info?.mis_city_en?.city_name_en}</div>
          <DropdownActions />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row?.city_info?.mis_city_ar.city_name_ar,
      sortable: true,
    },
    {
      name: t("geoLocationTabs.latitude"),
      selector: (row) => row?.city_info?.latitude_city,
      sortable: true,
    },
    {
      name: t("geoLocationTabs.longitude"),
      selector: (row) => row?.city_info?.longitude_city,
      sortable: true,
    },

  ];



  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection endpoint={endpoint} filterFn={filterFn} getColumns={getColumns} headers={Headers} />
    </>
  );
}

export default City
