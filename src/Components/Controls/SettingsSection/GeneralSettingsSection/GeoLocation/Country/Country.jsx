import axios from "axios";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../../Helpers/Context/useData";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";

const Country = () => {
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { data, fetchData } = useData('country_saved/all/');
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    countryId: null,
  });
  const closeModal = () => setDeleteModalState({ isOpen: false, countryId: null });
  const handleDeleteModal = (id) => {
    console.log(id);

    setDeleteModalState({ isOpen: true, countryId: id });
  };


  const deleteCountry = () => {

    const { countryId } = deleteModalState;
    console.log(countryId);

    if (!countryId) return;

    axios
      .delete(`${baseUrlPms}/country_saved/${countryId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeCountryMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting room type:", error);
        // Add user feedback here, e.g., a toast message
      });
  };


  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.country_info?.mis_country_en?.country_name_en && row?.country_info?.mis_country_ar.country_name_ar




  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row?.country_info?.mis_country_en?.country_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.country_info?.mis_country_en?.country_name_en}</div>
          <DropdownActions
            onDelete={() => handleDeleteModal(row.pms_country_id


            )}
          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      visible: true,
      selector: (row) => row?.country_info?.mis_country_ar.country_name_ar,
      sortable: true,
    },
    {
      name: t("geoLocationTabs.capitalNameEnglish"),
      visible: true,
      selector: (row) => row?.country_info?.mis_country_en.country_capital_name_en,
      sortable: true,
    },
    {
      name: t("geoLocationTabs.capitalNameArabic"),
      visible: true,
      selector: (row) => row?.country_info?.mis_country_ar.country_capital_name_ar,
      sortable: true,
    },

    {
      name: t("geoLocationTabs.latitude"),
      visible: true,
      selector: (row) => row?.country_info?.latitude_country,
      sortable: true,
    },
    {
      name: t("geoLocationTabs.longitude"),
      visible: true,
      selector: (row) => row?.country_info?.longitude_country,
      sortable: true,
    },
    {
      name: "ISO Code",
      visible: true,
      selector: (row) => row?.country_info?.country_iso,
      sortable: true,
    },
  ];

  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection
        data={data}
        fetchData={fetchData}
        filterFn={filterFn}
        getColumns={getColumns}

      />
      <DeleteModal
        show={deleteModalState.isOpen}
        closeModal={closeModal}
        fun={deleteCountry}
      />
    </>
  );
};

export default Country;
