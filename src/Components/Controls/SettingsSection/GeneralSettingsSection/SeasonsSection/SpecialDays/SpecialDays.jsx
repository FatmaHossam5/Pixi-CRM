


import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { useData } from "../../../../../Helpers/Context/useData";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";

const SpecialDays = () => {
  // Context and translations
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const { data, fetchData } = useData();
  console.log(data);
    const { showToast } = useContext(ToastContext);
    const { t } = useTranslation();
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    SpecialDayId: null
  })
  const filterFn = (row) => {
    console.log(row); // Log each row for debugging
    return (
      row?.special_day_info?.special_day_date &&
      row?.branch_season_info?.season_info?.pms_season_en?.season_name_en
    );
  };
  const handleDeleteModal = (id) => {
    console.log(id);

    setDeleteModalState({
      isOpen: true,
      SpecialDayId: id

    })
  }
  const closeModal = () => setDeleteModalState({ isOpen: false, SpecialDayId: null });



  const deleteSpecialDay = () => {
    const { SpecialDayId } = deleteModalState;
    axios
      .delete(`${baseUrlPms}/special_day_branch_season/${SpecialDayId}/delete/`, { headers: Headers })
      .then(() => {
       
        showToast("success", t("msg.removeAddOnMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting add-on:", error);
        showToast("error", t("msg.errorMessage"));
      });
  };
  // Define table columns
  const getColumns = (t) => [
    {
      name: t("Season Name"),
      visible: true,
      selector: (row) =>row?.branch_season_info?.season_info?.pms_season_en?.season_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.branch_season_info?.season_info?.pms_season_en?.season_name_en}</div>
          <DropdownActions onDelete={() => handleDeleteModal(row.id)}
          />
        </div>
      ),
    },
    {
      name: t("special-days"),
      visible: true,
      selector: (row) =>row?.special_day_info?.special_day_date,
      sortable: true,
      reorder: true,

    },
  
  ];



  return (
    <>
      <ReusableSection
        endpoint='special_day_branch_season/all/'
        filterFn={filterFn}
        getColumns={getColumns}
        data={data}
        fetchData={fetchData}
      />
           {deleteModalState.isOpen && <DeleteModal
        show={deleteModalState.isOpen}
        closeModal={closeModal}
        fun={deleteSpecialDay}

      />}
    </>
  );
};

export default SpecialDays;
