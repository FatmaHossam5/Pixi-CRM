import { useContext } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";

const Governorate = () => {
  const { baseUrlPms, Headers } = useContext(AuthContext);


  // data of table // API endpoint for fetching room Views
  const endpoint = `${baseUrlPms}/governorate_saved/all/`;

  // Filter function to validate row data before rendering
  const filterFn = (row) =>
    row?.governorate_info?.mis_governorate_en?.governorate_name_en &&
    row?.governorate_info?.mis_governorate_ar.governorate_name_ar;


  const getColumns = (t) => [
    {
      name: t("englishName"),


      selector: (row) => row?.governorate_info?.mis_governorate_en?.governorate_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.governorate_info?.mis_governorate_en?.governorate_name_en}</div>
          <DropdownActions />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row?.governorate_info?.mis_governorate_ar.governorate_name_ar,
      sortable: true,
    },
    {
      name: t("geoLocationTabs.latitude"),
      selector: (row) => row?.governorate_info?.latitude_governorate,
      sortable: true,
    },
    {
      name: t("geoLocationTabs.longitude"),
      selector: (row) => row?.governorate_info?.longitude_governorate,
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

export default Governorate
